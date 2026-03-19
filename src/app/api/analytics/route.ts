import { NextResponse } from "next/server";
import { readDb } from "@/lib/server-db";

export async function GET() {
  const db = await readDb();

  return NextResponse.json({
    performanceSeries: db.performanceSeries,
    bestPostingWindows: db.bestPostingWindows,
    competitorInsights: db.competitorInsights,
  });
}
