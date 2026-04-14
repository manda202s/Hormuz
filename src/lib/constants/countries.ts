export interface CountryData {
  code: string;
  name: string;
  flag: string;
  oilDependency: number; // % of oil imports via Hormuz
  lngDependency: number; // % of LNG imports via Hormuz
  dailyCost: number; // Daily economic cost in USD
  impactLevel: "critical" | "high" | "medium" | "low";
  oilImportBpd: number; // Barrels per day via Hormuz (thousands)
  strategicReserveDays: number;
  reserveVolume: string; // e.g. "442M barrels"
  gdpExposure: number; // % of GDP at risk
  industriesAtRisk: string[];
  mitigationStrategies: string[];
  alternativeSuppliers: string;
  lat: number;
  lng: number;
}

// ┌──────────────────────────────────────────────────────────────────────┐
// │ DATA SOURCES — APRIL 2026 (WARTIME)                                │
// │                                                                      │
// │ • War began: Feb 28, 2026 (US/Israel vs Iran)                       │
// │ • US naval blockade of Iranian ports: April 13, 2026                │
// │ • Strait effectively paralysed since late February 2026             │
// │ • Gulf exports fell from ~15M b/d pre-war to ~7M b/d               │
// │ • Brent crude surged from ~$75 to $100-130 range                   │
// │                                                                      │
// │ Sources: EIA, IEA, Bloomberg, Reuters, Korea Times, Japan Times,    │
// │ CBS News, Washington Post, Wikipedia (2026 Iran conflict)           │
// └──────────────────────────────────────────────────────────────────────┘

