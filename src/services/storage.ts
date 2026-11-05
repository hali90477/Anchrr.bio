import { User, CreatorProfile, SmartLink, ClickEvent, TrackingIntegration, ApiKey, TrackingEvent, VisitorSession } from '../types';

const USERS_KEY = 'anchrr_users_v1';
const CURRENT_USER_KEY = 'anchrr_current_user_v1';
const PROFILES_KEY = 'anchrr_profiles_v1';
const SMART_LINKS_KEY = 'anchrr_smart_links_v1';
const CLICK_EVENTS_KEY = 'anchrr_click_events_v1';
const INTEGRATIONS_KEY = 'anchrr_integrations_v1';
const API_KEYS_KEY = 'anchrr_api_keys_v1';
const TRACKING_EVENTS_KEY = 'anchrr_tracking_events_v1';

// Seed Initial Data
const SEED_USER: User = {
  id: 'usr_demo_01',
  fullName: 'Alexa Rivera',
  email: 'alexa@anchrr.creator',
  emailVerified: true,
  username: 'alexariver',
  avatarUrl: '/src/assets/images/avatar_alexa_creator_1793880940610.jpg',
  timezone: 'America/Los_Angeles',
  dateFormat: 'YYYY-MM-DD',
  plan: 'free',
  createdAt: '2026-01-15T10:00:00Z',
};

const SEED_PROFILES: CreatorProfile[] = [
  {
    id: 'prof_01',
    userId: 'usr_demo_01',
    fullName: 'Alexa Rivera',
    username: 'alexariver',
    category: 'Digital Creator & Designer',
    location: 'San Francisco, CA',
    bio: 'Building digital products, sharing UI design tips, and scaling creator businesses. 🎨✨',
    profilePicUrl: '/src/assets/images/avatar_alexa_creator_1793880940610.jpg',
    coverImageUrl: '/src/assets/images/cover_sunset_vibes_1793880939909.jpg',
    theme: 'dark-slate',
    isPublished: true,
    createdAt: '2026-01-15T10:30:00Z',
    updatedAt: '2026-11-04T18:20:00Z',
    viewsCount: 14280,
    clicksCount: 5820,
    socialLinks: [
      { id: 'soc_1', platform: 'instagram', url: 'https://instagram.com', title: 'Instagram', enabled: true },
      { id: 'soc_2', platform: 'youtube', url: 'https://youtube.com', title: 'YouTube', enabled: true },
      { id: 'soc_3', platform: 'x', url: 'https://x.com', title: 'X / Twitter', enabled: true },
      { id: 'soc_4', platform: 'tiktok', url: 'https://tiktok.com', title: 'TikTok', enabled: true },
      { id: 'soc_5', platform: 'linkedin', url: 'https://linkedin.com', title: 'LinkedIn', enabled: true }
    ],
    customLinks: [
      {
        id: 'lnk_1',
        title: '🚀 UI Design Masterclass 2026',
        description: 'Join 5,000+ designers learning modern interface architecture.',
        url: 'https://anchrr.com/masterclass',
        enabled: true,
        order: 1,
        clickCount: 2410
      },
      {
        id: 'lnk_2',
        title: '📦 Grab My Free Figma UI Kit',
        description: '100+ production-ready components & Tailwind tokens.',
        url: 'https://anchrr.com/uikit',
        enabled: true,
        order: 2,
        clickCount: 1890
      },
      {
        id: 'lnk_3',
        title: '🎙️ Listen to The Creator Mindset Podcast',
        description: 'Weekly episodes on scaling audience and monetization.',
        url: 'https://anchrr.com/podcast',
        enabled: true,
        order: 3,
        clickCount: 1120
      }
    ],
    featuredContent: {
      id: 'feat_1',
      title: '🔥 New Course Launch: Full-Stack SaaS Engineering',
      description: 'Learn how to build end-to-end SaaS products from scratch with Next.js & Supabase.',
      url: 'https://anchrr.com/saas-course',
      imageUrl: '/src/assets/images/hero_creator_dashboard_1793880939674.jpg',
      enabled: true,
      badgeText: 'FEATURED SPOTLIGHT'
    }
  },
  {
    id: 'prof_02',
    userId: 'usr_demo_01',
    fullName: 'Tech with Sam',
    username: 'techwithsam',
    category: 'Software & Gadgets',
    location: 'Austin, TX',
    bio: 'Honest tech reviews, developer setups, and AI tool breakdowns.',
    profilePicUrl: '/src/assets/images/avatar_alexa_creator_1793880940610.jpg',
    coverImageUrl: '/src/assets/images/cover_sunset_vibes_1793880939909.jpg',
    theme: 'cyber-violet',
    isPublished: true,
    createdAt: '2026-02-01T12:00:00Z',
    updatedAt: '2026-10-20T14:10:00Z',
    viewsCount: 8910,
    clicksCount: 3410,
    socialLinks: [
      { id: 'soc_21', platform: 'youtube', url: 'https://youtube.com', title: 'YouTube Channel', enabled: true },
      { id: 'soc_22', platform: 'github', url: 'https://github.com', title: 'GitHub Code Repos', enabled: true },
      { id: 'soc_23', platform: 'x', url: 'https://x.com', title: 'X Tech Updates', enabled: true }
    ],
    customLinks: [
      {
        id: 'lnk_21',
        title: '💻 My 2026 Desk Setup Gear List',
        description: 'Monitors, mechanical keyboards, camera, and acoustic setup.',
        url: 'https://anchrr.com/desk-setup',
        enabled: true,
        order: 1,
        clickCount: 1950
      },
      {
        id: 'lnk_22',
        title: '⚡ Top 10 Developer Productivity Tools',
        description: 'The exact tools I use every day to code 2x faster.',
        url: 'https://anchrr.com/dev-tools',
        enabled: true,
        order: 2,
        clickCount: 1460
      }
    ]
  }
];

