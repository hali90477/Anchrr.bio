import React, { useState, useEffect } from 'react';
import { CreatorProfile, CustomLink, SocialLink } from '../types';
import { StorageService } from '../services/storage';
import { ShareModal } from './ShareModal';
import { Share2, MapPin, ExternalLink, Sparkles, Instagram, Youtube, Twitter, Linkedin, Github, Globe, Music, Twitch, MessageSquare } from 'lucide-react';

interface PublicProfileProps {
  username: string;
  onNavigateHome?: () => void;
}

const themeStyles: Record<string, { bg: string; text: string; cardBg: string; cardBorder: string; cardHover: string; accent: string }> = {
  'dark-slate': {
    bg: 'bg-slate-950',
    text: 'text-slate-100',
    cardBg: 'bg-slate-900/90',
    cardBorder: 'border-slate-800',
    cardHover: 'hover:border-indigo-500/50 hover:bg-slate-900',
    accent: 'text-indigo-400'
  },
  'sunset-glow': {
    bg: 'bg-gradient-to-b from-rose-950 via-purple-950 to-slate-950',
    text: 'text-rose-50',
    cardBg: 'bg-rose-950/40 backdrop-blur-md',
    cardBorder: 'border-rose-800/40',
    cardHover: 'hover:border-rose-400/50 hover:bg-rose-900/50',
    accent: 'text-rose-400'
  },
  'emerald-minimal': {
    bg: 'bg-emerald-950',
    text: 'text-emerald-50',
    cardBg: 'bg-emerald-900/60 backdrop-blur-md',
    cardBorder: 'border-emerald-800/40',
    cardHover: 'hover:border-emerald-400/50 hover:bg-emerald-900/80',
    accent: 'text-emerald-400'
  },
  'cyber-violet': {
    bg: 'bg-gradient-to-b from-violet-950 via-slate-950 to-black',
    text: 'text-purple-100',
    cardBg: 'bg-purple-950/30 backdrop-blur-md',
    cardBorder: 'border-purple-800/40',
    cardHover: 'hover:border-purple-400/60 hover:bg-purple-900/40',
    accent: 'text-purple-400'
  },
  'clean-light': {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200',
    cardHover: 'hover:border-slate-400 hover:shadow-md',
    accent: 'text-indigo-600'
  },
  'midnight-gold': {
    bg: 'bg-neutral-950',
    text: 'text-amber-100',
    cardBg: 'bg-neutral-900',
    cardBorder: 'border-amber-500/30',
    cardHover: 'hover:border-amber-400/60 hover:bg-neutral-850',
    accent: 'text-amber-400'
  }
};

