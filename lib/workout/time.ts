"use client";

import { useEffect, useState } from "react";

/**
 * Countdown hook that computes remaining time from a wall-clock anchor,
 * not from setInterval ticks. Mobile browsers throttle / suspend timers
 * for inactive tabs, so an interval-based countdown drifts. Anchoring on
 * Date.now() means the elapsed time is always correct after a sleep,
 * and visibilitychange just triggers a recompute.
 *
 * Caller resets by remounting (e.g., via a `key` prop) — the hook has no
 * reset path of its own.
 */
export function useCountdown(durationSec: number) {
  // Lazy init is the React-approved way to read wall-clock time at mount
  // (useState initializer runs exactly once; impure calls here are fine).
  const [start] = useState<number>(() => Date.now());
  const [remainingMs, setRemainingMs] = useState<number>(durationSec * 1000);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const computeRemaining = () => {
      const elapsed = Date.now() - start;
      return Math.max(0, durationSec * 1000 - elapsed);
    };

    const tick = () => {
      if (cancelled) return;
      const remaining = computeRemaining();
      setRemainingMs(remaining);
      if (remaining > 0) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onVisibility = () => {
      setRemainingMs(computeRemaining());
    };

    raf = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [durationSec, start]);

  return {
    remainingSec: Math.ceil(remainingMs / 1000),
    done: remainingMs <= 0,
  };
}
