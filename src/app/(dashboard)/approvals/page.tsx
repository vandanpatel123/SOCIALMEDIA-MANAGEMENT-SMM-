"use client";

import { useAppShell } from "@/components/app-provider";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { ApprovalItem } from "@/lib/types";

export default function ApprovalsPage() {
  const { pushToast } = useAppShell();
  const { data, setData, loading } = useApiResource<{ approvals: ApprovalItem[] }>(
    "/api/approvals",
    { approvals: [] },
  );

  if (loading) {
    return <LoadingCard label="Loading approval queue..." />;
  }

  const handleApprove = async (id: number) => {
    const response = await fetch("/api/approvals", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, stage: "Approved" }),
    });
    const payload = (await response.json()) as { approval?: ApprovalItem; error?: string };

    if (!response.ok || !payload.approval) {
      pushToast({
        title: "Update failed",
        description: payload.error ?? "Unable to update approval stage.",
      });
      return;
    }

    setData((current) => ({
      approvals: current.approvals.map((item) =>
        item.id === payload.approval?.id ? payload.approval : item,
      ),
    }));
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Approvals"
        description="Track every draft through creator, reviewer, legal, and final approval stages."
      />

      <Card className="p-0">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr] gap-4 border-b border-slate-100 px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          <span>Asset</span>
          <span>Owner</span>
          <span>Due</span>
          <span>Stage</span>
        </div>
        {data.approvals.map((item) => (
          <div key={item.id} className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr] gap-4 border-b border-slate-100 px-6 py-5 text-sm last:border-b-0">
            <span className="font-medium text-slate-900">{item.title}</span>
            <span className="text-slate-500">{item.owner}</span>
            <span className="text-slate-500">{item.due}</span>
            <button type="button" onClick={() => handleApprove(item.id)} className="text-left font-medium text-primary-600">
              {item.stage}
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}
