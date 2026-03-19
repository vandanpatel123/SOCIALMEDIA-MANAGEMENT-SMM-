export const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: "DB" },
  { label: "Calendar", href: "/calendar", icon: "CL" },
  { label: "Create Post", href: "/create-post", icon: "AI" },
  { label: "Scheduled Posts", href: "/scheduled-posts", icon: "SC" },
  { label: "Inbox", href: "/inbox", icon: "IN" },
  { label: "Analytics", href: "/analytics", icon: "AN" },
  { label: "Automations", href: "/automations", icon: "AU" },
  { label: "Approvals", href: "/approvals", icon: "AP" },
  { label: "Templates", href: "/templates", icon: "TP" },
  { label: "Media Library", href: "/media-library", icon: "ML" },
  { label: "Accounts", href: "/accounts", icon: "AC" },
  { label: "Instagram", href: "/instagram", icon: "IG" },
  { label: "Settings", href: "/settings", icon: "ST" },
] as const;

export const dashboardMetrics = [
  {
    label: "Total Posts",
    value: "128",
    change: "+12.4%",
    description: "Published and drafted content tracked across the last 30 days.",
  },
  {
    label: "Scheduled Posts",
    value: "18",
    change: "+6 this week",
    description: "Posts queued and ready to publish over the next few days.",
  },
  {
    label: "Messages Received",
    value: "342",
    change: "+19 unread",
    description: "Conversation volume from direct messages and campaign replies.",
  },
  {
    label: "Approval Queue",
    value: "9",
    change: "3 urgent",
    description: "Drafts waiting for reviewer sign-off before they can publish.",
  },
];

export const recentActivity = [
  {
    id: 1,
    title: "AI generated a caption for the spring capsule campaign",
    description: "The caption draft is waiting for review in the Create Post workspace.",
    tag: "AI Draft",
    time: "10 min ago",
  },
  {
    id: 2,
    title: "New customer conversation started from story mention",
    description: "A prospect asked for pricing details and sizing recommendations.",
    tag: "Inbox",
    time: "24 min ago",
  },
  {
    id: 3,
    title: "Launch teaser scheduled for March 20, 2026 at 6:30 PM",
    description: "The creative and caption were locked in after final review.",
    tag: "Scheduled",
    time: "1 hour ago",
  },
];

export const onboardingTasks = [
  { id: 1, title: "Connect Instagram account", done: true },
  { id: 2, title: "Define your brand voice", done: true },
  { id: 3, title: "Upload campaign media assets", done: false },
  { id: 4, title: "Create your first automation workflow", done: false },
];

export const notifications = [
  {
    id: 1,
    title: "Approval reminder",
    description: "Three launch posts still need final review before 5:00 PM.",
    tone: "warning",
  },
  {
    id: 2,
    title: "Inbox spike detected",
    description: "Direct message volume is 22% above your weekly average.",
    tone: "info",
  },
  {
    id: 3,
    title: "Best-time suggestion updated",
    description: "Weekday posts at 6:30 PM are outperforming your median by 14%.",
    tone: "success",
  },
];

export const performanceSeries = [
  { label: "Mon", engagement: 64, reach: 82 },
  { label: "Tue", engagement: 71, reach: 78 },
  { label: "Wed", engagement: 88, reach: 91 },
  { label: "Thu", engagement: 76, reach: 87 },
  { label: "Fri", engagement: 94, reach: 98 },
  { label: "Sat", engagement: 68, reach: 73 },
  { label: "Sun", engagement: 59, reach: 66 },
];

export const bestPostingWindows = [
  { day: "Monday", slot: "6:30 PM", uplift: "+12%" },
  { day: "Wednesday", slot: "12:15 PM", uplift: "+9%" },
  { day: "Friday", slot: "7:00 PM", uplift: "+17%" },
];

