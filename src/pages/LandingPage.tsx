import React, { useState } from 'react';
import { ArrowRight, Link, BarChart3, ShieldCheck, Sparkles, Zap, CheckCircle2, ChevronDown, ChevronUp, Globe2, Layers, Cpu } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenAuth }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Anchrr and how is it different from a basic link-in-bio tool?',
      a: 'Anchrr combines customizable Bio Links & Profiles, Smart URL Shortening with geo/device routing, and a comprehensive Analytics & Tracking workspace in one unified SaaS ecosystem.'
    },
    {
      q: 'Can I use custom domains for my smart links and bio profiles?',
      a: 'Yes! With our Creator Pro and Business plans, you can connect custom branded domains (e.g. link.yourbrand.com) and manage custom short codes.'
    },
    {
      q: 'How does email verification work on signup?',
      a: 'Email & Password signups require email verification before accessing the creator dashboard. Google Sign-In accounts are automatically verified.'
    },
    {
      q: 'Can I track Meta (Facebook) and Google Analytics conversion pixels?',
      a: 'Absolutely. Anchrr includes a dedicated Tracking & Integrations hub where you can attach Meta Pixels, GA4, TikTok Pixels, and custom API webhooks to track visitor clicks and conversion postbacks.'
    }
  ];

  return (
    <div className="w-full text-slate-100 bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The All-in-One Creator Ecosystem</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
          One Link. Smart Routing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
            Unstoppable Creator Growth.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Anchrr empowers content creators, influencers, and digital brands to showcase their identity with custom Bio Profiles, shorten links with smart routing, and turn clicks into revenue with deep visitor analytics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('features')}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm rounded-xl transition-colors"
          >
            Explore Features
          </button>
        </div>

        {/* Dashboard Preview Frame */}
        <div className="relative rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-slate-800 to-slate-900/80 border border-slate-800 shadow-2xl max-w-5xl mx-auto overflow-hidden">
          <img
            src="/src/assets/images/hero_creator_dashboard_1793880939674.jpg"
            alt="Anchrr SaaS Creator Dashboard"
            className="w-full h-auto rounded-xl object-cover shadow-inner"
          />
        </div>
      </section>

      {/* Product Pillars Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Built Around Three Powerful Product Pillars
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to convert social followers into loyal subscribers and buyers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Pillar 1: Bio Links */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div>
              <div className="p-3 w-fit bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Bio Links & BioSpace</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Build customizable, high-converting creator bio profiles with social icons, custom link cards, featured content spotlights, and live theme styling.
              </p>
            </div>
            <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore My BioSpace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2: Smart Links */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div>
              <div className="p-3 w-fit bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Link className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Smart Links & Shortener</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Create clean short URLs (<code className="font-mono text-indigo-300">anchrr.com/s/code</code>) with geo-targeting, device routing, expiry dates, password locks, and UTM campaign builders.
              </p>
            </div>
            <div className="text-xs text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Smart Links</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3: Analytics */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div>
              <div className="p-3 w-fit bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Deep Visitor Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Understand your audience with real-time click tracking, CTR metrics, traffic sources (Instagram, YouTube, TikTok), device breakdowns, and anonymous visitor journey logs.
              </p>
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block mb-2">Smart URL Shortener</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Intelligent Routing for Global Audiences
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Never send mobile users to a desktop page or European visitors to a US store. Anchrr's smart routing automatically detects visitor location and device type to route them to the optimal destination.
            </p>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Geographic country-based URL routing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Device detection (iOS, Android, Desktop)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Instant QR code generation for events & print</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl p-2 bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
            <img src="/src/assets/images/smart_links_feature_1793880940619.jpg" alt="Smart Links Routing" className="w-full h-auto rounded-xl object-cover" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-2xl p-2 bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
            <img src="/src/assets/images/analytics_feature_1793880941878.jpg" alt="Analytics Workspace" className="w-full h-auto rounded-xl object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-2">Visitor Analytics</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Turn Raw Clicks Into Actionable Insights
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Track profile views, individual link CTRs, top traffic referrers, and exact visitor conversion journeys. Make data-backed decisions on where to invest your creator time.
            </p>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Profile-level and global aggregate reports</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Privacy-conscious anonymous visitor journey logs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CSV export & report sharing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60 text-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">Simple, Transparent Pricing</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-12">
          Start for free, then scale as your audience grows. No hidden fees or locked features.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {/* Free Tier */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Free Plan</h3>
              <p className="text-xs text-slate-400 mb-4">Perfect for getting started</p>
              <div className="text-3xl font-extrabold text-white mb-6">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Up to 3 Bio Profiles</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Basic Short Links</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Standard Theme Presets</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 30-Day Analytics</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors text-center"
            >
              Get Started Free
            </button>
          </div>

          {/* Creator Pro */}
          <div className="p-6 bg-gradient-to-b from-indigo-950/70 to-slate-900 border border-indigo-500/50 rounded-2xl flex flex-col justify-between relative shadow-xl shadow-indigo-950/40">
            <div className="absolute -top-3 right-4 px-3 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase rounded-full">
              Most Popular
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Creator Pro</h3>
              <p className="text-xs text-slate-400 mb-4">For active creators & influencers</p>
              <div className="text-3xl font-extrabold text-white mb-6">$12 <span className="text-xs font-normal text-slate-400">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> <strong>Unlimited Bio Profiles</strong></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Smart Links & Geo Routing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Meta & GA4 Pixel Integrations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Real-time Analytics & Journeys</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors text-center shadow-md"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Business Tier */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Business</h3>
              <p className="text-xs text-slate-400 mb-4">For media agencies & teams</p>
              <div className="text-3xl font-extrabold text-white mb-6">$29 <span className="text-xs font-normal text-slate-400">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Everything in Creator Pro</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Custom Branded Domains</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> API Access & Webhooks</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Priority Support & SLA</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors text-center"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/60">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-white"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {openFaq === idx && (
                <p className="mt-3 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="p-8 sm:p-12 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl text-center relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Ready to Claim Your Creator Bio URL?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6">
            Join thousands of creators using Anchrr to streamline bio links, route smart links, and analyze traffic growth.
          </p>
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-colors inline-flex items-center gap-2"
          >
            <span>Create Your Free Bio Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
