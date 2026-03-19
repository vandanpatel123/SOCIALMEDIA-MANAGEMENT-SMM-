"use client";

import { useAppShell } from "@/components/app-provider";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { AutomationFlow } from "@/lib/types";

export default function AutomationsPage() {
  const { pushToast } = useAppShell();
  const { data, setData, loading } = useApiResource<{ automations: AutomationFlow[] }>(
    "/api/automations",
    { automations: [] },
  );

  if (loading) {
    return <LoadingCard label="Loading automations..." />;
  }

  const handleToggle = async (id: number) => {
    const response = await fetch("/api/automations", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const payload = (await response.json()) as { automation?: AutomationFlow; error?: string };

    if (!response.ok || !payload.automation) {
      pushToast({
        title: "Update failed",
        description: payload.error ?? "Unable to update automation.",
      });
      return;
    }

    setData((current) => ({
      automations: current.automations.map((item) =>
        item.id === payload.automation?.id ? payload.automation : item,
      ),
    }));
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Automations"
        description="Configure planning, moderation, reminders, and evergreen queue workflows as mock automations."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {data.automations.map((flow) => (
          <Card key={flow.id} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-950">{flow.name}</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  flow.status === "Active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {flow.status}
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-600">{flow.description}</p>
            <div className="rounded-[24px] bg-slate-50 p-4 text-sm text-slate-500">
              Trigger: {flow.trigger}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleToggle(flow.id)}
                className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
              >
                {flow.status === "Active" ? "Pause workflow" : "Activate workflow"}
              </button>
              <button type="button" className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                View history
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
