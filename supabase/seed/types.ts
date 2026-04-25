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

export type ExerciseSeed = {
  slug: string;
  name: string;
  description?: string;
  kind: "strength" | "timed";
  category?: ExerciseCategory;
  equipment?: ExerciseEquipment;
  default_sets?: number;
  default_reps?: number;
  default_duration_sec?: number;
  default_rest_sec?: number;
  instructions?: string[];
  video_url?: string | null;
};

export type RoutineExerciseSeed = {
  exercise_slug: string;
  sets?: number;
  reps?: number;
  duration_sec?: number;
  rest_sec?: number;
};

export type MuscleGroup =
  | "push"
  | "pull"
  | "legs"
  | "full-body"
  | "core"
  | "cardio";

export type RoutineSeed = {
  slug: string;
  name: string;
  description?: string;
  estimated_duration_min?: number;
  muscle_group?: MuscleGroup;
  exercises: RoutineExerciseSeed[];
};
