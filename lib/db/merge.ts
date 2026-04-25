import type { Exercise, ExerciseKind, MergedStep, RoutineExerciseRow } from "./types";

export function mergeRoutineExercise(
  exercise: Exercise,
  re: Pick<
    RoutineExerciseRow,
    "position" | "sets" | "reps" | "duration_sec" | "rest_sec"
  >,
): MergedStep {
  return {
    position: re.position,
    exercise,
    // exercise.kind is `string` at the DB layer (text + CHECK); narrow back
    // to the app-level ExerciseKind union, which the seed file enforces.
    kind: exercise.kind as ExerciseKind,
    sets: re.sets ?? exercise.default_sets,
    reps: re.reps ?? exercise.default_reps,
    duration_sec: re.duration_sec ?? exercise.default_duration_sec,
    rest_sec: re.rest_sec ?? exercise.default_rest_sec ?? 0,
  };
}
