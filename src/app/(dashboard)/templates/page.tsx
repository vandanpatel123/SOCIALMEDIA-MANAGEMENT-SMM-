"use client";

import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { TemplateItem } from "@/lib/types";

export default function TemplatesPage() {
  const { data, loading } = useApiResource<{ templates: TemplateItem[] }>("/api/templates", {
    templates: [],
  });

  if (loading) {
    return <LoadingCard label="Loading templates..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Templates"
        description="Reuse caption structures, campaign sequences, and recurring post frameworks."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {data.templates.map((template) => (
          <Card key={template.id} className="space-y-4">
            <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              {template.category}
            </span>
            <h2 className="text-lg font-semibold text-slate-950">{template.name}</h2>
            <p className="text-sm leading-6 text-slate-600">{template.description}</p>
            <button type="button" className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Use template
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
