import { cacheGet, cacheSet } from "@/lib/utils/redis";

export interface OilPriceData {
  brent: {
    price: number;
    change: number;
    changePercent: number;
    history: { date: string; price: number }[];
  };
  wti: {
    price: number;
    change: number;
    changePercent: number;
    history: { date: string; price: number }[];
  };
  timestamp: number;
}

const CACHE_KEY = "oil:prices";
const CACHE_TTL = 3600; // 1 hour

export async function getOilPrices(): Promise<OilPriceData> {
  const cached = await cacheGet<OilPriceData>(CACHE_KEY);
  if (cached) return cached;

  // Primary: Yahoo Finance (real-time, free, no API key)
  try {
    const data = await fetchFromYahooFinance();
    if (data) {
      await cacheSet(CACHE_KEY, data, CACHE_TTL);
      return data;
    }
  } catch (error) {
    console.error("Yahoo Finance error:", error);
  }

  // Fallback: Alpha Vantage (delayed ~2 weeks on free tier)
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (apiKey) {
    try {
      const data = await fetchFromAlphaVantage(apiKey);
      if (data) {
        await cacheSet(CACHE_KEY, data, CACHE_TTL);
        return data;
      }
    } catch (error) {
      console.error("Alpha Vantage API error:", error);
    }
  }

  // Last resort: mock data
  const mockData = getMockOilPrices();
  await cacheSet(CACHE_KEY, mockData, CACHE_TTL);
  return mockData;
}

// ─── Yahoo Finance (real-time) ───────────────────────────────────────────

interface YahooChartResponse {
  chart: {
    result: Array<{
      meta: {
        regularMarketPrice: number;
        chartPreviousClose?: number;
      };
      timestamp: number[];
      indicators: {
        quote: Array<{
          close: (number | null)[];
        }>;
      };
    }>;
    error: null | { code: string; description: string };
  };
}

async function fetchFromYahooFinance(): Promise<OilPriceData | null> {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  };

  const [brentRes, wtiRes] = await Promise.all([
    fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1d&range=1mo",
      { headers }
    ),
    fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/CL=F?interval=1d&range=1mo",
      { headers }
    ),
  ]);

  if (!brentRes.ok || !wtiRes.ok) return null;

  const brentData: YahooChartResponse = await brentRes.json();
  const wtiData: YahooChartResponse = await wtiRes.json();

  if (brentData.chart.error || wtiData.chart.error) return null;

  const brentResult = brentData.chart.result?.[0];
  const wtiResult = wtiData.chart.result?.[0];
  if (!brentResult || !wtiResult) return null;

  const brentPrice = brentResult.meta.regularMarketPrice;
  const wtiPrice = wtiResult.meta.regularMarketPrice;

  const brentHistory = parseYahooHistory(brentResult);
  const wtiHistory = parseYahooHistory(wtiResult);

  const brentPrev =
    brentResult.meta.chartPreviousClose ||
    brentHistory[brentHistory.length - 2]?.price ||
    brentPrice;
  const wtiPrev =
    wtiResult.meta.chartPreviousClose ||
    wtiHistory[wtiHistory.length - 2]?.price ||
    wtiPrice;

  return {
    brent: {
      price: brentPrice,
      change: Math.round((brentPrice - brentPrev) * 100) / 100,
      changePercent:
        Math.round(((brentPrice - brentPrev) / brentPrev) * 10000) / 100,
      history: brentHistory,
    },
    wti: {
      price: wtiPrice,
      change: Math.round((wtiPrice - wtiPrev) * 100) / 100,
      changePercent:
        Math.round(((wtiPrice - wtiPrev) / wtiPrev) * 10000) / 100,
      history: wtiHistory,
    },
    timestamp: Date.now(),
  };
}

function parseYahooHistory(
  result: YahooChartResponse["chart"]["result"][0]
): { date: string; price: number }[] {
  const timestamps = result.timestamp || [];
  const closes = result.indicators.quote[0]?.close || [];
  const history: { date: string; price: number }[] = [];

  for (let i = 0; i < timestamps.length; i++) {
    const close = closes[i];
    if (close !== null && close !== undefined) {
      const date = new Date(timestamps[i] * 1000).toISOString().split("T")[0];
      history.push({ date, price: Math.round(close * 100) / 100 });
    }
  }
  return history;
}

