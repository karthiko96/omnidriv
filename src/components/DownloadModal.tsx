import React, { useState, useEffect } from 'react';
import { X, Download, Check, Apple, Monitor, Terminal, Smartphone } from 'lucide-react';
import { PlatformType } from '../types';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatform?: PlatformType;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  defaultPlatform = 'macos'
}) => {
  const [platform, setPlatform] = useState<PlatformType>(defaultPlatform);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setPlatform(defaultPlatform);
  }, [defaultPlatform]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDownloading && progress < 100) {
      timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 25, 100));
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isDownloading, progress]);

  if (!isOpen) return null;

  const handleStartDownload = () => {
    setIsDownloading(true);
    setProgress(15);
  };

  const platformInfo = {
    macos: {
      name: 'macOS Universal',
      filename: 'OmniDrive-2.8.4-universal.dmg',
      size: '68.4 MB',
      icon: Apple,
      hint: 'Double click the .dmg file and drag OmniDrive into your Applications folder.'
    },
    windows: {
      name: 'Windows 10 / 11 (64-bit)',
      filename: 'OmniDrive-Setup-2.8.4-x64.exe',
      size: '74.1 MB',
      icon: Monitor,
      hint: 'Run installer as Administrator to initialize the high-speed virtual disk driver.'
    },
    linux: {
      name: 'Linux (Debian / Fedora / AppImage)',
      filename: 'omnidrive_2.8.4_amd64.deb',
      size: '54.2 MB',
      icon: Terminal,
      hint: 'Install via sudo dpkg -i omnidrive_2.8.4_amd64.deb or chmod +x OmniDrive.AppImage'
    },
    ios: {
      name: 'iOS & iPadOS',
      filename: 'OmniDrive on App Store',
      size: '42.0 MB',
      icon: Smartphone,
      hint: 'Scan QR code or open Apple App Store to sync with Files app.'
    },
    android: {
      name: 'Android',
      filename: 'OmniDrive on Google Play',
      size: '48.0 MB',
      icon: Smartphone,
      hint: 'Available on Google Play Store with biometric encryption unlock.'
    },
    cli: {
      name: 'Headless CLI Daemon',
      filename: 'omnidrive-cli-linux-amd64.tar.gz',
      size: '18.2 MB',
      icon: Terminal,
      hint: 'Run: curl -fsSL https://get.omnidrive.io/install.sh | sh'
    }
  }[platform];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
          <Download className="w-4 h-4 text-neutral-900" />
          <span>Official Distribution</span>
        </div>

        <h3 className="text-2xl font-bold text-neutral-950 font-display">
          Download OmniDrive
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          Mount terabytes of files on your machine with zero local disk usage.
        </p>

        {/* Platform selection pills */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {(['macos', 'windows', 'linux', 'ios', 'android', 'cli'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPlatform(p);
                setProgress(0);
                setIsDownloading(false);
              }}
              className={`py-2 px-2.5 rounded-lg text-xs font-medium uppercase transition-colors text-center truncate ${
                platform === p
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Details Card */}
        <div className="mt-6 p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <platformInfo.icon className="w-5 h-5 text-neutral-800" />
              <div>
                <div className="text-sm font-semibold text-neutral-900">{platformInfo.name}</div>
                <div className="text-[11px] font-mono text-neutral-500">{platformInfo.filename}</div>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-600 font-medium">{platformInfo.size}</span>
          </div>

          <p className="text-xs text-neutral-600 bg-white p-2.5 rounded-lg border border-neutral-200/50">
            {platformInfo.hint}
          </p>

          {isDownloading ? (
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-600">
                  {progress === 100 ? 'Download Complete!' : 'Downloading package...'}
                </span>
                <span className="font-semibold text-neutral-900">{progress}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-neutral-900 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleStartDownload}
            disabled={progress === 100}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            {progress === 100 ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Installer Ready</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Downloading...' : 'Start Download'}</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 text-center text-[11px] text-neutral-400 font-mono">
          SHA-256: e82b7f309a941bf52c9d749a03b5... verified
        </div>
      </div>
    </div>
  );
};
