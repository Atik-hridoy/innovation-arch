import { BookCfg } from '../components/ui/books-showcase';

export const MOCK_BOOKS: BookCfg[] = [
  {
    id: 'mock-1',
    title: 'Mettro Bazar',
    subtitle: 'E-Commerce Platform',
    metricLabel: 'Active Users',
    metricValue: '150K+',
    desc: 'Describe the project goals and achievements for the Mettro Bazar platform.',
    tags: ['React', 'Node.js', 'Tailwind'],
    images: { front: '/images/placeholder.jpg' } // Procedurally generated cover will be used since no images are provided
  },
  {
    id: 'mock-2',
    title: 'Fintech Dashboard',
    subtitle: 'Finance Group',
    metricLabel: 'Uptime',
    metricValue: '99.9%',
    desc: 'Next generation analytics and financial dashboard for enterprise clients.',
    tags: ['Next.js', 'Framer Motion', 'Prisma'],
    images: { front: '/images/placeholder.jpg' }
  },
  {
    id: 'mock-3',
    title: 'Innovation Arch',
    subtitle: 'Digital Agency',
    metricLabel: 'Client Satisfaction',
    metricValue: '100%',
    desc: 'An immersive digital experience pushing the boundaries of web design.',
    tags: ['Three.js', 'GSAP', 'React'],
    images: { front: '/images/placeholder.jpg' }
  }
];
