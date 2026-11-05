import React, { useState } from 'react';
import { User } from '../types';
import { Anchor, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="p-1.5 bg-indigo-600 rounded-xl group-hover:scale-105 transition-transform">
            <Anchor className="w-5 h-5 text-white" />
          </div>
          <span>Anchrr</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Features
          </button>
          <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Pricing
          </button>
          <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            About
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {user ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <UserCheck className="w-4 h-4" />
              <span>Creator Workspace</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 space-y-3 animate-in slide-in-from-top-2">
          <button onClick={() => { onNavigate('features'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm text-slate-300">
            Features
          </button>
          <button onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm text-slate-300">
            Pricing
          </button>
          <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm text-slate-300">
            About
          </button>
          <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm text-slate-300">
            Contact
          </button>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl"
              >
                Creator Workspace
              </button>
            ) : (
              <>
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-slate-300 text-xs font-semibold"
                >
                  Log In
                </button>
                <button
                  onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
