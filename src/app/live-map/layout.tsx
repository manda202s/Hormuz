import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Ship Tracking Map | Strait of Hormuz Vessels",
  description:
    "Interactive live map showing real-time ship positions in the Strait of Hormuz. Track oil tankers, LNG carriers, cargo ships, and military vessels with AIS data. Filter by ship type and view alternative shipping routes.",
  keywords: [
    "strait of hormuz live map",
    "ship tracking hormuz",
    "oil tanker tracking",
    "persian gulf ships",
    "AIS ship data",
    "hormuz vessel tracking",
    "marine traffic hormuz",
  ],
};

export default function LiveMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
