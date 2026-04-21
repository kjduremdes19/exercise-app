import Link from "next/link";
import type { Routine } from "@/lib/db/types";

export function TodaysPickCard({ routine }: { routine: Routine }) {
  return (
    <Link
      href={`/routines/${routine.slug}`}
      className="block rounded-xl border border-zinc-900 bg-zinc-900 px-5 py-5 text-white transition hover:bg-zinc-800"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
        Today&apos;s pick
      </p>
      <h2 className="mt-2 text-xl font-semibold">{routine.name}</h2>
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
        <span className="text-sm font-medium underline">Open →</span>
      </div>
    </Link>
  );
}
