import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'teams'
}) => {
  const [plan, setPlan] = useState(initialPlan);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-950 font-display">
              Welcome to OmniDrive!
            </h3>
            <p className="text-sm text-neutral-600 max-w-sm mx-auto">
              We have set up your 14-day free trial on the <strong>{plan.toUpperCase()}</strong> tier for <strong>{email}</strong>.
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 text-xs font-mono text-neutral-600">
              Mount command: <code>omnidrive mount ws_{name.toLowerCase().replace(/\s+/g, '') || 'trial'} /Volumes/OmniDrive</code>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Enter Workspace Console
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-neutral-900" />
              <span>Instant Workspace Provisioning</span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-950 font-display">
              Get Started Free
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              14-day full trial with 10 TB pooled capacity. No credit card required.
            </p>

            {/* Plan selector pills */}
            <div className="mt-5 grid grid-cols-3 gap-2 p-1 bg-neutral-100 rounded-xl text-xs font-medium">
              {(['individual', 'teams', 'enterprise'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlan(p)}
                  className={`py-1.5 rounded-lg capitalize transition-all ${
                    plan === p
                      ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@studio.design"
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Workspace / Team Name
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Studio Creative Team"
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Create Free Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-mono pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero credit card required &middot; Cancel anytime</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
