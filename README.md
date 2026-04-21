# Exercise

A personal daily exercise web app. Guided workouts, minimal UI, free-tier only.

**Live:** https://exercise-app-mu.vercel.app/

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Supabase — Postgres + Auth + RLS
- Vercel deploy, free tier

## Local setup

Requires Node 20+.

```bash
# 1. Clone
git clone https://github.com/kjduremdes19/exercise-app.git
cd exercise-app

# 2. Install
npm install

# 3. Configure environment
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
# from https://supabase.com/dashboard/project/<your-ref>/settings/api

# 4. Run
npm run dev
# → http://localhost:3000
```

## Commands

| Command         | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `npm run dev`   | Start dev server                                           |
| `npm run build` | Production build                                           |
| `npm run lint`  | ESLint                                                     |
| `npm test`      | Vitest run (workout reducer suite)                         |
| `npm run db:seed` | Idempotent seed into Supabase (needs service-role key)   |

## Database

Schema lives in [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql). Apply it by pasting into the Supabase dashboard SQL editor, or via `supabase db push` if the CLI is set up.

Seed data is TypeScript under [`supabase/seed/`](supabase/seed/). `npm run db:seed` upserts by slug and reconciles `routine_exercises` by deleting positions past the desired length — safe to re-run.

## Notable choices

- Session refresh lives in [`proxy.ts`](proxy.ts) (Next.js 16 renamed `middleware.ts` → `proxy.ts`).
- Workout state is a [pure reducer](lib/workout/machine.ts) with [unit tests](lib/workout/machine.test.ts).
- Timers anchor on `Date.now()` and recompute on `visibilitychange`, so locking the phone mid-workout doesn't drift the countdown.
- Screen wake lock is held while the player is mounted; audio beep is synthesized via Web Audio inside a user gesture.
- `completeSession` Server Action is Zod-validated and rate-limited (≥5 sessions/60s = rejected).
- State is not persisted between workout sessions — refresh mid-workout returns you to the routine detail. Acceptable for v1.

## Project conventions

See [CLAUDE.md](CLAUDE.md) for repo conventions, hard rules (RLS, service-role key, timers), and directory layout.
