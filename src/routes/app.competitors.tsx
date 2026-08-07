import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, Swords } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Badge } from "@/components/ui/badge";
import { COMPETITORS, RADAR_DATA } from "@/data/velzx";

export const Route = createFileRoute("/app/competitors")({
  head: () => ({
    meta: [
      { title: "Competitor Intelligence — VelzX" },
      {
        name: "description",
        content:
          "Benchmark share of voice, publishing cadence, sentiment, and messaging shifts against every tracked competitor.",
      },
      { property: "og:title", content: "Competitor Intelligence — VelzX" },
      {
        property: "og:description",
        content: "Side-by-side benchmarking across share of voice, cadence, and sentiment.",
      },
    ],
  }),
  component: CompetitorsPage,
});

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Competitor Intelligence"
        description="How the market talks about your category — and how your competitors are positioning week over week."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {COMPETITORS.map((c) => {
          const down = c.growth.startsWith("-");
          return (
            <div key={c.name} className="card-lift rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.uploads} uploads / 30d</p>
                </div>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-primary">
                  <Swords className="size-4" />
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Share of voice</p>
                  <p className="text-xl font-semibold tracking-tight">{c.share}%</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    down ? "text-destructive" : "text-success"
                  }`}
                >
                  {down ? <ArrowDownRight className="size-3" /> : <ArrowUpRight className="size-3" />}
                  {c.growth}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${c.share * 2.4}%` }} />
              </div>
              <Badge variant="secondary" className="mt-4 rounded-full text-xs">
                Sentiment {c.sentiment}/100
              </Badge>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Positioning radar</h2>
          <p className="text-xs text-muted-foreground">Normalized messaging strength by dimension</p>
          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Radar
                  name="You"
                  dataKey="you"
                  stroke="var(--color-chart-1)"
                  fill="var(--color-chart-1)"
                  fillOpacity={0.28}
                />
                <Radar
                  name="Market avg"
                  dataKey="them"
                  stroke="var(--color-chart-2)"
                  fill="var(--color-chart-2)"
                  fillOpacity={0.18}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Publishing cadence</h2>
          <p className="text-xs text-muted-foreground">Uploads per competitor, trailing 30 days</p>
          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPETITORS} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="uploads" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}