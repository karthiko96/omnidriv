import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is OmniDrive?',
      a: 'OmniDrive is a cloud filesystem that appears as a regular virtual drive on macOS, Windows, and Linux. You can open and save files with the apps you already use, while OmniDrive keeps them in the cloud and up to date across your computers, team members, and autonomous AI agents without filling your local SSD.'
    },
    {
      q: 'Is OmniDrive for individuals or companies?',
      a: 'Both. Individuals use OmniDrive to access 20+ terabytes of raw camera footage, blender renders, and music projects on lightweight laptops. Teams and enterprises use it for collaborative team drives, atomic file locking, granular access controls, and zero-knowledge compliance.'
    },
    {
      q: 'How is OmniDrive different from existing cloud drives like Dropbox or Google Drive?',
      a: 'Traditional cloud drives download the entire file before your application can open it, forcing you to wait 20 minutes for a 15 GB video and consuming your local disk. OmniDrive streams precise byte ranges from the cloud in real time using a low-latency virtual kernel driver. A 100 GB file opens in 200 milliseconds.'
    },
    {
      q: 'How does OmniDrive save disk space?',
      a: 'OmniDrive uses an intelligent local dynamic cache. Only the specific file blocks currently being read or modified are kept in your local SSD RAM/cache. The remaining gigabytes stay in the cloud, keeping your local disk usage near zero bytes.'
    },
    {
      q: 'Will it work with my existing apps?',
      a: 'Yes. OmniDrive mounts natively into the OS kernel via FUSE. Adobe Premiere, Final Cut, DaVinci Resolve, Figma, Blender, Unreal Engine, Xcode, Revit, Excel, and terminal utilities (like ffmpeg or git) treat OmniDrive as a normal high-speed internal drive.'
    },
    {
      q: 'How do files stay in sync across devices?',
      a: 'Whenever you hit save in an application, the delta block modifications are compressed, encrypted, and streamed to the OmniDrive edge network within milliseconds. All connected computers and teammates receive instant file system mutation events.'
    },
    {
      q: 'Do I need an internet connection? What about offline mode?',
      a: 'You can pin any file or folder for offline use with one click (for flights or spotty internet). Pinned files remain fully accessible offline. Once you reconnect to the internet, any local changes sync automatically without conflict.'
    },
    {
      q: 'What internet speed do you recommend?',
      a: 'OmniDrive functions smoothly on standard 25 Mbps broadband. For heavy 4K/8K video editing or large 3D scene streaming, 100 Mbps or higher is recommended for maximum scrubbing fluidity.'
    },
    {
      q: 'Can AI agents use OmniDrive?',
      a: 'Yes! OmniDrive includes native support for the Model Context Protocol (MCP) server and headless CLI daemons. Autonomous agents like Claude Code, Cursor, and OpenAI Swarms can read and write files directly within scoped sandboxes.'
    },
    {
      q: 'Is there an SDK?',
      a: 'Yes. We offer official SDKs for TypeScript/Node.js, Python, Go, and Rust, as well as a full REST & GraphQL API for custom integrations and webhooks.'
    },
    {
      q: 'Which platforms does OmniDrive support?',
      a: 'macOS (Apple Silicon & Intel Universal), Windows 10 & 11 (64-bit), Linux (Ubuntu, Debian, Fedora, Arch), iOS & iPadOS, Android, and headless Docker/CLI.'
    },
    {
      q: 'How does OmniDrive protect my files?',
      a: 'OmniDrive uses client-side AES-256 GCM envelope encryption, TLS 1.3 in transit, and offers optional end-to-end zero-knowledge encryption where only you hold the keys. We are SOC 2 Type II, ISO 27001, and HIPAA BAA compliant.'
    },
    {
      q: 'Can I use my own storage (BYOS)?',
      a: 'Yes! Enterprise plans allow you to connect your existing Amazon S3 buckets, Google Cloud Storage, Cloudflare R2, or private on-prem MinIO cluster as the underlying storage tier.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display">
              Common questions
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Still have a question? Contact our team anytime for dedicated onboarding.
            </p>
          </div>
        </div>

        <div className="divide-y divide-neutral-200/80 border-y border-neutral-200/80">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q} className="py-5">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left text-base sm:text-lg font-semibold text-neutral-900 hover:text-neutral-950 transition-colors"
                >
                  <span className="pr-6">{faq.q}</span>
                  <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-700">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 text-sm text-neutral-600 leading-relaxed pr-8 pt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
