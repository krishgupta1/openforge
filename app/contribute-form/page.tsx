"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Github,
  Linkedin,
  Loader2,
  GitPullRequest,
  Phone,
  User,
  Lock,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Custom UI Components ---

const Label = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <label
    className={`block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2.5 ${className}`}
  >
    {children}
  </label>
);

const Input = ({
  className = "",
  error = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) => (
  <div>
    <input
      className={`w-full bg-[#09090b] border rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all hover:border-zinc-700 ${
        error
          ? "border-red-500 focus:ring-red-500/20 hover:border-red-500"
          : "border-zinc-800 focus:ring-zinc-700"
      } ${className}`}
      {...props}
    />
    {error && (
      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const Textarea = ({
  className = "",
  error = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) => (
  <div>
    <textarea
      className={`w-full bg-[#09090b] border rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all hover:border-zinc-700 resize-none ${
        error
          ? "border-red-500 focus:ring-red-500/20 hover:border-red-500"
          : "border-zinc-800 focus:ring-zinc-700"
      } ${className}`}
      {...props}
    />
    {error && (
      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

// --- Main Page Component ---

export default function ContributionFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    github: "",
    linkedin: "",
    mobile: "",
    prLink: "",
    contributionType: "",
    whatChanged: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contributionTypes = [
    "Feature",
    "Bug Fix",
    "Enhancement",
    "Documentation",
    "Refactor",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // PR Link validation
    if (!formData.prLink.trim()) {
      newErrors.prLink = "PR Link is required";
    } else if (!/^https?:\/\/(www\.)?github\.com\/.+\/pull\/\d+/.test(formData.prLink)) {
      newErrors.prLink = "Please enter a valid GitHub PR link";
    }

    // Contribution Type validation
    if (!formData.contributionType) {
      newErrors.contributionType = "Please select a contribution type";
    }

    // What Changed validation
    if (!formData.whatChanged.trim()) {
      newErrors.whatChanged = "Please describe what you changed";
    } else if (formData.whatChanged.trim().length < 10) {
      newErrors.whatChanged = "Description must be at least 10 characters";
    } else if (formData.whatChanged.trim().length > 500) {
      newErrors.whatChanged = "Description must be less than 500 characters";
    }

    // Optional field validations (only if filled)
    if (formData.name && formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (formData.github && !/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,38})$/.test(formData.github)) {
      newErrors.github = "Please enter a valid GitHub username (e.g., username)";
    }

    if (formData.linkedin && !/^in\/[a-zA-Z0-9]([a-zA-Z0-9-]{0,99})$/.test(formData.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn username (e.g., in/username)";
    }

    if (formData.mobile && !/^\+?[1-9]\d{1,14}$/.test(formData.mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    // Mock Submission
    setTimeout(() => {
      console.log("Contribution submitted:", formData);
      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData((prev) => ({
          ...prev,
          prLink: "",
          contributionType: "",
          whatChanged: "",
        }));
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-zinc-800">
      <div className="max-w-2xl mx-auto px-6 py-24">
        {/* --- Header --- */}
        <div className="mb-12">
          <Link
            href="/projects/notesbuddy"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Project
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
            Submit Contribution
          </h1>
          <p className="text-zinc-400 text-base">
            Share your contribution with the community after raising a PR.
          </p>
        </div>

        {/* --- Success Toast --- */}
        {isSubmitted && (
          <div className="mb-10 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Contribution Received
              </p>
              <p className="text-xs text-zinc-400">
                Thank you for your contribution. We'll review it soon.
              </p>
            </div>
          </div>
        )}

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Group 1: Contributor Details (Restored) */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-zinc-200 pb-4 border-b border-zinc-900">
              Contributor Details{" "}
              <span className="text-zinc-600 font-normal ml-1">(Optional)</span>
            </h3>

            <div className="space-y-5">
              <div>
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="pl-11"
                    error={errors.name}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label>GitHub</Label>
                  <div className="relative">
                    <Github className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <Input
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="username"
                      className="pl-11"
                      error={errors.github}
                    />
                  </div>
                </div>
                <div>
                  <Label>LinkedIn</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <Input
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="in/username"
                      className="pl-11"
                      error={errors.linkedin}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile No with Privacy Note */}
              <div>
                <Label>Mobile No</Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                  <Input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+91 00000 00000"
                    className="pl-11"
                    error={errors.mobile}
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-2.5 text-zinc-500">
                  <Lock className="w-3 h-3" />
                  <p className="text-xs">
                    Your number is protected and will{" "}
                    <span className="text-zinc-400 font-medium">
                      never be shared
                    </span>{" "}
                    with anyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Group 2: Contribution Information */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-zinc-200 pb-4 border-b border-zinc-900">
              Contribution Details
            </h3>

            {/* PR Link */}
            <div>
              <Label>PR Link</Label>
              <div className="relative">
                <GitPullRequest className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                <Input
                  type="url"
                  name="prLink"
                  value={formData.prLink}
                  onChange={handleInputChange}
                  placeholder="https://github.com/org/repo/pull/123"
                  className="pl-11"
                  required
                  error={errors.prLink}
                />
              </div>
            </div>

            {/* Contribution Type */}
            <div className={`flex flex-col ${errors.contributionType ? "gap-2" : ""}`}>
              <Label>Contribution Type</Label>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`w-full bg-[#09090b] border rounded-lg px-4 py-3.5 text-sm text-left hover:border-zinc-700 focus:outline-none focus:ring-2 focus:border-transparent transition-all flex items-center justify-between group ${
                    errors.contributionType
                      ? "border-red-500 focus:ring-red-500/20 hover:border-red-500"
                      : "border-zinc-800 focus:ring-zinc-700"
                  }`}
                >
                  <span
                    className={
                      formData.contributionType
                        ? "text-white"
                        : "text-zinc-600"
                    }
                  >
                    {formData.contributionType || "Select contribution type"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-[#09090b] border-zinc-800 text-zinc-300">
                  {contributionTypes.map((type) => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() =>
                        handleSelectChange("contributionType", type)
                      }
                      className={`cursor-pointer focus:bg-zinc-800 focus:text-white my-0.5 ${formData.contributionType === type ? "bg-zinc-800 text-white" : ""}`}
                    >
                      {type}
                      {formData.contributionType === type && (
                        <Check className="w-3 h-3 ml-auto" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {errors.contributionType && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.contributionType}
                </p>
              )}
            </div>

            {/* What Changed */}
            <div>
              <Label>What did you change?</Label>
              <Textarea
                name="whatChanged"
                value={formData.whatChanged}
                onChange={handleInputChange}
                placeholder="Short description – 2–3 lines"
                rows={3}
                required
                error={errors.whatChanged}
              />
              <p className="text-xs text-zinc-600 mt-2">
                Example: Added dark mode toggle and updated dashboard styles.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black text-sm font-bold py-4 rounded-lg hover:bg-zinc-200 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Contribution"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
