export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export type Metric = {
  label: string;
  value: string;
  change: string;
  description: string;
};

export type ActivityItem = {
  id: number;
  title: string;
  description: string;
  tag: string;
  time: string;
};

export type OnboardingTask = {
  id: number;
  title: string;
  done: boolean;
};

export type AppNotification = {
  id: number;
  title: string;
  description: string;
  tone: "info" | "warning" | "success";
};

export type PerformancePoint = {
  label: string;
  engagement: number;
  reach: number;
};

export type PostingWindow = {
  day: string;
  slot: string;
  uplift: string;
};

export type CompetitorInsight = {
  name: string;
  focus: string;
  trend: string;
};

export type ScheduledPost = {
  id: number;
  image: string;
  caption: string;
  scheduledFor: string;
  status: "Scheduled" | "Posted" | "Needs Approval";
  account: string;
  format: "Feed" | "Story" | "Reel";
  topic?: string;
  tone?: string;
  cta?: string;
};

export type CalendarColumn = {
  day: string;
  items: Array<{
    title: string;
    time: string;
    status: string;
  }>;
};

export type InboxMessage = {
  id: number;
  sender: "customer" | "agent";
  text: string;
  time: string;
};

export type InboxThread = {
  id: number;
  name: string;
  preview: string;
  lastSeen: string;
  label: string;
  assignedTo: string;
  notes: string;
  messages: InboxMessage[];
};

export type AutomationFlow = {
  id: number;
  name: string;
  status: "Active" | "Paused";
  trigger: string;
  description: string;
};

export type ApprovalItem = {
  id: number;
  title: string;
  owner: string;
  due: string;
  stage: string;
};

export type TemplateItem = {
  id: number;
  name: string;
  category: string;
  description: string;
};

export type MediaAsset = {
  id: number;
  title: string;
  type: string;
  tag: string;
  image: string;
};

export type ConnectedAccount = {
  username: string;
  bio: string;
  avatar: string;
};

export type ManagedAccount = {
  id: number;
  name: string;
  handle: string;
  team: string;
  status: string;
};

export type UserProfile = {
  name: string;
  role: string;
  avatar: string;
};

export type SettingsState = {
  fullName: string;
  email: string;
  brandVoice: string;
  theme: "light" | "dark";
};

export type AuthUser = {
  id: number;
  fullName: string;
  email: string;
  password: string;
};

export type AppDb = {
  users: AuthUser[];
  settings: SettingsState;
  connected: boolean;
  connectedAccount: ConnectedAccount;
  managedAccounts: ManagedAccount[];
  scheduledPosts: ScheduledPost[];
  inboxThreads: InboxThread[];
  automationFlows: AutomationFlow[];
  approvalQueue: ApprovalItem[];
  templateLibrary: TemplateItem[];
  mediaAssets: MediaAsset[];
  notifications: AppNotification[];
  onboardingTasks: OnboardingTask[];
  recentActivity: ActivityItem[];
  performanceSeries: PerformancePoint[];
  bestPostingWindows: PostingWindow[];
  competitorInsights: CompetitorInsight[];
  calendarColumns: CalendarColumn[];
  userProfile: UserProfile;
};