// ─── Alpha Vantage (fallback, delayed ~2 weeks on free tier) ─────────────

async function fetchFromAlphaVantage(
  apiKey: string
): Promise<OilPriceData | null> {
  // Sequential calls to avoid free-tier rate limiting
  const brentRes = await fetch(
    `https://www.alphavantage.co/query?function=BRENT&interval=daily&apikey=${apiKey}`
  );
  const wtiRes = await fetch(
    `https://www.alphavantage.co/query?function=WTI&interval=daily&apikey=${apiKey}`
  );

  if (!brentRes.ok || !wtiRes.ok) return null;

  const brentRaw: { data?: { date: string; value: string }[] } =
    await brentRes.json();
  const wtiRaw: { data?: { date: string; value: string }[] } =
    await wtiRes.json();

  if (!brentRaw.data || !wtiRaw.data) return null;

  const brentHistory = brentRaw.data.slice(0, 30).map((d) => ({
    date: d.date,
    price: Number(d.value),
  }));

  const wtiHistory = wtiRaw.data.slice(0, 30).map((d) => ({
    date: d.date,
    price: Number(d.value),
  }));

  const brentCurrent = brentHistory[0]?.price || 0;
  const brentPrev = brentHistory[1]?.price || brentCurrent;
  const wtiCurrent = wtiHistory[0]?.price || 0;
  const wtiPrev = wtiHistory[1]?.price || wtiCurrent;

  return {
    brent: {
      price: brentCurrent,
      change: Math.round((brentCurrent - brentPrev) * 100) / 100,
      changePercent:
        Math.round(((brentCurrent - brentPrev) / brentPrev) * 10000) / 100,
      history: brentHistory.reverse(),
    },
    wti: {
      price: wtiCurrent,
      change: Math.round((wtiCurrent - wtiPrev) * 100) / 100,
      changePercent:
        Math.round(((wtiCurrent - wtiPrev) / wtiPrev) * 10000) / 100,
      history: wtiHistory.reverse(),
    },
    timestamp: Date.now(),
  };
}

// ─── Mock data (last resort) ─────────────────────────────────────────────

function getMockOilPrices(): OilPriceData {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const brentHistory: { date: string; price: number }[] = [];
  const wtiHistory: { date: string; price: number }[] = [];

  const brentBase = [
    78, 79, 81, 83, 85, 88, 92, 95, 98, 101, 104, 107, 109, 111, 113, 115,
    116, 118, 119, 120, 121, 122, 123, 124, 125, 125, 126, 127, 127, 127.5,
  ];

  const wtiBase = [
    74, 75, 77, 79, 81, 84, 87, 90, 93, 96, 99, 102, 104, 106, 108, 110, 111,
    113, 114, 115, 116, 117, 118, 119, 120, 120, 121, 122, 122, 122.8,
  ];

  for (let i = 0; i < 30; i++) {
    const date = new Date(now - (29 - i) * day).toISOString().split("T")[0];
    const noise = (Math.random() - 0.5) * 2;
    brentHistory.push({ date, price: brentBase[i] + noise });
    wtiHistory.push({ date, price: wtiBase[i] + noise });
  }

  const brentCurrent = brentHistory[29].price;
  const brentPrev = brentHistory[28].price;
  const wtiCurrent = wtiHistory[29].price;
  const wtiPrev = wtiHistory[28].price;

  return {
    brent: {
      price: Math.round(brentCurrent * 100) / 100,
      change: Math.round((brentCurrent - brentPrev) * 100) / 100,
      changePercent:
        Math.round(((brentCurrent - brentPrev) / brentPrev) * 10000) / 100,
      history: brentHistory,
    },
    wti: {
      price: Math.round(wtiCurrent * 100) / 100,
      change: Math.round((wtiCurrent - wtiPrev) * 100) / 100,
      changePercent:
        Math.round(((wtiCurrent - wtiPrev) / wtiPrev) * 10000) / 100,
      history: wtiHistory,
    },
    timestamp: Date.now(),
  };
}
