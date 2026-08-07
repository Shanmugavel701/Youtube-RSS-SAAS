import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  CreditCard,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Plug,
  Radar,
  Search,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  Tv,
  Video,
  Workflow,
  Zap,
} from "lucide-react";

export const NAV_GROUPS = [
  {
    label: "Intelligence",
    items: [
      { title: "Dashboard", url: "/app", icon: LayoutDashboard },
      { title: "Channels", url: "/app/channels", icon: Tv },
      { title: "Videos", url: "/app/videos", icon: Video },
      { title: "AI Search", url: "/app/search", icon: Sparkles },
      { title: "Competitors", url: "/app/competitors", icon: Radar },
      { title: "Reports", url: "/app/reports", icon: FileText },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Alerts", url: "/app/alerts", icon: Bell },
      { title: "Automations", url: "/app/automations", icon: Workflow },
      { title: "Knowledge Base", url: "/app/knowledge", icon: BookOpen },
      { title: "Integrations", url: "/app/integrations", icon: Plug },
    ],
  },
  {
    label: "Workspace",
    items: [
      { title: "Billing", url: "/app/billing", icon: CreditCard },
      { title: "API", url: "/app/api", icon: Terminal },
      { title: "Settings", url: "/app/settings", icon: Settings },
      { title: "Admin", url: "/app/admin", icon: Shield },
      { title: "Help", url: "/app/help", icon: LifeBuoy },
    ],
  },
] as const;

export const KPIS = [
  { label: "Videos analyzed", value: "12,482", delta: "+18.4%", icon: Video, trend: "up" },
  { label: "Monitored channels", value: "146", delta: "+9 this week", icon: Tv, trend: "up" },
  { label: "Insights generated", value: "3,918", delta: "+24.1%", icon: Zap, trend: "up" },
  { label: "Reports delivered", value: "212", delta: "+6 today", icon: FileText, trend: "up" },
  { label: "AI credits left", value: "68,400", delta: "of 100k", icon: Bot, trend: "flat" },
] as const;

export const VOLUME_SERIES = [
  { day: "Mon", videos: 210, insights: 96 },
  { day: "Tue", videos: 284, insights: 128 },
  { day: "Wed", videos: 246, insights: 118 },
  { day: "Thu", videos: 332, insights: 164 },
  { day: "Fri", videos: 388, insights: 201 },
  { day: "Sat", videos: 254, insights: 122 },
  { day: "Sun", videos: 302, insights: 148 },
];

export const SENTIMENT_SERIES = [
  { week: "W1", positive: 62, neutral: 26, negative: 12 },
  { week: "W2", positive: 58, neutral: 30, negative: 12 },
  { week: "W3", positive: 66, neutral: 24, negative: 10 },
  { week: "W4", positive: 71, neutral: 21, negative: 8 },
];

export const TRENDING_TOPICS = [
  { topic: "Agentic AI workflows", mentions: 428, change: "+62%" },
  { topic: "Vector database pricing", mentions: 312, change: "+41%" },
  { topic: "On-device inference", mentions: 264, change: "+28%" },
  { topic: "AI governance & EU AI Act", mentions: 198, change: "+19%" },
  { topic: "RAG evaluation tooling", mentions: 154, change: "+12%" },
];

export const CHANNELS = [
  {
    id: "ch_1",
    name: "Lenny's Podcast",
    handle: "@lennyspodcast",
    subs: "1.2M",
    videos: 412,
    status: "Active",
    monitored: true,
    category: "Product",
  },
  {
    id: "ch_2",
    name: "Y Combinator",
    handle: "@ycombinator",
    subs: "1.5M",
    videos: 1284,
    status: "Active",
    monitored: true,
    category: "Startup",
  },
  {
    id: "ch_3",
    name: "a16z",
    handle: "@a16z",
    subs: "684K",
    videos: 942,
    status: "Active",
    monitored: true,
    category: "Venture",
  },
  {
    id: "ch_4",
    name: "Fireship",
    handle: "@fireship",
    subs: "3.4M",
    videos: 628,
    status: "Paused",
    monitored: false,
    category: "Engineering",
  },
  {
    id: "ch_5",
    name: "Stratechery RSS",
    handle: "stratechery.com/feed",
    subs: "RSS",
    videos: 2140,
    status: "Active",
    monitored: true,
    category: "Analysis",
  },
  {
    id: "ch_6",
    name: "The Verge — AI",
    handle: "theverge.com/rss/ai",
    subs: "RSS",
    videos: 5820,
    status: "Syncing",
    monitored: true,
    category: "Media",
  },
];

