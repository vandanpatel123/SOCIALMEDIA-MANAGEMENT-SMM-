"use client";

import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { CalendarColumn } from "@/lib/types";

export default function CalendarPage() {
  const { data, loading } = useApiResource<{ calendarColumns: CalendarColumn[] }>(
    "/api/calendar",
    { calendarColumns: [] },
  );

  if (loading) {
    return <LoadingCard label="Loading calendar..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Content calendar"
        description="Plan campaigns in a calendar view with drag-ready cards, status visibility, and a clearer publishing rhythm."
      />

      <div className="flex flex-wrap gap-3">
        {["Month", "Week", "Day"].map((view, index) => (
          <button
            key={view}
            type="button"
            className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
              index === 1 ? "bg-primary-600 text-white" : "bg-white text-slate-600"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-5">
        {data.calendarColumns.map((column) => (
          <Card key={column.day} className="min-h-[360px] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-semibold text-slate-950">{column.day}</h2>
              <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Drop zone
              </span>
            </div>
            <div className="space-y-3">
              {column.items.map((item) => (
                <div key={`${column.day}-${item.title}`} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <span className="text-xs font-medium text-slate-400">{item.time}</span>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.22em] text-primary-600">
                    {item.status}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
