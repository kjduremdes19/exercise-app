-- Phase: video animations infrastructure.
-- Adds a nullable video_url to exercises plus a public storage bucket
-- that the catalog reads from. SVG > video > dumbbell-icon precedence
-- is enforced in components/ExerciseAnimation.tsx, not in the schema.

-- 1. Additive nullable column on exercises.
alter table exercises add column if not exists video_url text;

-- 2. Public storage bucket for video files.
insert into storage.buckets (id, name, public)
values ('exercise-videos', 'exercise-videos', true)
on conflict (id) do nothing;

-- 3. Public-read RLS on the bucket's objects. No insert/update/delete
--    policy for app users; uploads happen via the Supabase dashboard
--    with the service-role bypass.
drop policy if exists "exercise-videos public read" on storage.objects;
create policy "exercise-videos public read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'exercise-videos');
