-- Per-set tracking. Nullable so existing sessions stay readable.
-- Shape: { steps: [{ position: int, sets: [{ reps: int|null, weight: number|null }] }] }
alter table workout_sessions
  add column if not exists set_logs jsonb;
