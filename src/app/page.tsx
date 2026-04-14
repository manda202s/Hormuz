"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Ship,
  Fuel,
  AlertTriangle,
  Shield,
  ArrowRight,
  BarChart3,
  Globe,
  TrendingUp,
} from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import { SparklineChart } from "@/components/dashboard/LiveChart";
import StatusIndicator from "@/components/dashboard/StatusIndicator";
import NewsCard from "@/components/news/NewsCard";

const LiveMap = dynamic(() => import("@/components/maps/LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] bg-bg-secondary rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-text-muted">Loading map...</span>
    </div>
  ),
});

interface MetricsData {
  status: "critical" | "warning" | "normal";
  statusLabel: string;
  shipsInStrait: number;
  shipsInTransit: number;
  strandedVessels: number;
  oilTankers: number;
  lngCarriers: number;
  normalTransitCount: number;
  capacityPercent: number;
  brentPrice: number;
  brentChange: number;
  wtiPrice: number;
  wtiChange: number;
  insurancePremiumMultiplier: number;
  dailyEconomicCost: number;
  oilSupplyAtRisk: number;
  shipsRerouted: number;
  shippingCostIncrease: number;
  timestamp: string;
}

interface ShipsResponse {
  ships: Array<{
    id: string;
    name: string;
    imo: string;
    type: "oil_tanker" | "lng_carrier" | "cargo" | "container" | "military" | "other";
    flag: string;
    flagCode: string;
    lat: number;
    lng: number;
    speed: number;
    heading: number;
    destination: string;
    eta: string;
    lastUpdate: string;
    tonnage: number;
  }>;
}

interface OilData {
  brent: { price: number; changePercent: number; history: { date: string; price: number }[] };
  wti: { price: number; changePercent: number; history: { date: string; price: number }[] };
}

interface NewsResponse {
  articles: Array<{
    id: string;
    title: string;
    excerpt: string;
    url: string;
    source: string;
    category: "military" | "economics" | "shipping" | "diplomacy" | "general";
    pubDate: string;
    isBreaking: boolean;
  }>;
}

