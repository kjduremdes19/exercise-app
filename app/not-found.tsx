import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        404
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 text-zinc-600">
        The page you were looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
