"use client";

import { useEffect, useRef } from "react";
import { useCountdown } from "@/lib/workout/time";
import { beep } from "@/lib/workout/sound";

type Props = {
  durationSec: number;
  nextLabel: string;
  onDone: () => void;
  onSkip: () => void;
};

export function RestTimer({
  durationSec,
  nextLabel,
  onDone,
  onSkip,
}: Props) {
  const { remainingSec, done } = useCountdown(durationSec);

  const firedRef = useRef(false);
  useEffect(() => {
    if (done && !firedRef.current) {
      firedRef.current = true;
      beep();
      onDone();
    }
  }, [done, onDone]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Rest
      </p>
      <p className="mt-4 text-7xl font-bold tabular-nums text-zinc-900">
        {remainingSec}
      </p>
      <p className="text-sm text-zinc-500">seconds</p>

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
    </div>
  );
}
