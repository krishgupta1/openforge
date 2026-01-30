"use client";

import React, { useState } from "react";
import { Globe, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

// --- Components ---

const TechIcon = ({ name }: { name: string }) => {
  const logoMap: { [key: string]: string } = {
    React: "react.png",
    TypeScript: "typescript.png",
    Python: "python.png",
    "Next.js": "nextjs2.png",
    Tailwind: "tailwindcss.png",
    Bun: "bunjs.png",
    Vercel: "vercel.png",
    Supabase: "supabase.png",
    Solidity: "solidity.png",
    GraphQL: "graphql.png",
    WebGL: "threejs.png",
    Rust: "rust.png",
    WASM: "webassembly.png",
    Go: "go.png",
    WebRTC: "webrtc.png",
    Docker: "docker.png",
    Swift: "swift.png",
    ARKit: "arkit.png",
    "Node.js": "nodejs.png",
    TensorFlow: "pytorch.png",
    AWS: "aws.png",
    Svelte: "sveltejs.png",
    Vite: "vitejs.png",
    Linux: "linux.png",
    "D3.js": "d3js.png",
    FastAPI: "fastapi.png",
    Kubernetes: "kubernetes.png",
    "React Native": "reactnative.png",
    MongoDB: "mongodb.png",
    "Web3.js": "web3js.png",
    FFmpeg: "ffmpeg.png",
    WebSocket: "websocket.png",
  };

  const logoFile = logoMap[name];

  const FallbackIcon = () => (
    <div className="w-10 h-10 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover/icon:text-white group-hover/icon:border-neutral-500 transition-colors">
      <span className="text-[11px] font-mono font-bold uppercase tracking-tighter">
        {name.substring(0, 2)}
      </span>
    </div>
  );

  return (
    <div className="group/icon relative cursor-help">
      {/* Container */}
      <div className="transition-transform duration-300 hover:-translate-y-1">
        {!logoFile ? (
          <FallbackIcon />
        ) : (
          <div className="w-10 h-10 rounded-md bg-neutral-900/80 border border-white/10 flex items-center justify-center p-2">
            <img
              src={`/tech-stacks-logo/${logoFile}`}
              alt={name}
              className="w-full h-full object-contain opacity-90 group-hover/icon:opacity-100 transition-opacity"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-[10px] font-mono text-neutral-400 font-bold">${name[0]}</span>`;
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 bg-black border border-white/20 text-white text-[10px] font-medium rounded shadow-xl opacity-0 group-hover/icon:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};

const StatusPill = ({ status }: { status: string }) => {
  const isWorking = status.toLowerCase().includes("open");

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
        isWorking
          ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-400"
          : "bg-amber-950/30 border-amber-500/20 text-amber-400"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          isWorking ? "bg-emerald-500" : "bg-amber-500"
        }`}
      ></div>
      <span className="text-[11px] font-medium tracking-wide">{status}</span>
    </div>
  );
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const projects = [
    {
      id: "notesbuddy",
      title: "NotesBuddy",
      description:
        "An open-source study platform featuring collaborative notes, flashcards, quizzes, and AI-powered study assistants.",
      gradient: "from-neutral-800 to-neutral-900",
      status: "Open for Contributions",
      technologies: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind"],
      category: "Working",
      version: "v2.1.0",
    },
    {
      id: "appwrite-mcp",
      title: "Appwrite MCP Server",
      description:
        "Seamless database operations using reusable developer tools. Acts as a bridge between LLMs and your Appwrite backend.",
      gradient: "from-blue-900/40 to-indigo-900/40",
      status: "Open for Contributions",
      technologies: ["TypeScript", "Next.js", "React"],
      category: "Working",
      version: "v1.0.4",
    },
    {
      id: "openforge",
      title: "OpenForge",
      description:
        "A community-driven toolchain for automating CI/CD pipelines. Built to simplify complex deployment workflows.",
      gradient: "from-emerald-900/40 to-teal-900/40",
      status: "Building",
      technologies: ["React", "TypeScript", "Docker"],
      category: "Building",
      version: "v0.8.0-alpha",
    },
    {
      id: "codecollab",
      title: "CodeCollab",
      description:
        "Real-time collaborative coding platform with live sharing, voice chat, and integrated development environment.",
      gradient: "from-purple-900/40 to-pink-900/40",
      status: "Open for Contributions",
      technologies: ["WebRTC", "React", "Node.js", "WebSocket"],
      category: "Working",
      version: "v1.3.2",
    },
    {
      id: "dataviz-pro",
      title: "DataViz Pro",
      description:
        "Advanced data visualization library with interactive charts, real-time updates, and customizable dashboards.",
      gradient: "from-cyan-900/40 to-blue-900/40",
      status: "Open for Contributions",
      technologies: ["D3.js", "React", "TypeScript", "WebGL"],
      category: "Working",
      version: "v3.0.1",
    },
    {
      id: "ai-chatbot-framework",
      title: "AI Chatbot Framework",
      description:
        "Modular chatbot framework with natural language processing, multi-language support, and easy integration.",
      gradient: "from-green-900/40 to-emerald-900/40",
      status: "Building",
      technologies: ["Python", "TensorFlow", "FastAPI", "React"],
      category: "Building",
      version: "v0.5.0-beta",
    },
    {
      id: "clouddeploy",
      title: "CloudDeploy",
      description:
        "Automated deployment platform supporting multiple cloud providers with zero-downtime deployments and rollback.",
      gradient: "from-orange-900/40 to-red-900/40",
      status: "Open for Contributions",
      technologies: ["AWS", "Docker", "Go", "Kubernetes"],
      category: "Working",
      version: "v2.4.0",
    },
    {
      id: "mobilefirst-cms",
      title: "MobileFirst CMS",
      description:
        "Headless CMS optimized for mobile applications with offline support, sync capabilities, and real-time updates.",
      gradient: "from-indigo-900/40 to-purple-900/40",
      status: "Open for Contributions",
      technologies: ["React Native", "Node.js", "MongoDB", "GraphQL"],
      category: "Working",
      version: "v1.8.5",
    },
    {
      id: "blockchain-wallet",
      title: "Blockchain Wallet",
      description:
        "Secure cryptocurrency wallet with multi-chain support, DeFi integration, and hardware wallet compatibility.",
      gradient: "from-yellow-900/40 to-orange-900/40",
      status: "Building",
      technologies: ["Solidity", "Web3.js", "React", "TypeScript"],
      category: "Building",
      version: "v0.3.0-alpha",
    },
    {
      id: "video-streaming",
      title: "Video Streaming Platform",
      description:
        "Scalable video streaming service with adaptive bitrate, live streaming, and content delivery optimization.",
      gradient: "from-rose-900/40 to-pink-900/40",
      status: "Open for Contributions",
      technologies: ["WebRTC", "Node.js", "AWS", "FFmpeg"],
      category: "Working",
      version: "v1.2.0",
    },
    {
      id: "ar-navigation",
      title: "AR Navigation App",
      description:
        "Augmented reality navigation app with real-time directions, indoor mapping, and location-based services.",
      gradient: "from-teal-900/40 to-cyan-900/40",
      status: "Building",
      technologies: ["ARKit", "Swift", "Core Location", "MapKit"],
      category: "Building",
      version: "v0.2.0-beta",
    },
  ];

  // --- Logic: Calculate Counts Dynamically ---
  const counts: { [key: string]: number } = {
    All: projects.length,
    Working: projects.filter((p) => p.category === "Working").length,
    Building: projects.filter((p) => p.category === "Building").length,
  };

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 pb-32">
      {/* --- Header Section --- */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Community Projects
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
          Open-source initiatives built by developers. Explore ideas, contribute
          code, and collaborate.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Controls Section --- */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex bg-neutral-900 p-1 rounded-lg border border-white/10">
            {["All", "Working", "Building"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {tab}{" "}
                <span
                  className={`text-[10px] ml-1 ${
                    activeTab === tab ? "opacity-100 font-bold" : "opacity-40"
                  }`}
                >
                  ({counts[tab]})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- Projects Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col bg-neutral-900/40 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* --- Image Area (Browser Mockup) --- */}
              <div
                className={`h-56 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-end justify-center px-8 pt-10`}
              >
                {/* Browser Window */}
                <div className="w-full h-full bg-[#0a0a0a] rounded-t-lg shadow-2xl border border-white/10 flex flex-col transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500 ease-out">
                  {/* Window Bar - Professional Monochrome */}
                  <div className="h-8 border-b border-white/5 flex items-center px-4 gap-1.5 bg-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                  </div>

                  {/* Window Body */}
                  <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-[10px] font-mono text-neutral-600 mt-2">
                      {project.version}
                    </p>
                  </div>
                </div>
              </div>

              {/* --- Card Content --- */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Title & Icons */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>
                  <div className="flex gap-3 text-neutral-500">
                    <Globe className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                    <Github className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-8 min-h-[40px]">
                  {project.description}
                </p>

                {/* Bottom Section */}
                <div className="mt-auto space-y-6">
                  {/* Technology Section */}
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Technology
                    </h3>
                    <div className="min-h-[32px] flex items-center">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech, i) => (
                          <TechIcon key={i} name={tech} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-white/5">
                    <StatusPill status={project.status} />

                    <Link 
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors group/btn"
                    >
                      View Project
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
