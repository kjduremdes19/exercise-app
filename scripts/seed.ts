/* eslint-disable no-console */
import { createClient } from "@supabase/supabase-js";
import { exercises } from "../supabase/seed/exercises";
import { routines } from "../supabase/seed/routines";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing env vars. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (run via `npm run db:seed`).",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

type ChangeCounts = {
  exercisesUpserted: number;
  routinesUpserted: number;
  routineExercisesUpserted: number;
  routineExercisesDeleted: number;
};

async function seed(): Promise<ChangeCounts> {
  // Validate seed data: exercise slugs referenced by routines must exist.
  const exerciseSlugs = new Set(exercises.map((e) => e.slug));
  for (const r of routines) {
    for (const re of r.exercises) {
      if (!exerciseSlugs.has(re.exercise_slug)) {
        throw new Error(
          `Routine "${r.slug}" references unknown exercise "${re.exercise_slug}".`,
        );
      }
    }
  }

  // ---------------------------------------------------------------------
  // Upsert exercises (keyed on slug).
  // ---------------------------------------------------------------------
  const { data: exerciseRows, error: exErr } = await supabase
    .from("exercises")
    .upsert(
      exercises.map((e) => ({
        slug: e.slug,
        name: e.name,
        description: e.description ?? "",
        kind: e.kind,
        default_sets: e.default_sets ?? null,
        default_reps: e.default_reps ?? null,
        default_duration_sec: e.default_duration_sec ?? null,
        default_rest_sec: e.default_rest_sec ?? 0,
      })),
      { onConflict: "slug" },
    )
    .select("id, slug");

  if (exErr) throw exErr;
  const exerciseIdBySlug = new Map(
    (exerciseRows ?? []).map((row) => [row.slug, row.id as string]),
  );

  // ---------------------------------------------------------------------
  // Upsert routines (keyed on slug).
  // ---------------------------------------------------------------------
  const { data: routineRows, error: rErr } = await supabase
    .from("routines")
    .upsert(
      routines.map((r) => ({
        slug: r.slug,
        name: r.name,
        description: r.description ?? "",
        estimated_duration_min: r.estimated_duration_min ?? null,
      })),
      { onConflict: "slug" },
    )
    .select("id, slug");

  if (rErr) throw rErr;
  const routineIdBySlug = new Map(
    (routineRows ?? []).map((row) => [row.slug, row.id as string]),
  );

  // ---------------------------------------------------------------------
  // Reconcile routine_exercises per routine: delete rows past the new
  // length, upsert all positions in the desired set.
  // ---------------------------------------------------------------------
  let reUpserted = 0;
  let reDeleted = 0;

  for (const r of routines) {
    const routineId = routineIdBySlug.get(r.slug)!;
    const desired = r.exercises.map((re, idx) => ({
      routine_id: routineId,
      position: idx,
      exercise_id: exerciseIdBySlug.get(re.exercise_slug)!,
      sets: re.sets ?? null,
      reps: re.reps ?? null,
      duration_sec: re.duration_sec ?? null,
      rest_sec: re.rest_sec ?? null,
    }));

    if (desired.length > 0) {
      const { error: upErr, count } = await supabase
        .from("routine_exercises")
        .upsert(desired, {
          onConflict: "routine_id,position",
          count: "exact",
        })
        .select();
      if (upErr) throw upErr;
      reUpserted += count ?? desired.length;
    }

    // Delete any rows with position >= desired.length (i.e., trimmed off).
    const { error: delErr, count: delCount } = await supabase
      .from("routine_exercises")
      .delete({ count: "exact" })
      .eq("routine_id", routineId)
      .gte("position", desired.length);
    if (delErr) throw delErr;
    reDeleted += delCount ?? 0;
  }

  return {
    exercisesUpserted: exerciseRows?.length ?? 0,
    routinesUpserted: routineRows?.length ?? 0,
    routineExercisesUpserted: reUpserted,
    routineExercisesDeleted: reDeleted,
  };
}

seed()
  .then((counts) => {
    console.log("Seed complete.");
    console.log(`  exercises:           ${counts.exercisesUpserted} upserted`);
    console.log(`  routines:            ${counts.routinesUpserted} upserted`);
    console.log(`  routine_exercises:   ${counts.routineExercisesUpserted} upserted, ${counts.routineExercisesDeleted} deleted`);
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