export const competitorInsights = [
  {
    name: "Glow Social",
    focus: "Reels + creator collabs",
    trend: "Carousel education posts grew 28% this month.",
  },
  {
    name: "Threadline Studio",
    focus: "Product launches",
    trend: "Short CTA captions are outperforming long-form posts.",
  },
  {
    name: "The Daily Drop",
    focus: "Community storytelling",
    trend: "Comment prompts are driving stronger conversation depth.",
  },
];

export const mockGeneratedCaptions = [
  "captured with an AI-ready hook, a crisp value proposition, and a closing prompt that nudges followers to engage.",
  "made for a polished product reveal with confident copy, launch energy, and a clear audience call-to-action.",
  "turned into a short-form caption that feels premium, direct, and aligned with a modern Instagram brand voice.",
];

export const captionVariants = [
  "Polished launch version with a strong hook and concise CTA.",
  "Conversational brand voice version with a softer emotional opener.",
  "High-conversion version optimized for saves, comments, and profile taps.",
];

export const toneOptions = ["Bold", "Playful", "Minimal", "Luxury", "Founder-led"];
export const ctaOptions = ["Shop now", "Comment below", "Save this post", "DM us", "Join waitlist"];
export const hashtagSuggestions = [
  "#SocialMediaAI",
  "#InstagramGrowth",
  "#ContentAutomation",
  "#CreatorWorkflow",
  "#BrandMarketing",
];

export const templateLibrary = [
  {
    id: 1,
    name: "Launch Countdown",
    category: "Campaign",
    description: "A recurring teaser sequence with urgency and a clean CTA structure.",
  },
  {
    id: 2,
    name: "Founder Note",
    category: "Storytelling",
    description: "Designed for personal brand updates and behind-the-scenes content.",
  },
  {
    id: 3,
    name: "Product Carousel",
    category: "Sales",
    description: "A modular structure for feature-led carousel copy and slide hooks.",
  },
];

export type ScheduledPost = {
  id: number;
  image: string;
  caption: string;
  scheduledFor: string;
  status: "Scheduled" | "Posted" | "Needs Approval";
  account: string;
  format: "Feed" | "Story" | "Reel";
};

export const scheduledPosts: ScheduledPost[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Behind the scenes from our latest creator campaign. Soft launch visuals, strong storytelling, and a simple CTA to drive saves.",
    scheduledFor: "Mar 22, 2026 - 6:30 PM",
    status: "Scheduled",
    account: "@instaflow.demo",
    format: "Feed",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    caption:
      "A carousel-ready post introducing the next product drop with a tighter hook, cleaner structure, and a premium tone.",
    scheduledFor: "Mar 21, 2026 - 11:00 AM",
    status: "Needs Approval",
    account: "@instaflow.demo",
    format: "Story",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Community spotlight post published after the AI polished the opening line and shortened the CTA for better readability.",
    scheduledFor: "Mar 19, 2026 - 2:15 PM",
    status: "Posted",
    account: "@agency.south",
    format: "Feed",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    caption:
      "A simple reminder post for the weekend campaign schedule, highlighting urgency without sounding overly promotional.",
    scheduledFor: "Mar 20, 2026 - 9:00 AM",
    status: "Scheduled",
    account: "@launchlab.co",
    format: "Reel",
  },
];

export const calendarColumns = [
  {
    day: "Mon 18",
    items: [
      { title: "Founder story", time: "10:00", status: "Draft" },
      { title: "Customer review reel", time: "18:30", status: "Scheduled" },
    ],
  },
  {
    day: "Tue 19",
    items: [{ title: "Launch teaser", time: "12:00", status: "Approval" }],
  },
  {
    day: "Wed 20",
    items: [{ title: "Template refresh", time: "16:00", status: "Scheduled" }],
  },
  {
    day: "Thu 21",
    items: [{ title: "Creator collab story", time: "11:30", status: "Draft" }],
  },
  {
    day: "Fri 22",
    items: [{ title: "Community spotlight", time: "19:00", status: "Published" }],
  },
];

export type InboxMessage = {
  id: number;
  sender: "customer" | "agent";
  text: string;
  time: string;
};

