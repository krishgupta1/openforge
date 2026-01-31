"use client";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjectFeatures, updateProjectFeatureStatus, deleteProjectFeature, ProjectFeature } from "@/lib/firebase";
import { getProjectContributions, updateProjectContributionStatus, deleteProjectContribution, ProjectContribution } from "@/lib/firebase";
import {
  Check,
  X,
  Eye,
  Trash2,
  Clock,
  Calendar,
  User,
  Github,
  ChevronDown,
  Filter,
  RefreshCw,
  Lightbulb,
  GitPullRequest,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [features, setFeatures] = useState<ProjectFeature[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<ProjectFeature[]>([]);
  const [contributions, setContributions] = useState<ProjectContribution[]>([]);
  const [filteredContributions, setFilteredContributions] = useState<ProjectContribution[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'features' | 'contributions'>('projects');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedFeature, setSelectedFeature] = useState<ProjectFeature | null>(null);
  const [selectedContribution, setSelectedContribution] = useState<ProjectContribution | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "projects"));
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
    fetchFeatures();
    fetchContributions();
  }, []);

  useEffect(() => {
    filterFeatures();
    filterContributions();
  }, [features, contributions, statusFilter]);

  const fetchFeatures = async () => {
    try {
      const fetchedFeatures = await getProjectFeatures();
      setFeatures(fetchedFeatures);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const fetchContributions = async () => {
    try {
      const fetchedContributions = await getProjectContributions();
      setContributions(fetchedContributions);
    } catch (error) {
      console.error('Error fetching contributions:', error);
    }
  };

  const filterFeatures = () => {
    if (statusFilter === 'all') {
      setFilteredFeatures(features);
    } else {
      setFilteredFeatures(features.filter(feature => feature.status === statusFilter));
    }
  };

  const filterContributions = () => {
    if (statusFilter === 'all') {
      setFilteredContributions(contributions);
    } else {
      setFilteredContributions(contributions.filter(contribution => contribution.status === statusFilter));
    }
  };

  const handleFeatureStatusUpdate = async (featureId: string, status: 'approved' | 'rejected') => {
    setActionLoading(featureId);
    try {
      await updateProjectFeatureStatus(featureId, status);
      await fetchFeatures();
    } catch (error) {
      console.error('Error updating feature status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteFeature = async (featureId: string) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;
    
    setActionLoading(featureId);
    try {
      await deleteProjectFeature(featureId);
      await fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleContributionStatusUpdate = async (contributionId: string, status: 'approved' | 'rejected') => {
    setActionLoading(contributionId);
    try {
      await updateProjectContributionStatus(contributionId, status);
      await fetchContributions();
    } catch (error) {
      console.error('Error updating contribution status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteContribution = async (contributionId: string) => {
    if (!confirm('Are you sure you want to delete this contribution?')) return;
    
    setActionLoading(contributionId);
    try {
      await deleteProjectContribution(contributionId);
      await fetchContributions();
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
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'approved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'approved':
        return <Check className="w-3 h-3" />;
      case 'rejected':
        return <X className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const remove = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Projects Management
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light max-w-2xl">
              Manage community projects and feature suggestions
            </p>
          </div>
          {activeTab === 'projects' && (
            <Link 
              href="/admin/projects/new"
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-semibold hover:bg-emerald-500/20 transition-all hover:scale-105 active:scale-95 rounded-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </Link>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-8 bg-zinc-900/30 border border-zinc-800 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'projects'
                ? 'bg-white text-black shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'features'
                ? 'bg-white text-black shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Features
            {features.filter(f => f.status === 'pending').length > 0 && (
              <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {features.filter(f => f.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('contributions')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'contributions'
                ? 'bg-white text-black shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <GitPullRequest className="w-4 h-4" />
            Contributions
            {contributions.filter(c => c.status === 'pending').length > 0 && (
              <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {contributions.filter(c => c.status === 'pending').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-32">
        {activeTab === 'projects' ? (
          /* Projects List */
          projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-neutral-900/40 border border-white/5 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
              <p className="text-zinc-400 mb-6">Get started by creating your first project</p>
              <Link 
                href="/admin/projects/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-semibold hover:bg-emerald-500/20 transition-all hover:scale-105 active:scale-95 rounded-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Project
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="bg-neutral-900/40 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
                  <div className="p-8">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                            p.status?.toLowerCase().includes("open")
                              ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-400"
                              : "bg-amber-950/30 border-amber-500/20 text-amber-400"
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              p.status?.toLowerCase().includes("open") ? "bg-emerald-500" : "bg-amber-500"
                            }`}></div>
                            {p.status || "Active"}
                          </span>
                          {p.category && (
                            <span className="px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs font-medium">
                              {p.category}
                            </span>
                          )}
                          {p.version && (
                            <span className="px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs font-medium">
                              {p.version}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-8">
                        <Link 
                          href={`/admin/projects/${p.id}`}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-medium hover:bg-blue-500/20 transition-colors rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        <button 
                          onClick={() => remove(p.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : activeTab === 'features' ? (
          /* Features List */
          <div>
            {/* Features Stats and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-white">{features.length}</h3>
                <p className="text-zinc-400 text-sm">Total Features</p>
              </div>
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-yellow-400">{features.filter(f => f.status === 'pending').length}</h3>
                <p className="text-zinc-400 text-sm">Pending Review</p>
              </div>
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-emerald-400">{features.filter(f => f.status === 'approved').length}</h3>
                <p className="text-zinc-400 text-sm">Approved</p>
              </div>
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-red-400">{features.filter(f => f.status === 'rejected').length}</h3>
                <p className="text-zinc-400 text-sm">Rejected</p>
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={fetchFeatures}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  {statusFilter === 'all' ? 'All Features' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
                  <DropdownMenuItem onClick={() => setStatusFilter('all')} className="hover:bg-zinc-700">
                    All Features
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')} className="hover:bg-zinc-700">
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('approved')} className="hover:bg-zinc-700">
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('rejected')} className="hover:bg-zinc-700">
                    Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Features List */}
            {filteredFeatures.length === 0 ? (
              <div className="text-center py-12">
                <Lightbulb className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                <p className="text-zinc-400">No features found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeatures.map((feature) => (
                  <div key={feature.id} className="bg-neutral-900/40 border border-white/5 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(feature.status)}`}>
                            {getStatusIcon(feature.status)}
                            {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{feature.description}</p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {feature.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            {feature.github}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(feature.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="px-2 py-1 bg-zinc-800 rounded text-xs">{feature.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-blue-400">📁 {feature.projectName}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedFeature(feature)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                      
                      {feature.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleFeatureStatusUpdate(feature.id!, 'approved')}
                            disabled={actionLoading === feature.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm transition-colors disabled:opacity-50"
                          >
                            <Check className="w-3 h-3" />
                            {actionLoading === feature.id ? 'Processing...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleFeatureStatusUpdate(feature.id!, 'rejected')}
                            disabled={actionLoading === feature.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                            {actionLoading === feature.id ? 'Processing...' : 'Reject'}
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleDeleteFeature(feature.id!)}
                        disabled={actionLoading === feature.id}
                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'contributions' ? (
          /* Contributions List */
          <div>
            {/* Contributions Stats and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-white">{contributions.length}</h3>
                <p className="text-zinc-400 text-sm">Total Contributions</p>
              </div>
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-yellow-400">{contributions.filter(c => c.status === 'pending').length}</h3>
                <p className="text-zinc-400 text-sm">Pending Review</p>
              </div>
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-emerald-400">{contributions.filter(c => c.status === 'approved').length}</h3>
                <p className="text-zinc-400 text-sm">Approved</p>
              </div>
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-red-400">{contributions.filter(c => c.status === 'rejected').length}</h3>
                <p className="text-zinc-400 text-sm">Rejected</p>
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={fetchContributions}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  {statusFilter === 'all' ? 'All Contributions' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
                  <DropdownMenuItem onClick={() => setStatusFilter('all')} className="hover:bg-zinc-700">
                    All Contributions
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')} className="hover:bg-zinc-700">
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('approved')} className="hover:bg-zinc-700">
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('rejected')} className="hover:bg-zinc-700">
                    Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Contributions List */}
            {filteredContributions.length === 0 ? (
              <div className="text-center py-12">
                <GitPullRequest className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                <p className="text-zinc-400">No contributions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContributions.map((contribution) => (
                  <div key={contribution.id} className="bg-neutral-900/40 border border-white/5 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{contribution.title}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contribution.status)}`}>
                            {getStatusIcon(contribution.status)}
                            {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{contribution.description}</p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {contribution.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            {contribution.github}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(contribution.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="px-2 py-1 bg-zinc-800 rounded text-xs">{contribution.contributionType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="px-2 py-1 bg-zinc-800 rounded text-xs">{contribution.experienceLevel}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-blue-400">📁 {contribution.projectName}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedContribution(contribution)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                      
                      {contribution.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleContributionStatusUpdate(contribution.id!, 'approved')}
                            disabled={actionLoading === contribution.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm transition-colors disabled:opacity-50"
                          >
                            <Check className="w-3 h-3" />
                            {actionLoading === contribution.id ? 'Processing...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleContributionStatusUpdate(contribution.id!, 'rejected')}
                            disabled={actionLoading === contribution.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                            {actionLoading === contribution.id ? 'Processing...' : 'Reject'}
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleDeleteContribution(contribution.id!)}
                        disabled={actionLoading === contribution.id}
                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Contribution Detail Modal */}
      {selectedContribution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{selectedContribution.title}</h2>
              <button
                onClick={() => setSelectedContribution(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Description</h3>
                <p className="text-zinc-300">{selectedContribution.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">How You Can Help</h3>
                <p className="text-zinc-300">{selectedContribution.howCanHelp}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2">Contribution Type</h3>
                  <p className="text-zinc-300">{selectedContribution.contributionType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2">Experience Level</h3>
                  <p className="text-zinc-300">{selectedContribution.experienceLevel}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Timeline</h3>
                <p className="text-zinc-300">{selectedContribution.timeline}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Project</h3>
                <p className="text-zinc-300">{selectedContribution.projectName}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Contact Information</h3>
                <div className="space-y-1 text-zinc-300">
                  <p><strong>Name:</strong> {selectedContribution.name}</p>
                  <p><strong>GitHub:</strong> {selectedContribution.github}</p>
                  {selectedContribution.linkedin && <p><strong>LinkedIn:</strong> {selectedContribution.linkedin}</p>}
                  {selectedContribution.mobile && <p><strong>Mobile:</strong> {selectedContribution.mobile}</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              {selectedContribution.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleContributionStatusUpdate(selectedContribution.id!, 'approved');
                      setSelectedContribution(null);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleContributionStatusUpdate(selectedContribution.id!, 'rejected');
                      setSelectedContribution(null);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedContribution(null)}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{selectedFeature.title}</h2>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Description</h3>
                <p className="text-zinc-300">{selectedFeature.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Proposed Solution</h3>
                <p className="text-zinc-300">{selectedFeature.solution}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2">Category</h3>
                  <p className="text-zinc-300">{selectedFeature.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2">Difficulty</h3>
                  <p className="text-zinc-300">{selectedFeature.difficulty}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Project</h3>
                <p className="text-zinc-300">{selectedFeature.projectName}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Contact Information</h3>
                <div className="space-y-1 text-zinc-300">
                  <p><strong>Name:</strong> {selectedFeature.name}</p>
                  <p><strong>GitHub:</strong> {selectedFeature.github}</p>
                  {selectedFeature.linkedin && <p><strong>LinkedIn:</strong> {selectedFeature.linkedin}</p>}
                  {selectedFeature.mobile && <p><strong>Mobile:</strong> {selectedFeature.mobile}</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              {selectedFeature.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleFeatureStatusUpdate(selectedFeature.id!, 'approved');
                      setSelectedFeature(null);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleFeatureStatusUpdate(selectedFeature.id!, 'rejected');
                      setSelectedFeature(null);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedFeature(null)}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
