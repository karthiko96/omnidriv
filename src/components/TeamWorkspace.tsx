import React, { useState } from 'react';
import { Users, Lock, Shield, FileEdit, CheckCircle2 } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  status: string;
  currentFile: string;
  avatarColor: string;
}

export const TeamWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'presence' | 'roles' | 'activity'>('presence');

  const members: TeamMember[] = [
    {
      name: 'Elena Rostova',
      role: 'Principal Designer',
      status: 'editing',
      currentFile: 'Brand_Guidelines_v3.fig',
      avatarColor: 'bg-indigo-500'
    },
    {
      name: 'Kai Chen',
      role: 'Lead 3D Artist',
      status: 'streaming',
      currentFile: 'Canyon_Rock_Albedo_8K.png',
      avatarColor: 'bg-emerald-500'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Video Editor',
      status: 'rendering',
      currentFile: 'launch-hero_4k.mov',
      avatarColor: 'bg-amber-500'
    },
    {
      name: 'Claude Code Agent',
      role: 'Headless Agent',
      status: 'writing',
      currentFile: 'src/analytics/pipeline.ts',
      avatarColor: 'bg-purple-600'
    }
  ];

  return (
    <section id="workspace" className="py-24 border-t border-neutral-200/80 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider">
              <Users className="w-4 h-4 text-neutral-800" />
              <span>Collaborative Infrastructure</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
              Team workspace without sync collisions
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Eliminate "File_Final_v2_FINAL_Copy.zip" forever. OmniDrive provides team drives with atomic file locks, real-time presence indicators, and millisecond state replication.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-700">
                  <strong>Atomic Write Locks:</strong> Prevent two editors from accidentally overwriting massive 4K timelines or 3D scene files.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-700">
                  <strong>Role-Based Access Control:</strong> Strict boundary enforcement for Admins, Members, External Contractors, and Headless AI Agents.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-700">
                  <strong>Unified Team Storage Pool:</strong> Shared multi-terabyte pools that expand dynamically without per-seat provisioning friction.
                </span>
              </div>
            </div>
          </div>

          {/* Right interactive team console */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200/90 bg-white shadow-xl overflow-hidden">
              {/* Header bar */}
              <div className="p-4 border-b border-neutral-200/80 bg-neutral-50/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-neutral-800">Workspace: Studio Creative & Eng</span>
                </div>

                {/* Segmented Tab controls */}
                <div className="flex items-center gap-1 p-1 bg-neutral-200/60 rounded-lg text-xs">
                  <button
                    onClick={() => setActiveTab('presence')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === 'presence' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Live Presence
                  </button>
                  <button
                    onClick={() => setActiveTab('roles')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === 'roles' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Permissions
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === 'activity' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Audit Feed
                  </button>
                </div>
              </div>

              {/* Tab Contents */}
              <div className="p-5">
                {activeTab === 'presence' && (
                  <div className="space-y-3">
                    <div className="text-xs text-neutral-500">
                      4 collaborators active on this drive right now:
                    </div>
                    {members.map((member) => (
                      <div
                        key={member.name}
                        className="p-3 rounded-xl border border-neutral-200/80 bg-neutral-50/40 hover:bg-neutral-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${member.avatarColor} text-white font-bold text-xs flex items-center justify-center`}>
                            {member.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                              {member.name}
                              <span className="text-[10px] text-neutral-400 font-normal">({member.role})</span>
                            </div>
                            <div className="text-[11px] text-neutral-600 font-mono mt-0.5 flex items-center gap-1">
                              <FileEdit className="w-3 h-3 text-neutral-400" />
                              <span className="truncate max-w-[200px] sm:max-w-xs">{member.currentFile}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/50">
                          <Lock className="w-3 h-3" />
                          <span className="capitalize">{member.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'roles' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl border border-neutral-200/80 space-y-1">
                      <div className="flex justify-between font-semibold text-neutral-900">
                        <span>Organization Owners & Admins</span>
                        <span className="text-neutral-500 font-normal">Full drive configuration</span>
                      </div>
                      <p className="text-neutral-600">Can create team drives, revoke access tokens, manage encryption keys, and export audit trails.</p>
                    </div>
                    <div className="p-3 rounded-xl border border-neutral-200/80 space-y-1">
                      <div className="flex justify-between font-semibold text-neutral-900">
                        <span>Staff Editors (Designers / Engineers)</span>
                        <span className="text-neutral-500 font-normal">Read / Write / Stream</span>
                      </div>
                      <p className="text-neutral-600">Direct FUSE filesystem mount, atomic locking, automatic continuous sync, branch creation.</p>
                    </div>
                    <div className="p-3 rounded-xl border border-neutral-200/80 space-y-1">
                      <div className="flex justify-between font-semibold text-neutral-900">
                        <span>AI Agent Service Accounts</span>
                        <span className="text-neutral-500 font-normal">Scoped Path Sandbox</span>
                      </div>
                      <p className="text-neutral-600">Isolated token access restricted only to specified project directories with rate-limited write ops.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-between">
                      <span className="text-neutral-700">Claude Code saved <span className="text-purple-600 font-semibold">src/analytics/pipeline.ts</span></span>
                      <span className="text-[10px] text-neutral-400">12s ago</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-between">
                      <span className="text-neutral-700">Elena acquired lock on <span className="text-neutral-900 font-semibold">Brand_Guidelines_v3.fig</span></span>
                      <span className="text-[10px] text-neutral-400">1m ago</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-between">
                      <span className="text-neutral-700">Sarah streamed 4.2 GB of <span className="text-neutral-900 font-semibold">launch-hero_4k.mov</span></span>
                      <span className="text-[10px] text-neutral-400">4m ago</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-neutral-700" />
                  SCIM 2.0 automatic user sync enabled
                </span>
                <span className="font-mono text-neutral-700">100% SLA High Availability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
