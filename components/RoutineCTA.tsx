"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MergedStep } from "@/lib/db/types";
import {
  clearDraft,
  useDraft,
  type WorkoutDraft,
} from "@/lib/workout/draft";

type Props = {
  routineSlug: string;
  steps: MergedStep[];
};

function isDraftValidForRoutine(
  draft: WorkoutDraft,
  routineSlug: string,
  steps: MergedStep[],
): boolean {
  if (draft.routineSlug !== routineSlug) return false;
  if (draft.state.currentIndex < 0 || draft.state.currentIndex >= steps.length) {
    return false;
  }
  const totalSets = steps[draft.state.currentIndex].sets ?? 1;
  if (draft.state.currentSet < 1 || draft.state.currentSet > totalSets) {
    return false;
  }
  return true;
}

export function RoutineCTA({ routineSlug, steps }: Props) {
  const router = useRouter();
  const draft = useDraft();
  const startHref = `/routines/${routineSlug}/play`;
  const usable = draft && isDraftValidForRoutine(draft, routineSlug, steps);

  if (!usable) {
    return (
      <Link
        href={startHref}
        className="mt-6 block w-full rounded-md bg-zinc-900 py-3 text-center text-base font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Start workout
      </Link>
    );
  }

  const idx = draft.state.currentIndex;
  const stepName = steps[idx].exercise.name;
  const totalSets = steps[idx].sets ?? 1;

  const handleStartOver = () => {
    clearDraft();
    router.push(startHref);
  };

  return (
    <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-800/60 dark:bg-amber-950/30">
      <p className="text-sm text-amber-900 dark:text-amber-100">
        <span aria-hidden="true">🔖 </span>
        You paused this workout —{" "}
        <span className="font-medium">{stepName}</span> (set{" "}
        {draft.state.currentSet} of {totalSets})
      </p>
      <div className="mt-3 flex gap-2">
        <Link
          href={`${startHref}?resume=1`}
          className="flex-1 rounded-md bg-zinc-900 py-2.5 text-center text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Resume
        </Link>
        <button
          type="button"
          onClick={handleStartOver}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
