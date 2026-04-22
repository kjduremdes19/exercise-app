"use client";

import { ExerciseCardExpanded } from "@/components/ExerciseCard";
import type { MergedStep } from "@/lib/db/types";

type Props = {
  step: MergedStep;
  currentSet: number;
  totalSets: number;
  onComplete: () => void;
  onPause: () => void;
};

export function StrengthStep({ step, currentSet, totalSets, onComplete, onPause }: Props) {
  const reps = step.reps ?? 0;
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Set {currentSet} of {totalSets}
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight">
        {step.exercise.name}
      </h2>
      <p className="mt-2 text-5xl font-bold text-zinc-900">{reps}</p>
      <p className="text-sm text-zinc-500">reps</p>

      <div className="mt-5 w-full text-zinc-700">
        <ExerciseCardExpanded exercise={step.exercise} step={step} animationSize={140} />
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="mt-8 w-full max-w-xs rounded-md bg-zinc-900 py-4 text-base font-semibold text-white hover:bg-zinc-800"
      >
        Set done →
      </button>
      <button
        type="button"
        onClick={onPause}
        className="mt-3 text-sm text-zinc-500 underline-offset-2 hover:text-zinc-700 hover:underline"
      >
        Pause for now
      </button>
    </div>
  );
}
