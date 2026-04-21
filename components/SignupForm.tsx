"use client";

import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { signup } from "@/app/signup/actions";

export function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = confirm.length > 0 && confirm !== password;

  return (
    <form action={signup} className="space-y-4">
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-base focus:border-zinc-900 focus:outline-none"
        />
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
        disabled={mismatch || password.length < 8}
        className="block w-full rounded-md bg-zinc-900 py-2 text-base font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        Create account
      </button>
    </form>
  );
}
