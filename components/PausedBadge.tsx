"use client";

import { useDraft } from "@/lib/workout/draft";

type Props = {
  slug: string;
  /** Visual variant. `pill` for a labeled chip, `dot` for a tiny indicator. */
  variant?: "pill" | "dot";
};

export function PausedBadge({ slug, variant = "pill" }: Props) {
  const draft = useDraft();
  if (!draft || draft.routineSlug !== slug) return null;

  if (variant === "dot") {
    return (
      <span
        aria-label="Workout in progress"
        className="inline-block h-2 w-2 rounded-full bg-amber-500"
      />
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
      <span aria-hidden="true">⏸</span> Paused
    </span>
  );
}
