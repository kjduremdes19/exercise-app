"use client";

import { useState } from "react";
import { ExerciseCardExpanded } from "@/components/ExerciseCard";
import type { MergedStep, SetLog } from "@/lib/db/types";

type Props = {
  step: MergedStep;
  currentSet: number;
  totalSets: number;
  lastWeight: number | null;
  onComplete: (log: SetLog) => void;
  onPause: () => void;
};

export function StrengthStep({
  step,
  currentSet,
  totalSets,
  lastWeight,
  onComplete,
  onPause,
}: Props) {
  const prescribedReps = step.reps ?? 0;
  const showWeight = step.exercise.equipment === "barbell";

  const [reps, setReps] = useState<string>(String(prescribedReps));
  const [weight, setWeight] = useState<string>(
    lastWeight !== null ? String(lastWeight) : "",
  );

  const handleDone = () => {
    const repsNum = Number.parseInt(reps, 10);
    const weightNum = Number.parseFloat(weight);
    onComplete({
      reps: Number.isFinite(repsNum) ? repsNum : null,
      weight: showWeight && Number.isFinite(weightNum) ? weightNum : null,
    });
  };

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Set {currentSet} of {totalSets}
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight">
        {step.exercise.name}
      </h2>

      <div className="mt-6 flex items-end gap-4">
        <label className="flex flex-col items-center">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Reps
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="mt-1 w-24 rounded-md border border-zinc-300 px-3 py-2 text-center text-3xl font-bold tabular-nums text-zinc-900 focus:border-zinc-900 focus:outline-none"
          />
        </label>

        {showWeight && (
          <label className="flex flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Weight (lbs)
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="2.5"
              placeholder="—"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 w-32 rounded-md border border-zinc-300 px-3 py-2 text-center text-3xl font-bold tabular-nums text-zinc-900 focus:border-zinc-900 focus:outline-none"
            />
          </label>
        )}
      </div>

      <div className="mt-5 w-full text-zinc-700">
        <ExerciseCardExpanded exercise={step.exercise} step={step} animationSize={140} />
      </div>

      <button
        type="button"
        onClick={handleDone}
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
