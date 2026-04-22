-- v1.1: add category + equipment columns to exercises.
-- Additive migration — columns are nullable. Existing rows unaffected until
-- the next seed run backfills them.

alter table exercises
  add column if not exists category text
    check (category in ('strength','pilates','yoga','cardio','mobility')),
  add column if not exists equipment text
    check (equipment in ('none','dumbbell','barbell','kettlebell','mat','machine'));

create index if not exists exercises_category_idx on exercises (category);
create index if not exists exercises_equipment_idx on exercises (equipment);
