import Link from "next/link";
import type { Routine, RoutineStatus } from "@/lib/db/types";

type Props = {
  routine: Routine;
  status?: RoutineStatus;
};

export function TodaysPickCard({ routine, status = "never" }: Props) {
  const baseClasses =
    "block rounded-xl border px-5 py-5 text-white transition";
  const stateClasses =
    status === "today"
      ? "border-zinc-700 bg-zinc-700 hover:bg-zinc-600"
      : "border-zinc-900 bg-zinc-900 hover:bg-zinc-800";

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
