import React, { useState } from 'react';
import { X, HardDrive, ShieldCheck, Clock, Share2, Play, Download, Copy, Check } from 'lucide-react';
import { DriveFile } from '../types';

interface FilePreviewModalProps {
  file: DriveFile | null;
  onClose: () => void;
  onOpenShare: () => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  file,
  onClose,
  onOpenShare
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!file) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://omnidrive.io/f/${file.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 font-mono text-sm uppercase">
            {file.type.slice(0, 3)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-950 font-display truncate max-w-md">
              {file.name}
            </h3>
            <div className="text-xs text-neutral-500 font-mono mt-0.5">
              {file.size} &middot; Modified {file.modified} by {file.author}
            </div>
          </div>
        </div>

        {/* Simulated Preview Box */}
        <div className="mt-6 rounded-xl bg-neutral-950 text-white p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] text-center">
          <div className="text-xs font-mono text-emerald-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Virtual Byte-Stream Available &middot; {file.streamingSpeed}</span>
          </div>

          <div className="text-sm font-medium text-neutral-200 max-w-sm">
            {file.description || 'Native file ready to stream straight to your desktop application.'}
          </div>

          {file.type === 'video' && (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium cursor-pointer transition-colors">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Zero-Delay Playhead Scrub</span>
            </div>
          )}
        </div>

        {/* Technical Specs */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200/60 space-y-1">
            <div className="text-neutral-500 font-mono text-[11px]">Storage Footprint</div>
            <div className="font-semibold text-neutral-900">0 B on local disk</div>
            <div className="text-[10px] text-emerald-700">Persisted in edge object tier</div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200/60 space-y-1">
            <div className="text-neutral-500 font-mono text-[11px]">Security State</div>
            <div className="font-semibold text-neutral-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>AES-256 GCM</span>
            </div>
            <div className="text-[10px] text-neutral-500">Zero-knowledge envelope</div>
          </div>
        </div>

        <section className="mt-5 rounded-xl border border-neutral-200 bg-white p-4">
          <h4 className="text-sm font-semibold text-neutral-900">File details</h4>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
            <div><dt className="text-neutral-500">Type</dt><dd className="mt-0.5 font-medium capitalize text-neutral-800">{file.type}</dd></div>
            <div><dt className="text-neutral-500">Size</dt><dd className="mt-0.5 font-medium text-neutral-800">{file.size}</dd></div>
            <div><dt className="text-neutral-500">Owner</dt><dd className="mt-0.5 font-medium text-neutral-800">{file.author}</dd></div>
            <div><dt className="text-neutral-500">Created</dt><dd className="mt-0.5 font-medium text-neutral-800">{file.created || 'Oct 2, 2026'}</dd></div>
            <div><dt className="text-neutral-500">Modified</dt><dd className="mt-0.5 font-medium text-neutral-800">{file.modified}</dd></div>
            <div><dt className="text-neutral-500">Location</dt><dd className="mt-0.5 font-medium text-neutral-800">{file.location || 'My Files / Launch Assets'}</dd></div>
            <div><dt className="text-neutral-500">Project</dt><dd className="mt-0.5 font-medium text-neutral-800">{file.project || 'Launch Assets'}</dd></div>
            <div><dt className="text-neutral-500">Version</dt><dd className="mt-0.5 font-medium text-neutral-800">{file.version || 'v3.2 · latest'}</dd></div>
            <div className="col-span-2"><dt className="text-neutral-500">Permissions</dt><dd className="mt-0.5 font-medium text-neutral-800">{(file.permissions || ['Owner: full access', 'Team: view and comment']).join(' · ')}</dd></div>
            <div className="col-span-2"><dt className="text-neutral-500">Tags</dt><dd className="mt-1 flex flex-wrap gap-1">{(file.tags?.length ? file.tags : ['launch', file.type, 'team-shared']).map(tag=><span key={tag} className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-700">{tag}</span>)}</dd></div>
            <div className="col-span-2"><dt className="text-neutral-500">Storage location</dt><dd className="mt-0.5 font-medium text-neutral-800">{file.storageLocation || 'OmniDrive cloud · encrypted object storage'}</dd></div>
            <div className="col-span-2"><dt className="text-neutral-500">AI-generated metadata</dt><dd className="mt-0.5 text-neutral-700">{(file.aiMetadata || [file.type === 'video' ? 'Video asset · high resolution · launch campaign' : `${file.type} file · launch campaign · team workspace`]).join(' · ')}</dd></div>
            <div className="col-span-2"><dt className="text-neutral-500">Recent access</dt><dd className="mt-0.5 text-neutral-700">{(file.accessHistory || [`${file.author} · opened ${file.modified}`, 'You · synced just now']).join(' · ')}</dd></div>
          </dl>
        </section>

        {/* Actions */}
        <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied Link' : 'Copy Internal Link'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenShare();
              }}
              className="px-4 py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Configure Secure Share</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-colors"
            >
              Open in Native App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
