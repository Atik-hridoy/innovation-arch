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
    subtitle: 'iOS & Android Ecosystems',
    desc: 'Beautiful, native and cross-platform mobile experiences crafted with Flutter and React Native. Fully optimized for fluid performance and user delight.',
    image: '/images/mobile.webp',
    themeColor: '#10b981',
    pillColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    features: [
      { icon: 'phone_iphone', title: 'Cross-Platform', desc: 'High-performance Flutter builds', spec: 'FLUTTER / SWIFT' },
      { icon: 'security', title: 'Secure Logins', desc: 'Biometric FaceID & Secure Keychains', spec: 'BIOMETRICS' },
      { icon: 'database', title: 'Offline Sync', desc: 'Robust local cache databases', spec: 'SQLITE / REALM' },
      { icon: 'notifications_active', title: 'Push Alerts', desc: 'Real-time user engagement flows', spec: 'FCM / APNS' },
    ],
    codeSnippets: [
      'import "package:flutter/material.dart";',
      'void main() => runApp(const MyApp());',
      'class MyApp extends StatelessWidget {',
      '  const MyApp({super.key});',
      '  @override',
      '  Widget build(BuildContext context) {',
      '    return MaterialApp(',
      '      theme: ThemeData.dark(),',
      '      home: const EcosystemDashboard(),',
      '    );',
      '  }',
      '}',
      '// [SYSTEM: INITIALIZING FLUTTER ENGINE]',
    ],
    facilities: [
      'Custom UI/UX design tailored for iOS & Android',
      'Cross-platform development with Flutter or React Native',
      'App Store & Play Store submission & optimization',
      'Push notifications, in-app messaging & analytics',
      'Biometric authentication & secure data storage',
      'Offline-first architecture with local database sync',
      'Payment gateway integration (Stripe, Razorpay, etc.)',
      'Post-launch maintenance, monitoring & version updates',
    ],
  },
  {
    title: 'WEB SOLUTIONS',
    subtitle: 'Fast, Modern & Scalable Sites',
    desc: 'High-fidelity, responsive web platforms built with Next.js, React and Tailwind. Engineered for rapid load speeds, SEO optimization, and premium motion design.',
    image: '/images/web.webp',
    themeColor: '#06b6d4',
    pillColor: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    features: [
      { icon: 'bolt', title: 'Next.js Engine', desc: 'Sub-second static & server loads', spec: 'SSR / ISR' },
      { icon: 'travel_explore', title: 'SEO Engineering', desc: 'Rich schema metadata configs', spec: 'SCHEMA' },
      { icon: 'animation', title: 'Motion Design', desc: 'GSAP timelines & micro-animations', spec: 'GSAP' },
      { icon: 'insights', title: 'Telemetry', desc: 'Custom user flow analytics tracking', spec: 'HOTJAR' },
    ],
    codeSnippets: [
      'import { useState, useEffect } from "react";',
      'import { motion } from "framer-motion";',
      'export default function PremiumWeb() {',
      '  const [status, setStatus] = useState("loading");',
      '  useEffect(() => {',
      '    fetchTelemetryData();',
      '  }, []);',
      '  return (',
      '    <motion.div animate={{ opacity: 1 }}>',
      '      <NextJsEngine speed="sub-second" />',
      '    </motion.div>',
      '  );',
      '}',
    ],
    facilities: [
      'Responsive, pixel-perfect design for all screen sizes',
      'Next.js / React SPA or SSR architecture setup',
      'SEO optimization with structured data & meta tags',
      'CMS integration (Sanity, Strapi, WordPress headless)',
      'Custom animations & micro-interactions with GSAP',
      'Performance tuning — sub-second load times',
      'Analytics dashboard integration (GA4, Hotjar, Mixpanel)',
      'Hosting setup, CI/CD pipeline & domain configuration',
    ],
  },
  {
    title: 'AI AUTOMATION',
    subtitle: 'Intelligent Systems & Agents',
    desc: 'Custom autonomous AI agents, LLM integrations, and cognitive workflows that automate complex enterprise operations, scaling efficiency and productivity.',
    image: '/images/intelligence.webp',
    themeColor: '#ec4899',
    pillColor: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    features: [
      { icon: 'psychology', title: 'LLM Orchestration', desc: 'LangChain, Claude & GPT integrations', spec: 'LLM CORE' },
      { icon: 'hub', title: 'Agent Loops', desc: 'Self-routing cognitive task workers', spec: 'AUTO RUN' },
      { icon: 'storage', title: 'Vector Database', desc: 'Pinecone semantic search catalogs', spec: 'PINECONE' },
      { icon: 'integration_instructions', title: 'Cognitive APIs', desc: 'Automated data parsing models', spec: 'LANGCHAIN' },
    ],
    codeSnippets: [
      'from langchain.agents import AgentExecutor',
      'from langchain.vectorstores import Pinecone',
      'agent = create_openai_tools_agent(llm, tools)',
      'executor = AgentExecutor(agent=agent, tools=tools)',
      'response = executor.invoke({',
      '  "input": "optimize database query loops"',
      '})',
      'print(f"Agent state: {response.state}")',
      'db.similarity_search("semantic query index")',
    ],
    facilities: [
      'Custom AI agent development for business workflows',
      'LLM integration (GPT, Claude, Gemini, open-source)',
      'RAG pipeline with vector database (Pinecone, Weaviate)',
      'Chatbot & conversational AI interface design',
      'Automated data extraction, parsing & classification',
      'API development for AI model serving & inference',
      'Fine-tuning & prompt engineering for domain tasks',
      'Monitoring, logging & continuous model improvement',
    ],
  },
];
