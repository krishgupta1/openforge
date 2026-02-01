"use client";

import React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  // --- HANDLER: Social Sign Up ---
  const handleSocialSignUp = (strategy: "oauth_google" | "oauth_github") => {
    if (!isLoaded) return;
    
    // Authenticate with redirect. 
    // If the user doesn't exist, Clerk creates the account.
    // If they do exist, Clerk (depending on settings) may merge or sign them in.
    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4 selection:bg-white/20">
      <div className="w-full max-w-[380px] flex flex-col animate-fade-in">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Create an account</h1>
          <p className="text-white/40 text-sm">Choose a provider to get started</p>
        </div>

        {/* --- SOCIAL BUTTONS (Vertical Stack for emphasis, since no form) --- */}
        <div className="space-y-3 mb-6">
          {/* Google */}
          <button
            onClick={() => handleSocialSignUp("oauth_google")}
            className="w-full h-11 bg-white text-black hover:bg-neutral-200 font-medium rounded-lg transition-all flex items-center justify-center gap-3 text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>

          {/* GitHub */}
          <button
            onClick={() => handleSocialSignUp("oauth_github")}
            className="w-full h-11 bg-[#24292F] text-white border border-white/10 hover:bg-[#24292F]/80 font-medium rounded-lg transition-all flex items-center justify-center gap-3 text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Sign up with GitHub
          </button>
        </div>

        {/* --- TERMS NOTICE --- */}
        <p className="text-center text-xs text-white/20 mb-8 px-8">
          By clicking continue, you agree to our{" "}
          <Link 
            href="/terms" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/40"
          >
            Terms of Service
          </Link>
          {" "}and{" "}
          <Link 
            href="/privacy" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/40"
          >
            Privacy Policy
          </Link>.
        </p>

        {/* --- FOOTER --- */}
        <div className="text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link 
            href="/auth/sign-in" 
            className="text-white hover:underline underline-offset-4 decoration-white/30 transition-all"
          >
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}