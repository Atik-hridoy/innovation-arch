import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://innovationark.co';
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.7 },
    ...PROJECTS.map(project => ({ url: `${base}/work/${project.id}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
