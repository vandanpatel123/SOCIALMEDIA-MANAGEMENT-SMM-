import { NextResponse } from "next/server";
import { appendActivity, readDb, writeDb } from "@/lib/server-db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const db = await readDb();
  const postId = Number(id);
  const post = db.scheduledPosts.find((item) => item.id === postId);

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  if (body.status === "Scheduled" || body.status === "Posted" || body.status === "Needs Approval") {
    post.status = body.status;
  }

  appendActivity(db, "Post updated", `Post ${post.id} status changed to ${post.status}.`, "Posts");
  await writeDb(db);

  return NextResponse.json({ post });
}
