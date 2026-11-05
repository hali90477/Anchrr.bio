import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full text-slate-100 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-xs text-slate-400">Last updated: November 2026</p>

      <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
        <h3 className="text-sm font-bold text-white">1. Acceptance of Terms</h3>
        <p>By creating an account or accessing Anchrr, you agree to comply with these terms of service and all applicable laws.</p>

        <h3 className="text-sm font-bold text-white">2. Creator Content & Conduct</h3>
        <p>You retain full ownership of the bio profiles, custom links, and media assets you publish. You agree not to distribute malicious links, spam, or unlawful content.</p>

        <h3 className="text-sm font-bold text-white">3. Free Plan & Profile Limits</h3>
        <p>Free plan accounts are limited to 3 bio profiles. Exceeding this limit requires upgrading to a Creator Pro or Business subscription.</p>
      </div>
    </div>
  );
};
