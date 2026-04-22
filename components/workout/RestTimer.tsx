"use client";

import { useEffect, useRef } from "react";
import { useCountdown } from "@/lib/workout/time";
import { beep } from "@/lib/workout/sound";

type Props = {
  durationSec: number;
  nextLabel: string;
  onDone: () => void;
  onSkip: () => void;
  onPause: () => void;
};

const RING_RADIUS = 88;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

export function RestTimer({
  durationSec,
  nextLabel,
  onDone,
  onSkip,
  onPause,
}: Props) {
  const { remainingMs, remainingSec, done } = useCountdown(durationSec);

  const firedRef = useRef(false);
  useEffect(() => {
    if (done && !firedRef.current) {
      firedRef.current = true;
      beep();
      onDone();
    }
  }, [done, onDone]);

  const totalMs = durationSec * 1000;
  const elapsedFrac = totalMs > 0 ? Math.min(1, (totalMs - remainingMs) / totalMs) : 1;
  const dashOffset = RING_CIRC * elapsedFrac;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Rest
      </p>

      <div className="relative mt-4 flex h-52 w-52 items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-zinc-200"
          />
          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={RING_CIRC}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="text-amber-400"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-6xl font-bold tabular-nums text-zinc-900">
            {remainingSec}
          </p>
          <p className="text-xs text-zinc-500">seconds</p>
        </div>
      </div>

      <p className="mt-8 text-base text-zinc-600">
        Next: <span className="font-medium text-zinc-900">{nextLabel}</span>
      </p>

      <button
        type="button"
        onClick={onSkip}
        className="mt-10 w-full max-w-xs rounded-md border border-zinc-300 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50"
      >
        Skip rest
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
