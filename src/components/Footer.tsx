import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenGetStarted: () => void;
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGetStarted, onOpenDownload }) => {
  return (
    <footer className="border-t border-neutral-200/80 bg-[#fafaf9] pt-16 pb-12 text-xs text-neutral-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-footer call to action banner */}
        <div className="mb-16 text-center max-w-xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-display">
            Start streaming files today.
          </h3>
          <p className="text-neutral-600 text-sm">
            Experience the infinite filesystem with your team or personal projects.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenGetStarted}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-all"
            >
              Get Started Free
            </button>
            <button
              onClick={onOpenDownload}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-800 bg-white border border-neutral-200 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Download Native Apps
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-10 border-t border-neutral-200/80">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-neutral-900 flex items-center justify-center text-white font-bold text-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <span className="text-base font-bold text-neutral-900 font-display">OmniDrive</span>
            </div>
            <p className="text-neutral-500 text-xs max-w-sm leading-relaxed">
              The AI-native virtual filesystem. Store, sync, search, share and manage everything from one place with zero local disk bloat.
            </p>
          </div>

          <div>
            <div className="font-semibold text-neutral-900 mb-3">Product</div>
            <ul className="space-y-2">
              <li><a href="#why-omnidrive" className="hover:text-neutral-900 transition-colors">Why OmniDrive</a></li>
              <li><a href="#personal-storage" className="hover:text-neutral-900 transition-colors">Personal Storage</a></li>
              <li><a href="#workspace" className="hover:text-neutral-900 transition-colors">Team Workspace</a></li>
              <li><a href="#ai-search" className="hover:text-neutral-900 transition-colors">AI Search</a></li>
              <li><a href="#large-file-storage" className="hover:text-neutral-900 transition-colors">Large-File Streaming</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-neutral-900 mb-3">Platform</div>
            <ul className="space-y-2">
              <li><a href="#developers" className="hover:text-neutral-900 transition-colors">Developer & API SDK</a></li>
              <li><a href="#ai-agents" className="hover:text-neutral-900 transition-colors">AI Agent MCP Mounts</a></li>
              <li><a href="#security" className="hover:text-neutral-900 transition-colors">Zero-Knowledge Security</a></li>
              <li><a href="#business-admin" className="hover:text-neutral-900 transition-colors">Business Administration</a></li>
              <li><a href="#download-center" className="hover:text-neutral-900 transition-colors">Download Center</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-neutral-900 mb-3">Company</div>
            <ul className="space-y-2">
              <li><a href="#pricing" className="hover:text-neutral-900 transition-colors">Pricing & Plans</a></li>
              <li><a href="#faq" className="hover:text-neutral-900 transition-colors">Common Questions</a></li>
              <li><a href="#security" className="hover:text-neutral-900 transition-colors">Security Whitepaper</a></li>
              <li><a href="#contact" onClick={onOpenGetStarted} className="hover:text-neutral-900 transition-colors">Contact Sales</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-neutral-400">
            &copy; {new Date().getFullYear()} OmniDrive Technologies, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Security Compliance</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
