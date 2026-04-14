import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | Strait of Hormuz Crisis Updates",
  description:
    "Breaking news and latest updates on the Strait of Hormuz crisis. Aggregated from Bloomberg, Reuters, and major news sources. Updated every 15 minutes with real-time developments on the Iran conflict and oil supply disruption.",
  keywords: [
    "strait of hormuz news",
    "hormuz crisis updates",
    "iran war news",
    "oil crisis news",
    "persian gulf conflict",
    "hormuz blockade news",
    "middle east oil news",
  ],
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
