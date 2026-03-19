import { NextResponse } from "next/server";
import { appendActivity, readDb, writeDb } from "@/lib/server-db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ threadId: string }> },
) {
  const { threadId } = await params;
  const body = await request.json().catch(() => ({}));
  const text = typeof body.text === "string" ? body.text.trim() : "";

  if (!text) {
    return NextResponse.json({ error: "Reply text is required." }, { status: 400 });
  }

  const db = await readDb();
  const thread = db.inboxThreads.find((item) => item.id === Number(threadId));

  if (!thread) {
    return NextResponse.json({ error: "Thread not found." }, { status: 404 });
  }

  const message = {
    id: Date.now(),
    sender: "agent" as const,
    text,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  thread.messages.push(message);
  thread.preview = text;
  thread.lastSeen = "now";
  appendActivity(db, "Inbox reply sent", `A reply was sent to ${thread.name}.`, "Inbox");
  await writeDb(db);

  return NextResponse.json({ thread, message });
}