export default function HomePage() {
  const { data: metrics } = useQuery<MetricsData>({
    queryKey: ["metrics"],
    queryFn: () => fetch("/api/metrics").then((r) => r.json()),
  });

  const { data: shipsData } = useQuery<ShipsResponse>({
    queryKey: ["ships"],
    queryFn: () => fetch("/api/ships").then((r) => r.json()),
  });

  const { data: oilData } = useQuery<OilData>({
    queryKey: ["oil-prices"],
    queryFn: () => fetch("/api/oil-prices").then((r) => r.json()),
    refetchInterval: 5 * 60 * 1000,
  });

  const { data: newsData } = useQuery<NewsResponse>({
    queryKey: ["news"],
    queryFn: () => fetch("/api/news").then((r) => r.json()),
  });

  const ships = shipsData?.ships || [];
  const articles = newsData?.articles || [];

  // Generate sparkline data from oil history
  const brentSparkline = oilData?.brent?.history?.slice(-15).map((d) => ({
    price: d.price,
  })) || [];

  // Generate transit sparkline (mock 30-day data showing decline)
  const transitSparkline = Array.from({ length: 30 }, (_, i) => ({
    count: Math.max(8, 72 - i * 2.2 + Math.random() * 5),
  }));

  return (
    <>
      {/* Hero Map */}
      <section className="relative">
        <div className="relative h-[45vh] min-h-[350px]">
          <LiveMap
            ships={ships}
            height="100%"
            interactive={true}
            initialZoom={6}
            showRoutes={false}
            showChokepPoints={true}
          />
          {/* Bottom fade into content */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Hero Content */}
      <section className="mx-auto max-w-7xl px-4 -mt-16 relative z-10 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <StatusIndicator
            status={metrics?.status || "critical"}
            label={metrics?.statusLabel || "RESTRICTED"}
            size="lg"
            className="mb-4"
          />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-3">
            Strait of Hormuz
            <span className="text-gradient ml-3">Live Monitor</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mb-5">
            Real-time monitoring of the world&apos;s most critical oil chokepoint.
            {" "}
            <span className="font-mono text-accent">
              {ships.length || "—"}
            </span>{" "}
            vessels currently tracked.
          </p>
          <Link
            href="/live-map"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg-primary font-semibold text-sm hover:bg-accent-hover transition-colors"
          >
            Open Full Map
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Key Metrics Grid */}
      <section className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Ships Transiting Today"
            value={metrics?.shipsInTransit ?? "—"}
            subtitle={`Normal: ${metrics?.normalTransitCount || 72} ships/day`}
            change={metrics ? metrics.capacityPercent - 100 : undefined}
            trend="down"
            trendColor="negative"
            icon={Ship}
            delay={0}
          >
            <SparklineChart
              data={transitSparkline}
              dataKey="count"
              color="#DC2626"
              height={35}
            />
          </MetricCard>

          <MetricCard
            title="Brent Crude Oil"
            value={`$${(metrics?.brentPrice ?? oilData?.brent?.price ?? 0).toFixed(2)}`}
            subtitle="Price per barrel"
            change={metrics?.brentChange ?? oilData?.brent?.changePercent}
            trend={(metrics?.brentChange ?? oilData?.brent?.changePercent ?? 0) >= 0 ? "up" : "down"}
            trendColor={(metrics?.brentChange ?? oilData?.brent?.changePercent ?? 0) >= 0 ? "negative" : "positive"}
            icon={Fuel}
            delay={1}
          >
            <SparklineChart
              data={brentSparkline}
              dataKey="price"
              color="#F59E0B"
              height={35}
            />
          </MetricCard>

          <MetricCard
            title="Stranded Vessels"
            value={metrics?.strandedVessels ?? 147}
            subtitle="Waiting in anchorage areas"
            icon={AlertTriangle}
            delay={2}
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-critical">
                <span className="w-2 h-2 rounded-full bg-critical" />
                {metrics?.oilTankers ?? 22} tankers
              </span>
              <span className="flex items-center gap-1 text-warning">
                <span className="w-2 h-2 rounded-full bg-warning" />
                {metrics?.lngCarriers ?? 8} LNG
              </span>
            </div>
          </MetricCard>

          <MetricCard
            title="Insurance Premium"
            value={`${metrics?.insurancePremiumMultiplier ?? 16.2}x`}
            subtitle="War risk multiplier vs normal"
            trend="up"
            trendColor="negative"
            change={520}
            icon={Shield}
            delay={3}
          />
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="mx-auto max-w-7xl px-4 mt-6">
        <div className="glass-card-static p-4 flex flex-wrap items-center justify-around gap-4 text-center">
          {[
            {
              label: "Daily Economic Cost",
              value: "$4.2B",
              icon: TrendingUp,
              color: "text-critical",
            },
            {
              label: "Oil Supply at Risk",
              value: `${metrics?.oilSupplyAtRisk ?? 21}%`,
              icon: Fuel,
              color: "text-warning",
            },
            {
              label: "Ships Rerouted",
              value: `${metrics?.shipsRerouted ?? 89}%`,
              icon: Ship,
              color: "text-info",
            },
            {
              label: "Extra Transit Days",
              value: `+${14}`,
              icon: Globe,
              color: "text-accent",
            },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <div className="text-left">
                <div className={`text-lg font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="mx-auto max-w-7xl px-4 mt-12 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Latest News
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Auto-updated from Reuters, Bloomberg, and AP News
            </p>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.slice(0, 6).map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* Global Impact CTA */}
      <section className="mx-auto max-w-7xl px-4 mb-16">
        <div className="glass-card-static p-8 md:p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Global Impact Analysis
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-6">
              See which countries are most affected by the Strait of Hormuz
              disruption, with detailed dependency data and economic impact
              assessments.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/countries-impact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg-primary font-semibold text-sm hover:bg-accent-hover transition-colors"
              >
                <Globe className="h-4 w-4" />
                Explore Countries
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bg-tertiary/50 text-text-primary font-semibold text-sm hover:bg-bg-tertiary transition-colors border border-border"
              >
                <BarChart3 className="h-4 w-4" />
                Full Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
