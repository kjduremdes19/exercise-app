-- Phase 2 schema: catalog (public-read) + user-owned workout sessions.
-- Run in Supabase dashboard > SQL editor (or `supabase db push` if CLI is set up).

-- =========================================================================
-- Catalog tables (seed-managed; public-read for authenticated users)
-- =========================================================================

create table if not exists exercises (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  kind text not null check (kind in ('strength', 'timed')),
  default_sets int,
  default_reps int,
  default_duration_sec int,
  default_rest_sec int default 0,
  created_at timestamptz not null default now()
);

create table if not exists routines (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  estimated_duration_min int,
  created_at timestamptz not null default now()
);

create table if not exists routine_exercises (
  routine_id uuid not null references routines(id) on delete cascade,
  position int not null,
  exercise_id uuid not null references exercises(id),
  sets int,             -- null => use exercise default
  reps int,             -- null => use exercise default
  duration_sec int,     -- null => use exercise default
  rest_sec int,         -- null => use exercise default
  primary key (routine_id, position)
);
create index if not exists routine_exercises_exercise_id_idx
  on routine_exercises (exercise_id);

-- =========================================================================
-- User data
-- =========================================================================

create table if not exists workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  routine_id uuid references routines(id) on delete set null,
  routine_name text not null,
  routine_snapshot jsonb not null,
  started_at timestamptz not null,
  completed_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists workout_sessions_user_completed_idx
  on workout_sessions (user_id, completed_at desc);

-- =========================================================================
-- Row Level Security
-- =========================================================================

alter table exercises          enable row level security;
alter table routines           enable row level security;
alter table routine_exercises  enable row level security;
alter table workout_sessions   enable row level security;

-- Catalog: any authenticated user may read.
drop policy if exists "catalog public read" on exercises;
create policy "catalog public read" on exercises
  for select to authenticated using (true);

drop policy if exists "catalog public read" on routines;
create policy "catalog public read" on routines
  for select to authenticated using (true);

drop policy if exists "catalog public read" on routine_exercises;
create policy "catalog public read" on routine_exercises
  for select to authenticated using (true);

-- Workout sessions: each user may only see/modify their own rows.
drop policy if exists "own sessions read" on workout_sessions;
create policy "own sessions read" on workout_sessions
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "own sessions insert" on workout_sessions;
create policy "own sessions insert" on workout_sessions
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "own sessions update" on workout_sessions;
create policy "own sessions update" on workout_sessions
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own sessions delete" on workout_sessions;
create policy "own sessions delete" on workout_sessions
  for delete to authenticated using (auth.uid() = user_id);
