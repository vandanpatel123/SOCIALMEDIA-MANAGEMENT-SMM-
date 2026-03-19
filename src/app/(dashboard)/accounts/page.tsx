"use client";

import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { ManagedAccount } from "@/lib/types";

export default function AccountsPage() {
  const { data, loading } = useApiResource<{ accounts: ManagedAccount[] }>("/api/accounts", {
    accounts: [],
  });

  if (loading) {
    return <LoadingCard label="Loading accounts..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Accounts"
        description="Manage multiple Instagram workspaces for agencies, internal teams, or different brands."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {data.accounts.map((account) => (
          <Card key={account.id} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-950">{account.name}</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  account.status === "Connected"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {account.status}
              </span>
            </div>
            <p className="text-sm text-slate-500">{account.handle}</p>
            <p className="text-sm leading-6 text-slate-600">Team: {account.team}</p>
            <button type="button" className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Open account
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
