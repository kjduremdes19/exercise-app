import Link from "next/link";
import type { Routine } from "@/lib/db/types";

export function RoutineCard({ routine }: { routine: Routine }) {
  return (
    <Link
      href={`/routines/${routine.slug}`}
      className="block rounded-lg border border-zinc-200 bg-white px-4 py-4 transition hover:border-zinc-400 hover:shadow-sm"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold text-zinc-900">
          {routine.name}
        </h3>
        {routine.estimated_duration_min !== null && (
          <span className="shrink-0 text-xs text-zinc-500">
            ~{routine.estimated_duration_min} min
          </span>
        )}
      </div>
      {routine.description && (
        <p className="mt-1 text-sm text-zinc-600">{routine.description}</p>
      )}
    </Link>
  );
}
