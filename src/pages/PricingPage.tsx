import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PricingPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="w-full text-slate-100 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Flexible Plans for Every Creator Stage
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          No credit card required to get started on the Free Plan.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {/* Free Plan */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Free Plan</h3>
            <p className="text-xs text-slate-400 mb-6">Essential bio profile & link shortener</p>
            <div className="text-4xl font-extrabold text-white mb-6">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Up to 3 Creator Bio Profiles</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Basic Short URLs (<code className="font-mono">anchrr.com/s/code</code>)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Standard Theme Palettes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> 30-Day Click Analytics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> QR Code Generator</li>
            </ul>
          </div>
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors text-center"
          >
            Start Free
          </button>
        </div>

        {/* Creator Pro */}
        <div className="p-8 bg-gradient-to-b from-indigo-950/80 to-slate-900 border border-indigo-500/60 rounded-3xl flex flex-col justify-between relative shadow-2xl shadow-indigo-950/50">
          <div className="absolute -top-3.5 right-6 px-3.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase rounded-full shadow-sm">
            Most Popular
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Creator Pro</h3>
            <p className="text-xs text-indigo-300 mb-6">For scaling influencers & entrepreneurs</p>
            <div className="text-4xl font-extrabold text-white mb-6">$12 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            <ul className="space-y-3 text-xs text-slate-200 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> <strong>Unlimited Bio Profiles</strong></li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Smart Links & Geo/Device Routing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Meta Pixel & GA4 Integrations</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Real-time Analytics & Journeys</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> CSV Data Export</li>
            </ul>
          </div>
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors text-center shadow-md flex items-center justify-center gap-2"
          >
            <span>Start 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Business */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Business</h3>
            <p className="text-xs text-slate-400 mb-6">For media agencies & brand teams</p>
            <div className="text-4xl font-extrabold text-white mb-6">$29 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Everything in Creator Pro</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Custom Branded Domains</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> API Keys & Webhook Triggers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Dedicated Account Manager</li>
            </ul>
          </div>
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors text-center"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};
