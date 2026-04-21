"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  completeSession,
  type CompleteSessionInput,
} from "@/app/(app)/routines/[slug]/play/actions";

type Props = {
  payload: CompleteSessionInput;
  routineName: string;
};

type SaveState =
  | { kind: "saving" }
  | { kind: "saved" }
  | { kind: "error"; message: string };

export function DoneScreen({ payload, routineName }: Props) {
  const [state, setState] = useState<SaveState>({ kind: "saving" });
  const submittedRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    completeSession(payload)
      .then((res) => {
        if (res.ok) setState({ kind: "saved" });
        else setState({ kind: "error", message: res.error });
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setState({ kind: "error", message: msg });
      });
  }, [payload]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
      <p className="text-5xl">🎉</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">
        Workout complete
      </h2>
      <p className="mt-2 text-zinc-600">{routineName}</p>

      <div className="mt-6 text-sm">
        {state.kind === "saving" && (
          <p className="text-zinc-500">Saving session…</p>
        )}
        {state.kind === "saved" && (
          <p className="text-emerald-700">Saved.</p>
        )}
        {state.kind === "error" && (
          <p className="text-red-700">Save failed: {state.message}</p>
        )}
      </div>

      <Link
        href="/"
        className="mt-10 w-full max-w-xs rounded-md bg-zinc-900 py-3 text-center text-base font-medium text-white hover:bg-zinc-800"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
