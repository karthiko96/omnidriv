import React, { useState } from 'react';
import { History, GitFork, RotateCcw, Check, Sparkles } from 'lucide-react';

interface VersionSnapshot {
  id: string;
  time: string;
  author: string;
  summary: string;
  changes: string;
  size: string;
}

export const VersionHistory: React.FC = () => {
  const snapshots: VersionSnapshot[] = [
    {
      id: 'v4',
      time: 'Today 10:14 AM',
      author: 'Claude Code Agent',
      summary: 'Regenerated optimized albedo textures & updated lighting bake',
      changes: '4 files modified · 2 added',
      size: '14.8 TB'
    },
    {
      id: 'v3',
      time: 'Yesterday 4:32 PM',
      author: 'Elena Rostova',
      summary: 'Approved pitch deck final typography adjustments and legal annex',
      changes: '1 deck updated',
      size: '14.8 TB'
    },
    {
      id: 'v2',
      time: 'Oct 02 11:20 AM',
      author: 'Marcus Vance',
      summary: 'Added 4K ProRes launch cut and master color grade',
      changes: '1 video added (+24.3 GB)',
      size: '14.8 TB'
    },
    {
      id: 'v1',
      time: 'Sep 28 09:00 AM',
      author: 'System Initializer',
      summary: 'Initial workspace repository creation and team provisioning',
      changes: 'Workspace baseline',
      size: '10.2 TB'
    }
  ];

  const [activeSnapshot, setActiveSnapshot] = useState<VersionSnapshot>(snapshots[0]);
  const [restored, setRestored] = useState(false);
  const [forked, setForked] = useState(false);

  const handleRollback = () => {
    setRestored(true);
    setTimeout(() => setRestored(false), 2200);
  };

  const handleFork = () => {
    setForked(true);
    setTimeout(() => setForked(false), 2200);
  };

  return (
    <section id="version-history" className="py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider">
              <History className="w-4 h-4 text-neutral-800" />
              <span>Immutable Snapshotting</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
              Time-travel your files. Fork entire drives.
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Every save is recorded as an immutable cryptographic block. If an editor overwrites a file or an agent makes a mistake, roll back instantly without downtime.
            </p>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-neutral-900">
                <GitFork className="w-4 h-4 text-purple-600" />
                <span>Zero-Byte Copy-on-Write Drive Forks</span>
              </div>
              <p className="text-neutral-600 leading-normal">
                Want to test an experimental 10 TB pipeline? Fork the entire drive in 1 second. It shares identical block pointers and takes zero extra storage until modified.
              </p>
            </div>
          </div>

          {/* Right interactive scrubber */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200/90 bg-[#fafaf9] p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80">
                <span className="text-xs font-semibold text-neutral-800">Timeline Snapshots</span>
                <span className="text-xs font-mono text-neutral-500">Workspace / Launch Assets</span>
              </div>

              {/* Snapshot selector list */}
              <div className="mt-4 space-y-2.5">
                {snapshots.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveSnapshot(item)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeSnapshot.id === item.id
                        ? 'border-neutral-900 bg-white shadow-sm'
                        : 'border-neutral-200/70 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-neutral-900">{item.time}</span>
                        <span className="text-[11px] text-neutral-500 font-mono">by {item.author}</span>
                      </div>
                      <div className="text-xs text-neutral-600 line-clamp-1">{item.summary}</div>
                    </div>

                    <div className="text-right text-[11px] font-mono text-neutral-400">
                      <div>{item.changes}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active snapshot actions */}
              <div className="mt-6 pt-5 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-neutral-600 font-mono">
                  Active state: <strong className="text-neutral-900">{activeSnapshot.time}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRollback}
                    className="px-3.5 py-1.5 text-xs font-semibold text-neutral-800 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                  >
                    {restored ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <RotateCcw className="w-3.5 h-3.5" />}
                    <span>{restored ? 'Restored Snapshot!' : 'Rollback to this point'}</span>
                  </button>

                  <button
                    onClick={handleFork}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                  >
                    {forked ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <GitFork className="w-3.5 h-3.5" />}
                    <span>{forked ? 'Forked Drive (0 Bytes Used)!' : 'Fork this version'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
