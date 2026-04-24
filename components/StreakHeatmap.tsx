import type { WorkoutSession } from "@/lib/db/types";

const WEEKS = 12;
const DAYS_PER_WEEK = 7;
const TOTAL_DAYS = WEEKS * DAYS_PER_WEEK;

type Cell = {
  date: string;
  trained: boolean;
  isToday: boolean;
};

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + n);
  return next;
}

function computeStreak(daySet: Set<string>, today: Date): number {
  let streak = 0;
  let cursor = today;
  // If today has no session yet, start counting from yesterday — keeps an
  // evening user's streak intact until the UTC day actually flips.
  if (!daySet.has(dayKey(cursor))) {
    cursor = addDays(cursor, -1);
  }
  while (daySet.has(dayKey(cursor))) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function buildCells(daySet: Set<string>, today: Date): Cell[] {
  const todayKey = dayKey(today);
  const cells: Cell[] = [];
  // Index 0 = oldest, index TOTAL_DAYS-1 = today.
  for (let i = TOTAL_DAYS - 1; i >= 0; i--) {
    const d = addDays(today, -i);
    const key = dayKey(d);
    cells.push({
      date: key,
      trained: daySet.has(key),
      isToday: key === todayKey,
    });
  }
  return cells;
}

export function StreakHeatmap({ sessions }: { sessions: WorkoutSession[] }) {
  const daySet = new Set(sessions.map((s) => s.completed_at.slice(0, 10)));
  const today = new Date();
  const streak = computeStreak(daySet, today);
  const cells = buildCells(daySet, today);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Streak
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-zinc-900">
            {streak}{" "}
            <span className="text-base font-normal text-zinc-500">
              {streak === 1 ? "day" : "days"}
            </span>
          </p>
        </div>
        <div
          className="flex gap-1"
          role="img"
          aria-label={`Workout activity over the last ${WEEKS} weeks`}
        >
          {Array.from({ length: WEEKS }).map((_, col) => (
            <div key={col} className="flex flex-col gap-1">
              {Array.from({ length: DAYS_PER_WEEK }).map((_, row) => {
                const cell = cells[col * DAYS_PER_WEEK + row];
                const fill = cell.trained ? "bg-amber-400" : "bg-zinc-100";
                const ring = cell.isToday
                  ? "ring-2 ring-zinc-900 ring-offset-1"
                  : "";
                return (
                  <div
                    key={row}
                    title={cell.date}
                    className={`h-3 w-3 rounded-sm ${fill} ${ring}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