const SEED_SMART_LINKS: SmartLink[] = [
  {
    id: 'slink_1',
    userId: 'usr_demo_01',
    title: 'Spring 2026 Course Promo',
    shortCode: 'spring26',
    destinationUrl: 'https://anchrr.com/masterclass?utm_source=social&utm_medium=smartlink',
    isEnabled: true,
    clickCount: 1420,
    createdAt: '2026-03-01T08:00:00Z',
    utmSource: 'anchrr_smartlink',
    utmMedium: 'bio_link',
    utmCampaign: 'spring_promo_2026',
    geoRouting: [
      { countryCode: 'US', destinationUrl: 'https://anchrr.com/masterclass?region=us' },
      { countryCode: 'GB', destinationUrl: 'https://anchrr.com/masterclass?region=uk' }
    ]
  },
  {
    id: 'slink_2',
    userId: 'usr_demo_01',
    title: 'Desk Setup Gear Kit',
    shortCode: 'desk2026',
    destinationUrl: 'https://amazon.com/shop/alexariver',
    isEnabled: true,
    clickCount: 980,
    createdAt: '2026-03-10T14:30:00Z'
  },
  {
    id: 'slink_3',
    userId: 'usr_demo_01',
    title: 'Figma Component Library',
    shortCode: 'figma-free',
    destinationUrl: 'https://figma.com/@alexariver',
    isEnabled: true,
    clickCount: 2310,
    createdAt: '2026-02-18T11:20:00Z'
  }
];

