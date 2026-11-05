import React, { useState } from 'react';
import { User, CreatorProfile } from '../types';
import { StorageService } from '../services/storage';
import { BioSpaceView } from './BioSpaceView';
import { SmartLinksView } from './SmartLinksView';
import { AnalyticsView } from './AnalyticsView';
import { TrackingView } from './TrackingView';
import { SettingsView } from './SettingsView';
import { Anchor, Layers, Link as LinkIcon, BarChart3, Radio, Settings, LogOut, ExternalLink, Bell, Menu, X, UserCheck, Shield } from 'lucide-react';

interface DashboardLayoutProps {
  user: User;
  onNavigateHome: () => void;
  onOpenPublicProfile: (username: string) => void;
  onSignOut: () => void;
  onUpdateUser: (updated: User) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  onNavigateHome,
  onOpenPublicProfile,
  onSignOut,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<'biospace' | 'smartlinks' | 'analytics' | 'tracking' | 'settings'>('biospace');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const profiles = StorageService.getProfiles(user.id);
  const activeProfile = profiles[0] || null;

  const sidebarNav = [
    { id: 'biospace', label: 'My BioSpace', icon: <Layers className="w-4 h-4" /> },
    { id: 'smartlinks', label: 'Smart Links', icon: <LinkIcon className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'tracking', label: 'Tracking & Pixels', icon: <Radio className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* DESKTOP SIDEBAR (Section 9) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-900/60 p-5 shrink-0 justify-between">
        <div>
          {/* Brand Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-lg font-bold text-white mb-8 group"
          >
            <div className="p-1.5 bg-indigo-600 rounded-xl group-hover:scale-105 transition-transform">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <span>Anchrr</span>
          </button>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {sidebarNav.map(nav => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === nav.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {nav.icon}
                <span>{nav.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Footer Account Info */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          {activeProfile && (
            <button
              onClick={() => onOpenPublicProfile(activeProfile.username)}
              className="w-full flex items-center justify-between p-2.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 rounded-xl text-xs transition-colors group"
            >
              <div className="flex items-center gap-2 truncate">
                <img
                  src={activeProfile.profilePicUrl || '/src/assets/images/avatar_alexa_creator_1793880940610.jpg'}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
                <span className="truncate text-slate-200 font-mono text-[11px]">@{activeProfile.username}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0" />
            </button>
          )}

          <div className="flex items-center justify-between text-xs">
            <div className="truncate">
              <span className="block font-bold text-white truncate">{user.fullName}</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">{user.plan} Creator</span>
            </div>
            <button
              onClick={onSignOut}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT FRAME */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline-block">
              Creator Workspace / <strong className="text-white capitalize">{activeTab}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Public Link */}
            {activeProfile && (
              <button
                onClick={() => onOpenPublicProfile(activeProfile.username)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-indigo-400 rounded-xl transition-colors shrink-0"
              >
                <span>View Public Bio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in duration-150 text-xs space-y-2">
                  <div className="font-bold text-white border-b border-slate-800 pb-2">Notifications</div>
                  <div className="p-2 bg-slate-950 rounded-lg text-slate-300">
                    🚀 New profile click recorded from San Francisco!
                  </div>
                  <div className="p-2 bg-slate-950 rounded-lg text-slate-300">
                    ✅ Anchrr 302 Short URL redirect server is operational.
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeTab === 'biospace' && (
            <BioSpaceView user={user} onOpenPublicProfile={onOpenPublicProfile} />
          )}
          {activeTab === 'smartlinks' && (
            <SmartLinksView user={user} />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsView user={user} />
          )}
          {activeTab === 'tracking' && (
            <TrackingView user={user} />
          )}
          {activeTab === 'settings' && (
            <SettingsView user={user} onUpdateUser={onUpdateUser} onSignOut={onSignOut} />
          )}
        </main>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md lg:hidden p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-lg font-bold text-white">
                <Anchor className="w-5 h-5 text-indigo-500" />
                <span>Anchrr Menu</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {sidebarNav.map(nav => (
                <button
                  key={nav.id}
                  onClick={() => {
                    setActiveTab(nav.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    activeTab === nav.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {nav.icon}
                  <span>{nav.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={() => { setMobileMenuOpen(false); onSignOut(); }}
            className="w-full py-3 bg-slate-900 border border-slate-800 text-rose-400 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
