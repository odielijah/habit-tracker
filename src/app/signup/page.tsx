import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-center">Get Started</h1>
        <p className="text-gray-500 text-center mb-8">
          Sign up to track your habits
        </p>

        <SignupForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          Have an account?{" "}
          <Link href="/login" className="text-black font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}
