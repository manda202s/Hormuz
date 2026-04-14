import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Oil Prices, Transit Data & Risk Analysis",
  description:
    "Real-time dashboard for the Strait of Hormuz crisis: live Brent and WTI crude oil prices, daily transit counts, stranded vessel tracking, insurance premium trends, and risk level indicators.",
  keywords: [
    "strait of hormuz dashboard",
    "brent crude oil price",
    "wti oil price live",
    "hormuz transit data",
    "oil crisis dashboard",
    "gulf shipping data",
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
