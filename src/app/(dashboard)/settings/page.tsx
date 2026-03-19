"use client";

import { useEffect, useState } from "react";
import { useAppShell } from "@/components/app-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Textarea } from "@/components/ui/textarea";
import { useApiResource } from "@/hooks/use-api-resource";
import type { SettingsState } from "@/lib/types";

export default function SettingsPage() {
  const { theme, toggleTheme, pushToast } = useAppShell();
  const { data, loading } = useApiResource<{ settings: SettingsState }>("/api/settings", {
    settings: {
      fullName: "",
      email: "",
      brandVoice: "",
      theme: "light",
    },
  });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [brandVoice, setBrandVoice] = useState("");

  useEffect(() => {
    setFullName(data.settings.fullName);
    setEmail(data.settings.email);
    setBrandVoice(data.settings.brandVoice);
  }, [data.settings]);

  if (loading) {
    return <LoadingCard label="Loading settings..." />;
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          brandVoice,
          theme,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to save workspace settings.");
      }

      pushToast({
        title: "Preferences saved",
        description: "Workspace settings were updated successfully.",
      });
    } catch (error) {
      pushToast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unable to save settings.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Settings"
        description="Adjust profile, workspace preferences, theme, and brand voice settings."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-950">Workspace preferences</h2>
          <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
          <Input value={email} onChange={(event) => setEmail(event.target.value)} />
          <Button onClick={handleSave}>
            Save changes
          </Button>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-950">Brand voice and theme</h2>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Theme: {theme}
            </button>
          </div>
          <Textarea
            rows={7}
            value={brandVoice}
            onChange={(event) => setBrandVoice(event.target.value)}
          />
        </Card>
      </div>
    </div>
  );
}
