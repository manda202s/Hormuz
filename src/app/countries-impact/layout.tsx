import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countries Impact Analysis | Oil Dependency by Country",
  description:
    "See which countries are most affected by the Strait of Hormuz crisis. Real-time data on oil dependency, LNG imports, strategic reserves, and economic impact for 15+ nations including Japan, South Korea, India, and China.",
  keywords: [
    "strait of hormuz impact",
    "oil dependency by country",
    "hormuz crisis countries",
    "japan oil imports",
    "south korea oil",
    "india oil dependency",
    "strategic petroleum reserves",
  ],
};

export default function CountriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
