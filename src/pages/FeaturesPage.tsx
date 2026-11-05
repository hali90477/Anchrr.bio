import React from 'react';
import { Layers, Link, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';

interface FeaturesPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="w-full text-slate-100 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          The Complete Feature Architecture of Anchrr
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Explore how Bio Links, Smart Routing, and Analytics come together to provide an enterprise-grade SaaS environment for digital creators.
        </p>
      </div>

      <div className="space-y-16">
        {/* Pillar 1 */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="p-3 w-fit bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">1. My BioSpace — Bio Links & Creator Profiles</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Create up to 3 custom bio profiles on the Free Plan (or unlimited on Creator Pro). Personalize background covers, avatar portraits, category labels, social media icon rows, featured content spotlights, and custom link cards.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>✨ 6 Designer Theme Palettes (Dark Slate, Sunset Glow, Emerald Minimal, Cyber Violet, Clean Light, Midnight Gold)</li>
              <li>🎨 Real-Time Mobile Device Simulator Preview</li>
              <li>🔗 Drag-and-drop link reordering & visibility toggles</li>
              <li>📱 QR Code generator & multi-channel social share popup</li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800">
            <img src="/src/assets/images/hero_creator_dashboard_1793880939674.jpg" alt="BioSpace Editor" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-slate-800">
            <img src="/src/assets/images/smart_links_feature_1793880940619.jpg" alt="Smart Links" className="w-full h-auto object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="p-3 w-fit bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-2xl mb-4">
              <Link className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">2. Smart Links & URL Shortener Engine</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Shorten long destination URLs into high-performing short codes (<code className="font-mono text-indigo-300">anchrr.com/s/code</code>) backed by a server-side 302 redirect engine.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>🌍 Geographic Country-based URL Routing</li>
              <li>📱 Mobile vs Desktop Device Routing Rules</li>
              <li>⏳ Link Expiry Dates & Password Protection</li>
              <li>🎯 Automatic UTM Parameter Builder (Source, Medium, Campaign)</li>
            </ul>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="p-3 w-fit bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">3. Analytics & Tracking Integrations Hub</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Get an accurate view of traffic trends, top performing links, audience geography, and device distribution with integrated pixel support.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>📊 Interactive Recharts traffic time-series graphs</li>
              <li>🎯 Meta (Facebook) Pixel, GA4, & TikTok Pixel integrations</li>
              <li>🔑 Developer API Keys (create & revoke credentials)</li>
              <li>📄 CSV Export & Report scheduling</li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800">
            <img src="/src/assets/images/analytics_feature_1793880941878.jpg" alt="Analytics" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => onOpenAuth('signup')}
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-colors inline-flex items-center gap-2"
        >
          <span>Get Started Free on Anchrr</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
