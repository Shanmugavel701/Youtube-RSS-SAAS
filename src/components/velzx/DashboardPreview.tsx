import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowUpRight, Bell, Search, Sparkles } from "lucide-react";
import { KPIS, TRENDING_TOPICS, VOLUME_SERIES } from "@/data/velzx";

export function DashboardPreview() {
  return (
    <div className="relative rounded-3xl border border-border bg-card p-2 shadow-card">
      <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-background">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/60" />
            <span className="size-2.5 rounded-full bg-warning/70" />
            <span className="size-2.5 rounded-full bg-success/70" />
          </div>
          <div className="ml-2 flex h-7 flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 text-xs text-muted-foreground">
            <Search className="size-3.5" />
            Ask VelzX: what changed in competitor pricing this week?
          </div>
          <Bell className="size-4 text-muted-foreground" />
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-3">
          {KPIS.slice(0, 3).map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {k.label}
                <k.icon className="size-3.5 text-primary" />
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{k.value}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-success">
                <ArrowUpRight className="size-3" />
                {k.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 px-4 pb-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Analysis throughput</p>
              <span className="text-xs text-muted-foreground">Last 7 days</span>
            </div>
            <div className="mt-3 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VOLUME_SERIES}>
                  <defs>
                    <linearGradient id="previewFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="videos"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    fill="url(#previewFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="size-4 text-primary" /> Trending topics
            </p>
            <ul className="mt-3 space-y-3">
              {TRENDING_TOPICS.slice(0, 4).map((t) => (
                <li key={t.topic} className="text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-foreground">{t.topic}</span>
                    <span className="text-success">{t.change}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-brand"
                      style={{ width: `${Math.min(100, t.mentions / 4.5)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}