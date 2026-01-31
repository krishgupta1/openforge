"use client";

import React from "react";
import {
  ArrowLeft,
  GitPullRequest,
  GitFork,
  GitBranch,
  Code,
  FileText,
  Search,
  AlertCircle,
  CheckCircle,
  Users,
  MessageCircle,
  Linkedin,
  Github,
  Star,
  ShieldCheck,
  ArrowRight,
  Check
} from "lucide-react";
import Link from "next/link";

// --- Components ---

const SectionHeading = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-white mb-10 flex items-center gap-3">
    <div className="p-2 rounded-lg bg-zinc-900/50 text-white border border-zinc-800">
        {icon}
    </div>
    {title}
  </h2>
);

// New Roadmap Step Component
const RoadmapStep = ({ 
  icon, 
  title, 
  desc, 
  isLast = false 
}: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
  isLast?: boolean 
}) => (
  <div className="flex gap-6 group">
    {/* Timeline Line & Icon */}
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-all shadow-sm z-10">
        {icon}
      </div>
      {!isLast && (
        <div className="w-px flex-1 bg-zinc-800 my-2 group-hover:bg-zinc-700 transition-colors" />
      )}
    </div>
    
    {/* Content */}
    <div className="pb-12 pt-2">
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">{desc}</p>
    </div>
  </div>
);

// Smaller Roadmap Item for "What Happens Next"
const ProcessStep = ({ 
    icon, 
    title, 
    desc, 
    isLast = false,
    statusColor = "text-zinc-400"
  }: { 
    icon: React.ReactNode; 
    title: string; 
    desc: string; 
    isLast?: boolean;
    statusColor?: string;
  }) => (
    <div className="flex gap-5 group">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center ${statusColor} group-hover:border-zinc-600 transition-all z-10`}>
          {icon}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-zinc-800 my-2" />
        )}
      </div>
      <div className="pb-8 pt-1">
        <h4 className={`text-sm font-bold ${statusColor === "text-emerald-400" ? "text-emerald-400" : "text-white"}`}>{title}</h4>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-zinc-800">
      <div className="max-w-5xl mx-auto px-6 py-24">
        
        {/* --- Header --- */}
        <div className="mb-20 pt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Contribute
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Learn how to contribute, follow community rules, and collaborate smoothly to build something great together.
          </p>
        </div>

        {/* --- 1. How to Contribute (Roadmap Style) --- */}
        <div className="mb-24">
          <SectionHeading title="Contribution Roadmap" icon={<GitBranch className="w-5 h-5 text-emerald-500" />} />
          
          <div className="pl-2">
            <RoadmapStep 
              icon={<Search className="w-5 h-5" />}
              title="1. Explore Projects"
              desc="Browse through our open-source projects or feature ideas. Find something that interests you or aligns with your skills."
            />
            <RoadmapStep 
              icon={<FileText className="w-5 h-5" />}
              title="2. Pick an Issue"
              desc="Select an open issue or an approved feature idea. Comment on it to let others know you are working on it."
            />
            <RoadmapStep 
              icon={<GitFork className="w-5 h-5" />}
              title="3. Fork Repository"
              desc="Create your own fork of the repository on GitHub to start making changes safely."
            />
            <RoadmapStep 
              icon={<GitBranch className="w-5 h-5" />}
              title="4. Create Branch"
              desc="Create a new branch with a meaningful name (e.g., 'feature/dark-mode' or 'fix/login-bug')."
            />
            <RoadmapStep 
              icon={<Code className="w-5 h-5" />}
              title="5. Commit Changes"
              desc="Write clean, readable code. Follow the project's coding conventions and commit often with clear messages."
            />
            <RoadmapStep 
              icon={<GitPullRequest className="w-5 h-5" />}
              title="6. Raise PR"
              desc="Submit your Pull Request. Provide a clear description of what you changed and link it to the issue."
              isLast={true}
            />
          </div>
        </div>

        {/* --- Split Section: Rules & Guidelines --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* 2. Contribution Rules */}
          <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-2xl h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              Community Rules
            </h3>
            
            <ul className="space-y-4 mb-8">
              {[
                "Be respectful and professional",
                "Keep code clean and documented",
                "Follow project structure & standards",
                "One PR = one feature / fix",
                "Test before submitting PR"
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>

            <div className="p-4 bg-red-500/10 border border-red-500/10 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-xs text-red-200/80 leading-relaxed">
                <span className="font-bold text-red-400">Important:</span> Spam PRs will be closed without review.
              </p>
            </div>
          </div>

          {/* 3. PR Checklist */}
          <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-2xl h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              PR Checklist
            </h3>
            
            <div className="space-y-3">
              {[
                "Clear title and description",
                "Linked to an issue / feature",
                "Code follows conventions",
                "No breaking changes"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                  <div className="w-5 h-5 rounded-full border border-zinc-600 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-zinc-400" />
                  </div>
                  <span className="text-sm text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- 4. Community & Communication --- */}
        <div className="mb-24">
          <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900/50 to-transparent border border-zinc-800 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zinc-700 shadow-xl">
              <Users className="w-7 h-7 text-white" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join the Community</h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-base">
              Connect with other developers, ask questions, and discuss ideas in real-time.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#24292e] hover:bg-[#2f363d] text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95">
                <Github className="w-5 h-5" />
                Discussions
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95">
                <MessageCircle className="w-5 h-5" />
                Discord
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#0077b5] hover:bg-[#006396] text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* --- Split Section: After Contribution & Recognition --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* 5. What Happens Next (Roadmap Style) */}
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-8">
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                 <ArrowRight className="w-4 h-4 text-zinc-400" />
              </div>
              What Happens Next?
            </h3>
            
            <div className="pl-2">
              <ProcessStep 
                icon={<Search className="w-3.5 h-3.5" />}
                title="Maintainers review your PR"
                desc="We check code quality, functionality, and adherence to guidelines."
              />
              <ProcessStep 
                icon={<MessageCircle className="w-3.5 h-3.5" />}
                title="Feedback may be requested"
                desc="Check comments for any required changes or improvements."
              />
              <ProcessStep 
                icon={<CheckCircle className="w-3.5 h-3.5" />}
                title="PR is merged!"
                desc="Congratulations! Your contribution is now live in the project."
                isLast={true}
                statusColor="text-emerald-400"
              />
            </div>
          </div>

          {/* 6. Recognition */}
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-8">
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                 <Star className="w-4 h-4 text-yellow-500" />
              </div>
              Contributor Recognition
            </h3>
            <div className="p-8 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl h-[calc(100%-4rem)]">
              {/* Recognition content will be added here */}
            </div>
          </div>

        </div>

        {/* --- Footer Trust Note --- */}
        <div className="pt-10 border-t border-zinc-900 text-center">
          <p className="text-sm text-zinc-600 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            All contributions follow open-source best practices.
          </p>
        </div>

      </div>
    </div>
  );
}