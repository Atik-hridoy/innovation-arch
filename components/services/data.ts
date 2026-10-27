'use client';

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
  spec: string;
}

export interface ServiceSlide {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  themeColor: string;
  pillColor: string;
  features: FeatureItem[];
  codeSnippets: string[];
  facilities: string[];
}

export const SLIDES: ServiceSlide[] = [
  {
    title: 'MOBILE APPS',
    subtitle: 'iOS & Android App Suite',
    desc: 'Custom mobile apps for iPhone and Android. Fast to launch, easy to use, and designed to keep your customers coming back.',
    image: '/images/mobile.webp',
    themeColor: '#2563eb',
    pillColor: 'bg-blue-50 border-blue-200 text-blue-700',
    features: [
      { icon: 'phone_iphone', title: 'iOS & Android', desc: 'Single build for both app stores', spec: 'CROSS-PLATFORM' },
      { icon: 'security', title: 'Biometric Login', desc: 'Instant FaceID & Fingerprint access', spec: 'SECURITY' },
      { icon: 'database', title: 'Offline Mode', desc: 'Works smoothly even without internet', spec: 'OFFLINE SYNC' },
      { icon: 'notifications_active', title: 'Push Alerts', desc: 'Keep users engaged with notifications', spec: 'NOTIFICATIONS' },
    ],
    codeSnippets: [],
    facilities: [
      'Custom iOS & Android mobile apps tailored for your business goals',
      'App Store and Google Play submission support',
      'Biometric login (FaceID / Fingerprint) for instant customer security',
      'Offline caching so customers can browse even with weak internet',
      'Real-time push notifications to drive sales and customer repeat visits',
      'Integrated payment gateways (Stripe, SSLCommerz, BKash)',
      'Source-code handover and agreed post-launch support',
    ],
  },
  {
    title: 'WEB PLATFORMS',
    subtitle: 'High-Converting Web Systems',
    desc: 'Lightning-fast websites, customer portals, and admin dashboards built to grow your sales and streamline business operations.',
    image: '/images/web.webp',
    themeColor: '#0f172a',
    pillColor: 'bg-slate-100 border-slate-200 text-slate-800',
    features: [
      { icon: 'bolt', title: 'Instant Load Speed', desc: 'Loads in under a second for maximum sales', spec: 'FAST PERFORMANCE' },
      { icon: 'dashboard', title: 'Admin Control', desc: 'Manage your data, orders & team easily', spec: 'MANAGEMENT' },
      { icon: 'travel_explore', title: 'Google SEO Ready', desc: 'Rank higher on Google searches', spec: 'GOOGLE SEO' },
      { icon: 'insights', title: 'Business Insights', desc: 'Track customer activity and revenue', spec: 'ANALYTICS' },
    ],
    codeSnippets: [],
    facilities: [
      'High-performance web apps, customer portals & enterprise dashboards',
      'Performance-focused implementation and page-load optimization',
      'Responsive design that looks flawless on phones, tablets & laptops',
      'Google SEO optimization to rank your business higher',
      'Custom admin panel to manage products, users, and orders effortlessly',
      'SSL configuration and appropriate cloud setup',
    ],
  },
  {
    title: 'AI AUTOMATION',
    subtitle: 'Smart Business Operations',
    desc: 'Intelligent AI tools that eliminate manual data entry, parse invoices, and automate routine tasks so your team can focus on growth.',
    image: '/images/intelligence.webp',
    themeColor: '#2563eb',
    pillColor: 'bg-blue-50 border-blue-200 text-blue-700',
    features: [
      { icon: 'psychology', title: 'Document Reader', desc: 'Auto-extract data from PDFs & invoices', spec: 'AI PARSING' },
      { icon: 'hub', title: 'Smart Workflows', desc: 'Automate repetitive tasks automatically', spec: 'WORKFLOWS' },
      { icon: 'storage', title: 'Instant Search', desc: 'Search all internal company files instantly', spec: 'SMART SEARCH' },
      { icon: 'integration_instructions', title: 'System Connect', desc: 'Connects seamlessly with existing software', spec: 'INTEGRATIONS' },
    ],
    codeSnippets: [],
    facilities: [
      'Custom AI automation to eliminate repetitive daily manual work',
      'Automatic invoice parsing, document reading & text extraction',
      'Smart search across internal business documents & customer data',
      'Integration with your existing CRM, ERP, or email workflows',
      'Data handling designed around the agreed privacy requirements',
    ],
  },
  {
    title: 'CLOUD & IT SERVICES',
    subtitle: 'Reliable Hosting & Security',
    desc: 'Cloud infrastructure, automated backups, monitoring, and operational support for dependable digital products.',
    image: '/images/web.webp',
    themeColor: '#0f172a',
    pillColor: 'bg-slate-100 border-slate-200 text-slate-800',
    features: [
      { icon: 'cloud_done', title: 'Cloud Hosting', desc: '24/7 high-speed cloud server setup', spec: 'HIGH RELIABILITY' },
      { icon: 'storage', title: 'Daily Backups', desc: 'Automated data backup & recovery', spec: 'DATA SAFETY' },
      { icon: 'shield_lock', title: 'Bank-Grade Security', desc: 'Protects against hacking & threats', spec: 'ENCRYPTION' },
      { icon: 'api', title: 'Seamless Connect', desc: 'Connect your tools with custom APIs', spec: 'API CONNECT' },
    ],
    codeSnippets: [],
    facilities: [
      'Cloud deployment configured around the product’s availability needs',
      'Database optimization for instant search and customer checkouts',
      'Automated backup and recovery planning',
      'Security audits & data protection to prevent cyber threats',
      'Server monitoring and an agreed technical-support plan',
    ],
  },
];
