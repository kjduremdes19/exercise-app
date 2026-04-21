"use client";

import { useEffect, useRef } from "react";
import { useCountdown } from "@/lib/workout/time";
import { beep } from "@/lib/workout/sound";
import type { MergedStep } from "@/lib/db/types";

type Props = {
  step: MergedStep;
  currentSet: number;
  totalSets: number;
  onComplete: () => void;
  onSkip: () => void;
};

export function TimedStep({
  step,
  currentSet,
  totalSets,
  onComplete,
  onSkip,
}: Props) {
  const duration = step.duration_sec ?? 0;
  const { remainingSec, done } = useCountdown(duration);

  // Fire onComplete exactly once when the countdown hits zero. Remounting
  // via the parent's `key` prop resets this ref naturally.
  const firedRef = useRef(false);
  useEffect(() => {
    if (done && !firedRef.current) {
      firedRef.current = true;
      beep();
      onComplete();
    }
  }, [done, onComplete]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Set {currentSet} of {totalSets}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">
        {step.exercise.name}
      </h2>
      <p className="mt-6 text-7xl font-bold tabular-nums text-zinc-900">
        {remainingSec}
      </p>
      <p className="text-sm text-zinc-500">seconds</p>

      {step.exercise.description && (
        <p className="mt-6 max-w-md text-sm text-zinc-500">
          {step.exercise.description}
        </p>
      )}

      <button
        type="button"
        onClick={onSkip}
        className="mt-10 w-full max-w-xs rounded-md border border-zinc-300 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50"
      >
        Skip
      </button>
    </div>
  );
}
