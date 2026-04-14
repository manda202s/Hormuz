import { Metadata } from "next";
import {
  Info,
  Database,
  BarChart3,
  Clock,
  Shield,
  Mail,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Strait of Hormuz Live Monitor — data sources, methodology, and mission.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Info className="h-8 w-8 text-accent" />
        <h1 className="text-3xl font-bold text-text-primary">
          About This Monitor
        </h1>
      </div>

      {/* Mission */}
      <section className="glass-card-static p-6 mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-3">Mission</h2>
        <p className="text-text-secondary leading-relaxed">
          The Strait of Hormuz Live Monitor provides real-time, data-driven
          tracking of the ongoing crisis at the world&apos;s most critical oil
          chokepoint. Our mission is to deliver accurate, unbiased information
          to news readers, traders, shipping companies, and policy analysts who
          need to understand the evolving situation and its global economic
          impact.
        </p>
        <p className="text-text-secondary leading-relaxed mt-3">
          Approximately 21% of the world&apos;s oil supply and 25% of global
          LNG trade passes through this 21-nautical-mile-wide strait. Any
          disruption has far-reaching consequences for global energy markets,
          shipping costs, and national economies.
        </p>
      </section>

      {/* Data Sources */}
      <section className="glass-card-static p-6 mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <Database className="h-5 w-5 text-accent" />
          Data Sources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "MarineTraffic",
              type: "Ship Positions",
              description:
                "Real-time vessel positions via AIS data covering the Strait of Hormuz and surrounding waters.",
              url: "https://marinetraffic.com",
            },
            {
              name: "Alpha Vantage",
              type: "Oil Prices",
              description:
                "Brent Crude and WTI spot prices updated hourly from global commodity markets.",
              url: "https://alphavantage.co",
            },
            {
              name: "Reuters / AP News / Bloomberg",
              type: "News & Analysis",
              description:
                "Aggregated news from major wire services, filtered for Hormuz-related coverage.",
              url: "https://reuters.com",
            },
            {
              name: "IEA / EIA",
              type: "Economic Data",
              description:
                "Country-level oil and LNG dependency statistics, strategic reserve data, and trade flow analysis.",
              url: "https://iea.org",
            },
            {
              name: "Lloyd's List",
              type: "Shipping Intelligence",
              description:
                "War risk insurance premiums, shipping cost indices, and maritime incident reporting.",
              url: "https://lloydslist.com",
            },
            {
              name: "IMF / World Bank",
              type: "Macroeconomic Impact",
              description:
                "GDP exposure calculations and economic impact modeling for affected nations.",
              url: "https://imf.org",
            },
          ].map((source) => (
            <div
              key={source.name}
              className="p-4 rounded-lg bg-bg-tertiary/30 border border-border/50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-text-primary">
                  {source.name}
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <span className="text-xs text-accent font-medium">
                {source.type}
              </span>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                {source.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="glass-card-static p-6 mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" />
          Methodology
        </h2>
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              Ship Tracking
            </h3>
            <p>
              We monitor vessel positions within the bounding box of 24°N-28°N
              latitude and 54°E-58°E longitude using AIS (Automatic Identification
              System) data. Ships are classified by type (oil tanker, LNG carrier,
              cargo, container, military) and tracked in near real-time with a 5-minute
              refresh interval.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              Impact Calculations
            </h3>
            <p>
              Country dependency percentages are based on the latest available IEA
              and EIA data on crude oil and LNG import volumes by source region.
              Daily economic costs are estimated using current oil prices multiplied
              by import volumes at risk, plus estimated shipping cost increases.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              Status Determination
            </h3>
            <p>
              The crisis status indicator (CRITICAL/WARNING/NORMAL) is determined
              by comparing real-time vessel transit counts against baseline averages.
              Below 20 daily transits = RESTRICTED, below 40 = ELEVATED RISK.
            </p>
          </div>
        </div>
      </section>

      {/* Update Frequency */}
      <section className="glass-card-static p-6 mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" />
          Update Frequency
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Ship Positions", freq: "Every 5 min" },
            { label: "Oil Prices", freq: "Every 1 hour" },
            { label: "News Feed", freq: "Every 15 min" },
            { label: "Country Data", freq: "Monthly" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-lg bg-bg-tertiary/30 text-center"
            >
              <div className="text-sm font-semibold text-accent font-mono">
                {item.freq}
              </div>
              <div className="text-xs text-text-muted mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="glass-card-static p-6 mb-6 border-l-4 border-l-warning">
        <h2 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-warning" />
          Disclaimer
        </h2>
        <div className="text-sm text-text-secondary leading-relaxed space-y-2">
          <p>
            This website provides information for educational and informational
            purposes only. It does not constitute financial, investment, or
            trading advice. The data presented may contain inaccuracies or
            delays.
          </p>
          <p>
            Ship position data is sourced from AIS transmissions which can be
            intentionally disabled or spoofed. Oil price data may be delayed up
            to 1 hour. News articles are aggregated from third-party RSS feeds
            and we are not responsible for their content or accuracy.
          </p>
          <p>
            Users should verify all information from official sources before
            making any decisions based on data presented here. The operators of
            this site assume no liability for actions taken based on the
            information provided.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="glass-card-static p-6">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <Mail className="h-5 w-5 text-accent" />
          Contact
        </h2>
        <div className="space-y-3 text-sm text-text-secondary">
          <p>
            For corrections, data inquiries, or media requests:
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" />
            <a
              href="mailto:contact@middleeaststraitofhormuz.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              contact@middleeaststraitofhormuz.com
            </a>
          </p>
          <p className="text-xs text-text-muted mt-4">
            This site is independently operated and is not affiliated with any
            government, military, or commercial shipping organization.
          </p>
        </div>
      </section>
    </div>
  );
}
