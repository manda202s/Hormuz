import { NextResponse } from "next/server";
import { getShipsInStrait } from "@/lib/api/marinetraffic";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    const ships = await getShipsInStrait();
    return NextResponse.json({
      ships,
      count: ships.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Ships API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ship data" },
      { status: 500 }
    );
  }
}
