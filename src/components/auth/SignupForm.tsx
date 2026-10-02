"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    // Call your centralized logic from lib/auth.ts
    const result = signUp(email, password);

    if (result.success) {
      // Logic inside signUp already handles localStorage session creation
      router.push("/dashboard");
    } else {
      // This will catch "User already exists" from your lib/auth.ts
      setError(result.error || "An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <label htmlFor="signup-email" className="text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="auth-signup-email"
          placeholder="Enter your email"
          required
          className="p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-black outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="signup-password" className="text-sm font-semibold text-gray-700">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="auth-signup-password"
          placeholder="Create a password"
          required
          className="p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-black outline-none transition-all"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium animate-in fade-in duration-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        data-testid="auth-signup-submit" // REQUIRED ID
        className="mt-2 bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-md"
      >
        Sign Up
      </button>
    </form>
  );
}