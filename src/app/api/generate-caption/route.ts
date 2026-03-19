import { NextResponse } from "next/server";
import { mockGeneratedCaptions } from "@/lib/mock-data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const seed = topic.length % mockGeneratedCaptions.length;

  return NextResponse.json({
    caption: `${topic ? `${topic} ` : ""}${mockGeneratedCaptions[seed]}`,
  });
}
