import { NextResponse } from "next/server";
import { getDashboardMetrics, readDb } from "@/lib/server-db";

export async function GET() {
  const db = await readDb();

  return NextResponse.json({
    metrics: getDashboardMetrics(db),
    recentActivity: db.recentActivity,
    performanceSeries: db.performanceSeries,
    onboardingTasks: db.onboardingTasks,
    notifications: db.notifications,
  });
}
