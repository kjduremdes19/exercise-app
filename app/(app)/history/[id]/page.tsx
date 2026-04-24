import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSessionById } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import type { SessionSnapshotStep, StepLog } from "@/lib/db/types";

export const dynamic = "force-dynamic";

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const session = await getSessionById(user.id, id);
  if (!session) notFound();

  const completed = new Date(session.completed_at);
  const elapsedMs =
    completed.getTime() - new Date(session.started_at).getTime();
  const elapsedMin = Math.max(1, Math.round(elapsedMs / 60000));
  const localDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(completed);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-12">
      <Link
        href="/history"
        className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← History
      </Link>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        {session.routine_name}
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400" suppressHydrationWarning>
        {localDate} · {elapsedMin} min
      </p>

      <ol className="mt-6 divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
        {session.routine_snapshot.steps.map((s) => {
          const stepLog = session.set_logs?.steps.find(
            (l) => l.position === s.position,
          );
          return (
            <li key={s.position} className="px-5 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {s.position + 1}. {s.exercise_name}
                </p>
                {s.rest_sec > 0 && (
                  <p className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                    rest {s.rest_sec}s
                  </p>
                )}
              </div>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                {formatStepParams(s)}
              </p>
              {stepLog && stepLog.sets.length > 0 && (
                <ul className="mt-2 space-y-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                  {stepLog.sets.map((setLog, i) => (
                    <li key={i} className="tabular-nums">
                      Set {i + 1}: {formatSetLog(setLog)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      {session.routine_slug && (
        <Link
          href={`/routines/${session.routine_slug}`}
          className="mt-6 inline-block rounded-md bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Do this again →
        </Link>
      )}
    </main>
  );
}

function formatSetLog(setLog: StepLog["sets"][number]): string {
  const parts: string[] = [];
  if (setLog.reps !== null) parts.push(`${setLog.reps} reps`);
  if (setLog.weight !== null) parts.push(`${setLog.weight} lbs`);
  return parts.length > 0 ? parts.join(" · ") : "—";
}

function formatStepParams(s: SessionSnapshotStep): string {
  if (s.kind === "strength") {
    if (s.sets && s.reps) return `${s.sets} × ${s.reps} reps`;
    if (s.sets) return `${s.sets} sets`;
    return "strength";
  }
  if (s.duration_sec) {
    const min = Math.floor(s.duration_sec / 60);
    const sec = s.duration_sec % 60;
    if (min > 0 && sec > 0) return `${min}m ${sec}s`;
    if (min > 0) return `${min} min`;
    return `${sec}s`;
  }
  return "timed";
}
