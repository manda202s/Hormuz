import { NextResponse } from "next/server";
import { getShipsInStrait } from "@/lib/api/marinetraffic";
import { getOilPrices } from "@/lib/api/alphaVantage";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  try {
    const [ships, oilPrices] = await Promise.all([
      getShipsInStrait(),
      getOilPrices(),
    ]);

    const shipsInTransit = ships.filter((s) => s.speed > 3).length;
    const strandedVessels = ships.filter((s) => s.speed <= 1).length;
    const oilTankers = ships.filter((s) => s.type === "oil_tanker").length;
    const lngCarriers = ships.filter((s) => s.type === "lng_carrier").length;

    // Determine status based on transit count
    let status: "critical" | "warning" | "normal" = "normal";
    let statusLabel = "OPEN";
    if (shipsInTransit < 20) {
      status = "critical";
      statusLabel = "RESTRICTED";
    } else if (shipsInTransit < 40) {
      status = "warning";
      statusLabel = "ELEVATED RISK";
    }

    const metrics = {
      status,
      statusLabel,
      shipsInStrait: ships.length,
      shipsInTransit,
      strandedVessels,
      oilTankers,
      lngCarriers,
      normalTransitCount: 72,
      capacityPercent: Math.round((shipsInTransit / 72) * 100),
      brentPrice: oilPrices.brent.price,
      brentChange: oilPrices.brent.changePercent,
      wtiPrice: oilPrices.wti.price,
      wtiChange: oilPrices.wti.changePercent,
      insurancePremiumMultiplier: 16.2,
      dailyEconomicCost: 4_200_000_000,
      oilSupplyAtRisk: 21,
      lngTradeAffected: 25,
      shipsRerouted: 89,
      extraTransitDays: 14,
      shippingCostIncrease: 180,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Metrics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
