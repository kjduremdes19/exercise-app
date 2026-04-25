# Parked updates

Things deferred during v1 — not blockers, not forgotten. Organized by size, then usefulness.

## Large (> 1 day)

### AI coaching
LLM-generated routine suggestions based on history. Needs prompt engineering, cost-capped API calls, and probably a `coaching_suggestions` table to cache.

### User-authored routines + admin UI
Currently routines are seed-file-only. Would need: `is_system` vs `is_user` flag on routines, RLS policies for user-owned routines, a routine editor UI, and a way to clone system routines as a starting point.

### Exercise video animations
Short looping demonstration per exercise, shown on the routine detail and inside the player. Shape of the work:
- Add `video_url` (nullable text) column to `exercises`. Migration is additive, no breaking change.
- Source material: either record short loops yourself, commission a set, or license from a library (Gym Visual, Muscle & Motion, etc.) — licensing is the main question.
- Hosting: Supabase Storage (within free tier for light use) or Cloudflare R2 / Vercel Blob as traffic grows. Store as looping MP4/WebM, keep each clip under ~500 KB.
- Player: a `<video>` tag with `autoplay muted loop playsinline` inside StrengthStep + TimedStep. Defer to image fallback (or skip silently) when `video_url` is null.
- Update seed to include URLs where available; leave null otherwise.
Big rock here is content, not code.

### Native mobile app
Only if PWA installation stops being enough. Expo + React Native, shared state machine + queries with the web.

### Global ranking / leaderboard
Rank users by session count (or weekly sessions, or streak length). Decisions to make up-front:
- **Privacy model:** opt-in only, or public by default with a display name? Defaults matter for trust.
- **Handle:** add a `profiles` table with `user_id` (PK, FK to auth.users), `display_name`, `is_public_ranking` bool. RLS: user can update their own row; rows with `is_public_ranking = true` are readable by any authenticated user.
- **Aggregate:** a SQL view or cached table `user_session_counts (user_id, total_sessions, last_7_days, current_streak)`. Refresh on session insert via a Postgres trigger, or compute on demand if volume is low.
- **UI:** `/leaderboard` page showing top 50 by total_sessions with current user highlighted; "You're #N of M" summary on the dashboard.
- **Scale concern:** free-tier Supabase has row-count and egress limits; cached aggregate keeps the leaderboard query O(k) instead of O(sessions).
Moves the app out of "personal tracker" territory into a lightly social one — worth confirming you actually want that before starting.

## Won't do (kept out of scope intentionally)

- Multi-gym / multi-tenant. This app is a single-user tool.
- Payment / subscription.
- Offline workout sync. PWA caching is enough for read; writes can wait until back online via Supabase's built-in retry.
- **Rotate Supabase service-role key.** Hygienic to do periodically (Supabase dashboard → Settings → API → JWT Settings → generate new secret; update `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` + Vercel). Forces re-login for all users; low value on a personal app. Revisit if there's reason to suspect the key leaked.
- **Content pipeline (Google Sheet for exercise drafts).** Useful only when drafting exercises in a sheet, which isn't the current workflow — exercises are added directly to `supabase/seed/exercises.ts`. Revisit if you find yourself maintaining a separate draft list more than once a month.
