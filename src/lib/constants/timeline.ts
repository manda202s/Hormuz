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
  // ── 2023: Escalating Maritime Tensions ──────────────────────────────
  {
    id: "evt-001",
    date: "2023-04-27",
    title: "Iran Seizes Oil Tanker Advantage Sweet in Gulf of Oman",
    description:
      "The IRGC Navy boards and seizes the Marshall Islands-flagged tanker MT Advantage Sweet in the Gulf of Oman. The vessel, chartered by Chevron, was carrying ~750,000 barrels of Kuwaiti crude bound for Houston. Iran claimed the seizure was due to a collision with an Iranian vessel. The U.S. 5th Fleet condemned the action as contrary to international law.",
    category: "incident",
    severity: "critical",
    source: "U.S. Naval Forces Central Command",
    sourceUrl: "https://www.navy.mil",
    relatedCountries: ["IR", "US", "MH"],
  },
  {
    id: "evt-002",
    date: "2023-07-05",
    title: "Iran Seizes Two More Tankers in Strait of Hormuz",
    description:
      "Iran's IRGC Navy seizes two additional tankers within a single week in the Strait of Hormuz, raising the total of impounded vessels to three. The U.S. redeploys Marines and warships including USS Bataan to the region in response. War risk insurance premiums for Gulf transits spike sharply.",
    category: "incident",
    severity: "critical",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com/world/middle-east/",
    relatedCountries: ["IR", "US"],
  },
  {
    id: "evt-003",
    date: "2023-10-07",
    title: "Hamas Attacks Israel — Regional Escalation Begins",
    description:
      "Hamas launches surprise attack on southern Israel, killing over 1,200 people and taking approximately 250 hostages. Israel declares war and launches massive military campaign in Gaza. The attack triggers a chain of regional escalation involving Iran-backed proxies across the Middle East, including Hezbollah, Houthis, and Iraqi militias.",
    category: "military",
    severity: "critical",
    source: "BBC News",
    sourceUrl: "https://www.bbc.com/news/world-middle-east-67039975",
    relatedCountries: ["IL", "PS"],
  },
  {
    id: "evt-004",
    date: "2023-11-19",
    title: "Houthis Seize Cargo Ship Galaxy Leader in Red Sea",
    description:
      "Yemen's Houthi rebels seize the Japanese-operated, Bahamas-flagged car carrier Galaxy Leader in the Red Sea using helicopter-borne commandos. The group declares it will target all Israeli-linked shipping. 25 crew members detained. The seizure marks the beginning of the Houthi maritime campaign threatening global trade routes.",
    category: "incident",
    severity: "critical",
    source: "Al Jazeera",
    sourceUrl: "https://www.aljazeera.com/news/2023/11/20/yemens-houthis-seize-cargo-ship-in-red-sea-with-25-crew",
    relatedCountries: ["YE", "JP", "IL"],
  },
  {
    id: "evt-005",
    date: "2023-12-09",
    title: "Houthis Expand Threat to All Israel-Bound Ships",
    description:
      "Houthi leadership announces expansion of targeting criteria to include all commercial vessels heading to Israeli ports regardless of nationality. Multiple missiles fired at commercial shipping in the southern Red Sea and Bab el-Mandeb strait. Major shipping lines including Maersk begin pausing Red Sea transits.",
    category: "military",
    severity: "high",
    source: "Security Council Report",
    sourceUrl: "https://www.securitycouncilreport.org",
    relatedCountries: ["YE", "IL", "DK"],
  },
  {
    id: "evt-006",
    date: "2023-12-18",
    title: "U.S. Launches Operation Prosperity Guardian",
    description:
      "The United States announces Operation Prosperity Guardian, a multinational naval coalition to protect commercial shipping in the Red Sea against Houthi attacks. Multiple nations join including the UK, Bahrain, Canada, France, Italy, Netherlands, Norway, and the Seychelles. Ships begin receiving naval escorts through the Bab el-Mandeb strait.",
    category: "military",
    severity: "high",
    source: "U.S. Department of Defense",
    sourceUrl: "https://www.defense.gov",
    relatedCountries: ["US", "GB", "BH", "CA", "FR"],
  },

  // ── 2024: Widening Regional Conflict ────────────────────────────────
  {
    id: "evt-007",
    date: "2024-01-11",
    title: "U.S. and UK Strike Houthi Targets in Yemen",
    description:
      "U.S. and British forces launch extensive airstrikes against Houthi military targets across Yemen, including radar sites, missile storage facilities, and launch positions. The strikes target over 60 locations in response to continued Houthi attacks on international shipping. The operation marks the first direct military action against the Houthis by Western forces.",
    category: "military",
    severity: "critical",
    source: "Associated Press",
    sourceUrl: "https://apnews.com/article/us-uk-strikes-houthis-yemen-red-sea",
    relatedCountries: ["US", "GB", "YE"],
  },
  {
    id: "evt-008",
    date: "2024-01-26",
    title: "Houthi Missile Strikes Tanker Marlin Luanda",
    description:
      "The British-flagged tanker Marlin Luanda is struck by a Houthi anti-ship missile in the Red Sea, igniting a cargo fire. The vessel was carrying Russian naphtha. The attack demonstrates the Houthis' ability to strike even tankers carrying fuel, escalating the maritime threat level significantly. Insurance premiums for Red Sea transits surge.",
    category: "incident",
    severity: "critical",
    source: "Lloyd's List",
    sourceUrl: "https://www.lloydslist.com",
    relatedCountries: ["GB", "YE", "RU"],
  },
  {
    id: "evt-009",
    date: "2024-02-19",
    title: "EU Launches Operation Aspides in Red Sea",
    description:
      "The European Union launches Operation Aspides, a separate naval mission focused on defending freedom of navigation in the Red Sea. Unlike the U.S.-led coalition, Aspides is purely defensive and does not conduct strikes on Houthi territory. Multiple EU navies contribute warships to escort commercial vessels through the danger zone.",
    category: "military",
    severity: "medium",
    source: "Euronews",
    sourceUrl: "https://www.euronews.com",
    relatedCountries: ["FR", "DE", "IT", "GR"],
  },
  {
    id: "evt-010",
    date: "2024-04-01",
    title: "Israel Strikes Iranian Consulate in Damascus",
    description:
      "Israeli airstrikes destroy the Iranian consulate building in Damascus, Syria, killing seven IRGC officers including Brigadier General Mohammad Reza Zahedi, a senior Quds Force commander. Iran vows severe retaliation. The strike marks a major escalation in the shadow war between Israel and Iran, setting the stage for direct confrontation.",
    category: "military",
    severity: "critical",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com/world/middle-east/israeli-strikes-hit-irans-damascus-consulate-2024-04-01/",
    relatedCountries: ["IL", "IR", "SY"],
  },
  {
    id: "evt-011",
    date: "2024-04-13",
    title: "IRGC Seizes Container Ship MSC Aries Near Strait of Hormuz",
    description:
      "IRGC Navy commandos use a helicopter to board and seize the Portuguese-flagged container ship MSC Aries while transiting the Strait of Hormuz in international waters near the UAE coast. The vessel, linked to Israeli businessman Eyal Ofer through Zodiac Maritime, carried 25 crew members. Iran cited Israeli links as justification. Crew released in May; vessel remained impounded.",
    category: "incident",
    severity: "critical",
    source: "BBC News",
    sourceUrl: "https://www.bbc.com/news/world-middle-east-68806610",
    relatedCountries: ["IR", "PT", "IL", "AE"],
  },
  {
    id: "evt-012",
    date: "2024-04-14",
    title: "Iran Launches Unprecedented Drone and Missile Attack on Israel",
    description:
      "Iran launches Operation True Promise, firing over 300 drones, cruise missiles, and ballistic missiles at Israel in retaliation for the Damascus consulate strike. Most projectiles are intercepted by Israeli, U.S., UK, Jordanian, and Saudi air defenses in a coordinated multinational effort. Minor damage reported at Nevatim Air Base. Oil prices jump 4% on the escalation.",
    category: "military",
    severity: "critical",
    source: "The Guardian",
    sourceUrl: "https://www.theguardian.com/world/2024/apr/14/iran-launches-drones-at-israel-latest-updates",
    relatedCountries: ["IR", "IL", "US", "JO"],
  },
  {
    id: "evt-013",
    date: "2024-08-21",
    title: "Houthis Attack Greek Tanker MV Sounion — Major Environmental Threat",
    description:
      "The Greek-flagged oil tanker MV Sounion is attacked multiple times by Houthi forces in the Red Sea. Militants later board the vessel and detonate explosives, causing a prolonged fire. The ship, carrying approximately 150,000 tonnes of crude oil, poses a massive environmental threat. Emergency salvage operations are launched to prevent a catastrophic oil spill.",
    category: "incident",
    severity: "critical",
    source: "Maritime Executive",
    sourceUrl: "https://www.maritime-executive.com",
    relatedCountries: ["GR", "YE"],
  },
  {
    id: "evt-014",
    date: "2024-10-16",
    title: "U.S. Deploys B-2 Bombers Against Houthi Underground Facilities",
    description:
      "The United States conducts precision airstrikes using B-2 Spirit stealth bombers against five hardened underground Houthi weapons storage facilities in Yemen. The unprecedented deployment of strategic bombers signals a significant escalation in the U.S. response and demonstrates the capability to strike deeply buried targets that conventional aircraft cannot reach.",
    category: "military",
    severity: "high",
    source: "U.S. Central Command",
    sourceUrl: "https://www.centcom.mil",
    relatedCountries: ["US", "YE"],
  },

  // ── 2025: Pre-War Tensions ──────────────────────────────────────────
  {
    id: "evt-015",
    date: "2025-01-20",
    title: "Trump Returns to Office — Iran Sanctions Tightened",
    description:
      "President Donald Trump is inaugurated for a second term and immediately signals a return to 'maximum pressure' on Iran. New executive orders expand sanctions targeting Iranian oil exports, shipping networks, and financial institutions. Iran warns of consequences if economic pressure intensifies, citing the Strait of Hormuz as leverage.",
    category: "diplomatic",
    severity: "high",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com/world/us/",
    relatedCountries: ["US", "IR"],
  },
  {
    id: "evt-016",
    date: "2025-06-15",
    title: "IAEA Reports Iran Enriching Uranium Near Weapons Grade",
    description:
      "The International Atomic Energy Agency reports that Iran has accumulated significant quantities of uranium enriched to 60% purity, a short technical step from weapons-grade 90%. The report intensifies international alarm about Iran's nuclear breakout capability and fuels speculation about potential military action to prevent weaponization.",
    category: "diplomatic",
    severity: "critical",
    source: "IAEA",
    sourceUrl: "https://www.iaea.org",
    relatedCountries: ["IR"],
  },
  {
    id: "evt-017",
    date: "2025-11-15",
    title: "IRGC Seizes Tanker Talara in Strait of Hormuz",
    description:
      "The Marshall Islands-flagged tanker Talara is seized by IRGC Navy forces in the Strait of Hormuz. Iran alleges the vessel was carrying unauthorized cargo. The ship and crew are held for five days before being released following diplomatic pressure. The incident underscores continuing Iranian willingness to use maritime coercion.",
    category: "incident",
    severity: "high",
    source: "Newsweek",
    sourceUrl: "https://www.newsweek.com",
    relatedCountries: ["IR", "MH"],
  },
  {
    id: "evt-018",
    date: "2025-12-10",
    title: "Iran Seizes Foreign Tanker Near Qeshm Island",
    description:
      "Iranian state media reports the IRGC has seized an unnamed foreign tanker near Qeshm Island in the Strait of Hormuz, alleging it was smuggling 4 million liters (~25,000 barrels) of fuel. The seizure is part of a pattern of tit-for-tat maritime actions in the region. War risk insurance premiums for Hormuz transit reach their highest level since 2019.",
    category: "incident",
    severity: "high",
    source: "CBS News",
    sourceUrl: "https://www.cbsnews.com",
    relatedCountries: ["IR"],
  },

  // ── 2026: The Hormuz Crisis ─────────────────────────────────────────
  {
    id: "evt-019",
    date: "2026-02-28",
    title: "U.S. & Israel Launch Operation Epic Fury Against Iran",
    description:
      "The United States and Israel launch coordinated, large-scale airstrikes on Iran designated 'Operation Epic Fury.' Strikes target Iranian nuclear facilities, ballistic missile programs, air defenses, and military leadership. Iranian Supreme Leader Ali Khamenei is killed in Tehran. His son Mojtaba Khamenei is subsequently named successor. The operation marks the beginning of open war.",
    category: "military",
    severity: "critical",
    source: "Britannica",
    sourceUrl: "https://www.britannica.com",
    relatedCountries: ["US", "IL", "IR"],
  },
  {
    id: "evt-020",
    date: "2026-02-28",
    title: "Iran Launches Retaliatory Strikes Across Middle East",
    description:
      "Hours after Operation Epic Fury, Iran launches massive retaliatory missile and drone barrages targeting Israel, U.S. military bases in Iraq, Qatar, and Bahrain, and allied Gulf states. Hezbollah opens a full northern front against Israel from Lebanon. IRGC issues warnings forbidding passage through the Strait of Hormuz for ships linked to the U.S., Israel, and allies.",
    category: "military",
    severity: "critical",
    source: "Al Jazeera",
    sourceUrl: "https://www.aljazeera.com",
    relatedCountries: ["IR", "IL", "US", "IQ", "LB"],
  },
  {
    id: "evt-021",
    date: "2026-03-02",
    title: "Iran Begins Laying Naval Mines in Strait of Hormuz",
    description:
      "Intelligence reports and maritime security advisories confirm that Iran's IRGC Navy has begun deploying sea mines across shipping lanes in the Strait of Hormuz. Multiple maritime safety organizations issue emergency warnings. Commercial shipping traffic plummets as operators suspend transits. Global oil prices surge past $100/barrel for the first time since 2022.",
    category: "military",
    severity: "critical",
    source: "Windward Maritime Intelligence",
    sourceUrl: "https://www.windward.ai",
    relatedCountries: ["IR"],
  },
  {
    id: "evt-022",
    date: "2026-03-05",
    title: "Major Shipping Lines Suspend Strait of Hormuz Transits",
    description:
      "Maersk, MSC, CMA CGM, and other major container lines and tanker operators announce suspension of all vessel transits through the Strait of Hormuz citing mine threat and active hostilities. Vessels diverted around the Cape of Good Hope, adding 10-14 days to voyages. Shipping rates spike 200-300% as available capacity shrinks dramatically.",
    category: "economic",
    severity: "critical",
    source: "The Loadstar",
    sourceUrl: "https://theloadstar.com",
    relatedCountries: ["DK", "CH", "FR"],
  },
  {
    id: "evt-023",
    date: "2026-03-08",
    title: "Oil Prices Surge Past $115/Barrel as Strait Closes",
    description:
      "Brent crude reaches $115/barrel as the Strait of Hormuz is effectively closed to unescorted commercial traffic. Approximately 20% of global oil supply and 25% of LNG trade normally transits the strait. OPEC+ calls emergency meeting. Global stock markets tumble with energy-heavy indices down 8-12%. Analysts warn of the worst energy crisis since the 1970s.",
    category: "economic",
    severity: "critical",
    source: "Bloomberg",
    sourceUrl: "https://www.bloomberg.com",
    relatedCountries: ["US", "GB", "JP", "SA"],
  },
  {
    id: "evt-024",
    date: "2026-03-11",
    title: "IRGC Attacks Thai Cargo Ship Mayuree Naree — 3 Crew Killed",
    description:
      "The Thai-flagged bulk carrier Mayuree Naree is struck by two IRGC projectiles while transiting the Strait of Hormuz after departing the UAE. The engine room is hit, causing a major fire. Of the 23 crew, 20 evacuate via lifeboats and are rescued by Oman's Royal Navy and brought to Khasab. Three crew members — a mechanic and two engineers — are killed. The vessel drifts and runs aground on Iran's Qeshm Island.",
    category: "incident",
    severity: "critical",
    source: "Seatrade Maritime",
    sourceUrl: "https://www.seatrade-maritime.com",
    relatedCountries: ["TH", "IR", "AE", "OM"],
  },
  {
    id: "evt-025",
    date: "2026-03-14",
    title: "UN Security Council Emergency Session on Hormuz Crisis",
    description:
      "The United Nations Security Council convenes an emergency session on the Strait of Hormuz crisis. A draft resolution demanding freedom of navigation and cessation of mine-laying is vetoed by Russia and China. The UN Secretary-General calls the situation 'the gravest threat to global energy security in decades.' Humanitarian concerns mount over disrupted food and fuel supplies to Gulf states.",
    category: "diplomatic",
    severity: "high",
    source: "UN News",
    sourceUrl: "https://news.un.org",
    relatedCountries: ["US", "IR", "RU", "CN"],
  },
  {
    id: "evt-026",
    date: "2026-03-18",
    title: "IEA Coordinates Largest-Ever Emergency Oil Reserve Release",
    description:
      "The International Energy Agency coordinates a release of 60 million barrels from strategic petroleum reserves across 28 member countries — the largest coordinated release in the IEA's history. Japan and South Korea activate their own strategic reserves as Hormuz disruption threatens 89% of Japan's oil imports. The release temporarily stabilizes prices around $110/barrel.",
    category: "economic",
    severity: "high",
    source: "IEA",
    sourceUrl: "https://www.iea.org",
    relatedCountries: ["US", "JP", "DE", "FR", "GB", "KR"],
  },
  {
    id: "evt-027",
    date: "2026-03-22",
    title: "U.S. Navy Begins Mine-Clearing and Convoy Escort Operations",
    description:
      "The U.S. 5th Fleet begins minesweeping operations in the Strait of Hormuz and initiates escorted convoy operations for commercial vessels. India deploys frigates and a destroyer under 'Operation Sankalp 2.0' to escort Indian-flagged tankers. The UK, France, and Australia contribute additional warships. First multinational convoy of 8 tankers transits successfully.",
    category: "military",
    severity: "high",
    source: "Stars and Stripes",
    sourceUrl: "https://www.stripes.com",
    relatedCountries: ["US", "IN", "GB", "FR", "AU"],
  },
  {
    id: "evt-028",
    date: "2026-03-28",
    title: "OPEC+ Emergency Meeting — Saudi Arabia Maximizes Alternative Routes",
    description:
      "OPEC+ holds emergency meeting in Vienna. Saudi Arabia and UAE pledge to maximize oil exports via alternative pipelines to Red Sea ports (Yanbu) and the Fujairah terminal, bypassing the strait. However, pipeline capacity covers only a fraction of normal Hormuz volume. No production cuts agreed. Oil prices remain above $120/barrel.",
    category: "economic",
    severity: "high",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com/business/energy/",
    relatedCountries: ["SA", "AE", "RU"],
  },
  {
    id: "evt-029",
    date: "2026-04-01",
    title: "China Offers to Mediate — Hosts Back-Channel Talks",
    description:
      "Chinese Foreign Ministry announces willingness to host direct negotiations between Iran and Western powers. Beijing is deeply concerned about disruption to Chinese oil imports, which rely heavily on Gulf suppliers. Separately, Oman and Pakistan emerge as mediators in back-channel diplomacy. Reports surface of a potential 'cooling off' framework being discussed.",
    category: "diplomatic",
    severity: "medium",
    source: "South China Morning Post",
    sourceUrl: "https://www.scmp.com",
    relatedCountries: ["CN", "IR", "US", "OM", "PK"],
  },
  {
    id: "evt-030",
    date: "2026-04-08",
    title: "Pakistan Brokers Two-Week Ceasefire Between U.S. and Iran",
    description:
      "After approximately 40 days of conflict, Pakistan brokers a fragile two-week ceasefire between the United States and Iran. The agreement includes limited provisions for humanitarian shipping through the strait and preliminary discussions on de-escalation. Both sides retain military postures. Oil prices dip slightly on the news but remain elevated above $105/barrel.",
    category: "deescalation",
    severity: "high",
    source: "Council on Foreign Relations",
    sourceUrl: "https://www.cfr.org",
    relatedCountries: ["PK", "US", "IR"],
  },
  {
    id: "evt-031",
    date: "2026-04-11",
    title: "Islamabad Peace Talks Collapse — No Breakthrough",
    description:
      "Peace negotiations hosted in Islamabad between U.S. and Iranian delegations collapse without agreement. Core disputes remain unresolved: the reopening of the Strait of Hormuz, the status of Iran's nuclear program, and reparations for war damage. Both sides blame each other for the failure. Markets react negatively with oil futures jumping 6%.",
    category: "diplomatic",
    severity: "critical",
    source: "CBS News",
    sourceUrl: "https://www.cbsnews.com",
    relatedCountries: ["PK", "US", "IR"],
  },
  {
    id: "evt-032",
    date: "2026-04-13",
    title: "U.S. Imposes Naval Blockade on Iranian Ports",
    description:
      "Following the collapse of peace talks, President Trump announces a targeted U.S. naval blockade of all Iranian ports and coastal areas, effective 10:00 AM EDT. CENTCOM states the blockade applies to maritime traffic entering or exiting Iranian ports but will not impede freedom of navigation for vessels transiting the strait to non-Iranian destinations. Oil prices surge to $100+ Brent, with physical market prices reported near $150/barrel.",
    category: "military",
    severity: "critical",
    source: "gCaptain",
    sourceUrl: "https://gcaptain.com",
    relatedCountries: ["US", "IR"],
  },
  {
    id: "evt-033",
    date: "2026-04-13",
    title: "Iran Warns: 'No Port in Persian Gulf Will Be Safe'",
    description:
      "Iran's foreign ministry issues a stark warning that if the security of its own ports is threatened by the U.S. blockade, 'no port in the Persian Gulf or Gulf of Oman will be safe.' The IRGC reiterates its control over maritime approaches. Shipping companies report that commercial traffic through the Strait has slowed to a near-standstill, with vessels reversing course or anchoring outside the zone.",
    category: "military",
    severity: "critical",
    source: "CBS News",
    sourceUrl: "https://www.cbsnews.com",
    relatedCountries: ["IR", "US"],
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
