"use client";

import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { signup } from "@/app/signup/actions";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const emailValid = EMAIL_REGEX.test(email);
  const showEmailError = emailTouched && !emailValid;
  const mismatch = confirm.length > 0 && confirm !== password;
  const disabled = !emailValid || mismatch || password.length < 8;

  return (
    <form action={signup} className="space-y-4">
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          aria-invalid={showEmailError || undefined}
          aria-describedby={showEmailError ? "email-error" : undefined}
          className={`block w-full rounded-md border px-3 py-2 text-base focus:outline-none ${
            showEmailError
              ? "border-red-400 focus:border-red-500"
              : "border-zinc-300 focus:border-zinc-900"
          }`}
        />
        {showEmailError && (
          <span id="email-error" className="mt-1 block text-xs text-red-700">
            Please enter a valid email address.
          </span>
        )}
      </label>

      <div>
        <PasswordInput
          label="Password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="mt-1 block text-xs text-zinc-500">
          At least 8 characters.
        </span>
      </div>

      <div>
        <PasswordInput
          label="Confirm password"
          name="confirm_password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {mismatch && (
          <span className="mt-1 block text-xs text-red-700">
            Passwords do not match.
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="block w-full rounded-md bg-zinc-900 py-2 text-base font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        Create account
      </button>
    </form>
  );
}
