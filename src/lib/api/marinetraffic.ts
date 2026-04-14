import { cacheGet, cacheSet } from "@/lib/utils/redis";

export interface Ship {
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
}

const CACHE_KEY = "ships:hormuz";
const CACHE_TTL = 300; // 5 minutes

/**
 * Fetch ships in the Strait of Hormuz area
 */
export async function getShipsInStrait(): Promise<Ship[]> {
  // Check cache first
  const cached = await cacheGet<Ship[]>(CACHE_KEY);
  if (cached) return cached;

  const apiKey = process.env.MARINETRAFFIC_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(
        `https://services.marinetraffic.com/api/exportvessels/v:8/${apiKey}/MINLAT:24/MAXLAT:28/MINLON:54/MAXLON:58/timespan:10/protocol:json`,
        { next: { revalidate: 300 } }
      );

      if (response.ok) {
        const data = await response.json();
        const ships = parseMarineTrafficResponse(data);
        await cacheSet(CACHE_KEY, ships, CACHE_TTL);
        return ships;
      }
    } catch (error) {
      console.error("MarineTraffic API error:", error);
    }
  }

  // Return mock data
  const mockShips = getMockShips();
  await cacheSet(CACHE_KEY, mockShips, CACHE_TTL);
  return mockShips;
}

function parseMarineTrafficResponse(data: Record<string, string>[]): Ship[] {
  return data.map((vessel, i) => ({
    id: vessel.MMSI || `ship-${i}`,
    name: vessel.SHIPNAME || "Unknown",
    imo: vessel.IMO || "",
    type: mapShipType(Number(vessel.SHIP_TYPE) || 0),
    flag: vessel.FLAG || "Unknown",
    flagCode: vessel.FLAG || "",
    lat: Number(vessel.LAT) || 0,
    lng: Number(vessel.LON) || 0,
    speed: Number(vessel.SPEED) / 10 || 0,
    heading: Number(vessel.HEADING) || 0,
    destination: vessel.DESTINATION || "Unknown",
    eta: vessel.ETA || "",
    lastUpdate: new Date().toISOString(),
    tonnage: Number(vessel.GRT) || 0,
  }));
}

function mapShipType(
  typeCode: number
): Ship["type"] {
  if (typeCode >= 80 && typeCode <= 89) return "oil_tanker";
  if (typeCode >= 70 && typeCode <= 79) return "cargo";
  if (typeCode >= 60 && typeCode <= 69) return "container";
  if (typeCode === 35) return "military";
  return "other";
}

function getMockShips(): Ship[] {
  const types: Ship["type"][] = [
    "oil_tanker", "oil_tanker", "oil_tanker", "oil_tanker",
    "lng_carrier", "lng_carrier", "lng_carrier",
    "cargo", "cargo", "cargo",
    "container", "container",
    "other",
  ];

  const flags = [
    { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
    { name: "Iran", code: "IR", flag: "🇮🇷" },
    { name: "UAE", code: "AE", flag: "🇦🇪" },
    { name: "India", code: "IN", flag: "🇮🇳" },
    { name: "China", code: "CN", flag: "🇨🇳" },
    { name: "Japan", code: "JP", flag: "🇯🇵" },
    { name: "South Korea", code: "KR", flag: "🇰🇷" },
    { name: "Panama", code: "PA", flag: "🇵🇦" },
    { name: "Liberia", code: "LR", flag: "🇱🇷" },
    { name: "Marshall Is.", code: "MH", flag: "🇲🇭" },
    { name: "Singapore", code: "SG", flag: "🇸🇬" },
    { name: "Greece", code: "GR", flag: "🇬🇷" },
    { name: "Norway", code: "NO", flag: "🇳🇴" },
  ];

  const tankerNames = [
    "MT Gulf Horizon", "MT Arabian Eagle", "MT Persian Star",
    "MT Jade Pioneer", "MT Ocean Fortuna", "MT Pacific Crown",
    "LNG Qatar Pride", "LNG Ras Laffan", "LNG Energy Progress",
    "MV Silk Road", "MV Eastern Promise", "MV Orient Express",
    "CS Ever Harmony", "CS Maersk Sentinel",
    "MV Global Unity",
  ];

  const destinations = [
    "Singapore", "Yokohama", "Busan", "Mumbai",
    "Shanghai", "Rotterdam", "Houston", "Fujairah",
    "Jebel Ali", "Ras Tanura", "Kharg Island",
  ];

  const ships: Ship[] = [];

  // Generate ships scattered around the strait
  const positions: [number, number][] = [
    // Inbound lane (east side)
    [26.28, 56.52], [26.15, 56.68], [26.02, 56.85],
    [25.85, 57.10], [25.65, 57.30], [25.45, 57.55],
    // Outbound lane (west side)
    [26.72, 56.12], [26.80, 55.85], [26.65, 55.60],
    [26.55, 55.35], [26.90, 55.15],
    // Inside the Gulf
    [27.10, 55.50], [27.30, 54.80], [26.95, 54.20],
    [26.50, 54.50],
    // Waiting/anchorage area
    [25.30, 57.80], [25.50, 58.20], [25.20, 58.50],
    [25.70, 58.00], [25.10, 57.60],
    // Transit through strait
    [26.45, 56.35], [26.38, 56.45], [26.52, 56.28],
    [26.60, 56.18], [26.32, 56.55],
    // Near Fujairah
    [25.15, 56.35], [25.05, 56.55], [25.25, 56.60],
    // Near Ras Tanura
    [26.68, 54.10], [26.55, 53.95],
    // Wider area
    [25.80, 55.90], [26.00, 55.70], [26.20, 56.00],
    [25.60, 56.80], [25.90, 56.50],
    // Additional ships
    [26.35, 56.60], [26.48, 56.40], [26.62, 56.05],
    [25.95, 57.00], [25.75, 57.20],
  ];

  for (let i = 0; i < positions.length && i < 40; i++) {
    const typeIndex = i % types.length;
    const flagData = flags[i % flags.length];
    const [lat, lng] = positions[i];

    ships.push({
      id: `mock-${i + 1}`,
      name: tankerNames[i % tankerNames.length],
      imo: `${9000000 + i * 1234}`,
      type: types[typeIndex],
      flag: `${flagData.flag} ${flagData.name}`,
      flagCode: flagData.code,
      lat: lat + (Math.random() - 0.5) * 0.05,
      lng: lng + (Math.random() - 0.5) * 0.05,
      speed: Math.random() * 14 + 2,
      heading: Math.random() * 360,
      destination: destinations[i % destinations.length],
      eta: new Date(
        Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      lastUpdate: new Date(
        Date.now() - Math.random() * 10 * 60 * 1000
      ).toISOString(),
      tonnage: Math.floor(Math.random() * 200000 + 50000),
    });
  }

  return ships;
}