export const VIDEOS = [
  {
    id: "vd_1",
    title: "How top AI companies price usage-based plans",
    channel: "Lenny's Podcast",
    duration: "48:12",
    uploaded: "3 hours ago",
    sentiment: "Positive",
    score: 92,
    summary:
      "A deep breakdown of hybrid seat + credit pricing, why enterprise buyers prefer committed usage, and the churn signals to watch after the first renewal cycle.",
    keywords: ["usage-based pricing", "enterprise GTM", "credits", "net revenue retention"],
    companies: ["OpenAI", "Vercel", "Snowflake"],
    people: ["Lenny Rachitsky", "Elena Verna"],
    products: ["GPT-5 API", "Vercel AI Gateway"],
    topics: ["Pricing", "Monetization", "Enterprise sales"],
  },
  {
    id: "vd_2",
    title: "Inside the agent stack: orchestration, memory, evals",
    channel: "a16z",
    duration: "31:44",
    uploaded: "8 hours ago",
    sentiment: "Positive",
    score: 88,
    summary:
      "Panel maps the emerging agent infrastructure layer and argues evaluation tooling — not model choice — is becoming the primary competitive moat.",
    keywords: ["agents", "evals", "orchestration", "memory"],
    companies: ["LangChain", "Anthropic", "Braintrust"],
    people: ["Martin Casado"],
    products: ["Claude Agent SDK"],
    topics: ["Agents", "Infrastructure", "Evaluation"],
  },
  {
    id: "vd_3",
    title: "Why RSS is quietly powering AI research pipelines",
    channel: "Stratechery RSS",
    duration: "12:05",
    uploaded: "Yesterday",
    sentiment: "Neutral",
    score: 74,
    summary:
      "Argues open syndication remains the cheapest high-signal ingestion layer for competitive intelligence, with practical notes on dedupe and canonicalization.",
    keywords: ["RSS", "ingestion", "dedupe", "signal"],
    companies: ["Feedly", "VelzX"],
    people: ["Ben Thompson"],
    products: ["Feedly AI"],
    topics: ["Data pipelines", "Research ops"],
  },
  {
    id: "vd_4",
    title: "Enterprise AI budgets in 2026: where the money moves",
    channel: "Y Combinator",
    duration: "22:39",
    uploaded: "2 days ago",
    sentiment: "Positive",
    score: 84,
    summary:
      "CIO survey data suggests budget consolidation into fewer platforms, with measurable ROI reporting now a procurement gate for renewals above $100k ACV.",
    keywords: ["budgets", "procurement", "ROI", "consolidation"],
    companies: ["Microsoft", "Salesforce"],
    people: ["Garry Tan"],
    products: ["Copilot Studio"],
    topics: ["Enterprise", "Budgets"],
  },
];

export const ACTIVITY = [
  { icon: Sparkles, text: "AI summarized 42 new videos from 6 channels", time: "2m ago" },
  { icon: Bell, text: "Alert “Competitor pricing change” triggered on a16z", time: "26m ago" },
  { icon: FileText, text: "Weekly intelligence report delivered to 9 recipients", time: "1h ago" },
  { icon: Tv, text: "Channel “Fireship” monitoring paused by Ravi", time: "3h ago" },
  { icon: Activity, text: "Automation “New video → Slack #market-intel” ran 18 times", time: "5h ago" },
  { icon: BarChart3, text: "Trend spike detected: agentic AI workflows +62%", time: "Yesterday" },
] as const;

export const COMPETITORS = [
  { name: "Northwind AI", growth: "+12.4%", uploads: 18, topics: 9, share: 34, sentiment: 82 },
  { name: "Cortexa Labs", growth: "+8.1%", uploads: 12, topics: 7, share: 26, sentiment: 74 },
  { name: "Helios Insights", growth: "+3.6%", uploads: 9, topics: 6, share: 21, sentiment: 68 },
  { name: "Vantage Signal", growth: "-1.2%", uploads: 5, topics: 4, share: 19, sentiment: 61 },
];

