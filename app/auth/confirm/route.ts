import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

// token_hash flow: the link in confirmation/recovery emails carries a
// server-side OTP plus the action type. Unlike PKCE codes, this works
// across devices — sign up on desktop, confirm from a phone email app.
//
// Email template format (set in Supabase dashboard):
//   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/

const ALLOWED_TYPES: EmailOtpType[] = [
  "email",
  "signup",
  "recovery",
  "invite",
  "magiclink",
  "email_change",
];

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const nextParam = url.searchParams.get("next") ?? "/";
  const next = nextParam.startsWith("/") ? nextParam : "/";

  if (!token_hash || !type || !ALLOWED_TYPES.includes(type)) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent("Invalid confirmation link.")}`,
        url.origin,
      ),
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ token_hash, type });

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin),
    );
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
