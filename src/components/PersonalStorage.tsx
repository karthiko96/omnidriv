import React, { useState } from 'react';
import { HardDrive, Wifi, WifiOff, Laptop, Smartphone, Monitor } from 'lucide-react';

export const PersonalStorage: React.FC = () => {
  const [offlinePinned, setOfflinePinned] = useState(true);
  const [cacheSize, setCacheSize] = useState(2.4); // GB

  return (
    <section id="personal-storage" className="py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
            Terabytes of files. Zero bytes on disk.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Open and edit everything in OmniDrive right from Finder, Windows Explorer, or Linux, without it ever filling up your local computer.
          </p>
        </div>

        {/* Interactive personal disk footprint visualizer */}
        <div className="mt-16 max-w-4xl mx-auto rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Device & Cloud stats */}
            <div className="md:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">MacBook Pro 512 GB SSD</div>
                  <div className="text-xs text-neutral-500">Mounted mount point: /Volumes/OmniDrive</div>
                </div>
              </div>

              {/* Disk breakdown bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-500">Local Cache Utilized</span>
                  <span className="font-semibold text-neutral-900">{cacheSize.toFixed(1)} GB / 512 GB</span>
                </div>
                <div className="h-3 w-full bg-neutral-200 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${(cacheSize / 512) * 100 * 8}%` }}
                    title="Active Hot Cache"
                  />
                  <div className="bg-neutral-300 h-full w-[20%]" title="macOS System" />
                  <div className="bg-neutral-100 h-full flex-1" title="Free space" />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Hot cache (dynamically pruned)
                  </span>
                  <span>94% local disk free</span>
                </div>
              </div>

              {/* Cloud Virtual Space */}
              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                    <HardDrive className="w-4 h-4 text-emerald-600" />
                    <span>Virtual Cloud Filesystem</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    12.8 TB Ready
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-normal">
                  All 12.8 TB of your project archives, 4K footage, and design assets appear as normal local files. Files stream upon double-click.
                </p>
              </div>

              {/* Offline pin toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-neutral-200/80">
                <div className="flex items-center gap-2.5">
                  {offlinePinned ? (
                    <Wifi className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-neutral-400" />
                  )}
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">Offline Flight Mode</div>
                    <div className="text-[11px] text-neutral-500">Pin key pitch decks for airplanes</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOfflinePinned(!offlinePinned);
                    setCacheSize(offlinePinned ? 0.8 : 2.4);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    offlinePinned
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {offlinePinned ? 'Pinned (2.4 GB)' : 'Cloud Only'}
                </button>
              </div>
            </div>

            {/* Right: Multi-Device Sync Card */}
            <div className="md:col-span-6 space-y-4">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Cross-Device Continuity
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-neutral-200/80 flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-neutral-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">Workstation PC (Studio)</div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Renders 3D frames into `/Volumes/OmniDrive/Renders`. Zero network sync delay.
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live in sync &middot; 4ms latency
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-neutral-200/80 flex items-start gap-3">
                  <Laptop className="w-5 h-5 text-neutral-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">MacBook Air (Travel)</div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Review renders in the coffee shop without downloading full raw EXR passes.
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live in sync &middot; Smart streaming
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-neutral-200/80 flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-neutral-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">iPhone / iPad Mobile App</div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Instant mobile camera uploads to workspace and on-the-go quick look.
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live in sync &middot; Biometric secure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
