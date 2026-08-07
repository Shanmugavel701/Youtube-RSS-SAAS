import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Bell, MessageSquare, Plus, Slack, TrendingUp, Webhook } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/app/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — real-time intelligence triggers" },
      {
        name: "description",
        content:
          "Create keyword, sentiment, and trend-spike alert rules and route them to email, Slack, or webhooks.",
      },
      { property: "og:title", content: "Alerts — VelzX" },
      { property: "og:description", content: "Know the moment something material happens." },
    ],
  }),
  component: AlertsPage,
});

const RULES = [
  {
    id: "r1",
    name: "Competitor pricing change",
    trigger: "Keyword match: pricing, packaging, per-seat",
    channel: "Slack #market-intel",
    icon: Slack,
    fired: 14,
    enabled: true,
  },
  {
    id: "r2",
    name: "Negative sentiment spike",
    trigger: "Sentiment drops below 45 across 3+ sources",
    channel: "Email — leadership@",
    icon: Bell,
    fired: 3,
    enabled: true,
  },
  {
    id: "r3",
    name: "Trend velocity > 50%",
    trigger: "Topic mentions grow 50% week over week",
    channel: "Webhook — ops.internal",
    icon: Webhook,
    fired: 8,
    enabled: true,
  },
  {
    id: "r4",
    name: "Own brand mention",
    trigger: "Any mention of VelzX or our products",
    channel: "Slack #brand",
    icon: MessageSquare,
    fired: 27,
    enabled: false,
  },
];

const FEED = [
  { rule: "Competitor pricing change", detail: "Northwind AI moved to hybrid seat + credit pricing", time: "26m ago", severity: "High" },
  { rule: "Trend velocity > 50%", detail: "“agentic workflows” up 62% week over week", time: "2h ago", severity: "Medium" },
  { rule: "Own brand mention", detail: "VelzX referenced in Lenny's Podcast (12:07)", time: "5h ago", severity: "Low" },
  { rule: "Negative sentiment spike", detail: "Category sentiment fell to 41 across 4 sources", time: "Yesterday", severity: "High" },
];

function AlertsPage() {
  const [rules, setRules] = useState(RULES);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts"
        description="Rules that watch your sources continuously and notify the right people the moment something changes."
        actions={
          <Button variant="hero" size="sm" onClick={() => toast.success("Rule builder opened")}>
            <Plus /> New rule
          </Button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <div className="space-y-3">
          {rules.map((r) => (
            <div key={r.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-primary">
                <r.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.trigger}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="rounded-full font-normal">
                    {r.channel}
                  </Badge>
                  <span>fired {r.fired}× / 30d</span>
                </div>
              </div>
              <Switch
                checked={r.enabled}
                aria-label={`Enable ${r.name}`}
                onCheckedChange={(v) => {
                  setRules((prev) => prev.map((x) => (x.id === r.id ? { ...x, enabled: v } : x)));
                  toast.success(`${r.name} ${v ? "enabled" : "disabled"}`);
                }}
              />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="size-4 text-primary" /> Alert feed
          </h2>
          <ul className="mt-4 divide-y divide-border">
            {FEED.map((f, i) => (
              <li key={i} className="py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-muted-foreground">{f.rule}</p>
                  <Badge
                    variant="secondary"
                    className={`rounded-full text-[0.65rem] ${
                      f.severity === "High"
                        ? "bg-destructive/15 text-destructive"
                        : f.severity === "Medium"
                          ? "bg-warning/15 text-warning"
                          : ""
                    }`}
                  >
                    {f.severity}
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm">{f.detail}</p>
                <p className="mt-1 text-xs text-muted-foreground">{f.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}