import type { Exercise, MergedStep } from "@/lib/db/types";
import { ExerciseAnimation } from "./ExerciseAnimation";

function formatStepMeta(step: MergedStep): string {
  if (step.kind === "timed") {
    const dur = step.duration_sec ?? 0;
    const sets = step.sets ?? 1;
    return sets > 1 ? `${sets} × ${dur}s` : `${dur}s`;
  }
  const sets = step.sets ?? 1;
  const reps = step.reps ?? 0;
  return `${sets} × ${reps} reps`;
}

/**
 * Compact summary row: small animation thumbnail + name + meta.
 * Used in the routine-detail accordion's `<summary>`.
 */
export function ExerciseCardSummary({
  exercise,
  step,
}: {
  exercise: Exercise;
  step?: MergedStep;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-zinc-700">
        <ExerciseAnimation slug={exercise.slug} name={exercise.name} size={40} />
      </span>
      <p className="min-w-0 flex-1 truncate font-medium text-zinc-900">
        {exercise.name}
      </p>
      {step && (
        <p className="shrink-0 text-sm text-zinc-600">
          {formatStepMeta(step)}
        </p>
      )}
    </div>
  );
}

/**
 * Full instructional card: large animation + description + numbered "How to"
 * steps + optional rest meta. Used in the accordion body and in the workout
 * player (where the player adds its own set/timer header above this).
 */
export function ExerciseCardExpanded({
  exercise,
  step,
  animationSize = 180,
}: {
  exercise: Exercise;
  step?: MergedStep;
  animationSize?: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-zinc-700">
        <ExerciseAnimation
          slug={exercise.slug}
          name={exercise.name}
          size={animationSize}
        />
      </div>

      {exercise.description && (
        <p className="mt-3 max-w-md text-center text-sm text-zinc-600">
          {exercise.description}
        </p>
      )}

      {exercise.instructions.length > 0 && (
        <div className="mt-4 w-full max-w-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            How to
          </p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-zinc-700 marker:text-zinc-400">
            {exercise.instructions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>
      )}

      {step && step.rest_sec > 0 && (
        <p className="mt-4 text-xs text-zinc-400">
          Rest {step.rest_sec}s between sets
        </p>
      )}
    </div>
  );
}