export const PublicProfile: React.FC<PublicProfileProps> = ({ username, onNavigateHome }) => {
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const p = StorageService.getProfileByUsername(username);
    if (p) {
      setProfile(p);
      StorageService.recordProfileView(p.id);
    }
  }, [username]);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100 text-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl">
          <Sparkles className="w-8 h-8 text-slate-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Creator Profile Not Found</h1>
        <p className="text-sm text-slate-400 max-w-sm mb-6">
          The creator profile <span className="font-mono text-indigo-400">@{username}</span> does not exist or has not been published yet.
        </p>
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
          >
            Create Your Own Anchrr Bio Page
          </button>
        )}
      </div>
    );
  }

  const theme = themeStyles[profile.theme] || themeStyles['dark-slate'];

  const handleLinkClick = (link: CustomLink) => {
    StorageService.recordClick({
      profileId: profile.id,
      linkTitle: link.title,
      destinationUrl: link.url,
      country: 'United States',
      city: 'San Francisco',
      referrer: document.referrer || 'Direct',
      device: window.innerWidth < 768 ? 'mobile' : 'desktop',
      browser: 'Browser',
      os: 'Web',
      sessionId: 'sess_' + Math.random().toString(36).substr(2, 7)
    });
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const getSocialIcon = (platform: SocialLink['platform']) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      case 'x': return <Twitter className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'spotify': return <Music className="w-5 h-5" />;
      case 'twitch': return <Twitch className="w-5 h-5" />;
      case 'whatsapp': return <MessageSquare className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const publicUrl = window.location.origin + '/#/' + profile.username;

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} pb-16 transition-colors duration-300 font-sans`}>
      {/* Top Banner / Cover */}
      <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-900">
        {profile.coverImageUrl ? (
          <img
            src={profile.coverImageUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Share Button top right */}
        <button
          onClick={() => setIsShareOpen(true)}
          className="absolute top-4 right-4 p-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-xl backdrop-blur-md border border-slate-700/50 shadow-md transition-colors"
          title="Share Profile"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Header Block */}
      <div className="max-w-xl mx-auto px-4 -mt-20 relative z-10 text-center">
        <div className="inline-block relative">
          <img
            src={profile.profilePicUrl || '/src/assets/images/avatar_alexa_creator_1793880940610.jpg'}
            alt={profile.fullName}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-950 shadow-xl mx-auto"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 mb-1">
          {profile.fullName}
        </h1>

        <div className="flex items-center justify-center gap-2 text-xs opacity-80 mb-2">
          <span className="font-semibold">{profile.category}</span>
          {profile.location && (
            <>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </span>
            </>
          )}
        </div>

        <p className="text-xs sm:text-sm max-w-md mx-auto opacity-90 leading-relaxed mb-5">
          {profile.bio}
        </p>

        {/* Social Media Links bar */}
        {profile.socialLinks && profile.socialLinks.filter(s => s.enabled).length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {profile.socialLinks.filter(s => s.enabled).map(social => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full ${theme.cardBg} border ${theme.cardBorder} hover:scale-110 transition-all shadow-sm`}
                title={social.title}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        )}

        {/* Featured Content Spotlight */}
        {profile.featuredContent && profile.featuredContent.enabled && (
          <div className={`mb-8 p-4 text-left ${theme.cardBg} border ${theme.cardBorder} rounded-2xl shadow-lg relative overflow-hidden group`}>
            {profile.featuredContent.badgeText && (
              <span className="inline-block px-2.5 py-0.5 mb-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-[10px] font-bold tracking-wider uppercase">
                {profile.featuredContent.badgeText}
              </span>
            )}
            {profile.featuredContent.imageUrl && (
              <img
                src={profile.featuredContent.imageUrl}
                alt="Featured"
                className="w-full h-40 sm:h-48 object-cover rounded-xl mb-3 shadow-md"
              />
            )}
            <h3 className="text-base font-bold mb-1 group-hover:text-indigo-400 transition-colors flex items-center justify-between">
              <span>{profile.featuredContent.title}</span>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 shrink-0" />
            </h3>
            <p className="text-xs opacity-80 mb-3 line-clamp-2">{profile.featuredContent.description}</p>
            <a
              href={profile.featuredContent.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (profile.featuredContent) {
                  StorageService.recordClick({
                    profileId: profile.id,
                    linkTitle: profile.featuredContent.title,
                    destinationUrl: profile.featuredContent.url,
                    country: 'United States',
                    referrer: document.referrer || 'Direct',
                    device: window.innerWidth < 768 ? 'mobile' : 'desktop',
                    browser: 'Browser',
                    os: 'Web',
                    sessionId: 'sess_' + Math.random().toString(36).substr(2, 7)
                  });
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
            >
              <span>Explore Spotlight</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Custom Links List */}
        <div className="space-y-3">
          {profile.customLinks
            .filter(l => l.enabled)
            .sort((a, b) => a.order - b.order)
            .map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className={`w-full p-4 ${theme.cardBg} border ${theme.cardBorder} ${theme.cardHover} rounded-2xl transition-all shadow-sm text-left group flex items-center justify-between gap-3`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {link.thumbnailUrl ? (
                    <img src={link.thumbnailUrl} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                  )}
                  <div className="truncate">
                    <h4 className="text-sm font-bold group-hover:text-indigo-400 transition-colors truncate">
                      {link.title}
                    </h4>
                    {link.description && (
                      <p className="text-xs opacity-70 truncate">{link.description}</p>
                    )}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
        </div>

        {/* Powered by Anchrr Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800/40 text-center">
          <a
            href="/"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-medium opacity-80 hover:opacity-100 transition-opacity"
          >
            <span className="font-bold text-white">Anchrr</span>
            <span className="opacity-60 font-mono text-[10px]">· Create Free Bio Page</span>
          </a>
        </div>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={profile.fullName}
        url={publicUrl}
      />
    </div>
  );
};
