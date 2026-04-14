import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crisis Timeline | Key Events in the Hormuz Conflict",
  description:
    "Complete timeline of the Strait of Hormuz crisis from 2023 to April 2026. Track military, economic, diplomatic events and incidents including Iran tanker seizures, Houthi Red Sea attacks, Operation Epic Fury, the Iran-Israel-US war, and the Hormuz naval blockade.",
  keywords: [
    "strait of hormuz timeline",
    "hormuz crisis events",
    "iran war timeline 2026",
    "persian gulf conflict timeline",
    "hormuz blockade history",
    "middle east crisis chronology",
    "houthi red sea attacks timeline",
    "operation epic fury",
    "iran tanker seizure",
    "MSC Aries seized",
    "advantage sweet tanker",
  ],
};

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
