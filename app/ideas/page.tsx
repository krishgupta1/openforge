"use client";

import React from "react";
import {
  Plus,
  ArrowRight,
  Code,
  Paintbrush,
  Cpu,
  Database,
  Layers,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";

// --- Types ---
type IdeaStatus = "Open" | "In Progress" | "Completed";
type IdeaType = "New Project" | "Feature Idea";

interface Idea {
  id: string;
  title: string;
  description: string;
  type: IdeaType;
  status: IdeaStatus;
  tags: string[];
  author: {
    name: string;
    username: string;
  };
  date: string;
}

// --- Mock Data ---
const MOCK_IDEAS: Idea[] = [
  {
    id: "1",
    title: "AI-Powered Study Planner",
    description:
      "An automated scheduler that takes your syllabus and generates a spaced-repetition study plan.",
    type: "New Project",
    status: "Open",
    tags: ["AI", "Backend", "Frontend"],
    author: { name: "Alex Chen", username: "@alexc" },
    date: "2 days ago",
  },
  {
    id: "2",
    title: "Dark Mode for Dashboard",
    description:
      "Implement a system-aware dark mode toggle for the main student dashboard.",
    type: "Feature Idea",
    status: "In Progress",
    tags: ["Frontend", "Design"],
    author: { name: "Sarah Jones", username: "@sarahj" },
    date: "5 days ago",
  },
  {
    id: "3",
    title: "Real-time Collaboration Notes",
    description:
      "Allow multiple users to edit the same note document simultaneously using WebSockets.",
    type: "Feature Idea",
    status: "Open",
    tags: ["Backend", "Realtime"],
    author: { name: "Mike Ross", username: "@miker" },
    date: "1 week ago",
  },
  {
    id: "4",
    title: "Interactive Quiz Component",
    description:
      "A reusable React component for creating quizzes with timer and score tracking.",
    type: "Feature Idea",
    status: "Completed",
    tags: ["Frontend", "React"],
    author: { name: "Emily White", username: "@emilyw" },
    date: "2 weeks ago",
  },
];

// --- Components ---

const StatusPill = ({ status }: { status: IdeaStatus }) => {
  const isWorking = status === "In Progress" || status === "Open";
  const colorClass =
    status === "Open"
      ? "text-emerald-400 bg-emerald-950/30 border-emerald-500/20"
      : status === "In Progress"
        ? "text-blue-400 bg-blue-950/30 border-blue-500/20"
        : "text-neutral-400 bg-neutral-800/50 border-neutral-700/50";

  const dotColor =
    status === "Open"
      ? "bg-emerald-500"
      : status === "In Progress"
        ? "bg-blue-500"
        : "bg-neutral-500";

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${colorClass}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
      <span className="text-[11px] font-medium tracking-wide uppercase">
        {status}
      </span>
    </div>
  );
};

const TypeBadge = ({ type }: { type: IdeaType }) => {
  const icon =
    type === "New Project" ? (
      <Sparkles className="w-3 h-3" />
    ) : (
      <Layers className="w-3 h-3" />
    );
  const style = type === "New Project" ? "text-purple-400" : "text-amber-400";
  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium ${style}`}>
      {icon}
      {type}
    </span>
  );
};

const TagIcon = ({ tag }: { tag: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Frontend: <Layers className="w-3 h-3" />,
    Backend: <Database className="w-3 h-3" />,
    Design: <Paintbrush className="w-3 h-3" />,
    AI: <Cpu className="w-3 h-3" />,
    Realtime: <Code className="w-3 h-3" />,
    React: <Code className="w-3 h-3" />,
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800/50 border border-neutral-700/50 text-[11px] font-medium text-neutral-400 group-hover:border-neutral-600 transition-colors">
      {icons[tag] || <Code className="w-3 h-3" />}
      {tag}
    </div>
  );
};

// --- Main Page ---

export default function IdeasPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 pb-32">
      {/* --- Header Section (Matched Projects Page) --- */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Ideas
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
          Explore new projects to build or contribute to features requested by
          the community.
        </p>

        <div className="pt-4">
          <Link
            href="/submit-idea"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-8 py-3 rounded-full hover:bg-neutral-200 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Share an Idea
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Ideas Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_IDEAS.map((idea) => (
            <div
              key={idea.id}
              className="group flex flex-col bg-neutral-900/40 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Card Content Area - Increased Padding to Match Projects Page */}
              <div className="p-8 flex flex-col flex-grow h-full">
                {/* Meta Row */}
                <div className="flex items-center justify-between mb-6">
                  <TypeBadge type={idea.type} />
                  <StatusPill status={idea.status} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-neutral-200 transition-colors">
                  {idea.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                  {idea.description}
                </p>

                {/* Bottom Section */}
                <div className="mt-auto space-y-6">
                  {/* Tags */}
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag) => (
                        <TagIcon key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>

                  {/* Footer / Author */}
                  <div className="flex items-center justify-between pt-5 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 text-xs font-bold text-neutral-400">
                        {idea.author.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-neutral-300 font-medium">
                          {idea.author.name}
                        </span>
                        <span className="text-[10px] text-neutral-600">
                          {idea.date}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/ideas/${idea.id}`}
                      className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors group/btn"
                    >
                      View Details
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
