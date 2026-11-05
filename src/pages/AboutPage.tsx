import React from 'react';
import { Anchor, Globe, Users, Shield } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full text-slate-100 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 p-3 mb-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl">
          <Anchor className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          About Anchrr
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Anchrr was built to solve a single problem: creators had bio links, URL shorteners, and analytics tools scattered across disconnected platforms.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
          <Globe className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">Global Scope</h3>
          <p className="text-xs text-slate-400">Designed for global creators with geo-routing and international traffic tracking.</p>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">Creator First</h3>
          <p className="text-xs text-slate-400">No complex code required. Beautiful UX for non-technical influencers & businesses.</p>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
          <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">Data Privacy</h3>
          <p className="text-xs text-slate-400">Privacy-conscious visitor analytics with anonymous session tracking.</p>
        </div>
      </div>
    </div>
  );
};
