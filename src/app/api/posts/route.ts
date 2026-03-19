import { NextResponse } from "next/server";
import { appendActivity, readDb, writeDb } from "@/lib/server-db";
import { mockGeneratedCaptions } from "@/lib/mock-data";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ posts: db.scheduledPosts });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const caption = typeof body.caption === "string" ? body.caption.trim() : "";
  const scheduledFor = typeof body.scheduledFor === "string" ? body.scheduledFor : "";
  const format = body.format === "Story" || body.format === "Reel" ? body.format : "Feed";
  const tone = typeof body.tone === "string" ? body.tone : "Bold";
  const cta = typeof body.cta === "string" ? body.cta : "Save this post";
  const image = typeof body.image === "string" && body.image
    ? body.image
    : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80";

  const db = await readDb();
  const fallbackCaption = `${topic ? `${topic} ` : ""}${mockGeneratedCaptions[0]}`;
  const post = {
    id: Date.now(),
    topic,
    caption: caption || fallbackCaption,
    image,
    scheduledFor: scheduledFor.replace("T", " ") || new Date().toISOString().slice(0, 16).replace("T", " "),
    status: "Scheduled" as const,
    account: db.managedAccounts[0]?.handle ?? "@instaflow.demo",
    format,
    tone,
    cta,
  };

  db.scheduledPosts.unshift(post);
  db.calendarColumns[0]?.items.unshift({
    title: topic || "New scheduled post",
    time: scheduledFor.split("T")[1]?.slice(0, 5) ?? "09:00",
    status: "Scheduled",
  });
  appendActivity(db, "New post scheduled", `A ${format.toLowerCase()} post was scheduled for ${post.scheduledFor}.`, "Scheduled");
  await writeDb(db);

  return NextResponse.json({ post }, { status: 201 });
}
