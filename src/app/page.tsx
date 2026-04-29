"use client";
import { useEffect } from "react";
import SplashScreen from "@/components/shared/SplashScreen";
import { getSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    let timeoutId;

    timeoutId = setTimeout(() => {
      const session = getSession();
      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }, 1200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center z-999 text-black">
      <SplashScreen />
    </div>
  );
}
