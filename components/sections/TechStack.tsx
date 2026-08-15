'use client';

import { MagneticSpotlightMarquee } from '@/components/ui/magnetic-spotlight-marquee';

const TECH_LOGOS = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
];

export function TechStack() {
  return (
    <div id="tech" className="relative z-10 bg-[#070609]">
      <MagneticSpotlightMarquee 
        images={TECH_LOGOS}
        className="bg-transparent"
        title={["Innovative", "Arc"]}
        subtitle={["ENGINEERING", "ARCHITECTURE"]}
        paragraphs={[
          [
            "We are a premium product studio",
            "specializing in smooth animations, interactive",
            "interfaces, and modern design.",
          ],
          [
            "We prioritize developer experience and aesthetics.",
            "Our components span across complex interactions,",
            "3D elements, and smooth animations built",
            "for React and modern frameworks. Our library is tailored",
            "to distinct challenges within modern web development."
          ]
        ]}
      />
    </div>
  );
}
