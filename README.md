# Strait of Hormuz Live Monitor

Real-time monitoring dashboard for the Strait of Hormuz shipping crisis with live ship tracking, oil price charts, news automation, and global impact analysis.

## 🚀 Features

- **Live Ship Map** — Interactive Leaflet map with 40+ vessel markers, dark CARTO tiles, route overlays
- **Dashboard** — Ship transit metrics, oil price charts, insurance trends, trade disruption stats
- **Countries Impact** — Sortable table of 15+ countries with dependency data and detailed profiles
- **Crisis Timeline** — 25 documented events with category filters, search, and JSON export
- **News Feed** — Auto-aggregated from Reuters & Bloomberg RSS (60s refresh)
- **About** — Data sources, methodology, disclaimer

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Maps:** React Leaflet + CartoDB Dark tiles
- **Charts:** Recharts 3
- **Animation:** Framer Motion
- **Data:** TanStack Query v5 (auto-refetch, caching)
- **Caching:** Upstash Redis (with in-memory fallback)
- **Icons:** Lucide React

## 📦 Setup

```bash
# Clone and install
cd hormuz
npm install

# Copy env template
cp .env.example .env.local
# Edit .env.local with your API keys (optional - mock data works without keys)

# Run dev server
npm run dev
```

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MARINETRAFFIC_API_KEY` | No | Ship tracking data (falls back to mock) |
| `ALPHA_VANTAGE_API_KEY` | No | Oil prices (falls back to mock) |
| `UPSTASH_REDIS_REST_URL` | No | Redis caching (falls back to in-memory) |
| `UPSTASH_REDIS_REST_TOKEN` | No | Redis auth token |
| `NEXT_PUBLIC_BASE_URL` | No | Canonical URL for SEO |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage (hero map + metrics)
│   ├── live-map/page.tsx     # Full-screen ship tracking
│   ├── dashboard/page.tsx    # Detailed metrics & charts
│   ├── countries-impact/     # Country dependency analysis
│   ├── timeline/page.tsx     # Crisis event timeline
│   ├── news/page.tsx         # Auto-updated news feed
│   ├── about/page.tsx        # About & methodology
│   ├── api/                  # API routes (ships, oil, news, metrics)
│   ├── sitemap.ts            # Dynamic XML sitemap
│   └── robots.ts             # Robots.txt
├── components/
│   ├── Navigation.tsx        # Sticky nav with status badge
│   ├── Footer.tsx
│   ├── maps/LiveMap.tsx      # React Leaflet map
│   ├── dashboard/            # MetricCard, LiveChart, StatusIndicator
│   ├── news/NewsCard.tsx
│   └── timeline/EventCard.tsx
└── lib/
    ├── api/                  # Data clients with mock fallbacks
    ├── constants/            # Countries, routes, timeline data
    └── utils/                # Redis, formatters, cn
```

## 🚢 Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

Vercel cron jobs configured in `vercel.json`:
- Ship data: Every 5 minutes
- News: Every 15 minutes

## 📊 Data Sources

- **Ship positions:** MarineTraffic API (AIS data)
- **Oil prices:** Alpha Vantage
- **News:** Reuters & Bloomberg RSS feeds
- **Country data:** IEA / EIA statistics
- **Timeline:** Manually curated events

## 📝 License

For informational purposes only. Not financial advice.
