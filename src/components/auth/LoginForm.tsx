"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logIn } from "@/lib/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    // Use the logic from your lib/auth.ts
    const result = logIn(email, password);

    if (result.success) {
      // Your logIn function already handles saveSession
      router.push("/dashboard");
    } else {
      // Your logIn function returns "Invalid email or password"
      setError(result.error || "An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="login-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="auth-login-email"
          required
          className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="login-password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="auth-login-password"
          required
          className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium" aria-live="polite">
          {error}
        </p>
      )}

      <button
        type="submit"
        data-testid="auth-login-submit"
        className="bg-black text-white p-2 rounded font-bold hover:bg-gray-800 transition-colors"
      >
        Log In
      </button>
    </form>
  );
}
