import { createHash } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { mergeRoutineExercise } from "./merge";
import type {
  Exercise,
  MuscleGroup,
  Routine,
  RoutineDetail,
  SessionSetLogs,
  SessionSnapshot,
  WorkoutSession,
  WorkoutSessionDetail,
} from "./types";

export async function getRoutines(): Promise<Routine[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("routines")
    .select("id, slug, name, description, estimated_duration_min, muscle_group")
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
    .select("id, slug, name, description, estimated_duration_min, muscle_group")
    .eq("slug", slug)
    .maybeSingle();
  if (rErr) throw rErr;
  if (!routine) return null;

  const { data: rows, error: reErr } = await supabase
    .from("routine_exercises")
    .select(
      "position, sets, reps, duration_sec, rest_sec, exercise:exercises(id, slug, name, description, kind, category, equipment, default_sets, default_reps, default_duration_sec, default_rest_sec, instructions)",
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

export async function getSessionById(
  userId: string,
  id: string,
): Promise<WorkoutSessionDetail | null> {
  // Reject obviously-invalid UUIDs before they hit the DB (avoids a 400).
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workout_sessions")
    .select(
      "id, routine_id, routine_name, routine_snapshot, set_logs, started_at, completed_at, routine:routines(slug)",
    )
    .eq("user_id", userId)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const rel = (data as { routine: { slug: string } | { slug: string }[] | null }).routine;
  const routine_slug = Array.isArray(rel) ? (rel[0]?.slug ?? null) : (rel?.slug ?? null);

  return {
    id: data.id,
    routine_id: data.routine_id,
    routine_name: data.routine_name,
    started_at: data.started_at,
    completed_at: data.completed_at,
    routine_snapshot: data.routine_snapshot as SessionSnapshot,
    set_logs: (data.set_logs as SessionSetLogs | null) ?? null,
    routine_slug,
  };
}

export async function getSessionsForUser(
  userId: string,
  limit = 100,
): Promise<WorkoutSession[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workout_sessions")
    .select("id, routine_id, routine_name, started_at, completed_at")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as WorkoutSession[];
}

/**
 * Deterministic within a day, but now also respects weekly muscle-group
 * balance:
 *   1. Prefer groups the user hasn't touched in the last 7 days.
 *   2. Else prefer groups with fewer than 2 sessions in the last 7 days.
 *   3. Else fall back to hash-picking across every routine (graceful
 *      degradation — the user already got 2+ sessions in every group).
 * Stability: within a given candidate set, SHA-256(userId|YYYY-MM-DD)
 * picks the same routine all day long.
 */
export async function getTodaysPick(
  userId: string,
  date: Date = new Date(),
): Promise<Routine | null> {
  const routines = await getRoutines();
  if (routines.length === 0) return null;

  const supabase = await createClient();
  const windowStartIso = new Date(
    date.getTime() - 6 * 24 * 60 * 60 * 1000,
  ).toISOString();
  const { data: recent, error } = await supabase
    .from("workout_sessions")
    .select("routine_id")
    .eq("user_id", userId)
    .gte("completed_at", windowStartIso);
  if (error) throw error;

  const groupByRoutineId = new Map<string, MuscleGroup>();
  const allGroups = new Set<MuscleGroup>();
  for (const r of routines) {
    if (r.muscle_group) {
      groupByRoutineId.set(r.id, r.muscle_group);
      allGroups.add(r.muscle_group);
    }
  }

  const counts = new Map<MuscleGroup, number>();
  for (const s of recent ?? []) {
    if (!s.routine_id) continue;
    const g = groupByRoutineId.get(s.routine_id);
    if (!g) continue;
    counts.set(g, (counts.get(g) ?? 0) + 1);
  }

  const untouched: MuscleGroup[] = [...allGroups].filter(
    (g) => !counts.has(g),
  );
  const underused: MuscleGroup[] = [...allGroups].filter(
    (g) => (counts.get(g) ?? 0) < 2,
  );

  let candidateGroups: Set<MuscleGroup>;
  if (untouched.length > 0) {
    candidateGroups = new Set(untouched);
  } else if (underused.length > 0) {
    candidateGroups = new Set(underused);
  } else {
    candidateGroups = allGroups;
  }

  const candidates =
    candidateGroups.size > 0
      ? routines.filter(
          (r) => r.muscle_group && candidateGroups.has(r.muscle_group),
        )
      : routines; // no groups assigned at all (pre-migration safety net)

  const pool = candidates.length > 0 ? candidates : routines;
  const index = hashIndex(userId, date, pool.length);
  return pool[index];
}

function hashIndex(userId: string, date: Date, length: number): number {
  const ymd = date.toISOString().slice(0, 10);
  const seed = `${userId}|${ymd}`;
  const hash = createHash("sha256").update(seed).digest();
  return hash.readUInt32BE(0) % length;
}
