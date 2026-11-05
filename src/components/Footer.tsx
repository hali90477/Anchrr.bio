import React from 'react';
import { Anchor } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 text-lg font-bold text-white mb-3">
            <div className="p-1 bg-indigo-600 rounded-lg">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <span>Anchrr</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
            The conversion-focused SaaS creator platform connecting Bio Links, Smart Links, URL Shortening, and Deep Visitor Analytics.
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            © {new Date().getFullYear()} Anchrr Inc. All rights reserved.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Product</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate('features')} className="hover:text-white transition-colors">Bio Links & BioSpace</button></li>
            <li><button onClick={() => onNavigate('features')} className="hover:text-white transition-colors">Smart Links & URL Shortener</button></li>
            <li><button onClick={() => onNavigate('features')} className="hover:text-white transition-colors">Visitor Analytics</button></li>
            <li><button onClick={() => onNavigate('features')} className="hover:text-white transition-colors">Tracking & Pixels</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Anchrr</button></li>
            <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Pricing Plans</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact Support</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
            <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
