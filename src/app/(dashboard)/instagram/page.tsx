"use client";

import Image from "next/image";
import { useAppShell } from "@/components/app-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { ConnectedAccount, ManagedAccount } from "@/lib/types";

export default function InstagramPage() {
  const { pushToast } = useAppShell();
  const { data, setData, loading } = useApiResource<{
    connected: boolean;
    connectedAccount: ConnectedAccount;
    managedAccounts: ManagedAccount[];
  }>("/api/instagram", {
    connected: false,
    connectedAccount: {
      username: "",
      bio: "",
      avatar: "",
    },
    managedAccounts: [],
  });

  if (loading) {
    return <LoadingCard label="Loading Instagram connection..." />;
  }

  const toggleConnection = async () => {
    const response = await fetch("/api/instagram", { method: "POST" });
    const payload = (await response.json()) as {
      connected: boolean;
      connectedAccount: ConnectedAccount;
      managedAccounts: ManagedAccount[];
    };
    setData(payload);
    pushToast({
      title: payload.connected ? "Instagram connected" : "Instagram disconnected",
      description: "Connection state was updated successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Instagram connect"
        description="Manage account connection status before enabling scheduling and inbox workflows."
      />

      <Card className="max-w-4xl space-y-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Connection status</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This page is now backed by a local API and persists its connection state.
            </p>
          </div>
          <Button onClick={toggleConnection}>
            {data.connected ? "Reconnect Instagram" : "Connect Instagram"}
          </Button>
        </div>

        {data.connected ? (
          <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 sm:flex-row sm:items-center">
            <Image
              src={data.connectedAccount.avatar}
              alt={data.connectedAccount.username}
              width={72}
              height={72}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm text-slate-500">Connected account</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">
                @{data.connectedAccount.username}
              </p>
              <p className="mt-2 text-sm text-slate-500">{data.connectedAccount.bio}</p>
            </div>
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Connected
            </span>
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-lg font-semibold text-slate-900">No account connected</p>
            <p className="mt-2 text-sm text-slate-500">
              Connect an Instagram account to simulate publishing and inbox management.
            </p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {data.managedAccounts.map((account) => (
            <div key={account.id} className="rounded-[24px] border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">{account.name}</p>
              <p className="mt-1 text-sm text-slate-500">{account.handle}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-primary-600">
                {account.status}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