export const aiReplySuggestions = [
  "You can manage feed posts today, and reel scheduling can be enabled later without changing your workflow.",
  "Absolutely. We can build an approval step so nothing publishes before your team reviews it.",
  "I can suggest a shorter caption and a set of high-intent hashtags for that campaign.",
];

export const quickReplyTemplates = [
  "Thanks for reaching out. We will get back to you shortly.",
  "Yes, that feature is available in the scheduled workflow.",
  "Happy to help. Could you share a bit more detail?",
];

export const inboxThreads = [
  {
    id: 1,
    name: "Maya Johnson",
    preview: "Can I schedule reels too, or only feed posts?",
    lastSeen: "2m",
    label: "Lead",
    assignedTo: "Olivia Carter",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hi, I love the dashboard. Can I schedule reels too, or only feed posts?",
        time: "10:12 AM",
      },
      {
        id: 2,
        sender: "agent",
        text: "Right now this mock workflow is focused on feed posts, but the UI is structured so reels can be added later.",
        time: "10:13 AM",
      },
      {
        id: 3,
        sender: "customer",
        text: "Perfect. I mainly need better caption generation and a cleaner inbox.",
        time: "10:15 AM",
      },
    ] satisfies InboxMessage[],
  },
  {
    id: 2,
    name: "Studio North",
    preview: "We need approval steps before anything goes live.",
    lastSeen: "18m",
    label: "Priority",
    assignedTo: "Team Review",
    messages: [],
  },
  {
    id: 3,
    name: "Chris Lane",
    preview: "The AI-generated teaser caption looked great.",
    lastSeen: "1h",
    label: "Customer",
    assignedTo: "Ava Reed",
    messages: [],
  },
];

export const automationFlows = [
  {
    id: 1,
    name: "Weekly content planner",
    status: "Active",
    trigger: "Every Monday at 9:00 AM",
    description: "Turns campaign goals into a draft posting plan for the week.",
  },
  {
    id: 2,
    name: "Evergreen queue recycler",
    status: "Paused",
    trigger: "When queue depth falls below 5 posts",
    description: "Reuses approved evergreen content with refreshed captions.",
  },
  {
    id: 3,
    name: "Inbox moderation",
    status: "Active",
    trigger: "On incoming DM",
    description: "Flags spam, abuse, and repetitive sales requests automatically.",
  },
];

export const approvalQueue = [
  {
    id: 1,
    title: "Spring drop carousel",
    owner: "Ava Reed",
    due: "Today, 5:00 PM",
    stage: "Final review",
  },
  {
    id: 2,
    title: "Creator story script",
    owner: "Jules Park",
    due: "Today, 7:30 PM",
    stage: "Legal check",
  },
  {
    id: 3,
    title: "Weekend reel caption",
    owner: "Olivia Carter",
    due: "Tomorrow, 11:00 AM",
    stage: "Manager review",
  },
];

export const mediaAssets = [
  {
    id: 1,
    title: "Launch portrait set",
    type: "Image",
    tag: "Campaign",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Founder reel cut",
    type: "Video",
    tag: "Storytelling",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "UGC testimonials",
    type: "Album",
    tag: "Community",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
  },
];

export const connectedAccount = {
  username: "instaflow.demo",
  bio: "Helping brands scale publishing with lightweight AI automation.",
  avatar: "https://i.pravatar.cc/200?img=12",
};

export const managedAccounts = [
  {
    id: 1,
    name: "InstaFlow Demo",
    handle: "@instaflow.demo",
    team: "Growth",
    status: "Connected",
  },
  {
    id: 2,
    name: "Launch Lab",
    handle: "@launchlab.co",
    team: "Agency",
    status: "Needs refresh",
  },
  {
    id: 3,
    name: "Agency South",
    handle: "@agency.south",
    team: "Client Success",
    status: "Connected",
  },
];

export const userProfile = {
  name: "Olivia Carter",
  role: "Growth Lead",
  avatar: "https://i.pravatar.cc/100?img=32",
};
