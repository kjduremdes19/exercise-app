import Image from "next/image";
import Link from "next/link";
import { PasswordInput } from "@/components/PasswordInput";
import { login } from "./actions";

type SearchParams = Promise<{ error?: string; next?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error, next } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center">
          <Image
            src="/brand/fitwork-logo.png"
            alt="FITWORK"
            width={200}
            height={200}
            priority
            className="h-auto w-64 dark:invert"
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>

        {error && (
          <p
            role="alert"
            className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
          >
            {error}
          </p>
        )}

        <form action={login} className="space-y-4">
          <input type="hidden" name="next" value={next ?? "/"} />

          <label className="block space-y-1 text-sm">
            <span className="font-medium">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-300"
            />
          </label>

          <PasswordInput
            label="Password"
            name="password"
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="block w-full rounded-md bg-zinc-900 py-2 text-base font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          No account?{" "}
          <Link href="/signup" className="font-medium text-zinc-900 underline dark:text-zinc-100">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
