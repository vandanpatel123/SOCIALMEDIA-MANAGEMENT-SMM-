"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { MediaAsset } from "@/lib/types";

export default function MediaLibraryPage() {
  const { data, loading } = useApiResource<{ assets: MediaAsset[] }>("/api/media-library", {
    assets: [],
  });

  if (loading) {
    return <LoadingCard label="Loading media assets..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Media library"
        description="Organize images, video clips, and campaign asset groups before drafting posts."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.assets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden p-0">
            <div className="relative h-56">
              <Image src={asset.image} alt={asset.title} fill className="object-cover" />
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-slate-950">{asset.title}</h2>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600">
                  {asset.type}
                </span>
              </div>
              <p className="text-sm text-slate-500">{asset.tag}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
