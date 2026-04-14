import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crisis Timeline | Key Events in the Hormuz Conflict",
  description:
    "Complete timeline of the Strait of Hormuz crisis from 2024 to April 2026. Track military, economic, diplomatic events and incidents including the Iran-Israel conflict, US naval blockade, and oil supply disruptions.",
  keywords: [
    "strait of hormuz timeline",
    "hormuz crisis events",
    "iran war timeline 2026",
    "persian gulf conflict timeline",
    "hormuz blockade history",
    "middle east crisis chronology",
  ],
};

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
