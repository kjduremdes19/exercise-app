import Link from "next/link";
import { redirect } from "next/navigation";
import { SessionRow } from "@/components/SessionRow";
import { getSessionsForUser } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const sessions = await getSessionsForUser(user.id);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold tracking-tight">History</h1>

      {sessions.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-zinc-300 px-4 py-10 text-center">
          <p className="text-zinc-600">No completed workouts yet.</p>
          <Link
            href="/"
            className="mt-3 inline-block text-sm font-medium text-zinc-900 underline"
          >
            Back to dashboard
          </Link>
        </div>
      ) : (
        <ul className="mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-white">
          {sessions.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </ul>
      )}
    </main>
  );
}
