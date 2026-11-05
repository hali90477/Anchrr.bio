import React, { useState } from 'react';
import { User, TrackingIntegration, ApiKey, TrackingEvent } from '../types';
import { StorageService } from '../services/storage';
import { ShieldCheck, Key, Code2, Plus, Copy, Check, Trash2, Radio, Play, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface TrackingViewProps {
  user: User;
}

export const TrackingView: React.FC<TrackingViewProps> = () => {
  const [integrations, setIntegrations] = useState<TrackingIntegration[]>(() => StorageService.getIntegrations());
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => StorageService.getApiKeys());
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>(() => StorageService.getTrackingEvents());

  const [activeTab, setActiveTab] = useState<'pixels' | 'apikeys' | 'events'>('pixels');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [simulatingEvent, setSimulatingEvent] = useState(false);

  // Pixel Form state
  const [metaPixelId, setMetaPixelId] = useState(integrations.find(i => i.provider === 'meta_pixel')?.trackingId || '');
  const [ga4Id, setGa4Id] = useState(integrations.find(i => i.provider === 'google_analytics')?.trackingId || '');

  const handleSavePixels = () => {
    if (metaPixelId) {
      StorageService.saveIntegration({
        id: 'int_1',
        provider: 'meta_pixel',
        name: 'Meta (Facebook) Pixel',
        trackingId: metaPixelId,
        status: 'active',
        lastEventTime: new Date().toISOString()
      });
    }
    if (ga4Id) {
      StorageService.saveIntegration({
        id: 'int_2',
        provider: 'google_analytics',
        name: 'Google Analytics 4 (GA4)',
        trackingId: ga4Id,
        status: 'active',
        lastEventTime: new Date().toISOString()
      });
    }
    setIntegrations(StorageService.getIntegrations());
    alert('Tracking pixels updated and active!');
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    StorageService.createApiKey(newKeyName);
    setApiKeys(StorageService.getApiKeys());
    setNewKeyName('');
    setIsKeyModalOpen(false);
  };

  const handleRevokeKey = (id: string) => {
    if (confirm('Revoke this API Key? Any external service using this key will immediately lose access.')) {
      StorageService.revokeApiKey(id);
      setApiKeys(StorageService.getApiKeys());
    }
  };

  const handleCopyKey = (id: string, secret: string) => {
    navigator.clipboard.writeText(secret);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleSimulateTestEvent = () => {
    setSimulatingEvent(true);
    setTimeout(() => {
      const newEvt = StorageService.recordTrackingEvent({
        eventName: 'PurchaseCompleted',
        source: 'anchrr_test_simulator',
        status: 'Conversion Confirmed',
        value: 129.00,
        currency: 'USD'
      });
      setTrackingEvents(StorageService.getTrackingEvents());
      setSimulatingEvent(false);
    }, 1200);
  };

  const getStatusBadge = (status: TrackingEvent['status']) => {
    switch (status) {
      case 'Tracked':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">Tracked</span>;
      case 'Click Recorded':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">Click Recorded</span>;
      case 'Integration Required':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Integration Required</span>;
      case 'Conversion Confirmed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Conversion Confirmed</span>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Tracking & Integrations</h1>
          <p className="text-xs text-slate-400">
            Connect Meta Pixel, Google Analytics, generate API keys, and monitor conversion events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateTestEvent}
            disabled={simulatingEvent}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
          >
            <Play className={`w-3.5 h-3.5 ${simulatingEvent ? 'animate-spin' : ''}`} />
            <span>{simulatingEvent ? 'Dispatching...' : 'Dispatch Test Event'}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('pixels')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'pixels' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Tracking Pixels
        </button>
        <button
          onClick={() => setActiveTab('apikeys')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'apikeys' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          API Keys ({apiKeys.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'events' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Event Manager
        </button>
      </div>

      {/* TAB 1: PIXELS */}
      {activeTab === 'pixels' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Meta Pixel */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-blue-400" /> Meta (Facebook) Pixel
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold">Connected</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fires PageView, ViewContent, and Lead conversion events on profile views and link redirects.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Meta Pixel ID</label>
              <input
                type="text"
                value={metaPixelId}
                onChange={e => setMetaPixelId(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-300"
                placeholder="e.g. 10928374659281"
              />
            </div>
            <button
              onClick={handleSavePixels}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Update Meta Pixel
            </button>
          </div>

          {/* GA4 */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-400" /> Google Analytics 4 (GA4)
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold">Connected</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Streams real-time event telemetry directly to your GA4 measurement stream.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GA4 Measurement ID</label>
              <input
                type="text"
                value={ga4Id}
                onChange={e => setGa4Id(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-300"
                placeholder="e.g. G-772910392X"
              />
            </div>
            <button
              onClick={handleSavePixels}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Update GA4 Stream
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: API KEYS */}
      {activeTab === 'apikeys' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Active Secret API Keys</h3>
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Key</span>
            </button>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs rounded-2xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Never expose secret API keys in client-side code. Use server-side authorization headers.</span>
          </div>

          <div className="space-y-3">
            {apiKeys.map(key => (
              <div key={key.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">{key.name}</h4>
                  <p className="text-xs font-mono text-slate-400">Prefix: {key.keyPrefix}••••••••••••</p>
                  <span className="text-[10px] text-slate-500">Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyKey(key.id, key.secret)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors"
                  >
                    {copiedKeyId === key.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKeyId === key.id ? 'Copied' : 'Copy Secret'}</span>
                  </button>
                  <button
                    onClick={() => handleRevokeKey(key.id)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors"
                    title="Revoke Key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EVENT MANAGER */}
      {activeTab === 'events' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white">Live Event Stream Manager</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="py-2.5">Event Name</th>
                  <th className="py-2.5">Source</th>
                  <th className="py-2.5">Timestamp (UTC)</th>
                  <th className="py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {trackingEvents.map(evt => (
                  <tr key={evt.id} className="hover:bg-slate-850/40">
                    <td className="py-3 font-mono font-bold text-indigo-300">{evt.eventName}</td>
                    <td className="py-3 text-slate-400">{evt.source}</td>
                    <td className="py-3 font-mono text-[11px] text-slate-500">{new Date(evt.timestamp).toUTCString()}</td>
                    <td className="py-3 text-center">{getStatusBadge(evt.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <form onSubmit={handleCreateApiKey} className="w-full max-w-sm p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-white">Create New API Key</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Key Description Name</label>
              <input
                type="text"
                required
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                placeholder="e.g. Production Mobile App"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl"
              >
                Generate Secret Key
              </button>
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(false)}
                className="px-3 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
