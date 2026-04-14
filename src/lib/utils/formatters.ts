import { formatDistanceToNow, format } from "date-fns";

/**
 * Format a number with compact notation (e.g., 1.2B, 4.5M)
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/**
 * Format a date as relative time (e.g., "2 minutes ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Format a date nicely
 */
export function formatDate(date: Date | string, fmt = "MMM dd, yyyy"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, fmt);
}

/**
 * Get ship type color
 */
export function getShipTypeColor(type: string): string {
  const typeMap: Record<string, string> = {
    "oil_tanker": "#DC2626",
    "lng_carrier": "#F97316",
    "cargo": "#EAB308",
    "container": "#3B82F6",
    "military": "#6B7280",
    "other": "#8B5CF6",
  };
  return typeMap[type] || typeMap.other;
}

/**
 * Get ship type label
 */
export function getShipTypeLabel(type: string): string {
  const labelMap: Record<string, string> = {
    "oil_tanker": "Oil Tanker",
    "lng_carrier": "LNG Carrier",
    "cargo": "Cargo Ship",
    "container": "Container Ship",
    "military": "Military Vessel",
    "other": "Other Vessel",
  };
  return labelMap[type] || "Unknown";
}

/**
 * Get category color
 */
export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    military: "#DC2626",
    economic: "#F59E0B",
    diplomatic: "#3B82F6",
    incident: "#6B7280",
    deescalation: "#10B981",
  };
  return map[category] || "#6B7280";
}

/**
 * Format knots speed
 */
export function formatSpeed(knots: number): string {
  return `${knots.toFixed(1)} knots`;
}

/**
 * Format heading in degrees to compass direction
 */
export function formatHeading(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return `${degrees.toFixed(0)}° ${directions[index]}`;
}