const SEED_CLICK_EVENTS: ClickEvent[] = [
  { id: 'clk_1', smartLinkId: 'slink_1', profileId: 'prof_01', linkTitle: 'Spring 2026 Course Promo', destinationUrl: 'https://anchrr.com/masterclass', timestamp: '2026-11-05T03:45:10Z', country: 'United States', city: 'San Francisco', referrer: 'Instagram Bio', device: 'mobile', browser: 'Safari', os: 'iOS', sessionId: 'sess_99101', utmSource: 'instagram' },
  { id: 'clk_2', smartLinkId: 'slink_1', profileId: 'prof_01', linkTitle: 'Spring 2026 Course Promo', destinationUrl: 'https://anchrr.com/masterclass', timestamp: '2026-11-05T03:30:22Z', country: 'United Kingdom', city: 'London', referrer: 'YouTube Description', device: 'desktop', browser: 'Chrome', os: 'macOS', sessionId: 'sess_99102', utmSource: 'youtube' },
  { id: 'clk_3', smartLinkId: 'slink_3', profileId: 'prof_01', linkTitle: 'Figma Component Library', destinationUrl: 'https://figma.com/@alexariver', timestamp: '2026-11-05T02:15:00Z', country: 'Germany', city: 'Berlin', referrer: 'X / Twitter', device: 'desktop', browser: 'Firefox', os: 'Linux', sessionId: 'sess_99103', utmSource: 'twitter' },
  { id: 'clk_4', smartLinkId: 'slink_2', profileId: 'prof_02', linkTitle: 'Desk Setup Gear Kit', destinationUrl: 'https://amazon.com/shop/alexariver', timestamp: '2026-11-05T01:10:45Z', country: 'Canada', city: 'Toronto', referrer: 'TikTok Bio', device: 'mobile', browser: 'Safari', os: 'iOS', sessionId: 'sess_99104', utmSource: 'tiktok' },
  { id: 'clk_5', smartLinkId: 'slink_1', profileId: 'prof_01', linkTitle: 'Spring 2026 Course Promo', destinationUrl: 'https://anchrr.com/masterclass', timestamp: '2026-11-04T22:04:12Z', country: 'Australia', city: 'Sydney', referrer: 'Direct', device: 'mobile', browser: 'Chrome', os: 'Android', sessionId: 'sess_99105' },
  { id: 'clk_6', smartLinkId: 'slink_3', profileId: 'prof_01', linkTitle: 'Figma Component Library', destinationUrl: 'https://figma.com/@alexariver', timestamp: '2026-11-04T19:40:00Z', country: 'United States', city: 'New York', referrer: 'LinkedIn', device: 'desktop', browser: 'Chrome', os: 'Windows', sessionId: 'sess_99106', utmSource: 'linkedin' }
];

const SEED_INTEGRATIONS: TrackingIntegration[] = [
  { id: 'int_1', provider: 'meta_pixel', name: 'Meta (Facebook) Pixel', trackingId: '10928374659281', status: 'active', lastEventTime: '2026-11-05T03:45:10Z' },
  { id: 'int_2', provider: 'google_analytics', name: 'Google Analytics 4 (GA4)', trackingId: 'G-772910392X', status: 'active', lastEventTime: '2026-11-05T03:30:22Z' },
  { id: 'int_3', provider: 'tiktok_pixel', name: 'TikTok Pixel', trackingId: 'C9928172654', status: 'disabled' },
  { id: 'int_4', provider: 'custom_webhook', name: 'Shopify Conversion Webhook', trackingId: 'https://anchrr.com/api/webhooks/shopify', status: 'pending' }
];

const SEED_API_KEYS: ApiKey[] = [
  { id: 'key_1', name: 'Production Backend Server', keyPrefix: 'anc_live_9921', secret: 'anc_live_992183749281749201948291', createdAt: '2026-02-10T11:00:00Z', lastUsedAt: '2026-11-05T03:45:00Z' },
  { id: 'key_2', name: 'Mobile App Tracking Key', keyPrefix: 'anc_live_4412', secret: 'anc_live_441284930192840294810293', createdAt: '2026-04-12T16:30:00Z', lastUsedAt: '2026-11-04T18:12:00Z' }
];

const SEED_TRACKING_EVENTS: TrackingEvent[] = [
  { id: 'evt_1', eventName: 'PageView', source: 'anchrr_bio_profile', status: 'Tracked', timestamp: '2026-11-05T03:45:10Z' },
  { id: 'evt_2', eventName: 'LinkClicked', source: 'anchrr_smartlink', status: 'Click Recorded', timestamp: '2026-11-05T03:45:11Z' },
  { id: 'evt_3', eventName: 'CheckoutStarted', source: 'meta_pixel', status: 'Integration Required', timestamp: '2026-11-05T03:45:30Z' },
  { id: 'evt_4', eventName: 'PurchaseCompleted', source: 'shopify_webhook', status: 'Conversion Confirmed', timestamp: '2026-11-05T03:46:02Z', value: 149.00, currency: 'USD' }
];

export class StorageService {
  private static isInitialized = false;

