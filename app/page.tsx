import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 flex flex-col items-center justify-center p-4">
      {/* --- Placeholder Header --- */}
      <div className="text-center mb-12 space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
          OpenForge
        </h1>
        <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-medium border border-white/10 inline-block px-3 py-1 rounded-full bg-white/5">
          Landing Page Undecided
        </p>
      </div>

      {/* --- Dev Navigation Links --- */}
      <div className="w-full max-w-md border border-white/10 rounded-2xl p-8 bg-zinc-900/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Dev Navigation
          </h2>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50 animate-pulse"></div>
        </div>

        <nav className="flex flex-col gap-1">
          <NavLink href="/projects" label="Projects Page" path="/projects" />
          <NavLink href="/ideas" label="Ideas Page" path="/ideas" />
          <NavLink
            href="/contribute"
            label="Contribute Page"
            path="/contribute"
          />
          <NavLink href="/about" label="About Page" path="/about" />
        </nav>
      </div>
    </main>
  );
}

// --- Helper Component for Cleaner Code ---
function NavLink({
  href,
  label,
  path,
}: {
  href: string;
  label: string;
  path: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors">
          {path}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}
