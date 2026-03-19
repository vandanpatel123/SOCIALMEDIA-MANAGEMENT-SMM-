import { NextResponse } from "next/server";
import { readDb } from "@/lib/server-db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ templates: db.templateLibrary });
}
