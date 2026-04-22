-- Add a muscle_group tag to routines so Today's Pick can enforce
-- weekly balance (no more than 2 of the same group per 7 days, and
-- prefer groups not yet touched this week).

alter table routines
  add column if not exists muscle_group text
    check (muscle_group in ('push','pull','legs','full-body','core','cardio'));

create index if not exists routines_muscle_group_idx on routines (muscle_group);
