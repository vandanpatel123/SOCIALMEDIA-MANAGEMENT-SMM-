"use client";

import { useMemo, useState } from "react";
import { LoadingCard } from "@/components/ui/loading-card";
import { PostCard } from "@/components/post-card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { ScheduledPost } from "@/lib/types";

export default function ScheduledPostsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const { data, loading } = useApiResource<{ posts: ScheduledPost[] }>("/api/posts", {
    posts: [],
  });
  const filteredPosts = useMemo(
    () =>
      data.posts.filter((post) => {
        const matchesQuery =
          post.caption.toLowerCase().includes(query.toLowerCase()) ||
          post.account.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = status === "All" ? true : post.status === status;
        return matchesQuery && matchesStatus;
      }),
    [data.posts, query, status],
  );

  if (loading) {
    return <LoadingCard label="Loading scheduled posts..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Scheduled posts"
        description="Review your queued content pipeline and check what is ready to publish."
      />

      <div className="flex flex-col gap-3 md:flex-row">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by caption or account..."
        />
        <select
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {["All", "Scheduled", "Posted", "Needs Approval"].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {filteredPosts.length === 0 ? (
        <div className="rounded-[30px] border border-dashed border-slate-300 bg-white/80 px-6 py-16 text-center text-sm text-slate-500">
          No posts match the current search and filter settings.
        </div>
      ) : null}
    </div>
  );
}
