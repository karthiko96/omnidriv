import React, { useState } from 'react';
import { Share2, Lock, Eye, Download, Copy, Check, ShieldCheck, Globe, Calendar } from 'lucide-react';

export const SecureSharing: React.FC = () => {
  const [requirePassword, setRequirePassword] = useState(true);
  const [allowDownload, setAllowDownload] = useState(false);
  const [watermark, setWatermark] = useState(true);
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="secure-sharing" className="py-24 border-t border-neutral-200/80 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider">
              <Share2 className="w-4 h-4 text-neutral-800" />
              <span>Zero-Trust Distribution</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
              Secure sharing with military-grade guardrails
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Share 100 GB deliverables with clients and external partners with complete peace of mind. Apply dynamic watermarking, revoke access instantly, or configure view-only streaming.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-neutral-900">Dynamic Viewer Watermarking</div>
                  <div className="text-neutral-500 mt-0.5">Embeds the recipient's email address and timestamp across confidential PDF decks and videos.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 flex items-start gap-3">
                <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-neutral-900">Branded Upload Portals</div>
                  <div className="text-neutral-500 mt-0.5">Receive gigabytes of camera raw files from freelance contractors directly into your team drive without giving them drive access.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right interactive link configurator */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-neutral-900">Share Link Configurator</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">File: launch-hero_4k.mov (24.3 GB)</span>
              </div>

              {/* Toggles */}
              <div className="mt-5 space-y-4">
                {/* Password Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-neutral-700" />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">End-to-End Password Protection</div>
                      <div className="text-[11px] text-neutral-500">Require passphrase before streaming begins</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={requirePassword}
                    onChange={(e) => setRequirePassword(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                  />
                </div>

                {/* View-Only / Prevent Download */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                  <div className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-neutral-700" />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Prevent Raw File Download</div>
                      <div className="text-[11px] text-neutral-500">Enable in-browser streaming only; block local saving</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={!allowDownload}
                    onChange={(e) => setAllowDownload(!e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                  />
                </div>

                {/* Watermarking */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                  <div className="flex items-center gap-2.5">
                    <Eye className="w-4 h-4 text-neutral-700" />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Dynamic Recipient Watermark</div>
                      <div className="text-[11px] text-neutral-500">Overlay viewer email & timestamp to deter leaks</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={watermark}
                    onChange={(e) => setWatermark(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                  />
                </div>

                {/* Expiration */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-neutral-700" />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Automatic Link Expiration</div>
                      <div className="text-[11px] text-neutral-500">Self-destruct link access automatically</div>
                    </div>
                  </div>
                  <select
                    value={expiresInDays}
                    onChange={(e) => setExpiresInDays(Number(e.target.value))}
                    className="text-xs font-mono bg-white border border-neutral-200 rounded px-2 py-1 text-neutral-800"
                  >
                    <option value={1}>24 hours</option>
                    <option value={7}>7 days</option>
                    <option value={30}>30 days</option>
                    <option value={90}>90 days</option>
                  </select>
                </div>
              </div>

              {/* Generated Secure Link Output */}
              <div className="mt-6 pt-5 border-t border-neutral-100 space-y-2">
                <div className="text-[11px] font-mono text-neutral-500">Generated Secure Link:</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 rounded-lg bg-neutral-100 font-mono text-xs text-neutral-800 truncate select-all">
                    https://share.omnidrive.io/s/x8k92b?exp={expiresInDays}d&wm={watermark ? '1' : '0'}&dl={allowDownload ? '1' : '0'}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
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
