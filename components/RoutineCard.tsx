import Link from "next/link";
import type { Routine, RoutineStatus } from "@/lib/db/types";
import { PausedBadge } from "./PausedBadge";

type Props = {
  routine: Routine;
  status?: RoutineStatus;
};

export function RoutineCard({ routine, status = "never" }: Props) {
  const baseClasses =
    "block rounded-2xl border px-5 py-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md";
  const stateClasses =
    status === "today"
      ? "border-zinc-200 bg-zinc-100 opacity-70 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
      : status === "past"
        ? "border-amber-300 bg-white hover:border-amber-500 dark:border-amber-700/60 dark:bg-zinc-900 dark:hover:border-amber-500"
        : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600";

  return (
    <Link
      href={`/routines/${routine.slug}`}
      className={`${baseClasses} ${stateClasses}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3
          className={`text-base font-semibold ${
            status === "today"
              ? "text-zinc-500 dark:text-zinc-500"
              : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {routine.name}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <PausedBadge slug={routine.slug} />
          {status === "today" && (
            <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Completed today
            </span>
          )}
          {status === "past" && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              ✓ Done
            </span>
          )}
          {routine.estimated_duration_min !== null && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              ~{routine.estimated_duration_min} min
            </span>
          )}
        </div>
      </div>
      {routine.description && (
        <p
          className={`mt-1 text-sm ${
            status === "today"
              ? "text-zinc-400 dark:text-zinc-500"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {routine.description}
        </p>
      )}
    </Link>
  );
}
