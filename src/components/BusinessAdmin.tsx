import React from 'react';
import { ShieldCheck, Server, Key, Users, ArrowRight } from 'lucide-react';

interface BusinessAdminProps {
  onContactSales: () => void;
}

export const BusinessAdmin: React.FC<BusinessAdminProps> = ({ onContactSales }) => {
  return (
    <section id="business-admin" className="py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-neutral-900" />
                <span>Enterprise Governance & Compliance</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-display text-balance">
                Governed, on your own storage.
              </h2>

              <p className="text-base text-neutral-600 leading-relaxed max-w-2xl">
                Run OmniDrive on your own cloud or S3-compatible object storage (AWS, Google Cloud, Azure, Cloudflare R2, MinIO), with strictly enforced access policies per person, machine, or autonomous agent.
              </p>

              {/* Tags/badges as clean metadata strip */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-600">
                <span className="px-3 py-1 rounded-md bg-white border border-neutral-200/80">SSO / SAML 2.0</span>
                <span className="px-3 py-1 rounded-md bg-white border border-neutral-200/80">SCIM Provisioning</span>
                <span className="px-3 py-1 rounded-md bg-white border border-neutral-200/80">Private Cloud / VPC</span>
                <span className="px-3 py-1 rounded-md bg-white border border-neutral-200/80">Audit & Compliance</span>
                <span className="px-3 py-1 rounded-md bg-white border border-neutral-200/80">Bring Your Own Storage (BYOS)</span>
                <span className="px-3 py-1 rounded-md bg-white border border-neutral-200/80">Data Loss Prevention (DLP)</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={onContactSales}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <span>See Enterprise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
