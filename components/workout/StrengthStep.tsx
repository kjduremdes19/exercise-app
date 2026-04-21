"use client";

import type { MergedStep } from "@/lib/db/types";

type Props = {
  step: MergedStep;
  currentSet: number;
  totalSets: number;
  onComplete: () => void;
};

export function StrengthStep({ step, currentSet, totalSets, onComplete }: Props) {
  const reps = step.reps ?? 0;
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Set {currentSet} of {totalSets}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">
        {step.exercise.name}
      </h2>
      <p className="mt-3 text-5xl font-bold text-zinc-900">{reps}</p>
      <p className="text-sm text-zinc-500">reps</p>

      {step.exercise.description && (
        <p className="mt-6 max-w-md text-sm text-zinc-500">
          {step.exercise.description}
        </p>
      )}

      <button
        type="button"
        onClick={onComplete}
        className="mt-10 w-full max-w-xs rounded-md bg-zinc-900 py-4 text-base font-semibold text-white hover:bg-zinc-800"
      >
        Set done →
      </button>
    </div>
  );
}
