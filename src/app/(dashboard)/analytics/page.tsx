"use client";

import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { CompetitorInsight, PerformancePoint, PostingWindow } from "@/lib/types";

export default function AnalyticsPage() {
  const { data, loading } = useApiResource<{
    performanceSeries: PerformancePoint[];
    bestPostingWindows: PostingWindow[];
    competitorInsights: CompetitorInsight[];
  }>("/api/analytics", {
    performanceSeries: [],
    bestPostingWindows: [],
    competitorInsights: [],
  });

  if (loading) {
    return <LoadingCard label="Loading analytics..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Analytics"
        description="Review engagement, post timing, audience response, and competitor signals from one reporting view."
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Performance trend</h2>
              <p className="mt-1 text-sm text-slate-500">
                Engagement and reach across the last seven days.
              </p>
            </div>
            <div className="text-sm text-slate-400">Mock chart</div>
          </div>
          <div className="mt-8 grid grid-cols-7 gap-3">
            {data.performanceSeries.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <div className="flex h-56 items-end gap-1">
                  <div
                    className="w-4 rounded-full bg-primary-200"
                    style={{ height: `${item.reach}%` }}
                  />
                  <div
                    className="w-4 rounded-full bg-primary-600"
                    style={{ height: `${item.engagement}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-950">Best time to post</h2>
          {data.bestPostingWindows.map((item) => (
            <div key={item.day} className="rounded-[24px] bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-900">{item.day}</p>
                <span className="text-sm font-semibold text-primary-600">{item.uplift}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{item.slot}</p>
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-slate-950">Competitor watch</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {data.competitorInsights.map((item) => (
            <div key={item.name} className="rounded-[26px] border border-slate-200 p-5">
              <p className="text-lg font-semibold text-slate-950">{item.name}</p>
              <p className="mt-2 text-sm text-slate-500">{item.focus}</p>
              <p className="mt-4 text-sm leading-6 text-slate-700">{item.trend}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
