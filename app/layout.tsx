import type { Metadata } from "next";
import { EB_Garamond, JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";
import { StructuredData, SEOOptimizations } from "@/components/seo";
import { Header } from "@/components/layout";
import { LastUpdated } from "@/components/features/clock";
import { getLastCommitDate } from "@/lib/getLastCommitDate";
import { SITE_CONFIG } from "@/config";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Nicolás Vazquez",
    "software engineer",
    "systems",
    "writing",
    "essays",
    "notes",
    "buenos aires",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.images.og,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.author.twitter,
    creator: SITE_CONFIG.author.twitter,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.images.og],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    types: {
      "application/rss+xml": `${SITE_CONFIG.url}/feed.xml`,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${jetBrainsMono.variable} ${lora.variable}`}
    >
      <head>
        <StructuredData />
        <SEOOptimizations />
        <meta name="geo.region" content="AR-C" />
        <meta name="geo.placename" content={SITE_CONFIG.location.city} />
        <meta
          name="geo.position"
          content={`${SITE_CONFIG.location.coordinates.latitude};${SITE_CONFIG.location.coordinates.longitude}`}
        />
        <meta
          name="ICBM"
          content={`${SITE_CONFIG.location.coordinates.latitude}, ${SITE_CONFIG.location.coordinates.longitude}`}
        />
      </head>
      <body className="antialiased">
        <div className="sr-only">
          <h1>nicolás vazquez</h1>
          <p>
            nicolás vazquez is a software engineer from buenos aires, argentina.
            he writes notes about systems, engineering, and the work itself.
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
          <Header />
          {children}

          <footer className="mt-24 pt-8 border-t border-[var(--rule)] text-xs font-mono text-[var(--muted)] flex items-center justify-between">
            <span>buenos aires, ar</span>
            <LastUpdated lastCommitDate={getLastCommitDate()} />
          </footer>
        </div>
      </body>
    </html>
  );
}
