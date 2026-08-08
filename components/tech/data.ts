'use client';

export interface TechNode {
  id: string;
  title: string;
  badge: string;
  logo: string;
  color: string;
  side: 'left' | 'right';
  metric: string;
  desc: string;
}

export const NODES: TechNode[] = [
  {
    id: '01',
    title: 'Next.js 16',
    badge: 'Frontend Core',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#a855f7',
    side: 'left',
    metric: 'WEB / APP',
    desc: 'React 19 Server Components, SSR & App Router architecture.',
  },
  {
    id: '02',
    title: 'TypeScript',
    badge: 'UI DX / Architecture',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3b82f6',
    side: 'left',
    metric: 'STRICT DX',
    desc: 'End-to-end type safety across UI components & API contracts.',
  },
  {
    id: '03',
    title: 'Tailwind CSS',
    badge: 'Design System',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06b6d4',
    side: 'left',
    metric: 'OBSIDIAN UI',
    desc: 'Custom design tokens & responsive luxury Web/App layout engine.',
  },
  {
    id: '04',
    title: 'GSAP & Three.js',
    badge: 'UI Motion & 3D',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#84cc16',
    side: 'left',
    metric: '60 FPS 3D',
    desc: 'ScrollTrigger motion reveals, WebGL GLSL shaders & fluid micro-interactions.',
  },
  {
    id: '05',
    title: 'PyTorch & LangChain',
    badge: 'AI Agent Core',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    color: '#ee4c2c',
    side: 'right',
    metric: 'AI AGENTS',
    desc: 'Autonomous agent reasoning, vector embeddings & neural inference.',
  },
  {
    id: '06',
    title: 'Node.js & Python',
    badge: 'Backend Services',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#22c55e',
    side: 'right',
    metric: 'MICROSERVICES',
    desc: 'High-concurrency event loops, GraphQL schema federation & REST APIs.',
  },
  {
    id: '07',
    title: 'PostgreSQL / Vector DB',
    badge: 'Data & RAG Storage',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#38bdf8',
    side: 'right',
    metric: 'VECTOR DB',
    desc: 'High-speed relational data, pgvector embeddings & real-time sync.',
  },
  {
    id: '08',
    title: 'Vercel & AWS Cloud',
    badge: 'Cloud Edge Infra',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    color: '#e879f9',
    side: 'right',
    metric: 'GLOBAL EDGE',
    desc: 'Zero-downtime CI/CD deployment, serverless edge functions & global CDN.',
  },
];

export const STACK_PRESETS = {
  WEB: {
    left: [
      { id: 'w1', title: 'Next.js 16', badge: 'Fullstack React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#a855f7', metric: 'SSR / 100', desc: 'React 19 Server Components, SSR & Turbopack bundler.' },
      { id: 'w2', title: 'TypeScript', badge: 'Architecture', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3b82f6', metric: 'STRICT', desc: 'Strict end-to-end typing for components and endpoints.' },
      { id: 'w3', title: 'Tailwind CSS', badge: 'Design System', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06b6d4', metric: 'TOKENS', desc: 'Custom tokens & obsidian dark mode aesthetic.' },
      { id: 'w4', title: 'GSAP Motion', badge: 'Animation', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#84cc16', metric: '60 FPS', desc: 'ScrollTrigger motion reveals & SVG path drawing.' },
    ],
    right: [
      { id: 'w5', title: 'Three.js / WebGL', badge: '3D Shaders', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', color: '#c084fc', metric: 'GPU 3D', desc: 'Custom GLSL shaders & particle rendering.' },
      { id: 'w6', title: 'Node.js API', badge: 'Backend Services', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#22c55e', metric: 'ASYNC IO', desc: 'High-concurrency GraphQL and REST microservices.' },
      { id: 'w7', title: 'PostgreSQL DB', badge: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#38bdf8', metric: 'RELATIONAL', desc: 'ACID transactions & real-time sync engines.' },
      { id: 'w8', title: 'Vercel Edge', badge: 'Cloud Infra', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', color: '#e879f9', metric: 'GLOBAL CDN', desc: 'Zero-downtime serverless edge deployments.' },
    ],
  },
  APP: {
    left: [
      { id: 'a1', title: 'React Native', badge: 'Cross-Platform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb', metric: 'IOS / ANDROID', desc: 'Native compiled mobile apps with shared logic.' },
      { id: 'a2', title: 'Expo Framework', badge: 'Mobile Ecosystem', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#a855f7', metric: 'OTA UPDATES', desc: 'Instant over-the-air updates & native modules.' },
      { id: 'a3', title: 'Reanimated 3', badge: 'Native Motion', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f59e0b', metric: '120 FPS UI', desc: 'UI thread gesture handlers & fluid mobile motion.' },
      { id: 'a4', title: 'Tailwind / NativeWind', badge: 'Mobile Styling', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06b6d4', metric: 'UNIFIED UI', desc: 'Shared style tokens across Web and Mobile UI.' },
    ],
    right: [
      { id: 'a5', title: 'Swift / Kotlin', badge: 'Native Bridge', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', color: '#f97316', metric: 'NATIVE SPEED', desc: 'Hardware camera, biometrics & Bluetooth APIs.' },
      { id: 'a6', title: 'Firebase / Supabase', badge: 'Mobile Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#ffca28', metric: 'REALTIME', desc: 'Push notifications, auth & offline data caching.' },
      { id: 'a7', title: 'GraphQL / REST', badge: 'App Sync', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', color: '#e10098', metric: 'LOW LATENCY', desc: 'Optimized Mobile data query bandwidth.' },
      { id: 'a8', title: 'App Store / Play', badge: 'Deployment', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', color: '#ffffff', metric: 'PUBLISHED', desc: 'Automated CI/CD App store submission pipelines.' },
    ],
  },
  AI: {
    left: [
      { id: 'ai1', title: 'PyTorch / Python', badge: 'Neural Engine', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', color: '#ee4c2c', metric: 'DEEP LEARNING', desc: 'Custom model training & neural network pipelines.' },
      { id: 'ai2', title: 'LangChain & LlamaIndex', badge: 'Agent Framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776ab', metric: 'LLM RAG', desc: 'Autonomous agent reasoning & tool calling pipelines.' },
      { id: 'ai3', title: 'OpenAI & Gemini API', badge: 'Foundation Models', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', color: '#4285f4', metric: 'AGENT REASON', desc: 'Multi-modal LLM intelligence & fine-tuning.' },
      { id: 'ai4', title: 'FastAPI / Python', badge: 'AI Microservices', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', color: '#059669', metric: 'HIGH SPEED', desc: 'Asynchronous streaming endpoints for AI agents.' },
    ],
    right: [
      { id: 'ai5', title: 'Pinecone / PgVector', badge: 'Vector Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#38bdf8', metric: 'EMBEDDINGS', desc: 'Sub-millisecond semantic search & memory stores.' },
      { id: 'ai6', title: 'Docker & Kubernetes', badge: 'GPU Container', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed', metric: 'ORCHESTRATED', desc: 'Scalable GPU container clusters & serverless AI.' },
      { id: 'ai7', title: 'Redis Cache', badge: 'Agent Memory', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#dc2626', metric: 'FAST MEMORY', desc: 'Real-time conversation memory & rate limiting.' },
      { id: 'ai8', title: 'AWS EC2 / Modal', badge: 'GPU Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#ff9900', metric: 'GPU COMPUTE', desc: 'Dedicated H100/A100 inference infrastructure.' },
    ],
  },
};
