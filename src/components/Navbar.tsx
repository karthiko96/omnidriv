import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenGetStarted: () => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGetStarted, onOpenDownload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fafaf9]/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105 shadow-sm">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900 font-display">
            OmniDrive
          </span>
        </a>

        {/* Zone 2: Navigation Links (Text with hover underlines, 4-6 links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <a href="#why-omnidrive" className="hover:text-neutral-950 transition-colors whitespace-nowrap">
            Why OmniDrive
          </a>
          <a href="#workspace" className="hover:text-neutral-950 transition-colors whitespace-nowrap">
            Workspace
          </a>
          <a href="#ai-search" className="hover:text-neutral-950 transition-colors whitespace-nowrap">
            AI Search
          </a>
          <a href="#developers" className="hover:text-neutral-950 transition-colors whitespace-nowrap">
            Developers & Agents
          </a>
          <a href="#pricing" className="hover:text-neutral-950 transition-colors whitespace-nowrap">
            Pricing
          </a>
          <a href="#security" className="hover:text-neutral-950 transition-colors whitespace-nowrap">
            Security
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenDownload}
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100/80 rounded-md transition-colors whitespace-nowrap"
          >
            Download
          </button>
          <button
            onClick={onOpenGetStarted}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-all hover:shadow whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Get Started Free</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenDownload}
            className="px-3 py-1.5 text-xs font-medium text-white bg-neutral-900 rounded-md"
          >
            Download
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-[#fafaf9] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#why-omnidrive"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950"
          >
            Why OmniDrive
          </a>
          <a
            href="#workspace"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950"
          >
            Personal & Team Workspace
          </a>
          <a
            href="#ai-search"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950"
          >
            AI Search
          </a>
          <a
            href="#developers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950"
          >
            Developers & Agent Access
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950"
          >
            Pricing
          </a>
          <a
            href="#security"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950"
          >
            Security & Administration
          </a>
          <a
            href="#download-center"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950"
          >
            Download Center
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-neutral-900 rounded-lg shadow-sm"
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
