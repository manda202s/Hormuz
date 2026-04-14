import { NextResponse } from "next/server";
import { getOilPrices } from "@/lib/api/alphaVantage";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getOilPrices();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Oil prices API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch oil price data" },
      { status: 500 }
    );
  }
}
