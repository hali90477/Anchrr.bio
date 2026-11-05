import React, { useState } from 'react';
import { SmartLink, User } from '../types';
import { StorageService } from '../services/storage';
import QRCode from 'qrcode';
import { Plus, Copy, Check, Trash2, Edit2, ExternalLink, Globe, Smartphone, QrCode, Shield, Sliders, Search, Link as LinkIcon } from 'lucide-react';

interface SmartLinksViewProps {
  user: User;
}

export const SmartLinksView: React.FC<SmartLinksViewProps> = ({ user }) => {
  const [links, setLinks] = useState<SmartLink[]>(() => StorageService.getSmartLinks(user.id));
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SmartLink | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [qrModalUrl, setQrModalUrl] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Form State
  const [title, setTitle] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [utmSource, setUtmSource] = useState('anchrr');
  const [utmMedium, setUtmMedium] = useState('smartlink');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [usDestination, setUsDestination] = useState('');
  const [mobileDestination, setMobileDestination] = useState('');

  const refreshLinks = () => {
    setLinks(StorageService.getSmartLinks(user.id));
  };

  const handleOpenCreate = () => {
    setEditingLink(null);
    setTitle('');
    const code = Math.random().toString(36).substr(2, 6);
    setShortCode(code);
    setDestinationUrl('https://');
    setUtmSource('anchrr');
    setUtmMedium('smartlink');
    setUtmCampaign('');
    setUsDestination('');
    setMobileDestination('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !shortCode || !destinationUrl) return;

    const newLink: SmartLink = {
      id: editingLink ? editingLink.id : 'slink_' + Math.random().toString(36).substr(2, 7),
      userId: user.id,
      title,
      shortCode: shortCode.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
      destinationUrl,
      isEnabled: true,
      clickCount: editingLink ? editingLink.clickCount : 0,
      createdAt: editingLink ? editingLink.createdAt : new Date().toISOString(),
      utmSource,
      utmMedium,
      utmCampaign,
      geoRouting: usDestination ? [{ countryCode: 'US', destinationUrl: usDestination }] : undefined,
      deviceRouting: mobileDestination ? [{ deviceType: 'mobile', destinationUrl: mobileDestination }] : undefined
    };

    const res = StorageService.saveSmartLink(newLink);
    if (res.success) {
      // Also notify backend server for instant server-side 302 redirecting
      try {
        await fetch('/api/shortlinks/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shortCode: newLink.shortCode,
            destinationUrl: newLink.destinationUrl,
            geoRouting: newLink.geoRouting,
            deviceRouting: newLink.deviceRouting
          })
        });
      } catch {
        // silent fallback to client route
      }

      refreshLinks();
      setIsModalOpen(false);
    } else {
      alert(res.message);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this smart link?')) {
      StorageService.deleteSmartLink(id);
      refreshLinks();
    }
  };

  const handleCopy = (code: string) => {
    const fullUrl = `${window.location.origin}/s/${code}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleOpenQr = async (code: string) => {
    const fullUrl = `${window.location.origin}/s/${code}`;
    setQrModalUrl(fullUrl);
    const data = await QRCode.toDataURL(fullUrl, { width: 240, margin: 1 });
    setQrDataUrl(data);
  };

  const filtered = links.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.shortCode.toLowerCase().includes(search.toLowerCase()) ||
    l.destinationUrl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Smart Links & URL Shortener</h1>
          <p className="text-xs text-slate-400">
            Create clean short links, configure geo & device routing, and track redirect analytics.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Short Link</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 p-2 bg-slate-900 border border-slate-800 rounded-2xl">
        <Search className="w-4 h-4 text-slate-500 ml-2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, short code, or destination URL..."
          className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Smart Links Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-6">Link Title</th>
                <th className="py-3.5 px-6">Short Code & URL</th>
                <th className="py-3.5 px-6">Destination URL</th>
                <th className="py-3.5 px-6 text-center">Clicks</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No smart links created yet. Click "Create Short Link" above to shorten your first URL.
                  </td>
                </tr>
              ) : (
                filtered.map(link => {
                  const fullUrl = `${window.location.origin}/s/${link.shortCode}`;
                  return (
                    <tr key={link.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{link.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-indigo-400 font-semibold">
                        <div className="flex items-center gap-2">
                          <span>/s/{link.shortCode}</span>
                          <button
                            onClick={() => handleCopy(link.shortCode)}
                            className="p-1 hover:text-white transition-colors"
                            title="Copy Short URL"
                          >
                            {copiedCode === link.shortCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300 max-w-xs truncate font-mono text-[11px]">
                        {link.destinationUrl}
                      </td>
                      <td className="py-4 px-6 text-center font-mono font-bold text-indigo-300">
                        {link.clickCount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenQr(link.shortCode)}
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            title="View QR Code"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                          <a
                            href={fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Test Redirect"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(link.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors"
                            title="Delete Link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create Smart Short Link</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Link Title / Campaign Name</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  placeholder="Spring 2026 Promo"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Custom Short Code</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-slate-400">anchrr.com/s/</span>
                  <input
                    type="text"
                    required
                    value={shortCode}
                    onChange={e => setShortCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-400"
                    placeholder="spring26"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Default Destination URL</label>
                <input
                  type="url"
                  required
                  value={destinationUrl}
                  onChange={e => setDestinationUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-300"
                  placeholder="https://yourwebsite.com/destination"
                />
              </div>

              {/* Advanced Smart Routing Section */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Smart Routing & UTM Parameters</span>
                </span>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-sky-400" />
                    <span>United States (US) Geo Routing Destination (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={usDestination}
                    onChange={e => setUsDestination(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300"
                    placeholder="https://us.yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-purple-400" />
                    <span>Mobile Visitors Destination (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={mobileDestination}
                    onChange={e => setMobileDestination(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300"
                    placeholder="https://m.yourwebsite.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase">UTM Source</label>
                    <input
                      type="text"
                      value={utmSource}
                      onChange={e => setUtmSource(e.target.value)}
                      className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase">UTM Medium</label>
                    <input
                      type="text"
                      value={utmMedium}
                      onChange={e => setUtmMedium(e.target.value)}
                      className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors"
                >
                  Save & Activate Link
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR MODAL */}
      {qrModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4 max-w-sm w-full">
            <h3 className="text-base font-bold text-white">Smart Link QR Code</h3>
            <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-md" />
            <p className="text-xs font-mono text-slate-400 break-all">{qrModalUrl}</p>
            <button
              onClick={() => setQrModalUrl(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
