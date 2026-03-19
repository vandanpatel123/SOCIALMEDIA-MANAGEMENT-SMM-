"use client";

import { useEffect, useState } from "react";
import { useAppShell } from "@/components/app-provider";
import { MessageBubble } from "@/components/message-bubble";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingCard } from "@/components/ui/loading-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useApiResource } from "@/hooks/use-api-resource";
import { aiReplySuggestions, quickReplyTemplates } from "@/lib/mock-data";
import type { InboxThread } from "@/lib/types";

export default function InboxPage() {
  const { pushToast } = useAppShell();
  const [reply, setReply] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
  const { data, setData, loading } = useApiResource<{ threads: InboxThread[] }>("/api/inbox", {
    threads: [],
  });
  const thread =
    data.threads.find((item) => item.id === selectedThreadId) ??
    data.threads[0];

  useEffect(() => {
    if (!selectedThreadId && data.threads[0]) {
      setSelectedThreadId(data.threads[0].id);
    }
  }, [data.threads, selectedThreadId]);

  const handleSendReply = async () => {
    if (!reply.trim() || !thread) {
      return;
    }

    try {
      const response = await fetch(`/api/inbox/${thread.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: reply }),
      });

      if (!response.ok) {
        throw new Error("Unable to send reply.");
      }

      const payload = (await response.json()) as { thread: InboxThread };
      setData((current) => ({
        threads: current.threads.map((item) =>
          item.id === payload.thread.id ? payload.thread : item,
        ),
      }));
      setReply("");
      pushToast({
        title: "Reply sent",
        description: "The conversation thread was updated successfully.",
      });
    } catch (error) {
      pushToast({
        title: "Reply failed",
        description: error instanceof Error ? error.message : "Unable to send reply.",
      });
    }
  };

  if (loading) {
    return <LoadingCard label="Loading inbox..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Inbox"
        description="Stay on top of conversations with a simple chat-style support and engagement view."
      />

      <div className="grid gap-6 xl:grid-cols-[0.72fr_1.02fr_0.7fr]">
        <Card className="p-0">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-950">Conversations</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {data.threads.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedThreadId(item.id)}
                className={`block w-full cursor-pointer px-6 py-5 text-left transition hover:bg-slate-50 ${
                  item.id === thread?.id ? "bg-primary-50/70" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.preview}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {item.label}
                      </span>
                      <span className="text-xs text-slate-400">{item.assignedTo}</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    {item.lastSeen}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="flex min-h-[640px] flex-col p-0">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                {thread?.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="font-semibold text-slate-950">{thread?.name}</h2>
                <p className="text-sm text-slate-500">Instagram Direct Messages</p>
              </div>
            </div>
          </div>

          <div className="hide-scrollbar flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {thread?.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          <div className="border-t border-slate-100 px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Type a manual reply..."
              />
              <Button className="sm:w-auto" onClick={handleSendReply}>
                Send Reply
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-950">AI suggested replies</h2>
            {aiReplySuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setReply(suggestion)}
                className="w-full rounded-[24px] bg-slate-50 px-4 py-4 text-left text-sm leading-6 text-slate-600"
              >
                {suggestion}
              </button>
            ))}
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-950">Quick replies</h2>
            {quickReplyTemplates.map((template) => (
              <button
                key={template}
                type="button"
                onClick={() => setReply(template)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm text-slate-600"
              >
                {template}
              </button>
            ))}
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-950">Internal notes</h2>
            <p className="rounded-[24px] bg-primary-50 p-4 text-sm leading-6 text-primary-900">
              {thread?.notes}
            </p>
            <p className="text-sm text-slate-500">Auto-reply rule status: Active for FAQs and pricing prompts.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
