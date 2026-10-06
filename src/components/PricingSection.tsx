import React, { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="pricing" className="py-24 border-t border-neutral-200/80 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-display text-balance">
            Simple pricing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Individual includes 2 TB for one person; Teams pools 5 TB per member for collaborative workspaces.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-neutral-200/70 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (3 Columns) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* 1. Individual */}
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="text-lg font-semibold text-neutral-950 font-display">Individual</div>
              <p className="text-xs text-neutral-500 mt-1 min-h-[32px]">
                For individuals working across multiple computers.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-neutral-950 font-display tracking-tight">
                  ${billingCycle === 'annual' ? '12' : '15'}
                </span>
                <span className="text-sm font-mono text-neutral-500">/ month</span>
              </div>
              <div className="text-[11px] font-mono text-neutral-400 mt-1">
                {billingCycle === 'annual' ? '$144 billed yearly (save 20%)' : 'Billed monthly'}
              </div>

              {/* Features */}
              <div className="mt-8 space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>2 TB included high-speed storage</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Standard streaming performance (800 MB/s)</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>One seat, all your computers (Mac, PC, Linux)</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Public file links and client upload requests</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Add more storage anytime &mdash; $6/mo per 500 GB</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-400">
                  <X className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                  <span>No shared workspaces</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-400">
                  <X className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                  <span>Cannot invite team members</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <button
                onClick={() => onSelectPlan('individual')}
                className="w-full py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Download Free Trial
              </button>
            </div>
          </div>

          {/* 2. Teams (Popular) */}
          <div className="rounded-2xl border-2 border-neutral-900 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neutral-900 text-white text-[11px] font-mono uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <div className="text-lg font-semibold text-neutral-950 font-display">Teams</div>
              <p className="text-xs text-neutral-500 mt-1 min-h-[32px]">
                For teams collaborating in shared workspaces.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-neutral-950 font-display tracking-tight">
                  ${billingCycle === 'annual' ? '24' : '30'}
                </span>
                <span className="text-sm font-mono text-neutral-500">/ member / month</span>
              </div>
              <div className="text-[11px] font-mono text-neutral-400 mt-1">
                {billingCycle === 'annual' ? '$288/yr per member (save 20%)' : 'Billed monthly'}
              </div>

              {/* Features */}
              <div className="mt-8 space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5 text-neutral-900 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Everything in Individual, plus:</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>5 TB pooled storage per member</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>High-performance throughput (up to 2.4 GB/s)</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Shared workspaces and granular access controls</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Unlimited owned team drives</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Autonomous AI Agent tokens & MCP mounts</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Atomic file locking & presence indicators</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <button
                onClick={() => onSelectPlan('teams')}
                className="w-full py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-colors"
              >
                Start 14-Day Free Trial
              </button>
            </div>
          </div>

          {/* 3. Enterprise */}
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="text-lg font-semibold text-neutral-950 font-display">Enterprise</div>
              <p className="text-xs text-neutral-500 mt-1 min-h-[32px]">
                For organizations with custom scale & security.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-neutral-950 font-display tracking-tight">
                  Custom
                </span>
              </div>
              <div className="text-[11px] font-mono text-neutral-400 mt-1">
                Tailored storage, bandwidth, and governance
              </div>

              {/* Features */}
              <div className="mt-8 space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Highest throughput, dedicated cloud infrastructure</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Custom pricing, seats, and petabyte storage terms</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Granular version controls and legal hold retention</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>On-prem and private cloud deployment (BYO S3)</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SSO / SAML 2.0 & SCIM automatic provisioning</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>White-glove migration and 24/7 dedicated engineer</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <button
                onClick={() => onSelectPlan('enterprise')}
                className="w-full py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-neutral-500 font-mono">
          Prices in USD. Individual and Teams include a 14-day free trial. Annual prices are monthly equivalents billed yearly.
        </div>
      </div>
    </section>
  );
};
