import type { MergedStep } from "@/lib/db/types";
import {
  ExerciseCardExpanded,
  ExerciseCardSummary,
} from "./ExerciseCard";

export function RoutineExerciseAccordion({ steps }: { steps: MergedStep[] }) {
  return (
    <ol className="divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white">
      {steps.map((step) => (
        <li key={step.position}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-zinc-50">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
                {step.position + 1}
              </span>
              <div className="min-w-0 flex-1">
                <ExerciseCardSummary exercise={step.exercise} step={step} />
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 text-zinc-400 transition group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <div className="border-t border-zinc-100 bg-zinc-50/40 px-4 py-5">
              <ExerciseCardExpanded exercise={step.exercise} step={step} />
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
