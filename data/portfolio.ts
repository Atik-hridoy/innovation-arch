export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  mockups: string[];
  metrics: { value: string; label: string };
}

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'BoiKhoj',
    subtitle: 'LOCATION-BASED P2P BOOK MARKETPLACE',
    description: 'A location-based peer-to-peer marketplace built to connect book buyers and sellers locally.',
    problem: 'Book lovers lacked a secure, hyper-local platform to discover, buy, and sell used books in near proximity without high platform fees.',
    solution: 'Built with Flutter & Django to handle real-time location-based search, instant messaging, and secure data syncing seamlessly.',
    impact: 'Achieved sub-800ms page load speeds and enabled over 5,000+ localized book listings within the first month.',
    tags: ['Flutter', 'Django', 'PostgreSQL', 'P2P Marketplace'],
    mockups: [
      '/images/boikhoj_mockup.jpg',
      '/images/boikhoj_mockup.jpg'
    ],
    metrics: { value: '<0.8s', label: 'Page Load Speed' },
  },
  {
    id: '02',
    title: 'Voyanta',
    subtitle: 'AI-POWERED TRAVEL OPERATING SYSTEM',
    description: 'An intelligent travel OS combining smart itinerary generation with real-time booking recommendations.',
    problem: 'Travelers suffered from fragmented booking channels and high latency during trip planning.',
    solution: 'Integrated smart AI itinerary generation with a fluid, crash-free Flutter mobile interface and offline itinerary caching.',
    impact: 'Sub-100ms API response time and zero mobile crashes across 100K+ monthly trip searches.',
    tags: ['Flutter', 'AI Integration', 'Firebase', 'Maps API'],
    mockups: [
      '/images/voyanta_mockup.jpg',
      '/images/voyanta_mockup.jpg'
    ],
    metrics: { value: '100K+', label: 'Monthly Trip Searches' },
  },
  {
    id: '03',
    title: 'Mettro Bazar',
    subtitle: 'READY-TO-COOK E-COMMERCE PLATFORM',
    description: 'A fresh food e-commerce platform emphasizing quality, local culinary traditions, and fast delivery.',
    problem: 'Slow checkout friction and cart abandonments for fresh perishable food orders.',
    solution: 'Built with Next.js & OTP authentication for a frictionless 2-step checkout system and instant cart caching.',
    impact: '+45% increase in checkout conversion rates across 16+ custom high-fidelity screens delivered on schedule.',
    tags: ['Next.js', 'Tailwind CSS', 'OTP Auth', 'PostgreSQL'],
    mockups: [
      '/images/mettro_bazar_mockup.jpg',
      '/images/mettro_bazar_mockup.jpg'
    ],
    metrics: { value: '+45%', label: 'Checkout Conversion' },
  },
];
