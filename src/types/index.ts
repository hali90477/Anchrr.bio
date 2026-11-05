export interface User {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  username: string;
  avatarUrl?: string;
  timezone: string;
  dateFormat: string;
  plan: 'free' | 'pro' | 'business';
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'x' | 'linkedin' | 'pinterest' | 'snapchat' | 'whatsapp' | 'spotify' | 'twitch' | 'github' | 'website';
  url: string;
  title: string;
  enabled: boolean;
}

export interface CustomLink {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  enabled: boolean;
  order: number;
  clickCount: number;
}

export interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  enabled: boolean;
  badgeText?: string;
}

export type ProfileTheme = 'dark-slate' | 'sunset-glow' | 'emerald-minimal' | 'cyber-violet' | 'clean-light' | 'midnight-gold';

export interface CreatorProfile {
  id: string;
  userId: string;
  fullName: string;
  username: string;
  category: string;
  location?: string;
  bio: string;
  profilePicUrl: string;
  coverImageUrl?: string;
  theme: ProfileTheme;
  isPublished: boolean;
  socialLinks: SocialLink[];
  customLinks: CustomLink[];
  featuredContent?: FeaturedContent;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  clicksCount: number;
}

export interface GeoRouting {
  countryCode: string;
  destinationUrl: string;
}

export interface DeviceRouting {
  deviceType: 'mobile' | 'desktop' | 'tablet';
  destinationUrl: string;
}

export interface SmartLink {
  id: string;
  userId: string;
  profileId?: string;
  title: string;
  shortCode: string;
  destinationUrl: string;
  isEnabled: boolean;
  clickCount: number;
  createdAt: string;
  expiryDate?: string;
  password?: string;
  geoRouting?: GeoRouting[];
  deviceRouting?: DeviceRouting[];
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  abDestinationUrl?: string;
  abSplitRatio?: number; // 0 - 100%
}

export interface ClickEvent {
  id: string;
  smartLinkId?: string;
  profileId?: string;
  linkTitle: string;
  destinationUrl: string;
  timestamp: string;
  country: string;
  city?: string;
  referrer: string;
  device: 'mobile' | 'desktop' | 'tablet';
  browser: string;
  os: string;
  sessionId: string;
  utmSource?: string;
}

export interface VisitorSession {
  sessionId: string;
  firstSeen: string;
  lastSeen: string;
  country: string;
  device: string;
  entryPage: string;
  eventsCount: number;
  journey: {
    step: number;
    action: string;
    details: string;
    timestamp: string;
  }[];
}

export interface TrackingIntegration {
  id: string;
  provider: 'meta_pixel' | 'google_analytics' | 'tiktok_pixel' | 'custom_webhook';
  name: string;
  trackingId: string;
  status: 'active' | 'pending' | 'disabled';
  lastEventTime?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  secret: string;
  createdAt: string;
  lastUsedAt?: string;
}

export interface TrackingEvent {
  id: string;
  eventName: string;
  source: string;
  status: 'Tracked' | 'Click Recorded' | 'Integration Required' | 'Conversion Confirmed';
  timestamp: string;
  value?: number;
  currency?: string;
}
