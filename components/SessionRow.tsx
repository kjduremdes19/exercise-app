import type { WorkoutSession } from "@/lib/db/types";

export function SessionRow({ session }: { session: WorkoutSession }) {
  const completed = new Date(session.completed_at);
  const elapsedMs = completed.getTime() - new Date(session.started_at).getTime();
  const elapsedMin = Math.max(1, Math.round(elapsedMs / 60000));

  // Render in the viewer's local TZ. Intl output differs between server
  // (UTC) and client (browser TZ); suppressHydrationWarning is scoped to
  // this text node so the viewer sees their time without a flicker.
  const localDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(completed);

  return (
    <li className="flex items-baseline justify-between gap-3 border-b border-zinc-200 px-4 py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="truncate font-medium text-zinc-900">
          {session.routine_name}
        </p>
        <p className="mt-0.5 text-xs text-zinc-500" suppressHydrationWarning>
          {localDate}
        </p>
      </div>
      <p className="shrink-0 text-sm text-zinc-600">{elapsedMin} min</p>
    </li>
  );
}
