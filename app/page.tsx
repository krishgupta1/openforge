import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col pt-32 pb-20 bg-black">
      {/* Noise Texture Overlay */}
      <div className="bg-noise" />

      {/* --- HERO SECTION --- */}
      <div className="mx-auto max-w-6xl px-6 text-center mb-24">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-8">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
            v1.0 is Live
          </span>
        </div>

        {/* Main Heading - Clean & Tight */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Collaborate on <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Open Software.
          </span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Don't let your ideas rot in a notepad. OpenForge connects you with
          developers who want to build, ship, and scale open-source projects.
        </p>

        {/* Action Bar */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/ideas"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all hover:bg-gray-200 hover:scale-[1.02]"
          >
            <span>Start Building</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Link>
          <Link
            href="/new-idea"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-transparent px-8 font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
          >
            Share Idea
          </Link>
        </div>
      </div>

      {/* --- FEATURE GRID (The Unique Part) --- */}
      {/* This creates a 'Bento' style grid using gaps for borders */}
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="bento-grid rounded-xl overflow-hidden shadow-sm">
          {/* Card 1 */}
          <div className="bg-[#0a0a0a] p-10 flex flex-col items-center text-center group hover:bg-white/5 transition-colors">
            <div className="mb-6 h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              💡
            </div>
            <h3 className="font-semibold text-white text-lg">Post Ideas</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Define the problem, sketch the solution, and publish your concept
              to the world.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0a0a0a] p-10 flex flex-col items-center text-center group hover:bg-white/5 transition-colors">
            <div className="mb-6 h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🤝
            </div>
            <h3 className="font-semibold text-white text-lg">Find Squad</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Review requests from developers and form a team based on skills
              and passion.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0a0a0a] p-10 flex flex-col items-center text-center group hover:bg-white/5 transition-colors">
            <div className="mb-6 h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🚀
            </div>
            <h3 className="font-semibold text-white text-lg">Ship MVP</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Manage tasks, merge PRs, and launch your v1.0 to the community.
            </p>
          </div>
        </div>

        {/* Social Proof / Footer-ish area */}
        <div className="mt-16 text-center border-t border-white/10 pt-10">
          <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
            Join 100+ Builders shipping today
          </p>
        </div>
      </div>
    </main>
  );
}
