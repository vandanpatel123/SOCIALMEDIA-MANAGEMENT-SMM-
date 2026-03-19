import Image from "next/image";
import type { ScheduledPost } from "@/lib/types";
import { Card } from "./ui/card";

export function PostCard({ post }: { post: ScheduledPost }) {
  const toneStyles =
    post.status === "Scheduled"
      ? "bg-amber-50 text-amber-700"
      : post.status === "Posted"
        ? "bg-emerald-50 text-emerald-700"
        : "bg-rose-50 text-rose-700";

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-60">
        <Image src={post.image} alt={post.caption} fill className="object-cover" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneStyles}`}>{post.status}</span>
          <span className="text-sm text-slate-400">{post.scheduledFor}</span>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
          <span>{post.account}</span>
          <span>/</span>
          <span>{post.format}</span>
        </div>
        <p className="text-sm leading-7 text-slate-600">{post.caption}</p>
      </div>
    </Card>
  );
}
