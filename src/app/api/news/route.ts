import { NextResponse } from "next/server";
import { aggregateNews } from "@/lib/api/newsParser";

export const dynamic = "force-dynamic";
export const revalidate = 900;

export async function GET() {
  try {
    const articles = await aggregateNews();
    return NextResponse.json({
      articles,
      count: articles.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
