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

export type Exercise = {
  id: string;
  slug: string;
  name: string;
  description: string;
  kind: ExerciseKind;
  category: ExerciseCategory | null;
  equipment: ExerciseEquipment | null;
  default_sets: number | null;
  default_reps: number | null;
  default_duration_sec: number | null;
  default_rest_sec: number | null;
  instructions: string[];
};

export type MuscleGroup =
  | "push"
  | "pull"
  | "legs"
  | "full-body"
  | "core"
  | "cardio";

export type Routine = {
  id: string;
  slug: string;
  name: string;
  description: string;
  estimated_duration_min: number | null;
  muscle_group: MuscleGroup | null;
};

export type RoutineExerciseRow = {
  routine_id: string;
  position: number;
  exercise_id: string;
  sets: number | null;
  reps: number | null;
  duration_sec: number | null;
  rest_sec: number | null;
};

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

export type WorkoutSession = {
  id: string;
  routine_id: string | null;
  routine_name: string;
  started_at: string;
  completed_at: string;
};

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

export type WorkoutSessionDetail = WorkoutSession & {
  routine_snapshot: SessionSnapshot;
  routine_slug: string | null;
};
