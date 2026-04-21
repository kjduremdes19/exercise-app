export type ExerciseKind = "strength" | "timed";

export type Exercise = {
  id: string;
  slug: string;
  name: string;
  description: string;
  kind: ExerciseKind;
  default_sets: number | null;
  default_reps: number | null;
  default_duration_sec: number | null;
  default_rest_sec: number | null;
};

export type Routine = {
  id: string;
  slug: string;
  name: string;
  description: string;
  estimated_duration_min: number | null;
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
