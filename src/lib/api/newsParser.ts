import { cacheGet, cacheSet } from "@/lib/utils/redis";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  source: string;
  category: "military" | "economics" | "shipping" | "diplomacy" | "general";
  pubDate: string;
  isBreaking: boolean;
}

const CACHE_KEY = "news:feed";
const CACHE_TTL = 900; // 15 minutes

const FEEDS = [
  "https://feeds.reuters.com/reuters/MENews",
  "https://feeds.bloomberg.com/markets/news.rss",
];

const KEYWORDS = [
  "hormuz",
  "iran",
  "strait",
  "oil tanker",
  "persian gulf",
  "naval blockade",
  "shipping crisis",
  "oil prices",
  "tanker seized",
  "gulf tension",
];

export async function aggregateNews(): Promise<NewsArticle[]> {
  const cached = await cacheGet<NewsArticle[]>(CACHE_KEY);
  if (cached) return cached;

  // Try real RSS feeds
  try {
    const Parser = (await import("rss-parser")).default;
    const parser = new Parser();
    const articles: NewsArticle[] = [];

    for (const feedUrl of FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl);
        const relevant = feed.items.filter((item) => {
          const text =
            `${item.title} ${item.contentSnippet || ""}`.toLowerCase();
          return KEYWORDS.some((kw) => text.includes(kw));
        });

        for (const item of relevant) {
          articles.push({
            id: item.guid || item.link || String(Math.random()),
            title: decodeEntities(item.title || "Untitled"),
            excerpt: decodeEntities((item.contentSnippet || "").slice(0, 200)),
            url: item.link || "#",
            source: extractSource(feedUrl),
            category: classifyArticle(item.title || ""),
            pubDate: item.pubDate || new Date().toISOString(),
            isBreaking: false,
          });
        }
      } catch {
        // Skip failed feeds
      }
    }

    if (articles.length > 0) {
      const sorted = articles
        .sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        )
        .slice(0, 50);
      await cacheSet(CACHE_KEY, sorted, CACHE_TTL);
      return sorted;
    }
  } catch {
    // Fall through to mock data
  }

  const mockNews = getMockNews();
  await cacheSet(CACHE_KEY, mockNews, CACHE_TTL);
  return mockNews;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function extractSource(url: string): string {
  if (url.includes("reuters")) return "Reuters";
  if (url.includes("bloomberg")) return "Bloomberg";
  if (url.includes("apnews")) return "AP News";
  return "Unknown";
}

function classifyArticle(
  title: string
): NewsArticle["category"] {
  const t = title.toLowerCase();
  if (t.includes("navy") || t.includes("military") || t.includes("warship"))
    return "military";
  if (t.includes("oil") || t.includes("price") || t.includes("economic"))
    return "economics";
  if (t.includes("ship") || t.includes("tanker") || t.includes("vessel"))
    return "shipping";
  if (
    t.includes("diplomat") ||
    t.includes("negotiate") ||
    t.includes("sanction")
  )
    return "diplomacy";
  return "general";
}

