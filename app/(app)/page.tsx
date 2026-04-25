import { redirect } from "next/navigation";
import { RoutineCard } from "@/components/RoutineCard";
import { StreakHeatmap } from "@/components/StreakHeatmap";
import { TodaysPickCard } from "@/components/TodaysPickCard";
import { WeeklyMuscleGroupStrip } from "@/components/WeeklyMuscleGroupStrip";
import {
  getRoutines,
  getSessionsForUser,
  getTodaysPick,
} from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import type { MuscleGroup, RoutineStatus } from "@/lib/db/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [routines, pick, sessions] = await Promise.all([
    getRoutines(),
    getTodaysPick(user.id),
    getSessionsForUser(user.id),
  ]);

  // UTC date comparison — matches the same assumption getTodaysPick uses.
  // 'today' wins over 'past' once any today-session is recorded.
  const now = new Date();
  const todayYmd = now.toISOString().slice(0, 10);
  const statusByRoutineId = new Map<string, Exclude<RoutineStatus, "never">>();
  for (const s of sessions) {
    if (!s.routine_id) continue;
    const sessionYmd = s.completed_at.slice(0, 10);
    if (sessionYmd === todayYmd) {
      statusByRoutineId.set(s.routine_id, "today");
    } else if (!statusByRoutineId.has(s.routine_id)) {
      statusByRoutineId.set(s.routine_id, "past");
    }
  }
  const statusFor = (routineId: string): RoutineStatus =>
    statusByRoutineId.get(routineId) ?? "never";

  // Weekly muscle-group counts — same 7-day window as getTodaysPick.
  const groupByRoutineId = new Map<string, MuscleGroup>();
  for (const r of routines) {
    if (r.muscle_group)
      groupByRoutineId.set(r.id, r.muscle_group as MuscleGroup);
  }
  const weeklyWindowStart = now.getTime() - 6 * 24 * 60 * 60 * 1000;
  const countsByGroup = new Map<MuscleGroup, number>();
  for (const s of sessions) {
    if (!s.routine_id) continue;
    if (new Date(s.completed_at).getTime() < weeklyWindowStart) continue;
    const g = groupByRoutineId.get(s.routine_id);
    if (!g) continue;
    countsByGroup.set(g, (countsByGroup.get(g) ?? 0) + 1);
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Today</h1>

      <div className="mt-6">
        <StreakHeatmap sessions={sessions} />
      </div>

      <div className="mt-6">
        <WeeklyMuscleGroupStrip countsByGroup={countsByGroup} />
      </div>

      {pick && (
        <div className="mt-6">
          <TodaysPickCard routine={pick} status={statusFor(pick.id)} />
        </div>
      )}

      <h2 className="mt-10 text-lg font-semibold tracking-tight">All routines</h2>
      {routines.length === 0 ? (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          No routines yet. Run <code className="font-mono">npm run db:seed</code>{" "}
          to populate.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {routines.map((r) => (
            <li key={r.id}>
              <RoutineCard routine={r} status={statusFor(r.id)} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