  private static init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify([SEED_USER]));
    }
    if (!localStorage.getItem(CURRENT_USER_KEY)) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(SEED_USER));
    }
    if (!localStorage.getItem(PROFILES_KEY)) {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(SEED_PROFILES));
    }
    if (!localStorage.getItem(SMART_LINKS_KEY)) {
      localStorage.setItem(SMART_LINKS_KEY, JSON.stringify(SEED_SMART_LINKS));
    }
    if (!localStorage.getItem(CLICK_EVENTS_KEY)) {
      localStorage.setItem(CLICK_EVENTS_KEY, JSON.stringify(SEED_CLICK_EVENTS));
    }
    if (!localStorage.getItem(INTEGRATIONS_KEY)) {
      localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(SEED_INTEGRATIONS));
    }
    if (!localStorage.getItem(API_KEYS_KEY)) {
      localStorage.setItem(API_KEYS_KEY, JSON.stringify(SEED_API_KEYS));
    }
    if (!localStorage.getItem(TRACKING_EVENTS_KEY)) {
      localStorage.setItem(TRACKING_EVENTS_KEY, JSON.stringify(SEED_TRACKING_EVENTS));
    }

    this.isInitialized = true;
  }

  // User & Auth
  static getCurrentUser(): User | null {
    this.init();
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  static setCurrentUser(user: User | null): void {
    this.init();
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      // Sync into users list
      const users = this.getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx >= 0) users[idx] = user;
      else users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  static getUsers(): User[] {
    this.init();
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [SEED_USER];
  }

  // Creator Profiles
  static getProfiles(userId?: string): CreatorProfile[] {
    this.init();
    const data = localStorage.getItem(PROFILES_KEY);
    const profiles: CreatorProfile[] = data ? JSON.parse(data) : SEED_PROFILES;
    if (userId) return profiles.filter(p => p.userId === userId);
    return profiles;
  }

  static getProfileByUsername(username: string): CreatorProfile | undefined {
    this.init();
    const profiles = this.getProfiles();
    return profiles.find(p => p.username.toLowerCase() === username.toLowerCase());
  }

  static saveProfile(profile: CreatorProfile): { success: boolean; message?: string } {
    this.init();
    const profiles = this.getProfiles();
    const userProfiles = profiles.filter(p => p.userId === profile.userId && p.id !== profile.id);

    // Enforce 3 profile limit for Free plan
    const user = this.getCurrentUser();
    if (user && user.plan === 'free' && userProfiles.length >= 3) {
      return { success: false, message: 'Free plan is limited to 3 profiles. Upgrade to Pro for unlimited profiles.' };
    }

    // Check unique username constraint
    const existingUsername = profiles.find(p => p.username.toLowerCase() === profile.username.toLowerCase() && p.id !== profile.id);
    if (existingUsername) {
      return { success: false, message: 'Username is already taken by another creator.' };
    }

    const idx = profiles.findIndex(p => p.id === profile.id);
    if (idx >= 0) {
      profiles[idx] = { ...profile, updatedAt: new Date().toISOString() };
    } else {
      profiles.push({ ...profile, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }

    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    return { success: true };
  }

  static deleteProfile(id: string): void {
    this.init();
    const profiles = this.getProfiles().filter(p => p.id !== id);
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  }

  // Smart Links
  static getSmartLinks(userId?: string): SmartLink[] {
    this.init();
    const data = localStorage.getItem(SMART_LINKS_KEY);
    const links: SmartLink[] = data ? JSON.parse(data) : SEED_SMART_LINKS;
    if (userId) return links.filter(l => l.userId === userId);
    return links;
  }

  static getSmartLinkByCode(code: string): SmartLink | undefined {
    this.init();
    const links = this.getSmartLinks();
    return links.find(l => l.shortCode.toLowerCase() === code.toLowerCase());
  }

  static saveSmartLink(link: SmartLink): { success: boolean; message?: string } {
    this.init();
    const links = this.getSmartLinks();

    // Check duplicate shortcode
    const existingCode = links.find(l => l.shortCode.toLowerCase() === link.shortCode.toLowerCase() && l.id !== link.id);
    if (existingCode) {
      return { success: false, message: 'Short code is already in use.' };
    }

    const idx = links.findIndex(l => l.id === link.id);
    if (idx >= 0) {
      links[idx] = link;
    } else {
      links.push(link);
    }
    localStorage.setItem(SMART_LINKS_KEY, JSON.stringify(links));
    return { success: true };
  }

  static deleteSmartLink(id: string): void {
    this.init();
    const links = this.getSmartLinks().filter(l => l.id !== id);
    localStorage.setItem(SMART_LINKS_KEY, JSON.stringify(links));
  }

  // Analytics & Clicks
  static recordClick(event: Omit<ClickEvent, 'id' | 'timestamp'>): ClickEvent {
    this.init();
    const events = this.getClickEvents();
    const newEvent: ClickEvent = {
      ...event,
      id: 'clk_' + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    events.unshift(newEvent);
    localStorage.setItem(CLICK_EVENTS_KEY, JSON.stringify(events));

    // Increment click counts
    if (event.smartLinkId) {
      const smartLinks = this.getSmartLinks();
      const sl = smartLinks.find(l => l.id === event.smartLinkId);
      if (sl) {
        sl.clickCount = (sl.clickCount || 0) + 1;
        localStorage.setItem(SMART_LINKS_KEY, JSON.stringify(smartLinks));
      }
    }

    if (event.profileId) {
      const profiles = this.getProfiles();
      const prof = profiles.find(p => p.id === event.profileId);
      if (prof) {
        prof.clicksCount = (prof.clicksCount || 0) + 1;
        localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      }
    }

    return newEvent;
  }

  static recordProfileView(profileId: string): void {
    this.init();
    const profiles = this.getProfiles();
    const prof = profiles.find(p => p.id === profileId);
    if (prof) {
      prof.viewsCount = (prof.viewsCount || 0) + 1;
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    }
  }

  static getClickEvents(): ClickEvent[] {
    this.init();
    const data = localStorage.getItem(CLICK_EVENTS_KEY);
    return data ? JSON.parse(data) : SEED_CLICK_EVENTS;
  }

  // Integrations & API Keys
  static getIntegrations(): TrackingIntegration[] {
    this.init();
    const data = localStorage.getItem(INTEGRATIONS_KEY);
    return data ? JSON.parse(data) : SEED_INTEGRATIONS;
  }

  static saveIntegration(integration: TrackingIntegration): void {
    this.init();
    const integrations = this.getIntegrations();
    const idx = integrations.findIndex(i => i.id === integration.id);
    if (idx >= 0) integrations[idx] = integration;
    else integrations.push(integration);
    localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(integrations));
  }

  static getApiKeys(): ApiKey[] {
    this.init();
    const data = localStorage.getItem(API_KEYS_KEY);
    return data ? JSON.parse(data) : SEED_API_KEYS;
  }

  static createApiKey(name: string): ApiKey {
    this.init();
    const keys = this.getApiKeys();
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newKey: ApiKey = {
      id: 'key_' + Math.random().toString(36).substr(2, 7),
      name,
      keyPrefix: 'anc_live_' + randomHex.substring(0, 4),
      secret: 'anc_live_' + randomHex,
      createdAt: new Date().toISOString()
    };
    keys.push(newKey);
    localStorage.setItem(API_KEYS_KEY, JSON.stringify(keys));
    return newKey;
  }

  static revokeApiKey(id: string): void {
    this.init();
    const keys = this.getApiKeys().filter(k => k.id !== id);
    localStorage.setItem(API_KEYS_KEY, JSON.stringify(keys));
  }

  static getTrackingEvents(): TrackingEvent[] {
    this.init();
    const data = localStorage.getItem(TRACKING_EVENTS_KEY);
    return data ? JSON.parse(data) : SEED_TRACKING_EVENTS;
  }

  static recordTrackingEvent(event: Omit<TrackingEvent, 'id' | 'timestamp'>): TrackingEvent {
    this.init();
    const events = this.getTrackingEvents();
    const newEvt: TrackingEvent = {
      ...event,
      id: 'evt_' + Math.random().toString(36).substr(2, 7),
      timestamp: new Date().toISOString()
    };
    events.unshift(newEvt);
    localStorage.setItem(TRACKING_EVENTS_KEY, JSON.stringify(events));
    return newEvt;
  }
}
