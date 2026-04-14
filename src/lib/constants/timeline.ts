export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "military" | "diplomatic" | "economic" | "incident" | "deescalation";
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  sourceUrl?: string;
  relatedCountries: string[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "evt-001",
    date: "2026-02-15",
    title: "Iran Warns of Retaliation Against Shipping Sanctions",
    description:
      "IRGC Navy commander issues statement warning that any further oil sanctions could lead to 'decisive action' in the Strait of Hormuz. International shipping insurers begin reviewing risk premiums.",
    category: "military",
    severity: "high",
    source: "Reuters",
    sourceUrl: "https://reuters.com",
    relatedCountries: ["IR", "US"],
  },
  {
    id: "evt-002",
    date: "2026-02-20",
    title: "War Risk Insurance Premiums Double",
    description:
      "Lloyd's of London and major P&I clubs announce a 2x increase in war risk insurance premiums for vessels transiting the Strait of Hormuz, citing elevated military tensions.",
    category: "economic",
    severity: "high",
    source: "Lloyd's List",
    relatedCountries: ["GB"],
  },
  {
    id: "evt-003",
    date: "2026-02-25",
    title: "US Deploys Additional Carrier Strike Group",
    description:
      "USS Abraham Lincoln carrier strike group deploys to the Persian Gulf region, joining USS Eisenhower already on station. Pentagon cites 'freedom of navigation' mandate.",
    category: "military",
    severity: "critical",
    source: "Associated Press",
    sourceUrl: "https://apnews.com",
    relatedCountries: ["US", "IR"],
  },
  {
    id: "evt-004",
    date: "2026-02-28",
    title: "Iran Announces Naval Exercises in Strait",
    description:
      "IRGC declares major naval exercise 'Great Prophet 20' will take place across the Strait of Hormuz. Commercial shipping advised to use caution. Several tanker operators announce temporary route diversions.",
    category: "military",
    severity: "critical",
    source: "Reuters",
    sourceUrl: "https://reuters.com",
    relatedCountries: ["IR"],
  },
  {
    id: "evt-005",
    date: "2026-03-02",
    title: "Oil Prices Surge Past $100/barrel",
    description:
      "Brent crude breaks the $100/barrel barrier for the first time since 2022, driven by Hormuz tensions. WTI follows at $96. Energy analysts warn of further escalation potential.",
    category: "economic",
    severity: "high",
    source: "Bloomberg",
    relatedCountries: ["US", "GB"],
  },
  {
    id: "evt-006",
    date: "2026-03-05",
    title: "UN Security Council Emergency Session",
    description:
      "United Nations Security Council convenes emergency session on Strait of Hormuz tensions. Draft resolution calling for cessation of military activities fails due to Russian and Chinese vetoes.",
    category: "diplomatic",
    severity: "high",
    source: "UN News",
    sourceUrl: "https://news.un.org",
    relatedCountries: ["US", "IR", "RU", "CN"],
  },
  {
    id: "evt-007",
    date: "2026-03-08",
    title: "Commercial Tanker Seized by IRGC Navy",
    description:
      "IRGC navy boards and impounds the Marshall Islands-flagged tanker MT Advantage Sweet in the Strait. Crew of 24 detained. International Maritime Organization issues urgent advisory.",
    category: "incident",
    severity: "critical",
    source: "Maritime Executive",
    relatedCountries: ["IR", "MH"],
  },
  {
    id: "evt-008",
    date: "2026-03-10",
    title: "Major Shipping Lines Suspend Hormuz Transit",
    description:
      "Maersk, MSC, and CMA CGM announce temporary suspension of all vessel transits through the Strait of Hormuz. Ships diverted to alternative routes via Cape of Good Hope.",
    category: "economic",
    severity: "critical",
    source: "The Loadstar",
    relatedCountries: ["DK", "CH", "FR"],
  },
  {
    id: "evt-009",
    date: "2026-03-12",
    title: "Japan Activates Strategic Petroleum Reserve",
    description:
      "Japanese government announces drawdown of 10M barrels from strategic petroleum reserves as Hormuz disruption impacts 89% of oil imports. South Korea follows with smaller release.",
    category: "economic",
    severity: "high",
    source: "Nikkei Asia",
    relatedCountries: ["JP", "KR"],
  },
  {
    id: "evt-010",
    date: "2026-03-14",
    title: "European Union Proposes Diplomatic Framework",
    description:
      "EU High Representative presents crisis mediation framework to all parties. Proposal includes naval deconfliction hotline and phased sanctions relief. Iran signals willingness to discuss.",
    category: "diplomatic",
    severity: "medium",
    source: "Euronews",
    relatedCountries: ["FR", "DE", "GB", "IR"],
  },
  {
    id: "evt-011",
    date: "2026-03-16",
    title: "Brent Crude Reaches $115/barrel",
    description:
      "Oil prices continue climbing as the strait remains effectively closed to commercial traffic. OPEC+ calls emergency meeting. Global shipping costs surge 150-200%.",
    category: "economic",
    severity: "critical",
    source: "Financial Times",
    relatedCountries: ["SA", "AE"],
  },
  {
    id: "evt-012",
    date: "2026-03-18",
    title: "India Requests Naval Escort for Oil Tankers",
    description:
      "Indian Navy announces Operation Sankalp 2.0 to escort Indian-flagged and Indian-bound oil tankers through the strait. Two frigates and a destroyer deployed.",
    category: "military",
    severity: "high",
    source: "Hindustan Times",
    relatedCountries: ["IN"],
  },
  {
    id: "evt-013",
    date: "2026-03-20",
    title: "Seized Tanker Crew Released Following Negotiations",
    description:
      "Oman mediates release of 24 crew members from MT Advantage Sweet. Vessel remains impounded. Seen as minor de-escalation signal.",
    category: "deescalation",
    severity: "medium",
    source: "Al Jazeera",
    relatedCountries: ["OM", "IR", "MH"],
  },
  {
    id: "evt-014",
    date: "2026-03-22",
    title: "US Navy Begins Escort Operations",
    description:
      "US 5th Fleet begins escorting commercial tankers through the strait in groups of 3-5 vessels. First convoy of 4 tankers transits successfully under military escort.",
    category: "military",
    severity: "high",
    source: "Stars and Stripes",
    relatedCountries: ["US"],
  },
  {
    id: "evt-015",
    date: "2026-03-24",
    title: "China Calls for Restraint from All Parties",
    description:
      "Chinese Foreign Ministry statement urges restraint, offering to host direct negotiations between Iran and Western powers. Beijing concerned about oil supply disruption to Chinese refineries.",
    category: "diplomatic",
    severity: "medium",
    source: "South China Morning Post",
    relatedCountries: ["CN", "IR", "US"],
  },
  {
    id: "evt-016",
    date: "2026-03-26",
    title: "Near-Miss Incident Between US and IRGC Vessels",
    description:
      "IRGC fast-attack boats approach within 300 meters of US destroyer USS Carney in the strait. Warning flares fired. Pentagon describes as 'unsafe and unprofessional maneuver.'",
    category: "incident",
    severity: "critical",
    source: "CNN",
    sourceUrl: "https://cnn.com",
    relatedCountries: ["US", "IR"],
  },
  {
    id: "evt-017",
    date: "2026-03-28",
    title: "OPEC+ Emergency Meeting Calls for Calm",
    description:
      "OPEC+ emergency meeting in Vienna. Saudi Arabia and UAE pledge to maximize alternative export routes (Yanbu, Fujairah). No production cuts agreed despite supply disruption.",
    category: "economic",
    severity: "medium",
    source: "Reuters",
    sourceUrl: "https://reuters.com",
    relatedCountries: ["SA", "AE", "RU"],
  },
  {
    id: "evt-018",
    date: "2026-03-30",
    title: "Oil Hits $127/barrel — Highest Since 2008",
    description:
      "Brent crude reaches $127.50/barrel as blockade enters second month. Global recession fears mount. Stock markets tumble worldwide with energy-heavy indices down 8-12%.",
    category: "economic",
    severity: "critical",
    source: "Bloomberg",
    relatedCountries: ["US", "GB", "JP"],
  },
  {
    id: "evt-019",
    date: "2026-04-01",
    title: "Oman Hosts Back-Channel Negotiations",
    description:
      "Omani Sultan Haitham hosts secret back-channel talks between US and Iranian delegations in Muscat. European observers present. Both sides reportedly agree to 'cooling off' period framework.",
    category: "diplomatic",
    severity: "medium",
    source: "The Guardian",
    relatedCountries: ["OM", "US", "IR"],
  },
  {
    id: "evt-020",
    date: "2026-04-03",
    title: "Ship Transit Count Drops to 12/Day",
    description:
      "Only 12 vessels transit the strait in 24 hours — down from a normal 60-80. All under military escort. 147 commercial vessels stranded or waiting in anchorage areas.",
    category: "incident",
    severity: "critical",
    source: "MarineTraffic",
    relatedCountries: [],
  },
  {
    id: "evt-021",
    date: "2026-04-05",
    title: "IEA Coordinates Emergency Oil Release",
    description:
      "International Energy Agency coordinates release of 60 million barrels from strategic reserves across 28 member countries. Largest coordinated release in IEA history.",
    category: "economic",
    severity: "high",
    source: "IEA",
    sourceUrl: "https://iea.org",
    relatedCountries: ["US", "JP", "DE", "FR", "GB"],
  },
  {
    id: "evt-022",
    date: "2026-04-07",
    title: "Iran Signals Willingness for Limited Maritime Corridor",
    description:
      "Iranian foreign minister announces willingness to establish a 'humanitarian maritime corridor' for food and medicine shipments. Western diplomats cautiously welcome the move.",
    category: "deescalation",
    severity: "medium",
    source: "Al Jazeera",
    relatedCountries: ["IR"],
  },
  {
    id: "evt-023",
    date: "2026-04-09",
    title: "US-Iran Agree to Naval Deconfliction Protocol",
    description:
      "Following Omani mediation, both sides agree to radio frequency deconfliction protocol and minimum approach distances. First formal military-to-military agreement since 2015.",
    category: "deescalation",
    severity: "high",
    source: "Associated Press",
    sourceUrl: "https://apnews.com",
    relatedCountries: ["US", "IR", "OM"],
  },
  {
    id: "evt-024",
    date: "2026-04-11",
    title: "Limited Commercial Convoy System Begins",
    description:
      "First multinational-escorted commercial convoy of 8 tankers transits successfully. Includes ships from 5 flag states. Transit count slowly rising. Oil prices dip to $118.",
    category: "deescalation",
    severity: "medium",
    source: "Reuters",
    sourceUrl: "https://reuters.com",
    relatedCountries: ["US", "GB", "FR", "IN"],
  },
  {
    id: "evt-025",
    date: "2026-04-13",
    title: "Crisis Continues: Partial Transit Under Escort Only",
    description:
      "Strait remains under restricted transit conditions. Only military-escorted convoys permitted. Insurance premiums remain at 16x normal levels. Global economic impact estimated at $4.2B/day.",
    category: "incident",
    severity: "critical",
    source: "Financial Times",
    relatedCountries: [],
  },
];

export function getEventsByCategory(
  category?: string
): TimelineEvent[] {
  if (!category || category === "all") return timelineEvents;
  return timelineEvents.filter((e) => e.category === category);
}

export function searchEvents(query: string): TimelineEvent[] {
  const q = query.toLowerCase();
  return timelineEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
  );
}
