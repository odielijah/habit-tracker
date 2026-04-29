import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to track your habits</p>
        
        <LoginForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-black font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}