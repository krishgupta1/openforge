import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    // 1. Fixed, Glassmorphic, Dark Border
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* --- LEFT: LOGO --- */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-opacity hover:opacity-80"
        >
          {/* Logo Icon with Indigo Glow */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
            </svg>
            {/* Inner Sparkle */}
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
          </div>

          <span className="font-bold tracking-tight text-white text-lg hidden sm:block">
            OpenForge
          </span>
        </Link>

        {/* --- CENTER: MAIN NAVIGATION --- */}
        {/* Hidden on mobile, Flex on Desktop */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/ideas">Ideas</NavLink>
          <NavLink href="/contribute">Contribute</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* --- RIGHT: AUTHENTICATION --- */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-xs font-semibold text-gray-400 hover:text-white transition-colors tracking-wide uppercase">
                Log In
              </button>
            </SignInButton>

            {/* The "Join" button acts as the primary CTA */}
            <SignUpButton mode="modal">
              <button className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-white px-6 font-medium text-black transition-all hover:bg-gray-200">
                <span className="relative text-xs font-bold uppercase tracking-wide">
                  Join
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            {/* Customizing Clerk Avatar to blend with dark mode */}
            <div className="flex items-center gap-4">
              {/* Optional: Add a 'New Project' icon for signed in users */}
              <Link
                href="/new-idea"
                className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5V19M5 12H19" />
                </svg>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-8 h-8 border border-white/10 ring-2 ring-transparent hover:ring-white/10 transition-all",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

// Helper component for consistent links
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-500 hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
