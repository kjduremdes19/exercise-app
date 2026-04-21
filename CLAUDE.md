---
name: exercise-app-guidelines
description: You are a top 0.01% expert in full-stack Next.js + Supabase web development. Project guidelines and conventions for the Exercise App.
type: project
---

# Exercise App

Personal daily exercise web app that guides users through pre-built workout routines and logs completed sessions. Multi-user, free-tier only.

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Supabase (Postgres + Auth + RLS)
- Deployed on Vercel free tier

## Architecture
Responsive web app. Auth via Supabase email+password. Server Components for reads, Server Actions or `/api/sessions` for writes. Workout player is the only heavy client component.

### Key Directories
- `app/` — App Router pages. `(app)/` route group for authenticated pages.
- `components/` — React components. `components/workout/` is the player.
- `lib/supabase/` — browser + server Supabase clients (cookie-aware).
- `lib/db/` — typed queries, merge helpers, generated DB types.
- `lib/workout/` — pure state machine, countdown hook, wake-lock hook.
- `supabase/migrations/` — SQL migrations.
- `supabase/seed/` — TS seed data (exercises, routines).
- `scripts/seed.ts` — idempotent seed runner (service-role key).

## Code Style
### Naming
- Files: `kebab-case.tsx` for components, `camelCase.ts` for utilities, `PascalCase` for React component exports.
- DB: `snake_case` tables and columns. Every catalog row has a stable `slug`.
### Patterns
- Server Components by default. `'use client'` only where interactivity demands it.
- Cookie-aware Supabase server client via `@supabase/ssr`. Session refresh lives in `middleware.ts`.
- Validate all inbound payloads with Zod.
- Timers compute remaining time from `Date.now()` anchors, never tick-counting.

## Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:seed` | Idempotent seed into Supabase (needs service-role key) |
| `supabase db push` | Apply migrations to linked project |

## Git Workflow
- Main branch: `main`. Feature branches: `phase-N-<slug>` aligned to plan phases.
- Commit messages: imperative mood, one concern per commit.

## Guardrails
### Hard Rules
- NEVER import `SUPABASE_SERVICE_ROLE_KEY` from anything under `app/` or `components/`. Service-role client is only allowed in `scripts/seed.ts`.
- NEVER use `truncate + insert` for seeds. Upsert by slug; reconcile by deleting rows not in the source-of-truth set.
- NEVER FK to user-owned tables without `on delete cascade` on `user_id`.
- RLS: every table must have `enable row level security` AND explicit policies. Insert/update policies need both `using` and `with check`.
- Timers: never `setInterval`-count; always compute from a wall-clock anchor and handle `visibilitychange`.
- Wake Lock: acquire inside the Start-workout user gesture, release on unmount.
### Security
- `.env.local` must never be committed. Only `.env.local.example` is tracked.
- Supabase Auth redirect URLs must be whitelisted per environment (localhost, Vercel preview, production).
### Dependencies
- Free tier only. No paid services. Prefer stdlib / Next.js / Supabase built-ins over new packages.
