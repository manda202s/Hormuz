import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Strait of Hormuz Live Monitor | Real-Time Shipping Crisis Tracker",
    template: "%s | Hormuz Monitor",
  },
  description:
    "Real-time monitoring of the Strait of Hormuz crisis with live ship tracking, oil prices, global impact analysis, and breaking news. Updated every 5 minutes.",
  keywords: [
    "strait of hormuz",
    "middle east",
    "oil crisis",
    "ship tracking",
    "iran",
    "live map",
    "oil prices",
    "hormuz blockade",
    "persian gulf",
    "shipping crisis",
  ],
  openGraph: {
    title: "Strait of Hormuz Live Monitor",
    description:
      "Real-time crisis monitoring with live ship tracking, oil prices, and global impact analysis",
    url: "https://middleeaststraitofhormuz.com",
    siteName: "Hormuz Monitor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strait of Hormuz Live Monitor",
    description: "Real-time crisis tracking with live ship data",
    creator: "@HormuzMonitor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://middleeaststraitofhormuz.com"
  ),
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Strait of Hormuz Live Monitor",
              url: "https://middleeaststraitofhormuz.com",
              description:
                "Real-time monitoring dashboard for the Strait of Hormuz shipping crisis",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://middleeaststraitofhormuz.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        <Providers>
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
