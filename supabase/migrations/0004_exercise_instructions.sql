alter table exercises
  add column if not exists instructions text[] not null default '{}';
