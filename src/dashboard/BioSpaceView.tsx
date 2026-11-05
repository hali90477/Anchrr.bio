import React, { useState } from 'react';
import { CreatorProfile, CustomLink, SocialLink, ProfileTheme, User } from '../types';
import { StorageService } from '../services/storage';
import { ShareModal } from '../components/ShareModal';
import { UpgradeModal } from '../components/UpgradeModal';
import { Plus, Edit2, Trash2, ExternalLink, Share2, Eye, Sparkles, Check, Image as ImageIcon, Layout, Globe, Lock, ArrowUp, ArrowDown } from 'lucide-react';

interface BioSpaceViewProps {
  user: User;
  onOpenPublicProfile: (username: string) => void;
}

export const BioSpaceView: React.FC<BioSpaceViewProps> = ({ user, onOpenPublicProfile }) => {
  const [profiles, setProfiles] = useState<CreatorProfile[]>(() => StorageService.getProfiles(user.id));
  const [selectedProfile, setSelectedProfile] = useState<CreatorProfile | null>(profiles[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'socials' | 'links' | 'featured' | 'theme'>('details');
  const [shareProfile, setShareProfile] = useState<CreatorProfile | null>(null);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Profile Editor Form state
  const [editForm, setEditForm] = useState<CreatorProfile | null>(null);

  const refreshProfiles = () => {
    const updated = StorageService.getProfiles(user.id);
    setProfiles(updated);
    if (selectedProfile) {
      const match = updated.find(p => p.id === selectedProfile.id);
      if (match) setSelectedProfile(match);
    }
  };

  const handleCreateProfile = () => {
    // Check 3-profile free plan limit (Section 10)
    if (user.plan === 'free' && profiles.length >= 3) {
      setIsUpgradeOpen(true);
      return;
    }

    const count = profiles.length + 1;
    const newUsername = `${user.username}_${count}`;
    const newProf: CreatorProfile = {
      id: 'prof_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      fullName: `${user.fullName} #${count}`,
      username: newUsername,
      category: 'Digital Creator',
      location: 'San Francisco, CA',
      bio: 'Sharing my journey, latest links, and media projects.',
      profilePicUrl: user.avatarUrl || '/src/assets/images/avatar_alexa_creator_1793880940610.jpg',
      coverImageUrl: '/src/assets/images/cover_sunset_vibes_1793880939909.jpg',
      theme: 'dark-slate',
      isPublished: true,
      socialLinks: [
        { id: 'soc_1', platform: 'instagram', url: 'https://instagram.com', title: 'Instagram', enabled: true },
        { id: 'soc_2', platform: 'x', url: 'https://x.com', title: 'X', enabled: true }
      ],
      customLinks: [
        { id: 'cl_1', title: '✨ My Main Website', description: 'Explore my projects and portfolio.', url: 'https://anchrr.com', enabled: true, order: 1, clickCount: 0 }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 0,
      clicksCount: 0
    };

    const res = StorageService.saveProfile(newProf);
    if (res.success) {
      refreshProfiles();
      setSelectedProfile(newProf);
      setEditForm(newProf);
      setIsEditing(true);
    } else {
      alert(res.message);
    }
  };

  const handleEditProfile = (profile: CreatorProfile) => {
    setSelectedProfile(profile);
    setEditForm(JSON.parse(JSON.stringify(profile)));
    setIsEditing(true);
  };

  const handleDeleteProfile = (id: string) => {
    if (confirm('Are you sure you want to delete this profile card? This action cannot be undone.')) {
      StorageService.deleteProfile(id);
      refreshProfiles();
      setIsEditing(false);
      setSelectedProfile(null);
    }
  };

  const handleSaveForm = () => {
    if (!editForm) return;
    const res = StorageService.saveProfile(editForm);
    if (res.success) {
      refreshProfiles();
      setSelectedProfile(editForm);
      setSaveToast('Profile changes saved successfully!');
      setTimeout(() => setSaveToast(null), 3000);
    } else {
      alert(res.message);
    }
  };

  // Custom Link Handlers inside editor
  const handleAddCustomLink = () => {
    if (!editForm) return;
    const newLink: CustomLink = {
      id: 'cl_' + Math.random().toString(36).substr(2, 7),
      title: 'New Custom Link',
      description: 'Add a helpful link description here',
      url: 'https://',
      enabled: true,
      order: editForm.customLinks.length + 1,
      clickCount: 0
    };
    const updated = { ...editForm, customLinks: [...editForm.customLinks, newLink] };
    setEditForm(updated);
  };

  const handleUpdateCustomLink = (id: string, fields: Partial<CustomLink>) => {
    if (!editForm) return;
    const updatedLinks = editForm.customLinks.map(l => (l.id === id ? { ...l, ...fields } : l));
    setEditForm({ ...editForm, customLinks: updatedLinks });
  };

  const handleDeleteCustomLink = (id: string) => {
    if (!editForm) return;
    const updatedLinks = editForm.customLinks.filter(l => l.id !== id);
    setEditForm({ ...editForm, customLinks: updatedLinks });
  };

  const handleMoveCustomLink = (index: number, direction: 'up' | 'down') => {
    if (!editForm) return;
    const links = [...editForm.customLinks];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= links.length) return;
    const temp = links[index];
    links[index] = links[targetIdx];
    links[targetIdx] = temp;
    // update order numbers
    links.forEach((l, i) => (l.order = i + 1));
    setEditForm({ ...editForm, customLinks: links });
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Plan Usage Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white">My BioSpace — Creator Profiles</h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-mono font-bold uppercase">
              {user.plan === 'free' ? `${profiles.length}/3 Free Slots Used` : 'Unlimited Profiles (Pro)'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Create, manage, customize, preview, and share your public link-in-bio profiles.
          </p>
        </div>

        <button
          onClick={handleCreateProfile}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Profile</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Main Grid or Editor */}
      {!isEditing ? (
        /* PROFILE CARDS GRID (Section 10) */
        <div className="grid md:grid-cols-3 gap-6">
          {profiles.map(prof => (
            <div
              key={prof.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Card Banner */}
                <div className="relative h-28 bg-slate-950 overflow-hidden">
                  <img
                    src={prof.coverImageUrl || '/src/assets/images/cover_sunset_vibes_1793880939909.jpg'}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-slate-950/80 backdrop-blur-xs text-[10px] font-semibold text-slate-300 rounded-full border border-slate-800">
                    {prof.isPublished ? '🟢 Published' : '⚪ Draft'}
                  </div>
                </div>

                {/* Avatar & Meta */}
                <div className="px-5 pb-4 -mt-10 relative">
                  <img
                    src={prof.profilePicUrl || '/src/assets/images/avatar_alexa_creator_1793880940610.jpg'}
                    alt={prof.fullName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-900 shadow-md mb-3"
                  />
                  <h3 className="text-base font-bold text-white leading-tight">{prof.fullName}</h3>
                  <p className="text-xs font-mono text-indigo-400 mb-2">anchrr.com/{prof.username}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{prof.bio}</p>

                  <div className="grid grid-cols-2 gap-2 p-2 bg-slate-950 border border-slate-800/80 rounded-xl text-center mb-4">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Views</span>
                      <span className="text-xs font-mono font-bold text-slate-200">{prof.viewsCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Clicks</span>
                      <span className="text-xs font-mono font-bold text-indigo-400">{prof.clicksCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 bg-slate-950/50 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleEditProfile(prof)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShareProfile(prof)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Share Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenPublicProfile(prof.username)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Open Live Public Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProfile(prof.id)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors"
                    title="Delete Profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty Profile Slots Placeholders */}
          {user.plan === 'free' && profiles.length < 3 && (
            <div
              onClick={handleCreateProfile}
              className="p-8 bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all min-h-[300px]"
            >
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-full mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Unused Profile Slot</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-4">You have {3 - profiles.length} free profile slot(s) available on your Free Plan.</p>
              <span className="text-xs font-semibold text-indigo-400">Click to add new bio profile</span>
            </div>
          )}
        </div>
      ) : (
        /* LIVE CREATOR PROFILE EDITOR SPLIT VIEW (Section 10) */
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 rounded-lg"
                >
                  ← Back to Grid
                </button>
                <h2 className="text-lg font-bold text-white">Editing @{editForm?.username}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveForm}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </div>

            {/* Editor Sub-Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl overflow-x-auto">
              {(['details', 'socials', 'links', 'featured', 'theme'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
                    activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB 1: DETAILS */}
            {activeTab === 'details' && editForm && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={e => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Creator Username (Public URL)</label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={e => setEditForm({ ...editForm, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={editForm.location || ''}
                      onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Description</label>
                  <textarea
                    rows={3}
                    value={editForm.bio}
                    onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Profile Picture Image URL</label>
                  <input
                    type="text"
                    value={editForm.profilePicUrl}
                    onChange={e => setEditForm({ ...editForm, profilePicUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Cover / Background Banner Image URL</label>
                  <input
                    type="text"
                    value={editForm.coverImageUrl || ''}
                    onChange={e => setEditForm({ ...editForm, coverImageUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: SOCIALS */}
            {activeTab === 'socials' && editForm && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">Manage social media profile links attached to this profile.</span>
                {editForm.socialLinks.map((soc, idx) => (
                  <div key={soc.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase w-20">{soc.platform}</span>
                    <input
                      type="url"
                      value={soc.url}
                      onChange={e => {
                        const updatedSoc = [...editForm.socialLinks];
                        updatedSoc[idx].url = e.target.value;
                        setEditForm({ ...editForm, socialLinks: updatedSoc });
                      }}
                      className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={soc.enabled}
                        onChange={e => {
                          const updatedSoc = [...editForm.socialLinks];
                          updatedSoc[idx].enabled = e.target.checked;
                          setEditForm({ ...editForm, socialLinks: updatedSoc });
                        }}
                      />
                      <span>Active</span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: CUSTOM LINKS */}
            {activeTab === 'links' && editForm && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Custom Links ({editForm.customLinks.length})</span>
                  <button
                    onClick={handleAddCustomLink}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Custom Link</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {editForm.customLinks.map((link, idx) => (
                    <div key={link.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveCustomLink(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveCustomLink(idx, 'down')}
                            disabled={idx === editForm.customLinks.length - 1}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono text-slate-500 font-bold ml-1">#{link.order}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteCustomLink(link.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={link.title}
                        onChange={e => handleUpdateCustomLink(link.id, { title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-white"
                        placeholder="Link Title"
                      />
                      <input
                        type="text"
                        value={link.description || ''}
                        onChange={e => handleUpdateCustomLink(link.id, { description: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300"
                        placeholder="Description"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={e => handleUpdateCustomLink(link.id, { url: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-indigo-400"
                        placeholder="Destination URL (https://...)"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: FEATURED SPOTLIGHT */}
            {activeTab === 'featured' && editForm && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">Highlight your most important course, product, or release prominently on your profile.</span>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Featured Title</label>
                  <input
                    type="text"
                    value={editForm.featuredContent?.title || ''}
                    onChange={e => setEditForm({
                      ...editForm,
                      featuredContent: { ...editForm.featuredContent!, title: e.target.value, enabled: true, id: editForm.featuredContent?.id || 'feat_1', description: editForm.featuredContent?.description || '', url: editForm.featuredContent?.url || '', imageUrl: editForm.featuredContent?.imageUrl || '' }
                    })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Featured Description</label>
                  <textarea
                    rows={2}
                    value={editForm.featuredContent?.description || ''}
                    onChange={e => setEditForm({
                      ...editForm,
                      featuredContent: { ...editForm.featuredContent!, description: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Destination URL</label>
                  <input
                    type="url"
                    value={editForm.featuredContent?.url || ''}
                    onChange={e => setEditForm({
                      ...editForm,
                      featuredContent: { ...editForm.featuredContent!, url: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Spotlight Image URL</label>
                  <input
                    type="text"
                    value={editForm.featuredContent?.imageUrl || ''}
                    onChange={e => setEditForm({
                      ...editForm,
                      featuredContent: { ...editForm.featuredContent!, imageUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: THEME STYLING */}
            {activeTab === 'theme' && editForm && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">Choose a designer theme preset for your public profile page.</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'dark-slate', name: 'Dark Slate (Default)' },
                    { id: 'sunset-glow', name: 'Sunset Glow' },
                    { id: 'emerald-minimal', name: 'Emerald Minimal' },
                    { id: 'cyber-violet', name: 'Cyber Violet' },
                    { id: 'clean-light', name: 'Clean Light' },
                    { id: 'midnight-gold', name: 'Midnight Gold' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setEditForm({ ...editForm, theme: t.id as ProfileTheme })}
                      className={`p-3 text-left border rounded-xl text-xs font-semibold transition-all ${
                        editForm.theme === t.id ? 'border-indigo-500 bg-indigo-600/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Mobile Preview Frame (5 cols) */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-3xl text-center shadow-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">Live Mobile Preview</span>
              {/* Smartphone Frame */}
              <div className="mx-auto w-[280px] h-[540px] bg-slate-950 border-4 border-slate-800 rounded-[36px] overflow-y-auto p-3 shadow-2xl text-left font-sans text-white scrollbar-thin">
                {editForm && (
                  <div className="space-y-3 text-center pt-2">
                    <img src={editForm.profilePicUrl} alt="" className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-indigo-500" />
                    <h4 className="text-sm font-bold">{editForm.fullName}</h4>
                    <p className="text-[10px] opacity-75">{editForm.bio}</p>
                    <div className="space-y-2 pt-2">
                      {editForm.customLinks.filter(l => l.enabled).map(l => (
                        <div key={l.id} className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-left truncate font-semibold text-slate-200">
                          {l.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareProfile && (
        <ShareModal
          isOpen={!!shareProfile}
          onClose={() => setShareProfile(null)}
          title={shareProfile.fullName}
          url={`${window.location.origin}/#/${shareProfile.username}`}
        />
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgradeSuccess={refreshProfiles}
      />
    </div>
  );
};
