import { promises as fs } from "fs";
import path from "path";
import type { AppDb, Metric } from "@/lib/types";

const dbPath = path.join(process.cwd(), "src", "data", "app-db.json");

export async function readDb(): Promise<AppDb> {
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw) as AppDb;
}

export async function writeDb(data: AppDb) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}

export function getDashboardMetrics(data: AppDb): Metric[] {
  const scheduledCount = data.scheduledPosts.filter((post) => post.status === "Scheduled").length;
  const postedCount = data.scheduledPosts.filter((post) => post.status === "Posted").length;
  const approvalCount = data.approvalQueue.length;
  const unreadCount = data.inboxThreads.reduce((count, thread) => count + thread.messages.length, 0);

  return [
    {
      label: "Total Posts",
      value: String(data.scheduledPosts.length),
      change: `+${Math.max(postedCount, 1)} published`,
      description: "Published and drafted content tracked across the current workspace.",
    },
    {
      label: "Scheduled Posts",
      value: String(scheduledCount),
      change: `${Math.max(scheduledCount - 1, 0)} upcoming`,
      description: "Posts queued and ready to publish over the next few days.",
    },
    {
      label: "Messages Received",
      value: String(unreadCount),
      change: `${data.inboxThreads.length} threads`,
      description: "Conversation volume from direct messages and campaign replies.",
    },
    {
      label: "Approval Queue",
      value: String(approvalCount),
      change: `${approvalCount > 0 ? approvalCount : 0} pending`,
      description: "Drafts waiting for reviewer sign-off before they can publish.",
    },
  ];
}

export function appendActivity(data: AppDb, title: string, description: string, tag: string) {
  data.recentActivity.unshift({
    id: Date.now(),
    title,
    description,
    tag,
    time: "Just now",
  });
  data.recentActivity = data.recentActivity.slice(0, 8);
}
