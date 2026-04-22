import type { MuscleGroup } from "@/lib/db/types";

const ALL_GROUPS: MuscleGroup[] = [
  "push",
  "pull",
  "legs",
  "full-body",
  "core",
  "cardio",
];

const WEEKLY_TARGET = 2;

type Props = {
  countsByGroup: Map<MuscleGroup, number>;
};

export function WeeklyMuscleGroupStrip({ countsByGroup }: Props) {
  return (
    <section aria-label="Weekly muscle group progress">
      <h2 className="text-sm font-medium text-zinc-500">This week</h2>
      <ul className="mt-2 flex flex-wrap gap-2">
        {ALL_GROUPS.map((g) => {
          const raw = countsByGroup.get(g) ?? 0;
          const display = Math.min(raw, WEEKLY_TARGET);
          const state =
            display === 0 ? "empty" : display >= WEEKLY_TARGET ? "full" : "partial";

          const classes =
            state === "full"
              ? "border-emerald-300 bg-emerald-100 text-emerald-800"
              : state === "partial"
                ? "border-amber-300 text-amber-900"
                : "border-zinc-200 bg-white text-zinc-500";

          // Partial = half-filled amber from the left, white on the right.
          const partialStyle =
            state === "partial"
              ? {
                  background:
                    "linear-gradient(to right, #fde68a 50%, #ffffff 50%)",
                }
              : undefined;

          return (
            <li key={g}>
              <span
                aria-label={`${g}: ${display} of ${WEEKLY_TARGET} sessions this week`}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${classes}`}
                style={partialStyle}
              >
                <span className="capitalize">{g}</span>
                {state === "full" && <span aria-hidden="true">✓</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
