import { createHash } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { mergeRoutineExercise } from "./merge";
import type { Exercise, Routine, RoutineDetail } from "./types";

export async function getRoutines(): Promise<Routine[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("routines")
    .select("id, slug, name, description, estimated_duration_min")
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Routine[];
}

export async function getRoutineBySlug(
  slug: string,
): Promise<RoutineDetail | null> {
  const supabase = await createClient();

  const { data: routine, error: rErr } = await supabase
    .from("routines")
    .select("id, slug, name, description, estimated_duration_min")
    .eq("slug", slug)
    .maybeSingle();
  if (rErr) throw rErr;
  if (!routine) return null;

  const { data: rows, error: reErr } = await supabase
    .from("routine_exercises")
    .select(
      "position, sets, reps, duration_sec, rest_sec, exercise:exercises(id, slug, name, description, kind, default_sets, default_reps, default_duration_sec, default_rest_sec)",
    )
    .eq("routine_id", routine.id)
    .order("position", { ascending: true });
  if (reErr) throw reErr;

  type Row = {
    position: number;
    sets: number | null;
    reps: number | null;
    duration_sec: number | null;
    rest_sec: number | null;
    // Supabase typings for embedded relations can be either an object or
    // an array depending on the relationship cardinality; ours is many-to-one
    // (each routine_exercise has exactly one exercise) but the generic types
    // still surface it as a possible array.
    exercise: Exercise | Exercise[];
  };

  const steps = (rows as Row[] | null ?? []).map((r) => {
    const ex = Array.isArray(r.exercise) ? r.exercise[0] : r.exercise;
    return mergeRoutineExercise(ex, r);
  });

  return { ...(routine as Routine), steps };
}

export async function getTodaysPick(
  userId: string,
  date: Date = new Date(),
): Promise<Routine | null> {
  const routines = await getRoutines();
  if (routines.length === 0) return null;

  // YYYY-MM-DD in the server's local TZ. Good enough for v1; renders the
  // same day across requests during a calendar day for a given user.
  const ymd = date.toISOString().slice(0, 10);
  const seed = `${userId}|${ymd}`;
  const hash = createHash("sha256").update(seed).digest();
  // First 4 bytes → uint32, modulo routine count.
  const index = hash.readUInt32BE(0) % routines.length;
  return routines[index];
}
