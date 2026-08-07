import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Building2, CircleCheck, Server, TriangleAlert, Users } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Badge } from "@/components/ui/badge";
import { VOLUME_SERIES } from "@/data/velzx";

export const Route = createFileRoute("/app/admin")({
  head: () => ({
    meta: [
      { title: "Admin — platform health and tenants" },
      {
        name: "description",
        content: "Platform-level view of tenants, ingestion health, queue depth, and system incidents.",
      },
      { property: "og:title", content: "Admin — VelzX" },
      { property: "og:description", content: "Tenant, pipeline, and system health at a glance." },
    ],
  }),
  component: AdminPage,
});

const STATS = [
  { label: "Workspaces", value: "1,284", icon: Building2 },
  { label: "Active users", value: "9,417", icon: Users },
  { label: "Ingestion jobs / hr", value: "48.2k", icon: Activity },
  { label: "Queue depth", value: "312", icon: Server },
];

const SERVICES = [
  { name: "Ingestion workers", status: "Operational", uptime: "99.99%" },
  { name: "Transcription pipeline", status: "Operational", uptime: "99.97%" },
  { name: "AI analysis queue", status: "Degraded", uptime: "99.41%" },
  { name: "Search index", status: "Operational", uptime: "99.98%" },
  { name: "Webhook delivery", status: "Operational", uptime: "99.95%" },
];

const TENANTS = [
  { name: "Northlane Analytics", plan: "Growth", seats: 4, sources: 146 },
  { name: "Halcyon Ventures", plan: "Enterprise", seats: 38, sources: 912 },
  { name: "Bright Harbor Media", plan: "Starter", seats: 2, sources: 21 },
  { name: "Orbit Robotics", plan: "Growth", seats: 9, sources: 208 },
];

function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin"
        description="Platform operations: tenant footprint, pipeline throughput, and service health."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-primary">
                <s.icon className="size-4" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Pipeline throughput</h2>
          <p className="text-xs text-muted-foreground">Items processed across all tenants</p>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VOLUME_SERIES}>
                <defs>
                  <linearGradient id="adminFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="videos" name="Items" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#adminFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Service health</h2>
          <ul className="mt-4 divide-y divide-border">
            {SERVICES.map((s) => {
              const ok = s.status === "Operational";
              return (
                <li key={s.name} className="flex items-center justify-between gap-3 py-3.5">
                  <span className="flex items-center gap-2.5 text-sm">
                    {ok ? (
                      <CircleCheck className="size-4 text-success" />
                    ) : (
                      <TriangleAlert className="size-4 text-warning" />
                    )}
                    {s.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{s.uptime}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="text-sm font-semibold">Tenants</h2>
        <ul className="mt-4 divide-y divide-border">
          {TENANTS.map((t) => (
            <li key={t.name} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.seats} seats · {t.sources} sources
                </p>
              </div>
              <Badge variant="secondary" className="rounded-full text-xs">
                {t.plan}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}