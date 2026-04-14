export interface AlternativeRoute {
  id: string;
  name: string;
  description: string;
  extraDays: number;
  costIncrease: number; // percentage
  coordinates: [number, number][];
  color: string;
}

export const alternativeRoutes: AlternativeRoute[] = [
  {
    id: "cape",
    name: "Cape of Good Hope",
    description:
      "Route around Africa's southern tip, bypassing both Hormuz and Suez",
    extraDays: 14,
    costIncrease: 180,
    coordinates: [
      [26.0, 56.5],
      [24.5, 58.0],
      [20.0, 62.0],
      [12.0, 55.0],
      [2.0, 48.0],
      [-5.0, 42.0],
      [-15.0, 42.0],
      [-25.0, 38.0],
      [-34.5, 20.0],
      [-34.8, 18.5],
      [-33.0, 10.0],
      [-20.0, 0.0],
      [-5.0, -10.0],
      [10.0, -20.0],
      [30.0, -40.0],
      [40.0, -50.0],
    ],
    color: "#F59E0B",
  },
  {
    id: "suez-med",
    name: "Suez Canal → Mediterranean",
    description:
      "Through Red Sea and Suez Canal to European markets",
    extraDays: 5,
    costIncrease: 85,
    coordinates: [
      [26.0, 56.5],
      [24.5, 58.0],
      [20.0, 62.0],
      [14.0, 52.0],
      [12.6, 43.2],
      [14.0, 42.5],
      [20.0, 39.0],
      [27.0, 34.0],
      [30.0, 32.5],
      [31.2, 32.3],
      [35.0, 25.0],
      [37.0, 15.0],
      [40.0, 5.0],
    ],
    color: "#3B82F6",
  },
  {
    id: "east-west",
    name: "UAE East Coast Pipeline + Fujairah",
    description:
      "Abu Dhabi pipeline bypassing strait entirely via Fujairah terminal",
    extraDays: 1,
    costIncrease: 25,
    coordinates: [
      [24.5, 54.5],
      [24.8, 55.5],
      [25.1, 56.3],
      [25.2, 56.4],
    ],
    color: "#10B981",
  },
];

// Strait of Hormuz geographic center
export const HORMUZ_CENTER: [number, number] = [26.5667, 56.25];

// Chokepoint markers on the map
export interface ChokePoint {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export const chokePoints: ChokePoint[] = [
  {
    name: "Strait of Hormuz - Narrowest Point",
    lat: 26.58,
    lng: 56.25,
    description: "Only 21 nautical miles wide at its narrowest",
  },
  {
    name: "Inbound Traffic Lane",
    lat: 26.4,
    lng: 56.4,
    description: "Eastbound tanker traffic entering Persian Gulf",
  },
  {
    name: "Outbound Traffic Lane",
    lat: 26.7,
    lng: 56.1,
    description: "Westbound tanker traffic leaving Persian Gulf",
  },
  {
    name: "Qeshm Island",
    lat: 26.85,
    lng: 56.0,
    description: "Iranian island flanking northern strait passage",
  },
  {
    name: "Larak Island",
    lat: 26.86,
    lng: 56.35,
    description: "Iranian military presence",
  },
  {
    name: "Musandam Peninsula",
    lat: 26.2,
    lng: 56.25,
    description: "Omani territory on southern strait approach",
  },
];
