"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Ship,
  Layers,
  Search,
  Filter,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getShipTypeColor, getShipTypeLabel } from "@/lib/utils/formatters";

const LiveMap = dynamic(() => import("@/components/maps/LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-bg-secondary animate-pulse flex items-center justify-center">
      <span className="text-text-muted">Loading map...</span>
    </div>
  ),
});

const shipTypes = [
  { value: "", label: "All Ships" },
  { value: "oil_tanker", label: "Oil Tankers" },
  { value: "lng_carrier", label: "LNG Carriers" },
  { value: "cargo", label: "Cargo Ships" },
  { value: "container", label: "Container Ships" },
  { value: "military", label: "Military" },
  { value: "other", label: "Other" },
];

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
  count: number;
}

export default function LiveMapPage() {
  const [filterType, setFilterType] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [showChokepoints, setShowChokepoints] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [panelOpen, setPanelOpen] = useState(true);

  const { data } = useQuery<ShipsResponse>({
    queryKey: ["ships"],
    queryFn: () => fetch("/api/ships").then((r) => r.json()),
  });

  const ships = data?.ships || [];

  const filteredShips = ships.filter((s) => {
    if (filterType && s.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.imo.includes(q) ||
        s.destination.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const typeCount = (type: string) =>
    ships.filter((s) => (type ? s.type === type : true)).length;

  return (
    <div className="relative" style={{ height: "calc(100vh - 64px)" }}>
      {/* Full-screen map */}
      <LiveMap
        ships={filteredShips}
        showRoutes={showRoutes}
        showChokepPoints={showChokepoints}
        height="100%"
        interactive={true}
        initialZoom={7}
      />

      {/* Control Panel Toggle */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-secondary/90 backdrop-blur-sm border border-border text-text-primary text-sm font-medium hover:bg-bg-tertiary transition-colors"
      >
        {panelOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
        {panelOpen ? "Close" : "Filters"}
      </button>

      {/* Control Panel */}
      {panelOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="absolute top-16 left-4 z-[1000] w-72 glass-card-static p-4 max-h-[calc(100vh-140px)] overflow-y-auto no-scrollbar"
        >
          {/* Ship Count */}
          <div className="flex items-center gap-2 mb-4">
            <Ship className="h-5 w-5 text-accent" />
            <div>
              <div className="text-lg font-bold font-mono text-text-primary">
                {filteredShips.length}
              </div>
              <div className="text-xs text-text-muted">
                Ships visible of {ships.length} total
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search ship name or IMO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-bg-tertiary/50 border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Ship Type Filters */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Ship Type
            </h4>
            <div className="space-y-1">
              {shipTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() =>
                    setFilterType(filterType === type.value ? "" : type.value)
                  }
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
                    filterType === type.value
                      ? "bg-accent/10 text-accent border border-accent/30"
                      : "text-text-secondary hover:bg-bg-tertiary/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {type.value && (
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getShipTypeColor(type.value),
                        }}
                      />
                    )}
                    <span>{type.label}</span>
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    {typeCount(type.value)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Map Layers */}
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" />
              Map Layers
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                <input
                  type="checkbox"
                  checked={showChokepoints}
                  onChange={(e) => setShowChokepoints(e.target.checked)}
                  className="rounded border-border accent-accent"
                />
                Strategic Chokepoints
              </label>
              <label className="flex items-center gap-3 text-sm text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                <input
                  type="checkbox"
                  checked={showRoutes}
                  onChange={(e) => setShowRoutes(e.target.checked)}
                  className="rounded border-border accent-accent"
                />
                Alternative Routes
              </label>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Legend
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {shipTypes
                .filter((t) => t.value)
                .map((type) => (
                  <div
                    key={type.value}
                    className="flex items-center gap-1.5 text-xs text-text-secondary"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: getShipTypeColor(type.value),
                      }}
                    />
                    {getShipTypeLabel(type.value)}
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats overlay - bottom right */}
      <div className="absolute bottom-4 right-4 z-[1000] glass-card-static p-3 text-xs space-y-1">
        <div className="text-text-muted">
          Last updated:{" "}
          <span className="font-mono text-text-secondary">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="text-text-muted">
          Auto-refresh:{" "}
          <span className="text-accent font-medium">60s</span>
        </div>
      </div>
    </div>
  );
}
