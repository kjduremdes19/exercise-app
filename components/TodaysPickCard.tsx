import Link from "next/link";
import type { Routine, RoutineStatus } from "@/lib/db/types";
import { PausedBadge } from "./PausedBadge";

type Props = {
  routine: Routine;
  status?: RoutineStatus;
};

export function TodaysPickCard({ routine, status = "never" }: Props) {
  const baseClasses =
    "block rounded-2xl border px-6 py-6 text-white shadow-lg shadow-zinc-900/25 transition duration-200 hover:scale-[1.01] hover:shadow-xl";
  const stateClasses =
    status === "today"
      ? "border-zinc-700 bg-gradient-to-tr from-zinc-800 via-zinc-700 to-amber-900/40"
      : "border-zinc-900 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-amber-700/30";

  return (
    <Link href={`/routines/${routine.slug}`} className={`${baseClasses} ${stateClasses}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
        Today&apos;s pick
        {routine.muscle_group && (
          <span className="text-zinc-300"> · {routine.muscle_group}</span>
        )}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <h2 className="text-xl font-semibold">{routine.name}</h2>
        <PausedBadge slug={routine.slug} />
        {status === "today" && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-800">
            ✓ Completed today
          </span>
        )}
        {status === "past" && (
          <span
            aria-label="Previously completed"
            className="inline-block h-2 w-2 rounded-full bg-amber-400"
          />
        )}
      </div>
      {routine.description && (
        <p className="mt-1 text-sm text-zinc-300">{routine.description}</p>
      )}
      <div className="mt-4 flex items-center justify-between">
        {routine.estimated_duration_min !== null ? (
          <span className="text-sm text-zinc-400">
            ~{routine.estimated_duration_min} min
          </span>
        ) : (
          <span />
        )}
        <span className="text-sm font-medium underline">
          {status === "today" ? "Do again →" : "Open →"}
        </span>
      </div>
    </Link>
  );
}
