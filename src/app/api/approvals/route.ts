import { NextResponse } from "next/server";
import { appendActivity, readDb, writeDb } from "@/lib/server-db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ approvals: db.approvalQueue });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  const id = Number(body.id);
  const db = await readDb();
  const item = db.approvalQueue.find((entry) => entry.id === id);

  if (!item) {
    return NextResponse.json({ error: "Approval item not found." }, { status: 404 });
  }

  item.stage = typeof body.stage === "string" && body.stage ? body.stage : "Approved";
  appendActivity(db, "Approval stage updated", `${item.title} moved to ${item.stage}.`, "Approvals");
  await writeDb(db);

  return NextResponse.json({ approval: item });
}
