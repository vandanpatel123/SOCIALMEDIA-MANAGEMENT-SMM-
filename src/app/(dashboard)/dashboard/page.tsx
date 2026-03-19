"use client";

import { LoadingCard } from "@/components/ui/loading-card";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type {
  ActivityItem,
  AppNotification,
  Metric,
  OnboardingTask,
  PerformancePoint,
} from "@/lib/types";

export default function DashboardPage() {
  const { data, loading } = useApiResource<{
    metrics: Metric[];
    recentActivity: ActivityItem[];
    performanceSeries: PerformancePoint[];
    onboardingTasks: OnboardingTask[];
    notifications: AppNotification[];
  }>("/api/dashboard", {
    metrics: [],
    recentActivity: [],
    performanceSeries: [],
    onboardingTasks: [],
    notifications: [],
  });

  if (loading) {
    return <LoadingCard label="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dashboard"
        description="Track publishing velocity, active conversations, and what your AI assistant handled most recently."
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <Card key={metric.label} className="overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{metric.label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                  {metric.value}
                </p>
              </div>
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                {metric.change}
              </span>
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-500">{metric.description}</p>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-0">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-950">Recent activity</h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick view of what changed across your workflow.
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {data.recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                    {item.tag}
                  </span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-950">Weekly engagement pulse</h2>
            <div className="mt-6 grid grid-cols-7 gap-3">
              {data.performanceSeries.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-3">
                  <div
                    className="w-full rounded-full bg-primary-600/15"
                    style={{ height: `${Math.max(item.engagement, 34)}px` }}
                  >
                    <div
                      className="w-full rounded-full bg-primary-600"
                      style={{ height: `${item.engagement}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-950">Onboarding</h2>
              <span className="text-sm text-slate-400">
                {data.onboardingTasks.filter((task) => !task.done).length} of {data.onboardingTasks.length} left
              </span>
            </div>
            {data.onboardingTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 rounded-[20px] bg-slate-50 px-4 py-3">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    task.done ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {task.done ? "OK" : task.id}
                </span>
                <span className="text-sm text-slate-700">{task.title}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-slate-950">Live alerts</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {data.notifications.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
