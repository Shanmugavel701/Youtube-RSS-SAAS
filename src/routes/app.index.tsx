import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  FileText,
  Plus,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/velzx/PageHeader";
import {
  ACTIVITY,
  COMPETITORS,
  KPIS,
  SENTIMENT_SERIES,
  TRENDING_TOPICS,
  VIDEOS,
  VOLUME_SERIES,
} from "@/data/velzx";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — VelzX Intelligence" },
      {
        name: "description",
        content:
          "Your live intelligence overview: analysis throughput, trending topics, latest videos, competitor movement, and workspace activity.",
      },
      { property: "og:title", content: "VelzX Dashboard" },
      { property: "og:description", content: "Live AI intelligence across every monitored source." },
    ],
  }),
  component: DashboardPage,
});

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

const QUICK_ACTIONS = [
  { label: "Add channel", to: "/app/channels", icon: Plus },
  { label: "Ask AI", to: "/app/search", icon: Sparkles },
  { label: "Build report", to: "/app/reports", icon: FileText },
  { label: "New alert rule", to: "/app/alerts", icon: Bell },
];

function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, Priya"
        description="42 new items analyzed since your last visit. Two trends crossed their alert threshold overnight."
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link to="/app/reports">
                <FileText /> Export briefing
              </Link>
            </Button>
            <Button asChild variant="hero" size="sm">
              <Link to="/app/search">
                <Sparkles /> Ask VelzX
              </Link>
            </Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((k) => (
          <div key={k.label} className="card-lift rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{k.label}</span>
              <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-primary">
                <k.icon className="size-4" />
              </span>
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">{k.value}</div>
            <div
              className={`mt-1 inline-flex items-center gap-1 text-xs ${
                k.trend === "up" ? "text-success" : "text-muted-foreground"
              }`}
            >
              {k.trend === "up" && <ArrowUpRight className="size-3" />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="card-lift flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium shadow-soft"
          >
            <span className="flex items-center gap-2.5">
              <a.icon className="size-4 text-primary" />
              {a.label}
            </span>
            <ArrowRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold">Analysis throughput</h2>
              <p className="text-xs text-muted-foreground">Videos ingested vs. insights generated</p>
            </div>
            <Badge variant="secondary" className="rounded-full text-xs">
              Last 7 days
            </Badge>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VOLUME_SERIES}>
                <defs>
                  <linearGradient id="dashVideos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="dashInsights" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="videos" name="Videos" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#dashVideos)" />
                <Area type="monotone" dataKey="insights" name="Insights" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#dashInsights)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="size-4 text-primary" /> Trending topics
          </h2>
          <ul className="mt-5 space-y-4">
            {TRENDING_TOPICS.map((t) => (
              <li key={t.topic}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate">{t.topic}</span>
                  <span className="text-xs font-medium text-success">{t.change}</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-brand"
                      style={{ width: `${Math.min(100, t.mentions / 4.5)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{t.mentions}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Latest videos + sentiment */}
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Video className="size-4 text-primary" /> Latest analyzed videos
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/videos">
                View all <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {VIDEOS.map((v) => (
              <li key={v.id} className="flex gap-4 py-4">
                <div className="grid h-16 w-28 shrink-0 place-items-center rounded-lg bg-gradient-brand text-xs font-medium text-brand-foreground">
                  {v.duration}
                </div>
                <div className="min-w-0">
                  <Link
                    to="/app/videos"
                    className="line-clamp-1 text-sm font-medium hover:text-primary"
                  >
                    {v.title}
                  </Link>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {v.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.7rem] text-muted-foreground">
                    <span>{v.channel}</span>
                    <span>·</span>
                    <span>{v.uploaded}</span>
                    <Badge
                      variant="secondary"
                      className="rounded-full text-[0.65rem] font-medium"
                    >
                      {v.sentiment} · {v.score}
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="text-sm font-semibold">Sentiment mix</h2>
            <p className="text-xs text-muted-foreground">Share of coverage tone by week</p>
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SENTIMENT_SERIES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="positive" stackId="a" fill="var(--color-chart-3)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="neutral" stackId="a" fill="var(--color-chart-2)" />
                  <Bar dataKey="negative" stackId="a" fill="var(--color-chart-4)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="text-sm font-semibold">Competitor summary</h2>
            <ul className="mt-4 space-y-3">
              {COMPETITORS.map((c) => (
                <li key={c.name} className="flex items-center justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="flex items-center gap-3 text-xs text-muted-foreground">
                    {c.uploads} uploads
                    <span
                      className={
                        c.growth.startsWith("-") ? "text-destructive" : "text-success"
                      }
                    >
                      {c.growth}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Activity timeline */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="text-sm font-semibold">Activity timeline</h2>
        <ol className="mt-5 space-y-5">
          {ACTIVITY.map((a, i) => (
            <li key={i} className="relative flex gap-4 pl-1">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                <a.icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm">{a.text}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}