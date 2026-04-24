"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!email || !password) {
    redirect(`/signup?error=${encodeURIComponent("Email and password are required.")}`);
  }
  if (password.length < 8) {
    redirect(`/signup?error=${encodeURIComponent("Password must be at least 8 characters.")}`);
  }
  // confirm_password is only sent by the client form; if present, it must match.
  // Defense in depth against a client that skips the match check.
  if (confirmPassword && confirmPassword !== password) {
    redirect(`/signup?error=${encodeURIComponent("Passwords do not match.")}`);
  }

  const requestHeaders = await headers();
  const origin =
    requestHeaders.get("origin") ??
    `https://${requestHeaders.get("host") ?? "localhost:3000"}`;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/confirm?next=/` },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // If email confirmation is enabled in Supabase, session will be null until the
  // user clicks the confirmation link. Otherwise they're already signed in.
  if (data.session) {
    redirect("/");
  }

  redirect(
    `/login?error=${encodeURIComponent("Check your email to confirm your account, then log in.")}`,
  );
}
