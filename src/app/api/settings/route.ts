import { NextResponse } from "next/server";
import { appendActivity, readDb, writeDb } from "@/lib/server-db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ settings: db.settings });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  const db = await readDb();

  if (typeof body.fullName === "string") {
    db.settings.fullName = body.fullName.trim();
    db.userProfile.name = body.fullName.trim();
  }
  if (typeof body.email === "string") {
    db.settings.email = body.email.trim();
  }
  if (typeof body.brandVoice === "string") {
    db.settings.brandVoice = body.brandVoice;
  }
  if (body.theme === "light" || body.theme === "dark") {
    db.settings.theme = body.theme;
  }

  appendActivity(db, "Settings updated", "Workspace settings and brand voice were updated.", "Settings");
  await writeDb(db);

  return NextResponse.json({ settings: db.settings });
}
