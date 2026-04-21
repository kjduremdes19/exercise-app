import type { MergedStep } from "@/lib/db/types";

function formatStepMeta(step: MergedStep): string {
  if (step.kind === "timed") {
    const dur = step.duration_sec ?? 0;
    const sets = step.sets ?? 1;
    return sets > 1 ? `${sets} × ${dur}s` : `${dur}s`;
  }
  // strength
  const sets = step.sets ?? 1;
  const reps = step.reps ?? 0;
  return `${sets} × ${reps} reps`;
}

export function ExerciseList({ steps }: { steps: MergedStep[] }) {
  return (
    <ol className="divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white">
      {steps.map((step) => (
        <li key={step.position} className="flex items-start gap-3 px-4 py-3">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
            {step.position + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-medium text-zinc-900">{step.exercise.name}</p>
              <p className="shrink-0 text-sm text-zinc-600">
                {formatStepMeta(step)}
              </p>
            </div>
            {step.exercise.description && (
              <p className="mt-1 text-sm text-zinc-500">
                {step.exercise.description}
              </p>
            )}
            {step.rest_sec > 0 && (
              <p className="mt-1 text-xs text-zinc-400">
                Rest {step.rest_sec}s between sets
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
