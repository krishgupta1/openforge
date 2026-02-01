"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    handleRedirectCallback({}).then(() => {
      router.push("/");
    });
  }, [handleRedirectCallback, router]);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white/60">Completing sign in...</p>
      </div>
    </div>
  );
}
