import type { Tables } from "./database.types";

export type ExerciseKind = "strength" | "timed";

export type ExerciseCategory =
  | "strength"
  | "pilates"
  | "yoga"
  | "cardio"
  | "mobility";

export type ExerciseEquipment =
  | "none"
  | "dumbbell"
  | "barbell"
  | "kettlebell"
  | "mat"
  | "machine";

// DB-level row. Note: `kind`, `category`, and `equipment` widen to `string`
// because the columns are plain text with CHECK constraints. Callers that
// need the narrower app-level enum cast at the use site.
export type Exercise = Tables<"exercises">;

export type MuscleGroup =
  | "push"
  | "pull"
  | "legs"
  | "full-body"
  | "core"
  | "cardio";

// `muscle_group` widens to `string | null` from the DB CHECK constraint;
// see Exercise note above.
export type Routine = Tables<"routines">;

export type RoutineExerciseRow = Tables<"routine_exercises">;

// A routine_exercise joined with its exercise, after default-merging.
export type MergedStep = {
  position: number;
  exercise: Exercise;
  kind: ExerciseKind;
  sets: number | null;
  reps: number | null;
  duration_sec: number | null;
  rest_sec: number;
};

export type RoutineDetail = Routine & {
  steps: MergedStep[];
};

export type RoutineStatus = "never" | "past" | "today";

// Pick because the history list only selects these five columns; the
// table itself has more (routine_snapshot, set_logs, user_id, etc.).
export type WorkoutSession = Pick<
  Tables<"workout_sessions">,
  "id" | "routine_id" | "routine_name" | "started_at" | "completed_at"
>;

export type SessionSnapshotStep = {
  position: number;
  exercise_slug: string;
  exercise_name: string;
  kind: ExerciseKind;
  sets: number | null;
  reps: number | null;
  duration_sec: number | null;
  rest_sec: number;
};

export type SessionSnapshot = {
  routine_name: string;
  steps: SessionSnapshotStep[];
};

export type SetLog = {
  reps: number | null;
  weight: number | null;
};

export type StepLog = {
  position: number;
  sets: SetLog[];
};

export type SessionSetLogs = {
  steps: StepLog[];
};

export type WorkoutSessionDetail = WorkoutSession & {
  routine_snapshot: SessionSnapshot;
  routine_slug: string | null;
  set_logs: SessionSetLogs | null;
};
