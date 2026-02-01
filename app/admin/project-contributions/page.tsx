"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  User,
  Github,
  Mail,
  Calendar,
  Filter,
  Search,
  Loader2,
  GitPullRequest,
  ExternalLink,
  MoreVertical,
  Eye,
  Ban
} from "lucide-react";
import Link from "next/link";
import {
  getProjectContributions,
  updateProjectContributionStatus,
  deleteProjectContribution,
  ProjectContribution
} from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Custom UI Components ---

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
    {children}
  </span>
);

const StatusBadge = ({ status }: { status: 'pending' | 'approved' | 'rejected' }) => {
  const statusConfig = {
    pending: { className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: Clock, label: "Pending" },
    approved: { className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: Check, label: "Approved" },
    rejected: { className: "bg-red-500/10 text-red-400 border-red-500/20", icon: X, label: "Rejected" },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={config.className}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

export default function ProjectContributionsAdminPage() {
  const [contributions, setContributions] = useState<ProjectContribution[]>([]);
  const [filteredContributions, setFilteredContributions] = useState<ProjectContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContribution, setSelectedContribution] = useState<ProjectContribution | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchContributions();
  }, []);

  useEffect(() => {
    filterContributions();
  }, [contributions, statusFilter, searchTerm]);

  const fetchContributions = async () => {
    try {
      const data = await getProjectContributions();
      setContributions(data);
    } catch (error) {
      console.error('Error fetching contributions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContributions = () => {
    let filtered = contributions;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contribution => contribution.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(contribution =>
        contribution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contribution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contribution.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contribution.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContributions(filtered);
  };

  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected') => {
    setActionLoading(id);
    try {
      await updateProjectContributionStatus(id, newStatus);
      
      // Send email notification
      const contribution = contributions.find(c => c.id === id);
      if (contribution) {
        console.log("🔍 Found contribution:", contribution.email);
        
        try {
          if (newStatus === 'approved') {
            await fetch("/api/send-contribution-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "approved",
                email: contribution.email,
                data: {
                  name: contribution.name,
                  projectName: contribution.projectName,
                  title: contribution.title,
                },
              }),
            });
          } else {
            await fetch("/api/send-contribution-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "rejected",
                email: contribution.email,
                data: {
                  name: contribution.name,
                  projectName: contribution.projectName,
                  title: contribution.title,
                },
              }),
            });
          }
          console.log("✅ Email notification sent for:", contribution.email);
        } catch (emailError) {
          console.error('❌ Error sending notification email:', emailError);
          // Continue even if email fails
        }
      }
      
      await fetchContributions(); // Refresh data
    } catch (error) {
      console.error('Error updating contribution status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contribution?')) return;
    
    setActionLoading(id);
    try {
      await deleteProjectContribution(id);
      await fetchContributions(); // Refresh data
    } catch (error) {
      console.error('Error deleting contribution:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openDetailModal = (contribution: ProjectContribution) => {
    setSelectedContribution(contribution);
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-zinc-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading contributions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-24">
        
        {/* --- Header --- */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Admin
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                Project Contributions
              </h1>
              <p className="text-zinc-400">
                Manage coding contribution requests from community members
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <GitPullRequest className="w-4 h-4" />
              <span>{filteredContributions.length} contributions</span>
            </div>
          </div>
        </div>

        {/* --- Filters --- */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search contributions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#09090b] border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* --- Contributions List --- */}
        <div className="space-y-4">
          {filteredContributions.length === 0 ? (
            <div className="text-center py-12">
              <GitPullRequest className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No contributions found matching your criteria.' 
                  : 'No contributions yet.'}
              </p>
            </div>
          ) : (
            filteredContributions.map((contribution) => (
              <div
                key={contribution.id}
                className="bg-[#09090b] border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  
                  {/* Main Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        {contribution.title}
                      </h3>
                      <StatusBadge status={contribution.status} />
                    </div>

                    <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2">
                      {contribution.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{contribution.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{contribution.email}</span>
                      </div>
                      {contribution.github && contribution.github !== 'N/A' && (
                        <div className="flex items-center gap-1">
                          <Github className="w-3 h-3" />
                          <span>@{contribution.github}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(contribution.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-400">
                        {contribution.contributionType}
                      </span>
                      <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-400">
                        {contribution.experienceLevel}
                      </span>
                      <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-400">
                        {contribution.timeline}
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-400">
                        📁 {contribution.projectName}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openDetailModal(contribution)}
                      className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {contribution.prLink && (
                      <a
                        href={contribution.prLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                        title="View PR"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                        title="More Actions">
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#09090b] border-zinc-800 text-zinc-300">
                        {contribution.status === 'pending' && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleStatusUpdate(contribution.id!, 'approved')}
                              className="cursor-pointer hover:bg-zinc-800 hover:text-emerald-400 flex items-center gap-2"
                              disabled={actionLoading === contribution.id}
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusUpdate(contribution.id!, 'rejected')}
                              className="cursor-pointer hover:bg-zinc-800 hover:text-red-400 flex items-center gap-2"
                              disabled={actionLoading === contribution.id}
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDelete(contribution.id!)}
                          className="cursor-pointer hover:bg-zinc-800 hover:text-red-400 flex items-center gap-2"
                          disabled={actionLoading === contribution.id}
                        >
                          <Ban className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {actionLoading === contribution.id && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- Detail Modal --- */}
        {showDetailModal && selectedContribution && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Contribution Details</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-2">Contribution Title</h3>
                    <p className="text-white">{selectedContribution.title}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-2">Description</h3>
                    <p className="text-white">{selectedContribution.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-2">How You Can Help</h3>
                    <p className="text-white">{selectedContribution.howCanHelp}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">Contributor</h3>
                      <p className="text-white">{selectedContribution.name}</p>
                      <p className="text-zinc-400 text-sm">{selectedContribution.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">Project</h3>
                      <p className="text-white">{selectedContribution.projectName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">Type</h3>
                      <p className="text-white">{selectedContribution.contributionType}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">Experience</h3>
                      <p className="text-white">{selectedContribution.experienceLevel}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">Timeline</h3>
                      <p className="text-white">{selectedContribution.timeline}</p>
                    </div>
                  </div>

                  {selectedContribution.prLink && (
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">Pull Request</h3>
                      <a
                        href={selectedContribution.prLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 underline"
                      >
                        {selectedContribution.prLink}
                      </a>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-2">Status</h3>
                    <StatusBadge status={selectedContribution.status} />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-end gap-3">
                  {selectedContribution.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedContribution.id!, 'rejected');
                          setShowDetailModal(false);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        disabled={actionLoading === selectedContribution.id}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedContribution.id!, 'approved');
                          setShowDetailModal(false);
                        }}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        disabled={actionLoading === selectedContribution.id}
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
