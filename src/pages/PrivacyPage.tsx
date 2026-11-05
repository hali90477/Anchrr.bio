import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full text-slate-100 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Last updated: November 2026</p>

      <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
        <h3 className="text-sm font-bold text-white">1. Information We Collect</h3>
        <p>We collect account email addresses, usernames, and profile metadata for creator accounts. For visitor clicks, we collect aggregated referrer details, general country location, and device types.</p>

        <h3 className="text-sm font-bold text-white">2. Anonymous Visitor Journeys</h3>
        <p>Visitor session analytics use privacy-conscious session identifiers. We do not store or track personally identifiable visitor information across external websites.</p>

        <h3 className="text-sm font-bold text-white">3. Third-Party Pixels & Integrations</h3>
        <p>When you configure Meta Pixel, Google Analytics, or TikTok Pixel in your Tracking workspace, event payloads are forwarded directly to the respective integration provider.</p>
      </div>
    </div>
  );
};
