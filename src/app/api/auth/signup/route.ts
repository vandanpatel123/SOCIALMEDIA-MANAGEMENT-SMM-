import { NextResponse } from "next/server";
import { appendActivity, readDb, writeDb } from "@/lib/server-db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!fullName || !email || password.length < 8) {
    return NextResponse.json({ error: "Invalid signup payload." }, { status: 400 });
  }

  const db = await readDb();

  if (db.users.some((user) => user.email.toLowerCase() === email)) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const nextUser = {
    id: Date.now(),
    fullName,
    email,
    password,
  };

  db.users.push(nextUser);
  db.settings.fullName = fullName;
  db.settings.email = email;
  db.userProfile.name = fullName;
  appendActivity(db, "New workspace account created", `${fullName} joined the InstaFlow AI workspace.`, "Auth");
  await writeDb(db);

  return NextResponse.json({
    user: {
      id: nextUser.id,
      fullName: nextUser.fullName,
      email: nextUser.email,
    },
  });
}
