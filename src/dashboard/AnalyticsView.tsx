import React, { useState } from 'react';
import { User, CreatorProfile, ClickEvent } from '../types';
import { StorageService } from '../services/storage';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Eye, MousePointerClick, Users, TrendingUp, Download, Globe, Smartphone, ArrowRight, UserCheck, Activity } from 'lucide-react';

interface AnalyticsViewProps {
  user: User;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ user }) => {
  const profiles = StorageService.getProfiles(user.id);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'journeys'>('overview');

  const clickEvents = StorageService.getClickEvents();
  const filteredEvents = selectedProfileId === 'all'
    ? clickEvents
    : clickEvents.filter(e => e.profileId === selectedProfileId);

  // Compute metrics
  const totalViews = selectedProfileId === 'all'
    ? profiles.reduce((acc, p) => acc + p.viewsCount, 0)
    : (profiles.find(p => p.id === selectedProfileId)?.viewsCount || 0);

  const totalClicks = selectedProfileId === 'all'
    ? profiles.reduce((acc, p) => acc + p.clicksCount, 0) + filteredEvents.length
    : (profiles.find(p => p.id === selectedProfileId)?.clicksCount || 0);

  const uniqueVisitorsEst = Math.round(totalViews * 0.72);
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

  // Time-series mock data for recharts
  const trendData = [
    { date: 'Nov 01', views: 820, clicks: 340 },
    { date: 'Nov 02', views: 1140, clicks: 490 },
    { date: 'Nov 03', views: 980, clicks: 420 },
    { date: 'Nov 04', views: 1450, clicks: 680 },
    { date: 'Nov 05', views: 1680, clicks: 790 },
  ];

  // Sources Data
  const sourcesData = [
    { name: 'Instagram', value: 42, color: '#E1306C' },
    { name: 'YouTube', value: 28, color: '#FF0000' },
    { name: 'X / Twitter', value: 15, color: '#1DA1F2' },
    { name: 'Direct', value: 10, color: '#6366F1' },
    { name: 'TikTok', value: 5, color: '#00F2FE' },
  ];

  // Device Data
  const deviceData = [
    { name: 'Mobile (iOS/Android)', value: 68 },
    { name: 'Desktop (macOS/Windows)', value: 32 }
  ];

  // Anonymous Visitor Session Journey Logs (Section 12)
  const sessionJourneys = [
    {
      sessionId: 'sess_99101',
      country: 'United States (San Francisco)',
      device: 'iPhone 15 (iOS / Safari)',
      steps: [
        { time: '03:45:10 UTC', action: 'Entry Page View', detail: 'Opened anchrr.com/alexariver via Instagram link' },
        { time: '03:45:12 UTC', action: 'Link Clicked', detail: 'Clicked "🚀 UI Design Masterclass 2026"' },
        { time: '03:45:13 UTC', action: 'Redirected', detail: 'Redirected to anchrr.com/masterclass' }
      ]
    },
    {
      sessionId: 'sess_99102',
      country: 'United Kingdom (London)',
      device: 'MacBook Air (macOS / Chrome)',
      steps: [
        { time: '03:30:22 UTC', action: 'Entry Page View', detail: 'Opened anchrr.com/techwithsam via YouTube' },
        { time: '03:30:25 UTC', action: 'Link Clicked', detail: 'Clicked "💻 My 2026 Desk Setup Gear List"' },
        { time: '03:30:26 UTC', action: 'Redirected', detail: 'Redirected to amazon.com/shop/alexariver' }
      ]
    }
  ];

  const handleExportCSV = () => {
    const csvRows = [
      ['Event ID', 'Profile ID', 'Link Title', 'Destination URL', 'Timestamp', 'Country', 'Referrer', 'Device'],
      ...filteredEvents.map(e => [
        e.id,
        e.profileId || '',
        `"${e.linkTitle}"`,
        `"${e.destinationUrl}"`,
        e.timestamp,
        e.country,
        e.referrer,
        e.device
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `anchrr_analytics_${selectedProfileId}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Profile Selector (Section 12) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Analytics Workspace</h1>
          <p className="text-xs text-slate-400">
            Comprehensive visitor insights, traffic sources, click-through rates, and anonymous session journeys.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Profile Selector Dropdown */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200">
            <span className="text-slate-400">Profile:</span>
            <select
              value={selectedProfileId}
              onChange={e => setSelectedProfileId(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Profiles</option>
              {profiles.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900">
                  @{p.username} ({p.fullName})
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium">
            {(['24h', '7d', '30d', '90d'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${timeframe === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Profile Views</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><Eye className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white mb-1">{totalViews.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% vs last period
          </span>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Link Clicks</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><MousePointerClick className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white mb-1">{totalClicks.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.5% vs last period
          </span>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Unique Visitors (Est)</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Users className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white mb-1">{uniqueVisitorsEst.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">~72% unique visitor ratio</span>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Click-Through Rate (CTR)</span>
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg"><Activity className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white mb-1">{ctr}%</div>
          <span className="text-[11px] text-indigo-400 font-semibold">High Conversion Rate</span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Traffic Trends & Breakdown
        </button>
        <button
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'sources' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Referral Traffic & Demographics
        </button>
        <button
          onClick={() => setActiveTab('journeys')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'journeys' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Visitor Journey Logs
        </button>
      </div>

      {/* TAB 1: OVERVIEW CHARTS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Area Chart */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white">Traffic Trends (Views vs Clicks)</h3>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span> Profile Views
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Link Clicks
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="views" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Links Table */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold text-white mb-4">Top Performing Links & CTR</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="py-2.5">Link Title</th>
                    <th className="py-2.5">Destination</th>
                    <th className="py-2.5 text-center">Total Clicks</th>
                    <th className="py-2.5 text-right">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map(evt => (
                      <tr key={evt.id} className="hover:bg-slate-850/40">
                        <td className="py-3 font-semibold text-white">{evt.linkTitle}</td>
                        <td className="py-3 font-mono text-[11px] text-slate-400 truncate max-w-xs">{evt.destinationUrl}</td>
                        <td className="py-3 text-center font-mono font-bold text-indigo-400">1</td>
                        <td className="py-3 text-right text-emerald-400 font-semibold">High Intent</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-500">No recent link clicks recorded for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOURCES & DEMOGRAPHICS */}
      {activeTab === 'sources' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold text-white mb-4">Traffic Referral Sources</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sourcesData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                    {sourcesData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4 text-xs">
              {sourcesData.map(s => (
                <div key={s.name} className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                    {s.name}
                  </span>
                  <span className="font-mono font-bold">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold text-white mb-4">Device & OS Breakdown</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceData}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="value" fill="#6366F1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VISITOR JOURNEYS */}
      {activeTab === 'journeys' && (
        <div className="space-y-6">
          {/* Aggregate Funnel Overview */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold text-white mb-4">Aggregate Visitor Journey Funnel</h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                <span className="text-[10px] text-slate-500 uppercase block">1. External Source</span>
                <span className="font-bold text-white text-sm">Instagram / YouTube</span>
              </div>
              <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl">
                <span className="text-[10px] text-indigo-400 uppercase block">2. Bio Profile View</span>
                <span className="font-bold text-white text-sm">{totalViews.toLocaleString()} Views</span>
              </div>
              <div className="p-4 bg-purple-950/40 border border-purple-500/30 rounded-2xl">
                <span className="text-[10px] text-purple-400 uppercase block">3. Link Clicked</span>
                <span className="font-bold text-white text-sm">{totalClicks.toLocaleString()} Clicks</span>
              </div>
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl">
                <span className="text-[10px] text-emerald-400 uppercase block">4. Final Redirect</span>
                <span className="font-bold text-white text-sm">{ctr}% Conversion</span>
              </div>
            </div>
          </div>

          {/* Anonymous Individual Session Logs (Section 12) */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white">Anonymous Visitor Session Logs</h3>
            {sessionJourneys.map(sess => (
              <div key={sess.sessionId} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 border-b border-slate-800/60 pb-2">
                  <span className="font-mono text-indigo-400 font-bold">Session ID: {sess.sessionId}</span>
                  <span className="text-slate-400">{sess.country} · {sess.device}</span>
                </div>
                <div className="space-y-2">
                  {sess.steps.map((st, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <span className="font-mono text-[10px] text-slate-500 w-24">{st.time}</span>
                      <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md text-[10px] font-bold w-28 text-center">{st.action}</span>
                      <span className="text-slate-300 truncate">{st.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
