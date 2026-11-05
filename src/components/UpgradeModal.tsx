import React from 'react';
import { X, Check, Zap, Crown, Shield } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess?: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgradeSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Profile Limit Reached</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Anchrr Creator Pro</h2>
          <p className="text-sm text-slate-400">
            You have reached your Free Plan limit of <strong className="text-slate-200">3 creator bio profiles</strong>. Unlock unlimited bio profiles, custom domains, and deep tracking.
          </p>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Free Plan */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-300">Free Plan</span>
                <span className="text-xs font-mono text-slate-500">Current</span>
              </div>
              <div className="text-2xl font-extrabold text-white mb-4">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Up to 3 Bio Profiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic URL Shortener</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30 Days Analytics History</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Creator Pro */}
          <div className="relative p-5 bg-gradient-to-b from-indigo-950/60 to-slate-950 border border-indigo-500/40 rounded-2xl flex flex-col justify-between shadow-lg shadow-indigo-950/30">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              Recommended
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-indigo-300 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-indigo-400" /> Creator Pro
                </span>
              </div>
              <div className="text-2xl font-extrabold text-white mb-4">$12 <span className="text-xs font-normal text-slate-400">/ month</span></div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span><strong>Unlimited Bio Profiles</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Custom Branded Domains</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Meta & GA4 Pixel Integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Full Analytics & Visitor Journeys</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                if (onUpgradeSuccess) onUpgradeSuccess();
                onClose();
              }}
              className="w-full mt-6 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
            >
              Upgrade Now (Test Sandbox)
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Test Sandbox Build — Simulated Upgrade Experience</span>
          </p>
        </div>
      </div>
    </div>
  );
};
