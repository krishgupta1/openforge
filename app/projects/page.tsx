import React from "react";
import { Globe, Github, ArrowRight, Triangle, Terminal } from "lucide-react";

export default function ProjectCards() {
  const projects = [
    {
      title: "Appwrite MCP Server",
      description:
        "Model Context Protocol server for seamless Appwrite database operations with 7 powerful tools and 99.9% success rates.",
      imageText: "AppWrite MCP Server 👋",
      imageGradient: "from-fuchsia-500 via-purple-600 to-indigo-900",
      status: "All Systems Operational",
      technologies: ["TS", "Bun", "Vercel", "Shell"],
    },
    {
      title: "NotesBuddy AI",
      description:
        "A comprehensive study platform with notes, flashcards, quizzes, AI chatbot, and interactive learning tools.",
      imageText: "NotesBuddy AI 🧠",
      imageGradient: "from-emerald-400 via-teal-500 to-cyan-600",
      status: "All Systems Operational",
      technologies: ["TS", "React", "Supabase", "Tailwind"],
    },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 font-sans antialiased">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative flex flex-col w-full bg-[#121212] rounded-[32px] border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 shadow-2xl"
          >
            {/* --- Image Area (Top) --- */}
            <div
              className={`h-64 w-full bg-gradient-to-br ${project.imageGradient} relative overflow-hidden flex items-center justify-center`}
            >
              {/* Mockup Window */}
              <div className="absolute top-10 w-[90%] h-full bg-[#05050A] rounded-t-xl border border-white/10 shadow-2xl transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500 flex flex-col overflow-hidden">
                {/* Window Header */}
                <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[8px] text-neutral-500 font-mono">
                    server.ts
                  </div>
                </div>

                {/* Window Content */}
                <div className="p-6 flex flex-col items-center justify-center h-full text-center space-y-2 relative">
                  {/* Glow effect behind text */}
                  <div className="absolute w-32 h-32 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>

                  <h3 className="text-3xl font-bold text-white relative z-10 tracking-tight">
                    {project.imageText.split(" ").slice(0, -1).join(" ")}
                  </h3>
                  <span className="text-3xl relative z-10">
                    {project.imageText.split(" ").slice(-1)}
                  </span>

                  {/* Fake Code Lines */}
                  <div className="mt-6 w-full max-w-[200px] space-y-1.5 opacity-50">
                    <div className="h-1.5 w-full bg-neutral-700 rounded-full"></div>
                    <div className="h-1.5 w-3/4 bg-neutral-700 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Content Area (Bottom) --- */}
            <div className="p-7 flex flex-col flex-grow bg-[#121212]">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-[22px] font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <div className="flex gap-3 text-neutral-500">
                  <Globe
                    className="w-5 h-5 hover:text-white cursor-pointer transition-colors"
                    strokeWidth={1.5}
                  />
                  <Github
                    className="w-5 h-5 hover:text-white cursor-pointer transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-400 text-[15px] leading-relaxed mb-8 line-clamp-2">
                {project.description}
              </p>

              <div className="mt-auto space-y-6">
                {/* Technologies */}
                <div>
                  <h4 className="text-sm text-neutral-500 font-medium mb-3">
                    Technologies
                  </h4>
                  <div className="flex items-center gap-3">
                    {project.technologies.map((tech, i) => (
                      <TechIcon key={i} name={tech} />
                    ))}
                  </div>
                </div>

                {/* Footer Status */}
                <div className="flex items-center justify-between pt-2">
                  <div className="bg-[#102a1d] border border-[#183926] pl-2 pr-3 py-1.5 rounded-full flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                    <span className="text-[11px] font-medium text-green-500 tracking-wide">
                      {project.status}
                    </span>
                  </div>

                  <button className="group/btn flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper component for specific Tech Icons
function TechIcon({ name }: { name: string }) {
  if (name === "TS") {
    return (
      <div className="w-7 h-7 bg-[#3178C6] rounded-[4px] flex items-center justify-center text-white font-bold text-[10px] shadow-lg shadow-blue-900/20">
        TS
      </div>
    );
  }
  if (name === "Bun") {
    return (
      <div className="w-7 h-7 bg-[#fbf0df] rounded-[4px] flex items-center justify-center overflow-hidden p-0.5">
        {/* Simple SVG approximation of the Bun logo */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="#121212"
            fillOpacity="0.1"
          />
          <path
            d="M16.5 10.5C16.5 10.5 15.5 8 12 8C8.5 8 7.5 10.5 7.5 10.5C6.5 10.5 5 11 5 13C5 15.5 8 17 12 17C16 17 19 15.5 19 13C19 11 17.5 10.5 16.5 10.5Z"
            fill="#121212"
          />
          <circle cx="10" cy="12" r="1" fill="#FFF" />
          <circle cx="14" cy="12" r="1" fill="#FFF" />
        </svg>
      </div>
    );
  }
  if (name === "Vercel") {
    return (
      <div className="w-7 h-7 bg-black border border-white/20 rounded-[4px] flex items-center justify-center text-white">
        <Triangle className="w-3.5 h-3.5 fill-white" />
      </div>
    );
  }
  if (name === "Shell") {
    return (
      <div className="w-7 h-7 bg-white text-black rounded-[4px] flex items-center justify-center">
        <Terminal className="w-3.5 h-3.5 stroke-[3]" />
      </div>
    );
  }
  // Generic fallback
  return (
    <div className="w-7 h-7 bg-neutral-800 border border-neutral-700 rounded-[4px] flex items-center justify-center text-neutral-400 text-[10px] font-bold">
      {name[0]}
    </div>
  );
}
