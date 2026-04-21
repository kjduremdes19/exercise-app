"use client";

import { useEffect, useRef } from "react";

type WakeLockSentinel = {
  released: boolean;
  release: () => Promise<void>;
  addEventListener: (type: "release", cb: () => void) => void;
  removeEventListener: (type: "release", cb: () => void) => void;
};

type WakeLockApi = {
  request: (type: "screen") => Promise<WakeLockSentinel>;
};

function getWakeLock(): WakeLockApi | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as unknown as { wakeLock?: WakeLockApi }).wakeLock;
}

/**
 * Holds the screen wake lock for the lifetime of the calling component.
 * Re-acquires after visibilitychange, since the browser releases the
 * lock automatically when the tab is hidden.
 *
 * Silently does nothing if the API is unavailable (older browsers,
 * non-HTTPS context). Localhost counts as a secure context.
 */
export function useWakeLock() {
  const sentinelRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const wakeLock = getWakeLock();
    if (!wakeLock) return;

    let cancelled = false;

    const acquire = async () => {
      try {
        const sentinel = await wakeLock.request("screen");
        if (cancelled) {
          await sentinel.release();
          return;
        }
        sentinelRef.current = sentinel;
      } catch {
        // User denied, document not visible, etc. Best-effort only.
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !sentinelRef.current?.released) {
        acquire();
      }
    };

    acquire();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      sentinelRef.current?.release().catch(() => {});
      sentinelRef.current = null;
    };
  }, []);
}