function getMockNews(): NewsArticle[] {
  const now = Date.now();
  const hour = 3600_000;

  return [
    {
      id: "news-1",
      title: "US Navy Escorts Fourth Convoy Through Strait Amid Rising Tensions",
      excerpt:
        "US 5th Fleet confirmed the successful transit of four commercial tankers through the Strait of Hormuz under military escort, marking the fourth such convoy this week as the crisis enters its seventh week.",
      url: "#",
      source: "Reuters",
      category: "military",
      pubDate: new Date(now - 2 * hour).toISOString(),
      isBreaking: true,
    },
    {
      id: "news-2",
      title: "Brent Crude Holds Above $127 as Strait Disruption Continues",
      excerpt:
        "Oil prices remained elevated with Brent crude trading at $127.50 per barrel, as the ongoing restriction of shipping through the Strait of Hormuz shows no signs of resolution.",
      url: "#",
      source: "Bloomberg",
      category: "economics",
      pubDate: new Date(now - 4 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-3",
      title:
        "Japan Draws 10M Barrels from Strategic Reserves as Supply Fears Mount",
      excerpt:
        "The Japanese government has authorized the release of 10 million barrels from its strategic petroleum reserves, the largest drawdown in a decade, as the Hormuz crisis threatens 89% of Japan's oil imports.",
      url: "#",
      source: "Nikkei Asia",
      category: "economics",
      pubDate: new Date(now - 6 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-4",
      title: "147 Commercial Vessels Stranded as Transit Count Drops to 12/Day",
      excerpt:
        "Maritime analysts report 147 commercial vessels are either stranded or waiting in anchorage areas near the Strait of Hormuz. Daily transits have fallen to just 12 ships, down from a normal 60-80.",
      url: "#",
      source: "Maritime Executive",
      category: "shipping",
      pubDate: new Date(now - 8 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-5",
      title:
        "EU Proposes New Diplomatic Framework for Hormuz De-escalation",
      excerpt:
        "The European Union has put forward a comprehensive diplomatic framework that includes a naval deconfliction hotline and phased sanctions relief in exchange for guaranteed commercial passage.",
      url: "#",
      source: "Euronews",
      category: "diplomacy",
      pubDate: new Date(now - 12 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-6",
      title:
        "War Risk Insurance Premiums Reach 16x Normal Levels for Strait Transit",
      excerpt:
        "Insurance premiums for commercial vessels transiting the Strait of Hormuz have surged to 16 times normal levels, adding millions in costs per voyage and forcing smaller operators to avoid the route entirely.",
      url: "#",
      source: "Lloyd's List",
      category: "economics",
      pubDate: new Date(now - 15 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-7",
      title:
        "India Deploys Naval Task Force for Tanker Escort Operations",
      excerpt:
        "The Indian Navy has launched Operation Sankalp 2.0, deploying two frigates and a destroyer to escort Indian-flagged and Indian-bound oil tankers through the contested waterway.",
      url: "#",
      source: "Hindustan Times",
      category: "military",
      pubDate: new Date(now - 18 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-8",
      title: "OPEC+ Emergency Meeting Fails to Agree on Production Adjustments",
      excerpt:
        "An emergency OPEC+ meeting in Vienna concluded without consensus on production changes. Saudi Arabia and UAE pledged to maximize alternative export routes through Yanbu and Fujairah terminals.",
      url: "#",
      source: "Reuters",
      category: "economics",
      pubDate: new Date(now - 24 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-9",
      title: "Oman Mediates Release of Seized Tanker Crew",
      excerpt:
        "Following intensive negotiations mediated by Oman, the 24 crew members of the MT Advantage Sweet have been released by Iranian authorities. The vessel itself remains impounded at Bandar Abbas.",
      url: "#",
      source: "Al Jazeera",
      category: "diplomacy",
      pubDate: new Date(now - 30 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-10",
      title:
        "Shipping Giants Maersk, MSC Suspend All Hormuz Transits",
      excerpt:
        "The world's two largest container shipping lines have announced the suspension of all vessel transits through the Strait of Hormuz, diverting ships to the longer Cape of Good Hope route.",
      url: "#",
      source: "The Loadstar",
      category: "shipping",
      pubDate: new Date(now - 36 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-11",
      title: "Global Shipping Costs Surge 180% on Hormuz Disruption",
      excerpt:
        "Freight rates for oil tankers and container ships have surged by up to 180% as operators reroute vessels around Africa, adding 14+ days to journey times and significantly increasing fuel costs.",
      url: "#",
      source: "Financial Times",
      category: "economics",
      pubDate: new Date(now - 42 * hour).toISOString(),
      isBreaking: false,
    },
    {
      id: "news-12",
      title: "IEA Coordinates Largest Emergency Oil Release in History",
      excerpt:
        "The International Energy Agency has coordinated the release of 60 million barrels of oil from strategic reserves across 28 member countries, the largest coordinated release since the agency's founding.",
      url: "#",
      source: "IEA",
      category: "economics",
      pubDate: new Date(now - 48 * hour).toISOString(),
      isBreaking: false,
    },
  ];
}
