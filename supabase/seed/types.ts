export type ExerciseSeed = {
  slug: string;
  name: string;
  description?: string;
  kind: "strength" | "timed";
  default_sets?: number;
  default_reps?: number;
  default_duration_sec?: number;
  default_rest_sec?: number;
};

export type RoutineExerciseSeed = {
  exercise_slug: string;
  sets?: number;
  reps?: number;
  duration_sec?: number;
  rest_sec?: number;
};

export type RoutineSeed = {
  slug: string;
  name: string;
  description?: string;
  estimated_duration_min?: number;
  exercises: RoutineExerciseSeed[];
};
