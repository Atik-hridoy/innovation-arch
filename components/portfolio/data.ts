'use client';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  mockups: string[];
  metrics: { value: string; label: string };
}

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Wanderly',
    subtitle: 'LUXURY TRAVEL DISCOVERY',
    description: 'A complete travel discovery ecosystem with high-performance booking engines, real-time trip scheduling, and localized recommendations.',
    tags: ['Flutter', 'Firebase', 'Maps API', 'Payment Gateways'],
    mockups: [
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp',
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp',
    ],
    metrics: { value: '150K+', label: 'Monthly Active Users' },
  },
  {
    id: '02',
    title: 'Apex Analytics',
    subtitle: 'REAL-TIME DATA DECISION ENGINE',
    description: 'A high-fidelity financial dashboard and modeling framework capable of rendering volumetric risk analysis with ultra-low latency.',
    tags: ['Next.js', 'WebGL', 'Tailwind CSS', 'WebSockets'],
    mockups: [
      '/images/wanderly_center.webp',
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp',
      '/images/wanderly_left.webp',
    ],
    metrics: { value: '99.9%', label: 'Prediction Accuracy' },
  },
  {
    id: '03',
    title: 'Zenith AI',
    subtitle: 'COGNITIVE NEURAL OPERATION HUB',
    description: 'Custom cognitive agent orchestrator executing complex enterprise operations, scaling efficiency, and automating workflows.',
    tags: ['Python', 'LLM Agents', 'FastAPI', 'Kubernetes'],
    mockups: [
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp',
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp',
    ],
    metrics: { value: '4.8x', label: 'Efficiency Increase' },
  },
];