export const RADAR_DATA = [
  { axis: "Upload cadence", you: 88, them: 64 },
  { axis: "Topic breadth", you: 76, them: 82 },
  { axis: "Sentiment", you: 84, them: 70 },
  { axis: "Engagement", you: 72, them: 78 },
  { axis: "Product mentions", you: 91, them: 58 },
  { axis: "Share of voice", you: 68, them: 74 },
];

export const PLANS = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "For evaluating VelzX on a focused watchlist.",
    features: ["5 channels", "50 AI summaries / mo", "Daily digest email", "7-day history"],
    cta: "Start Monitoring Free",
  },
  {
    name: "Starter",
    price: "$19",
    cadence: "per month",
    blurb: "For solo operators tracking a niche.",
    features: ["25 channels", "1,000 AI summaries", "Keyword alerts", "90-day history", "CSV export"],
    cta: "Unlock AI Intelligence",
  },
  {
    name: "Professional",
    price: "$49",
    cadence: "per month",
    blurb: "For marketers and analysts shipping weekly insight.",
    features: [
      "100 channels",
      "10,000 AI summaries",
      "Competitor intelligence",
      "Slack + webhook alerts",
      "PDF & Excel reports",
    ],
    cta: "Generate Insights",
    highlight: true,
  },
  {
    name: "Business",
    price: "$99",
    cadence: "per month",
    blurb: "For teams running intelligence as a function.",
    features: [
      "500 channels",
      "Unlimited summaries",
      "Automations & workflows",
      "Knowledge base + API",
      "Team roles & audit log",
    ],
    cta: "Transform Data into Decisions",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    blurb: "For regulated orgs needing control and scale.",
    features: ["Unlimited channels", "SSO / SAML & SCIM", "Private cloud region", "Custom models", "Dedicated CSM"],
    cta: "Contact Sales",
  },
];

export const FAQS = [
  {
    q: "How quickly does VelzX analyze a new video?",
    a: "Most videos are transcribed, summarized, and enriched with entities within four minutes of publication. RSS items are typically processed in under 60 seconds.",
  },
  {
    q: "Which sources can VelzX monitor?",
    a: "Any public YouTube channel or playlist, plus any RSS or Atom feed — blogs, newsrooms, changelogs, podcast feeds, and regulatory bulletins.",
  },
  {
    q: "Can I control which AI model processes my data?",
    a: "Business and Enterprise workspaces choose their summarization model and can pin a specific version for reproducible reporting across quarters.",
  },
  {
    q: "Is my workspace data used for training?",
    a: "Never. Workspace content is isolated, encrypted at rest, and excluded from any model training or evaluation set by contract.",
  },
  {
    q: "How does billing work if I exceed my plan?",
    a: "You keep working. Overage is metered in AI credits and shown live in Billing, with configurable spend caps and alerts before any charge.",
  },
  {
    q: "Do you support SSO and audit requirements?",
    a: "Yes — SAML SSO, SCIM provisioning, granular roles, retention controls, and exportable audit logs are available on Enterprise.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "VelzX replaced a four-person research rotation. We now open Monday with a briefing that used to take two days to assemble.",
    name: "Priya Raman",
    role: "VP Strategy, Northwind",
  },
  {
    quote:
      "The competitor module caught a pricing change eight days before it hit our win/loss data. That alone paid for the year.",
    name: "Daniel Okoye",
    role: "Head of Product Marketing, Cortexa",
  },
  {
    quote:
      "Our analysts stopped watching videos and started answering questions. Same headcount, roughly triple the coverage.",
    name: "Sofia Lindqvist",
    role: "Director of Insights, Helios",
  },
];

export const INTEGRATIONS = [
  "Slack",
  "Microsoft Teams",
  "Notion",
  "HubSpot",
  "Salesforce",
  "Google Sheets",
  "Zapier",
  "WordPress",
  "Discord",
  "Webhooks",
  "Linear",
  "Airtable",
];

export const SEARCH_SUGGESTIONS = [
  "What changed in competitor pricing this month?",
  "Summarize every mention of agentic workflows in the last 14 days",
  "Which products were mentioned most across my channels?",
  "Draft a LinkedIn post from this week's top insight",
];

export const ICONS = { Search };