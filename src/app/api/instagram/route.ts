import { NextResponse } from "next/server";
import { appendActivity, readDb, writeDb } from "@/lib/server-db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({
    connected: db.connected,
    connectedAccount: db.connectedAccount,
    managedAccounts: db.managedAccounts,
  });
}

export async function POST() {
  const db = await readDb();
  db.connected = !db.connected;
  appendActivity(
    db,
    db.connected ? "Instagram connected" : "Instagram disconnected",
    db.connected
      ? "The main Instagram account is now available for publishing."
      : "The main Instagram account was disconnected from the workspace.",
    "Instagram",
  );
  await writeDb(db);

  return NextResponse.json({
    connected: db.connected,
    connectedAccount: db.connectedAccount,
    managedAccounts: db.managedAccounts,
  });
}