export const countriesData: CountryData[] = [
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    oilDependency: 87, // ~85-90% of oil imports via Hormuz (IEA)
    lngDependency: 65,
    dailyCost: 1_200_000_000, // Wartime: increased from baseline $890M
    impactLevel: "critical",
    oilImportBpd: 1600, // Pre-war: 1.6M b/d — now severely disrupted
    strategicReserveDays: 210, // Drawn down from 230; released reserves in March
    reserveVolume: "470M barrels",
    gdpExposure: 3.1, // Elevated due to crisis
    industriesAtRisk: ["Manufacturing", "Transport", "Petrochemicals", "Power Generation"],
    mitigationStrategies: [
      "Authorized 10M barrel strategic reserve drawdown (March 2026)",
      "Pivoting imports via Red Sea, Fujairah, and US LNG",
      "Nikkei 225 fell on blockade announcement (Apr 13)",
    ],
    alternativeSuppliers:
      "Pivoting to USA, Australia (LNG), Russia — limited bypass capacity",
    lat: 36.2048,
    lng: 138.2529,
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    oilDependency: 77, // ~70-80% via Hormuz
    lngDependency: 43,
    dailyCost: 950_000_000, // Wartime elevated
    impactLevel: "critical",
    oilImportBpd: 1700,
    strategicReserveDays: 105, // Drawn down from 120
    reserveVolume: "230M barrels",
    gdpExposure: 2.8,
    industriesAtRisk: ["Electronics", "Shipbuilding", "Petrochemicals", "Steel"],
    mitigationStrategies: [
      "VLCCs stuck in Gulf (Korea Times)",
      "Diversifying to US LNG imports",
      "Kospi dropped on blockade news (Apr 13)",
    ],
    alternativeSuppliers: "USA, Australia (LNG) — Korean tankers trapped in Gulf",
    lat: 35.9078,
    lng: 127.7669,
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    oilDependency: 60, // ~55-65% of crude via Hormuz
    lngDependency: 31,
    dailyCost: 780_000_000, // Wartime elevated
    impactLevel: "critical", // Upgraded from "high" due to crisis
    oilImportBpd: 2100,
    strategicReserveDays: 65, // Drawn down from 74
    reserveVolume: "58M barrels",
    gdpExposure: 2.4,
    industriesAtRisk: ["Transport", "Agriculture", "Manufacturing", "Fertilizers"],
    mitigationStrategies: [
      "Operation Sankalp 2.0 — Navy escorting Indian tankers",
      "Increased imports from Russia & Venezuela",
      "Emergency renewable energy acceleration",
    ],
    alternativeSuppliers: "Russia (pipeline+tanker), Nigeria, Venezuela, USA",
    lat: 20.5937,
    lng: 78.9629,
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    oilDependency: 38, // ~37.7% of Hormuz flows destined for China
    lngDependency: 28,
    dailyCost: 1_800_000_000, // Largest absolute cost
    impactLevel: "high",
    oilImportBpd: 4500, // Largest volume; severely disrupted
    strategicReserveDays: 75, // Drawn down from 80
    reserveVolume: "900M barrels",
    gdpExposure: 1.5,
    industriesAtRisk: ["Manufacturing", "Transport", "Energy", "Construction"],
    mitigationStrategies: [
      "Pipeline imports from Russia (ESPO, Power of Siberia) unaffected",
      "Massive strategic reserve programme (expanding capacity)",
      "US-China relations strained amid Iran conflict",
    ],
    alternativeSuppliers: "Russia, Brazil, Angola, Venezuela — pipeline routes bypass Hormuz",
    lat: 35.8617,
    lng: 104.1954,
  },
  {
    code: "TW",
    name: "Taiwan",
    flag: "🇹🇼",
    oilDependency: 78,
    lngDependency: 55,
    dailyCost: 250_000_000,
    impactLevel: "critical",
    oilImportBpd: 820,
    strategicReserveDays: 80, // Drawn down from 90
    reserveVolume: "66M barrels",
    gdpExposure: 3.2,
    industriesAtRisk: ["Semiconductors", "Electronics", "Manufacturing", "Power"],
    mitigationStrategies: [
      "Emergency LNG diversification (Australia, USA)",
      "Strategic reserves drawdown authorized",
      "Semiconductor fabs face power rationing risk",
    ],
    alternativeSuppliers: "Limited — island dependency; emergency US LNG shipments",
    lat: 23.6978,
    lng: 120.9605,
  },
  {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    oilDependency: 72,
    lngDependency: 45,
    dailyCost: 140_000_000,
    impactLevel: "critical",
    oilImportBpd: 450,
    strategicReserveDays: 15, // Critically low
    reserveVolume: "9M barrels",
    gdpExposure: 4.2,
    industriesAtRisk: ["Energy", "Transport", "Agriculture", "Textiles"],
    mitigationStrategies: [
      "Exploring 'all options' to repay $3B UAE loan (Bloomberg)",
      "CPEC energy projects from China",
      "Soaring oil prices devastating economy",
    ],
    alternativeSuppliers:
      "Very limited — heavy Gulf dependency; $3B UAE loan crisis",
    lat: 30.3753,
    lng: 69.3451,
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    oilDependency: 61,
    lngDependency: 38,
    dailyCost: 320_000_000,
    impactLevel: "high",
    oilImportBpd: 1100,
    strategicReserveDays: 60,
    reserveVolume: "58M barrels",
    gdpExposure: 3.8,
    industriesAtRisk: ["Refining", "Petrochemicals", "Shipping/Bunkering", "Finance"],
    mitigationStrategies: [
      "Refining feedstock diversification",
      "Jurong Cavern strategic storage",
      "Major bunkering hub seeing vessel diversions",
    ],
    alternativeSuppliers: "Diverse — major trading hub benefiting from rerouting",
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    oilDependency: 55,
    lngDependency: 22,
    dailyCost: 130_000_000,
    impactLevel: "high",
    oilImportBpd: 890,
    strategicReserveDays: 28, // Critically low
    reserveVolume: "22M barrels",
    gdpExposure: 1.9,
    industriesAtRisk: ["Tourism", "Automotive", "Agriculture", "Transport"],
    mitigationStrategies: [
      "Biofuel programs acceleration",
      "ASEAN crisis cooperation",
      "Domestic gas production expansion",
    ],
    alternativeSuppliers: "Regional alternatives — limited bypass options",
    lat: 15.87,
    lng: 100.9925,
  },
  {
    code: "TR",
    name: "Turkey",
    flag: "🇹🇷",
    oilDependency: 35,
    lngDependency: 20,
    dailyCost: 180_000_000,
    impactLevel: "high",
    oilImportBpd: 680,
    strategicReserveDays: 55,
    reserveVolume: "50M barrels",
    gdpExposure: 1.4,
    industriesAtRisk: ["Manufacturing", "Transport", "Energy", "Agriculture"],
    mitigationStrategies: [
      "Russia/Azerbaijan pipelines (BTC, TANAP) unaffected",
      "Iraq/Ceyhan pipeline operational",
      "LNG diversification from Mediterranean",
    ],
    alternativeSuppliers: "Russia, Azerbaijan, Iraq (via pipeline) — partially insulated",
    lat: 38.9637,
    lng: 35.2433,
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    oilDependency: 4, // Europe gets ~4% of Hormuz crude (IEA 2025)
    lngDependency: 8,
    dailyCost: 420_000_000, // Elevated via global price spike
    impactLevel: "medium",
    oilImportBpd: 420,
    strategicReserveDays: 115,
    reserveVolume: "170M barrels",
    gdpExposure: 0.8,
    industriesAtRisk: ["Automotive", "Chemicals", "Manufacturing"],
    mitigationStrategies: [
      "North Sea/Norway pipeline supplies intact",
      "EU strategic reserves coordination",
      "Accelerated renewable transition (Energiewende)",
    ],
    alternativeSuppliers: "Norway, North Africa, USA (LNG) — low direct exposure",
    lat: 51.1657,
    lng: 10.4515,
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    oilDependency: 3, // Only ~2.5% of Hormuz flows to US (EIA)
    lngDependency: 0, // Net LNG exporter
    dailyCost: 650_000_000, // Indirect cost via global prices + military ops
    impactLevel: "medium", // Direct oil impact low, but leading blockade
    oilImportBpd: 500,
    strategicReserveDays: 380,
    reserveVolume: "370M barrels",
    gdpExposure: 0.5,
    industriesAtRisk: ["Oil & Gas (price volatility)", "Defense spending", "Shipping"],
    mitigationStrategies: [
      "Enforcing the naval blockade (US Central Command)",
      "World's largest net oil producer — domestic supply intact",
      "SPR release coordinated with IEA (60M barrels)",
    ],
    alternativeSuppliers: "Domestic production, Canada, Mexico — minimal direct impact",
    lat: 37.0902,
    lng: -95.7129,
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    oilDependency: 4,
    lngDependency: 12,
    dailyCost: 230_000_000,
    impactLevel: "medium",
    oilImportBpd: 320,
    strategicReserveDays: 85,
    reserveVolume: "90M barrels",
    gdpExposure: 0.6,
    industriesAtRisk: ["Energy", "Finance", "Transport"],
    mitigationStrategies: [
      "North Sea production intact",
      "Norwegian pipeline imports",
      "Participating in IEA coordinated reserve release",
    ],
    alternativeSuppliers: "Norway, North Sea, US LNG — low direct exposure",
    lat: 55.3781,
    lng: -3.436,
  },
  {
    code: "IT",
    name: "Italy",
    flag: "🇮🇹",
    oilDependency: 18,
    lngDependency: 15,
    dailyCost: 195_000_000,
    impactLevel: "medium",
    oilImportBpd: 380,
    strategicReserveDays: 80,
    reserveVolume: "75M barrels",
    gdpExposure: 0.9,
    industriesAtRisk: ["Manufacturing", "Transport", "Tourism"],
    mitigationStrategies: [
      "North African pipeline gas (TAP, TransMed)",
      "EU solidarity mechanisms activated",
      "Renewable energy expansion",
    ],
    alternativeSuppliers: "Libya, Algeria, Norway",
    lat: 41.8719,
    lng: 12.5674,
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    oilDependency: 14,
    lngDependency: 10,
    dailyCost: 210_000_000,
    impactLevel: "medium",
    oilImportBpd: 350,
    strategicReserveDays: 90,
    reserveVolume: "105M barrels",
    gdpExposure: 0.5,
    industriesAtRisk: ["Transport", "Petrochemicals", "Aviation"],
    mitigationStrategies: [
      "Nuclear energy (70% of electricity) — shields power sector",
      "EU coordinated reserve release participation",
      "North African imports via Mediterranean",
    ],
    alternativeSuppliers: "Norway, North Africa, West Africa — nuclear power insulates",
    lat: 46.2276,
    lng: 2.2137,
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    oilDependency: 15,
    lngDependency: 0, // Major LNG EXPORTER — benefits from price spike
    dailyCost: 110_000_000,
    impactLevel: "low",
    oilImportBpd: 280,
    strategicReserveDays: 25, // Notoriously low
    reserveVolume: "20M barrels",
    gdpExposure: 0.3,
    industriesAtRisk: ["Mining/Transport (costs)", "Refining"],
    mitigationStrategies: [
      "Major LNG exporter — BENEFITS from crisis pricing",
      "US-stored strategic reserve barrels",
      "Domestic refining investment",
    ],
    alternativeSuppliers: "Domestic, Malaysia, Indonesia — LNG exports boost revenue",
    lat: -25.2744,
    lng: 133.7751,
  },
];

export function getCountryByCode(code: string): CountryData | undefined {
  return countriesData.find((c) => c.code === code);
}

export function getCountriesSorted(
  by: keyof CountryData = "oilDependency"
): CountryData[] {
  return [...countriesData].sort((a, b) => {
    const aVal = a[by];
    const bVal = b[by];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return bVal - aVal;
    }
    return 0;
  });
}
