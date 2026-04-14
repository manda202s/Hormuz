"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Ship,
  Fuel,
  AlertTriangle,
  Shield,
  TrendingUp,
  Globe,
  Route,
  DollarSign,
  Anchor,
  BarChart3,
} from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import LiveChart, { SparklineChart } from "@/components/dashboard/LiveChart";
import StatusIndicator from "@/components/dashboard/StatusIndicator";
import { countriesData } from "@/lib/constants/countries";

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
  lngTradeAffected: number;
  shipsRerouted: number;
  extraTransitDays: number;
  shippingCostIncrease: number;
  timestamp: string;
}

interface OilData {
  brent: { price: number; changePercent: number; history: { date: string; price: number }[] };
  wti: { price: number; changePercent: number; history: { date: string; price: number }[] };
}

export default function DashboardPage() {
  const { data: metrics } = useQuery<MetricsData>({
    queryKey: ["metrics"],
    queryFn: () => fetch("/api/metrics").then((r) => r.json()),
  });

  const { data: oilData } = useQuery<OilData>({
    queryKey: ["oil-prices"],
    queryFn: () => fetch("/api/oil-prices").then((r) => r.json()),
    refetchInterval: 5 * 60 * 1000,
  });

  // Mock transit history data
  const transitHistory = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    count: Math.max(8, 72 - i * 2 + Math.floor(Math.random() * 8)),
    normal: 72,
  }));

  // Insurance premium history
  const insuranceHistory = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    premium: Math.min(16.5, 1 + i * 0.55 + Math.random() * 0.5),
  }));

  // Country dependency chart data
  const countryChartData = countriesData
    .sort((a, b) => b.oilDependency - a.oilDependency)
    .slice(0, 8)
    .map((c) => ({
      name: c.flag + " " + c.code,
      oil: c.oilDependency,
      lng: c.lngDependency,
    }));

  // Stranded vessels breakdown
  const vesselBreakdown = [
    { name: "Oil Tankers", value: 82, color: "#DC2626" },
    { name: "LNG Carriers", value: 28, color: "#F97316" },
    { name: "Cargo", value: 22, color: "#EAB308" },
    { name: "Container", value: 12, color: "#3B82F6" },
    { name: "Other", value: 3, color: "#8B5CF6" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-static p-6 mb-8 border-l-4 border-l-critical"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <StatusIndicator
                status={metrics?.status || "critical"}
                label={metrics?.statusLabel || "RESTRICTED"}
                size="lg"
              />
            </div>
            <p className="text-sm text-text-secondary">
              Partial commercial transit under military escort only. {metrics?.shipsInTransit || "12"} ships
              transited in the last 24 hours.
            </p>
          </div>
          <div className="text-right text-xs text-text-muted">
            <div>Last updated</div>
            <div className="font-mono text-text-secondary">
              {metrics?.timestamp
                ? new Date(metrics.timestamp).toLocaleString()
                : "Loading..."}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section: Ship Transit Metrics */}
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <Ship className="h-5 w-5 text-accent" />
        Ship Transit Metrics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <MetricCard
          title="Daily Transit Count"
          value={metrics?.shipsInTransit ?? 12}
          subtitle={`Normal capacity: ${metrics?.normalTransitCount || 72} ships/day`}
          change={metrics ? metrics.capacityPercent - 100 : -83}
          trend="down"
          trendColor="negative"
          icon={Ship}
        >
          <LiveChart
            data={transitHistory}
            dataKey="count"
            xKey="date"
            type="area"
            color="#DC2626"
            height={160}
            showAxis={true}
            showGrid={true}
          />
        </MetricCard>

        <MetricCard
          title="Stranded Vessels"
          value={metrics?.strandedVessels ?? 147}
          subtitle="Vessels in anchorage or waiting areas"
          icon={Anchor}
          delay={1}
        >
          <div className="space-y-2 mt-2">
            {vesselBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-text-secondary flex-1">
                  {item.name}
                </span>
                <span className="text-xs font-mono text-text-primary">
                  {item.value}
                </span>
                <div className="w-20 h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(item.value / 82) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </MetricCard>
      </div>

      {/* Section: Economic Impact */}
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-warning" />
        Economic Impact
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <MetricCard
          title="Oil Prices"
          value=""
          icon={Fuel}
          delay={2}
        >
          <div className="flex gap-4 mb-3">
            <div>
              <div className="text-xs text-text-muted">Brent Crude</div>
              <div className="text-xl font-bold font-mono text-text-primary">
                ${(metrics?.brentPrice ?? oilData?.brent?.price ?? 0).toFixed(2)}
              </div>
              {(() => {
                const change = metrics?.brentChange ?? oilData?.brent?.changePercent ?? 0;
                return (
                  <div className={`text-xs font-mono ${change >= 0 ? 'text-critical' : 'text-normal'}`}>
                    {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                  </div>
                );
              })()}
            </div>
            <div>
              <div className="text-xs text-text-muted">WTI</div>
              <div className="text-xl font-bold font-mono text-text-primary">
                ${(metrics?.wtiPrice ?? oilData?.wti?.price ?? 0).toFixed(2)}
              </div>
              {(() => {
                const change = metrics?.wtiChange ?? oilData?.wti?.changePercent ?? 0;
                return (
                  <div className={`text-xs font-mono ${change >= 0 ? 'text-critical' : 'text-normal'}`}>
                    {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                  </div>
                );
              })()}
            </div>
          </div>
          <LiveChart
            data={oilData?.brent?.history || []}
            dataKey="price"
            xKey="date"
            type="area"
            color="#F59E0B"
            height={140}
          />
        </MetricCard>

        <MetricCard
          title="Global Trade Disruption"
          value=""
          icon={Globe}
          delay={3}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-bg-tertiary/30">
              <div className="text-2xl font-bold font-mono text-critical">$4.2B</div>
              <div className="text-xs text-text-muted mt-1">Daily economic cost</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-bg-tertiary/30">
              <div className="text-2xl font-bold font-mono text-warning">{metrics?.oilSupplyAtRisk ?? 21}%</div>
              <div className="text-xs text-text-muted mt-1">Oil supply at risk</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-bg-tertiary/30">
              <div className="text-2xl font-bold font-mono text-info">{metrics?.lngTradeAffected ?? 25}%</div>
              <div className="text-xs text-text-muted mt-1">LNG trade affected</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-bg-tertiary/30">
              <div className="text-2xl font-bold font-mono text-accent">+{metrics?.shippingCostIncrease ?? 180}%</div>
              <div className="text-xs text-text-muted mt-1">Shipping cost increase</div>
            </div>
          </div>
        </MetricCard>
      </div>

      {/* Section: Risk Indicators */}
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-critical" />
        Risk Indicators
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <MetricCard
          title="War Risk Insurance"
          value={`${metrics?.insurancePremiumMultiplier ?? 16.2}x normal`}
          subtitle="Current premium multiplier"
          trend="up"
          trendColor="negative"
          change={520}
          icon={Shield}
          delay={4}
        >
          <LiveChart
            data={insuranceHistory}
            dataKey="premium"
            xKey="date"
            type="area"
            color="#DC2626"
            height={140}
          />
        </MetricCard>

        <MetricCard
          title="Alternative Routes"
          value={`${metrics?.shipsRerouted ?? 89}% rerouted`}
          icon={Route}
          delay={5}
        >
          <div className="space-y-3">
            {[
              {
                name: "Cape of Good Hope",
                extra: "+14 days",
                cost: "+180%",
                usage: 65,
                color: "#F59E0B",
              },
              {
                name: "Suez → Mediterranean",
                extra: "+5 days",
                cost: "+85%",
                usage: 20,
                color: "#3B82F6",
              },
              {
                name: "Fujairah Pipeline",
                extra: "+1 day",
                cost: "+25%",
                usage: 4,
                color: "#10B981",
              },
            ].map((route) => (
              <div key={route.name} className="p-3 rounded-lg bg-bg-tertiary/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">
                    {route.name}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {route.usage}% of traffic
                  </span>
                </div>
                <div className="flex gap-3 text-xs text-text-secondary mb-2">
                  <span>{route.extra}</span>
                  <span>{route.cost} cost</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-bg-tertiary">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${route.usage}%`,
                      backgroundColor: route.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </MetricCard>
      </div>

      {/* Country Dependency Chart */}
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-info" />
        Country Dependency Overview
      </h2>
      <div className="glass-card-static p-5 mb-8">
        <LiveChart
          data={countryChartData}
          dataKey="oil"
          xKey="name"
          type="bar"
          color="#06B6D4"
          height={280}
          showGrid={true}
          showAxis={true}
        />
        <p className="text-xs text-text-muted mt-2 text-center">
          Oil imports via Strait of Hormuz as % of total oil imports
        </p>
      </div>
    </div>
  );
}
