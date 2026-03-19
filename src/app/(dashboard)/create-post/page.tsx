"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Textarea } from "@/components/ui/textarea";
import { useAppShell } from "@/components/app-provider";
import {
  captionVariants,
  ctaOptions,
  hashtagSuggestions,
  mockGeneratedCaptions,
  templateLibrary,
  toneOptions,
} from "@/lib/mock-data";

export default function CreatePostPage() {
  const { pushToast } = useAppShell();
  const [topic, setTopic] = useState("");
  const [caption, setCaption] = useState(mockGeneratedCaptions[0]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [publishAt, setPublishAt] = useState("2026-03-22T18:30");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleState, setScheduleState] = useState("Ready to schedule");
  const [tone, setTone] = useState(toneOptions[0]);
  const [cta, setCta] = useState(ctaOptions[0]);
  const [format, setFormat] = useState("Feed");

  const handleGenerateCaption = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
      const data = (await response.json()) as { caption?: string };
      setCaption(data.caption ?? mockGeneratedCaptions[0]);
    } catch {
      const seed = topic.trim().length % mockGeneratedCaptions.length;
      const topicLine = topic.trim() ? `${topic.trim()} ` : "";
      setCaption(`${topicLine}${mockGeneratedCaptions[seed]}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSchedulePost = async () => {
    setIsScheduling(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          caption,
          scheduledFor: publishAt,
          format,
          tone,
          cta,
          image: selectedFile
            ? "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
            : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule the post.");
      }

      const payload = (await response.json()) as { post: { scheduledFor: string } };
      setScheduleState(`Scheduled for ${payload.post.scheduledFor}`);
      pushToast({
        title: "Post scheduled",
        description: `Your ${format.toLowerCase()} post was added to the queue.`,
      });
    } catch (error) {
      pushToast({
        title: "Schedule failed",
        description: error instanceof Error ? error.message : "Unable to schedule the post.",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Create post"
        description="Draft a caption with mock AI assistance, attach a creative, and prepare the post for scheduling."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              value={tone}
              onChange={(event) => setTone(event.target.value)}
            >
              {toneOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              value={cta}
              onChange={(event) => setCta(event.target.value)}
            >
              {ctaOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              value={format}
              onChange={(event) => setFormat(event.target.value)}
            >
              {["Feed", "Story", "Reel"].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label htmlFor="topic" className="text-sm font-medium text-slate-700">
              Enter topic for AI generation
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Spring drop launch, product teaser, founder story..."
              />
              <Button
                type="button"
                onClick={handleGenerateCaption}
                className="sm:w-auto"
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Caption"}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="caption" className="text-sm font-medium text-slate-700">
              Editable caption
            </label>
            <Textarea
              id="caption"
              rows={8}
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {hashtagSuggestions.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-medium text-slate-700">Image upload</span>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-12 text-center transition hover:border-primary-300 hover:bg-primary-50/50">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                  setSelectedFile(event.target.files?.[0]?.name ?? null)
                }
              />
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary-600 shadow-sm">
                Drag & drop
              </span>
              <p className="mt-5 text-lg font-semibold text-slate-900">
                Drop your image here or browse files
              </p>
              <p className="mt-2 text-sm text-slate-500">
                PNG, JPG, or WEBP up to 10MB. UI only, no upload processing yet.
              </p>
            </label>
            {selectedFile ? (
              <p className="text-sm text-slate-500">Selected file: {selectedFile}</p>
            ) : null}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Schedule details</h2>
              <p className="mt-1 text-sm text-slate-500">
                Pick a date and time for when this post should go live.
              </p>
            </div>
            <Input
              type="datetime-local"
              value={publishAt}
              onChange={(event) => setPublishAt(event.target.value)}
            />
            <Button
              className="w-full"
              onClick={handleSchedulePost}
              disabled={isScheduling}
            >
              {isScheduling ? "Scheduling..." : "Schedule Post"}
            </Button>
            <p className="text-sm text-slate-500">{scheduleState}</p>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-950">Preview notes</h2>
            <div className="rounded-[24px] bg-slate-950 p-5 text-sm leading-6 text-slate-200">
              <p className="font-medium text-white">Mock AI response</p>
              <p className="mt-3">{caption}</p>
            </div>
            <div className="rounded-[24px] bg-primary-50 p-5 text-sm leading-6 text-primary-900">
              Best posting slot detected: 6:30 PM on weekday evenings based on recent engagement.
            </div>
            <div className="rounded-[24px] border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">AI caption variants</p>
              <div className="mt-3 space-y-3">
                {captionVariants.map((variant) => (
                  <div key={variant} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {variant}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">Suggested template</p>
              <p className="mt-2 text-sm text-slate-500">{templateLibrary[0].name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tone: {tone}. CTA: {cta}. Format: {format}.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
