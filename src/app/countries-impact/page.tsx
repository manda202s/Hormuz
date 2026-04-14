"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ChevronDown,
  ChevronUp,
  X,
  Fuel,
  Flame,
  DollarSign,
  Shield,
  Factory,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { countriesData, type CountryData } from "@/lib/constants/countries";
import { formatCompact } from "@/lib/utils/formatters";

type SortKey = "oilDependency" | "lngDependency" | "dailyCost" | "name";

const impactColors: Record<string, string> = {
  critical: "status-critical",
  high: "status-warning",
  medium: "bg-info/15 text-info border border-info/30",
  low: "status-normal",
};

export default function CountriesImpactPage() {
  const [sortBy, setSortBy] = useState<SortKey>("oilDependency");
  const [sortDesc, setSortDesc] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );

  const sorted = [...countriesData].sort((a, b) => {
    if (sortBy === "name") {
      return sortDesc
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    }
    const aVal = a[sortBy] as number;
    const bVal = b[sortBy] as number;
    return sortDesc ? bVal - aVal : aVal - bVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(key);
      setSortDesc(true);
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortBy !== col)
      return <ChevronDown className="h-3 w-3 text-text-muted opacity-30" />;
    return sortDesc ? (
      <ChevronDown className="h-3 w-3 text-accent" />
    ) : (
      <ChevronUp className="h-3 w-3 text-accent" />
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <Globe className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold text-text-primary">
            Countries Impact
          </h1>
        </div>
        <p className="text-text-secondary max-w-2xl">
          Analysis of countries most affected by the Strait of Hormuz
          disruption. Data based on IEA and EIA statistics on oil and LNG import
          dependency.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table - Desktop */}
        <div className="flex-1">
          <div className="hidden md:block glass-card-static overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg-tertiary/30">
                  {[
                    { key: "name" as SortKey, label: "Country" },
                    { key: "oilDependency" as SortKey, label: "Oil %" },
                    { key: "lngDependency" as SortKey, label: "LNG %" },
                    { key: "dailyCost" as SortKey, label: "Daily Cost" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <SortIcon col={col.key} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Impact
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {sorted.map((country, i) => (
                  <motion.tr
                    key={country.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedCountry(country)}
                    className={cn(
                      "border-b border-border/50 cursor-pointer transition-colors",
                      selectedCountry?.code === country.code
                        ? "bg-accent/5"
                        : "hover:bg-bg-tertiary/30"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{country.flag}</span>
                        <span className="text-sm font-medium text-text-primary">
                          {country.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-semibold text-text-primary">
                          {country.oilDependency}%
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-bg-tertiary">
                          <div
                            className="h-full rounded-full bg-critical transition-all"
                            style={{ width: `${country.oilDependency}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-semibold text-text-primary">
                          {country.lngDependency}%
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-bg-tertiary">
                          <div
                            className="h-full rounded-full bg-warning transition-all"
                            style={{ width: `${country.lngDependency}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono font-semibold text-text-primary">
                        {formatCompact(country.dailyCost)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full uppercase",
                          impactColors[country.impactLevel]
                        )}
                      >
                        {country.impactLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-muted text-xs">
                      Details →
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {sorted.map((country, i) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedCountry(country)}
                className="glass-card p-4 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{country.flag}</span>
                    <span className="font-semibold text-text-primary">
                      {country.name}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full uppercase",
                      impactColors[country.impactLevel]
                    )}
                  >
                    {country.impactLevel}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold font-mono text-critical">
                      {country.oilDependency}%
                    </div>
                    <div className="text-xs text-text-muted">Oil</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold font-mono text-warning">
                      {country.lngDependency}%
                    </div>
                    <div className="text-xs text-text-muted">LNG</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold font-mono text-accent">
                      {formatCompact(country.dailyCost)}
                    </div>
                    <div className="text-xs text-text-muted">Daily</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              key="detail-panel"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="lg:w-96 glass-card-static p-6 h-fit lg:sticky lg:top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedCountry.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {selectedCountry.name}
                    </h3>
                    <span
                      className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full uppercase",
                        impactColors[selectedCountry.impactLevel]
                      )}
                    >
                      {selectedCountry.impactLevel}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="p-1.5 rounded-lg hover:bg-bg-tertiary/50 text-text-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Dependency */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Fuel className="h-3.5 w-3.5" />
                  Dependency
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">Oil imports via Hormuz</span>
                      <span className="font-mono font-semibold text-text-primary">
                        {selectedCountry.oilDependency}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-bg-tertiary">
                      <div
                        className="h-full rounded-full bg-critical transition-all duration-700"
                        style={{ width: `${selectedCountry.oilDependency}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      {selectedCountry.oilImportBpd.toLocaleString()}K bpd
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">LNG imports</span>
                      <span className="font-mono font-semibold text-text-primary">
                        {selectedCountry.lngDependency}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-bg-tertiary">
                      <div
                        className="h-full rounded-full bg-warning transition-all duration-700"
                        style={{ width: `${selectedCountry.lngDependency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Reserves */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Strategic Reserves
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-bg-tertiary/30 text-center">
                    <div className="text-xl font-bold font-mono text-accent">
                      {selectedCountry.strategicReserveDays}
                    </div>
                    <div className="text-xs text-text-muted">Days of supply</div>
                  </div>
                  <div className="p-3 rounded-lg bg-bg-tertiary/30 text-center">
                    <div className="text-sm font-bold font-mono text-text-primary">
                      {selectedCountry.reserveVolume}
                    </div>
                    <div className="text-xs text-text-muted">Reserve volume</div>
                  </div>
                </div>
              </div>

              {/* Economic Impact */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  Economic Impact
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Daily cost</span>
                    <span className="font-mono font-semibold text-critical">
                      {formatCompact(selectedCountry.dailyCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">GDP exposure</span>
                    <span className="font-mono font-semibold text-text-primary">
                      {selectedCountry.gdpExposure}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Industries at Risk */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Factory className="h-3.5 w-3.5" />
                  Industries at Risk
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCountry.industriesAtRisk.map((industry) => (
                    <span
                      key={industry}
                      className="px-2 py-1 rounded-md bg-bg-tertiary/50 text-xs text-text-secondary border border-border/50"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mitigation */}
              <div>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Mitigation Strategies
                </h4>
                <ul className="space-y-1.5">
                  {selectedCountry.mitigationStrategies.map((strategy) => (
                    <li
                      key={strategy}
                      className="text-sm text-text-secondary flex items-start gap-2"
                    >
                      <Flame className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                      {strategy}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-text-muted mt-3">
                  Alt. suppliers: {selectedCountry.alternativeSuppliers}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
