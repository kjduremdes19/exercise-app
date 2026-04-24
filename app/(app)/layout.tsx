import Image from "next/image";
import Link from "next/link";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" aria-label="FITWORK — home">
            <Image
              src="/brand/fitwork-logo.png"
              width={400}
              height={120}
              alt="FITWORK"
              className="h-7 w-auto dark:invert"
            />
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/history"
              className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              History
            </Link>
            <span className="hidden text-zinc-500 sm:inline dark:text-zinc-400">{user?.email}</span>
            <DarkModeToggle />
            <form action="/logout" method="post">
              <button
                type="submit"
                className="rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
