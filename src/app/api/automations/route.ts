import { NextResponse } from "next/server";
import { appendActivity, readDb, writeDb } from "@/lib/server-db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ automations: db.automationFlows });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  const id = Number(body.id);
  const db = await readDb();
  const flow = db.automationFlows.find((item) => item.id === id);

  if (!flow) {
    return NextResponse.json({ error: "Automation not found." }, { status: 404 });
  }

  flow.status = flow.status === "Active" ? "Paused" : "Active";
  appendActivity(db, "Automation updated", `${flow.name} is now ${flow.status.toLowerCase()}.`, "Automation");
  await writeDb(db);

  return NextResponse.json({ automation: flow });
}
