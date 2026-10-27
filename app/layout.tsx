import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://innovationark.co"),
  title: "Innovation Ark — Digital Product Studio",
  description: "Strategy, design, and engineering for web platforms, mobile products, and practical AI systems.",
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    type: "website",
    siteName: "Innovation Ark",
    title: "Innovation Ark — Digital Product Studio",
    description: "Strategy, design, and engineering for web platforms, mobile products, and practical AI systems.",
    images: ["/images/hero_abstract_bg.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-400">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Innovation Ark', url: 'https://innovationark.co', email: 'hello@innovationark.co', areaServed: 'Worldwide', address: { '@type': 'PostalAddress', addressCountry: 'BD' }, sameAs: [] }) }} />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

