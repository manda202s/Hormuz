"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { Ship } from "@/lib/api/marinetraffic";
import { getShipTypeColor, getShipTypeLabel, formatSpeed, formatHeading } from "@/lib/utils/formatters";
import { formatRelativeTime } from "@/lib/utils/formatters";
import { alternativeRoutes, HORMUZ_CENTER, chokePoints } from "@/lib/constants/routes";
import "leaflet/dist/leaflet.css";

interface LiveMapProps {
  ships: Ship[];
  showRoutes?: boolean;
  showChokepPoints?: boolean;
  height?: string;
  interactive?: boolean;
  initialZoom?: number;
  filterType?: string;
}

// Fix Leaflet default icon issue in Next.js
function fixLeafletIcons() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "",
    iconUrl: "",
    shadowUrl: "",
  });
}

function createShipIcon(type: string, heading: number) {
  const color = getShipTypeColor(type);
  const rotation = heading || 0;

  return L.divIcon({
    className: "ship-marker",
    html: `<div style="
      width: 14px;
      height: 14px;
      background: ${color};
      border: 2px solid rgba(255,255,255,0.8);
      border-radius: 50%;
      box-shadow: 0 0 8px ${color}88, 0 0 16px ${color}44;
      transform: rotate(${rotation}deg);
      position: relative;
    ">
      <div style="
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 6px solid ${color};
      "></div>
    </div>`,
    iconSize: [14, 20],
    iconAnchor: [7, 10],
    popupAnchor: [0, -12],
  });
}

function createChokeIcon() {
  return L.divIcon({
    className: "choke-marker",
    html: `<div style="
      width: 10px;
      height: 10px;
      background: var(--warning, #F59E0B);
      border: 2px solid rgba(245, 158, 11, 0.5);
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
    "></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -8],
  });
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

export default function LiveMap({
  ships,
  showRoutes = false,
  showChokepPoints = false,
  height = "500px",
  interactive = true,
  initialZoom = 7,
  filterType,
}: LiveMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fixLeafletIcons();
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="bg-bg-secondary rounded-xl animate-pulse flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-text-muted text-sm">Loading map...</div>
      </div>
    );
  }

  const filteredShips = filterType
    ? ships.filter((s) => s.type === filterType)
    : ships;

  return (
    <div className="rounded-xl overflow-hidden border border-border" style={{ height }}>
      <MapContainer
        center={HORMUZ_CENTER}
        zoom={initialZoom}
        className="h-full w-full"
        zoomControl={interactive}
        scrollWheelZoom={interactive}
        dragging={interactive}
        attributionControl={true}
      >
        <MapResizer />
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Ship Markers */}
        {filteredShips.map((ship) => (
          <Marker
            key={ship.id}
            position={[ship.lat, ship.lng]}
            icon={createShipIcon(ship.type, ship.heading)}
          >
            <Popup>
              <div className="min-w-[220px] p-1">
                <div className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                  {ship.name}
                </div>
                <div className="space-y-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium" style={{ color: getShipTypeColor(ship.type) }}>
                      {getShipTypeLabel(ship.type)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flag:</span>
                    <span>{ship.flag}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-mono">{formatSpeed(ship.speed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heading:</span>
                    <span className="font-mono">{formatHeading(ship.heading)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination:</span>
                    <span>{ship.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IMO:</span>
                    <span className="font-mono">{ship.imo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span>{formatRelativeTime(ship.lastUpdate)}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Alternative Routes */}
        {showRoutes &&
          alternativeRoutes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.coordinates.map(([lat, lng]) => [lat, lng] as [number, number])}
              pathOptions={{
                color: route.color,
                weight: 2,
                opacity: 0.6,
                dashArray: "8 6",
              }}
            />
          ))}

        {/* Chokepoints */}
        {showChokepPoints &&
          chokePoints.map((cp) => (
            <Marker
              key={cp.name}
              position={[cp.lat, cp.lng]}
              icon={createChokeIcon()}
            >
              <Popup>
                <div className="min-w-[180px] p-1">
                  <div className="font-bold text-xs mb-1" style={{ color: "var(--text-primary)" }}>
                    {cp.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {cp.description}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
