import React from 'react';
import { ShieldCheck, Lock, Key, FileCheck, CheckCircle2 } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider mb-3">
            <Lock className="w-4 h-4 text-neutral-900" />
            <span>Zero-Trust Infrastructure</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
            Zero-knowledge security from core to edge
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Your data is your property. OmniDrive employs client-side envelope encryption with optional zero-knowledge architecture, ensuring even our infrastructure engineers cannot inspect your files.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-2xs">
              <Lock className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-semibold text-neutral-950 font-display">
              AES-256 GCM Chunk Encryption
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every 64 MB file chunk is encrypted individually on your local device before transmission over TLS 1.3 to edge datacenters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-2xs">
              <Key className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-semibold text-neutral-950 font-display">
              Bring Your Own Key (BYOK)
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Manage master root keys inside your existing AWS KMS, Google Cloud KMS, or HashiCorp Vault. Revoke access instantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-base font-semibold text-neutral-950 font-display">
              SOC 2 Type II & ISO 27001
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Audited annually by leading independent cyber-risk assessors. Penetration reports and compliance packages available for security reviews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-2xs">
              <FileCheck className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-base font-semibold text-neutral-950 font-display">
              HIPAA BAA & GDPR Ready
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Compliant data residency in US, EU, UK, and APAC regions. Signed Business Associate Agreements (BAA) for healthcare workflows.
            </p>
          </div>
        </div>

        {/* Security architecture banner */}
        <div className="mt-10 p-6 rounded-2xl border border-neutral-200/80 bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-sm font-semibold">Need custom Data Residency or Private VPC installation?</div>
            <div className="text-xs text-neutral-400">Deploy isolated OmniDrive streaming nodes directly inside your AWS VPC or Kubernetes cluster.</div>
          </div>
          <a
            href="#pricing"
            className="px-5 py-2.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-lg transition-colors whitespace-nowrap"
          >
            Request Security Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
};
