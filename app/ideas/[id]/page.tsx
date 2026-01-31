"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Calendar, 
  User, 
  Sparkles,
  Layers,
  Code,
  Flag,
  CornerDownRight
} from "lucide-react";
import Link from "next/link";

// --- Mock Data (Simulating a single idea fetched from DB) ---
const IDEA = {
  id: "1",
  title: "AI-Powered Study Planner",
  type: "New Project",
  status: "Open",
  priority: "High",
  createdAt: "Oct 24, 2023",
  author: {
    name: "Alex Chen",
    username: "@alexc",
    avatar: "AC" // Initials for placeholder
  },
  content: {
    problem: "Students struggle to create realistic study schedules. They often overestimate how much they can get done in a day or forget to schedule breaks, leading to burnout and poor retention.",
    description: "I want to build an automated scheduler that takes your syllabus (PDF/Text) and generates a spaced-repetition study plan automatically. It should integrate with Google Calendar and adjust the plan if you miss a day.",
    techStack: ["Next.js", "Python (FastAPI)", "OpenAI API", "PostgreSQL"],
    lookingFor: ["Backend Developer", "UI/UX Designer"]
  },
  stats: {
    votes: 128,
    comments: 24
  }
};

// --- Components ---

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
    {children}
  </span>
);

export default function IdeaDetailPage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(IDEA.stats.votes);

  const handleVote = () => {
    if (hasVoted) {
      setVoteCount(prev => prev - 1);
    } else {
      setVoteCount(prev => prev + 1);
    }
    setHasVoted(!hasVoted);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-zinc-800">
      <div className="max-w-5xl mx-auto px-6 py-24">
        
        {/* --- Navigation --- */}
        <div className="mb-10">
          <Link 
            href="/ideas" 
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Ideas
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- Main Content (Left Column) --- */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Header Section */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  <Sparkles className="w-3 h-3" /> {IDEA.type}
                </Badge>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  {IDEA.status}
                </Badge>
                <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700">
                  Priority: {IDEA.priority}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold tracking-tight leading-tight">
                {IDEA.title}
              </h1>

              {/* Author Meta */}
              <div className="flex items-center gap-3 py-4 border-y border-zinc-900">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 border border-zinc-700">
                  {IDEA.author.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{IDEA.author.name}</span>
                  <span className="text-xs text-zinc-500 flex items-center gap-2">
                    {IDEA.author.username} • <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {IDEA.createdAt}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-10">
              
              {/* Problem Statement */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                  <Flag className="w-4 h-4" /> The Problem
                </h3>
                <p className="text-zinc-300 leading-relaxed text-lg">
                  {IDEA.content.problem}
                </p>
              </div>

              {/* Proposed Solution */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Proposed Solution
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {IDEA.content.description}
                </p>
              </div>

              {/* Tech Stack & Roles (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-900">
                
                {/* Proposed Tech Stack */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                    <Code className="w-3.5 h-3.5" /> Proposed Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {IDEA.content.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-[#09090b] border border-zinc-800 rounded-md text-sm text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Looking For */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Looking For
                  </h3>
                  <div className="flex flex-col gap-2">
                    {IDEA.content.lookingFor.map(role => (
                      <div key={role} className="flex items-center gap-2 text-sm text-zinc-300">
                        <CornerDownRight className="w-3.5 h-3.5 text-zinc-600" />
                        {role}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* --- Sidebar (Right Column) --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Vote Card */}
            <div className="p-6 rounded-xl bg-[#09090b] border border-zinc-800 space-y-6 sticky top-24">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">{voteCount}</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide font-medium">Votes</span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-xl font-bold text-white">{IDEA.stats.comments}</span>
                   <span className="text-xs text-zinc-500 uppercase tracking-wide font-medium">Comments</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleVote}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold transition-all active:scale-[0.98] ${
                    hasVoted 
                      ? "bg-zinc-800 text-white border border-zinc-700" 
                      : "bg-white text-black hover:bg-zinc-200"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-white" : ""}`} />
                  {hasVoted ? "Voted" : "Upvote Idea"}
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-white transition-all">
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <h4 className="text-xs font-medium text-zinc-500 mb-3 uppercase tracking-wider">Collaboration</h4>
                <button className="w-full py-3 rounded-lg border border-dashed border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500 hover:text-white transition-all">
                  👋 Request to Join Project
                </button>
              </div>
            </div>

            {/* Share Link */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-900 bg-zinc-900/20">
              <span className="text-sm text-zinc-500">Share this idea</span>
              <button className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* View All Ideas Link */}
            <Link 
              href="/ideas" 
              className="flex items-center justify-center gap-2 p-4 rounded-lg border border-zinc-800 bg-[#09090b] text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">View All Ideas</span>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}
