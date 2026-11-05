import React, { useState } from 'react';
import { StorageService } from '../services/storage';
import { User, CreatorProfile } from '../types';
import { Sparkles, Check, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';

interface OnboardingModalProps {
  user: User;
  onComplete: (updatedUser: User) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ user, onComplete }) => {
  const [username, setUsername] = useState(user.username || '');
  const [fullName, setFullName] = useState(user.fullName || '');
  const [category, setCategory] = useState('Digital Creator');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_-]/g, '');

  const isAvailable = () => {
    if (cleanUsername.length < 3) return false;
    const reserved = ['admin', 'api', 'dashboard', 'settings', 'login', 'signup', 's', 'bio', 'anchrr'];
    if (reserved.includes(cleanUsername)) return false;
    const existing = StorageService.getProfileByUsername(cleanUsername);
    return !existing || existing.userId === user.id;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cleanUsername.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    if (!isAvailable()) {
      setError('That username is unavailable or reserved. Please choose another.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Save updated user
    const updatedUser: User = {
      ...user,
      fullName: fullName || user.fullName,
      username: cleanUsername,
    };
    StorageService.setCurrentUser(updatedUser);

    // Check if initial profile exists, if not create one
    let profile = StorageService.getProfileByUsername(cleanUsername);
    if (!profile) {
      const newProfile: CreatorProfile = {
        id: 'prof_' + Math.random().toString(36).substr(2, 9),
        userId: user.id,
        fullName: updatedUser.fullName,
        username: cleanUsername,
        category,
        location: 'San Francisco, CA',
        bio: `Welcome to my official bio page! Connect with me across social media and explore my latest links.`,
        profilePicUrl: user.avatarUrl || '/src/assets/images/avatar_alexa_creator_1793880940610.jpg',
        coverImageUrl: '/src/assets/images/cover_sunset_vibes_1793880939909.jpg',
        theme: 'dark-slate',
        isPublished: true,
        socialLinks: [
          { id: 's1', platform: 'instagram', url: 'https://instagram.com', title: 'Instagram', enabled: true },
          { id: 's2', platform: 'youtube', url: 'https://youtube.com', title: 'YouTube', enabled: true }
        ],
        customLinks: [
          { id: 'cl1', title: '🔗 Welcome Link', description: 'Check out my main website.', url: 'https://anchrr.com', enabled: true, order: 1, clickCount: 0 }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewsCount: 1,
        clicksCount: 0
      };
      StorageService.saveProfile(newProfile);
    }

    setIsSubmitting(false);
    onComplete(updatedUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-lg p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 mb-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Welcome to Anchrr!</h2>
          <p className="text-xs text-slate-400">Let's claim your unique creator URL to finish set up.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-300">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              placeholder="Alexa Rivera"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-300">Creator Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="Digital Creator">Digital Creator & Designer</option>
              <option value="Software Engineer">Software Engineer & Tech</option>
              <option value="Fitness & Health">Fitness & Wellness Coach</option>
              <option value="Podcast & Media">Podcaster & Video Creator</option>
              <option value="E-commerce Brand">E-commerce Brand & Shop</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-300">Choose Unique Creator Username</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
                placeholder="yourname"
              />
              <div className="absolute right-3 top-2.5">
                {cleanUsername.length >= 3 && (
                  isAvailable() ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                  )
                )}
              </div>
            </div>

            {/* Public URL Live Preview */}
            <div className="mt-2 p-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs text-slate-400 flex items-center justify-between">
              <span>Proposed Public URL:</span>
              <span className="font-mono text-indigo-400 font-semibold">
                anchrr.com/{cleanUsername || 'username'}
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || cleanUsername.length < 3 || !isAvailable()}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Confirm & Enter Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
