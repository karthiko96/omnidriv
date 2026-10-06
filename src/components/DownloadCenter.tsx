import React, { useState } from 'react';
import { Download, Apple, Monitor, Terminal, Smartphone, Check, ArrowRight } from 'lucide-react';
import { PlatformType } from '../types';

interface DownloadCenterProps {
  onTriggerDownload: (platform: PlatformType) => void;
}

export const DownloadCenter: React.FC<DownloadCenterProps> = ({ onTriggerDownload }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('macos');
  const [copiedCurl, setCopiedCurl] = useState(false);

  const platforms = [
    {
      id: 'macos' as PlatformType,
      name: 'macOS',
      version: 'v2.8.4',
      size: '68 MB',
      requirements: 'macOS 12 Monterey or later (Apple Silicon & Intel Universal)',
      actionText: 'Download for Mac (.dmg)',
      icon: Apple
    },
    {
      id: 'windows' as PlatformType,
      name: 'Windows',
      version: 'v2.8.4',
      size: '74 MB',
      requirements: 'Windows 10 / 11 (64-bit)',
      actionText: 'Download for Windows (.exe)',
      icon: Monitor
    },
    {
      id: 'linux' as PlatformType,
      name: 'Linux',
      version: 'v2.8.4',
      size: '54 MB',
      requirements: 'Ubuntu 20.04+, Debian 11+, Fedora 36+, Arch Linux',
      actionText: 'Download Linux AppImage / .deb',
      icon: Terminal
    },
    {
      id: 'ios' as PlatformType,
      name: 'iOS & iPadOS',
      version: 'v2.8.1',
      size: '42 MB',
      requirements: 'iOS 16.0 or later (iPhone & iPad)',
      actionText: 'Get on App Store',
      icon: Smartphone
    },
    {
      id: 'android' as PlatformType,
      name: 'Android',
      version: 'v2.8.1',
      size: '48 MB',
      requirements: 'Android 10.0 or later',
      actionText: 'Get on Google Play',
      icon: Smartphone
    },
    {
      id: 'cli' as PlatformType,
      name: 'Headless CLI & FUSE',
      version: 'v2.8.4',
      size: '18 MB',
      requirements: 'POSIX compatible daemon for servers, Docker & CI/CD',
      actionText: 'Copy Curl Install Script',
      icon: Terminal
    }
  ];

  const current = platforms.find((p) => p.id === selectedPlatform) || platforms[0];

  const handleCopyCli = () => {
    navigator.clipboard.writeText('curl -fsSL https://get.omnidrive.io/install.sh | sh');
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <section id="download-center" className="py-24 border-t border-neutral-200/80 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider mb-3">
            <Download className="w-4 h-4 text-neutral-900" />
            <span>Universal Native Clients</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
            Download OmniDrive Center
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Download OmniDrive and see how it handles terabytes of files with ease. Available on all desktop, mobile, and headless server platforms.
          </p>
        </div>

        {/* Platform selection tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {platforms.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Platform Detail Card */}
        <div className="mt-8 max-w-2xl mx-auto rounded-2xl border border-neutral-200/90 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                <current.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-950 font-display">
                  OmniDrive for {current.name}
                </h3>
                <div className="text-xs font-mono text-neutral-500 mt-0.5">
                  Version {current.version} &middot; {current.size} &middot; SHA-256 Verified
                </div>
              </div>
            </div>

            <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 rounded-md border border-emerald-200/60">
              Stable Release
            </span>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 text-xs text-neutral-600">
            <strong>System Requirements:</strong> {current.requirements}
          </div>

          {selectedPlatform === 'cli' ? (
            <div className="mt-6 space-y-3">
              <div className="p-3 bg-neutral-950 text-neutral-100 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto">
                <code>curl -fsSL https://get.omnidrive.io/install.sh | sh</code>
                <button
                  onClick={handleCopyCli}
                  className="ml-3 px-3 py-1 rounded bg-neutral-800 text-xs hover:bg-neutral-700 text-neutral-200 shrink-0"
                >
                  {copiedCurl ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-neutral-500">
                Installs the `omnidrive` CLI binary to `/usr/local/bin/omnidrive` with systemd unit file.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <button
                onClick={() => onTriggerDownload(selectedPlatform)}
                className="w-full py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{current.actionText}</span>
              </button>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>Automatic continuous background updates</span>
            <span>Zero reboot required</span>
          </div>
        </div>
      </div>
    </section>
  );
};
