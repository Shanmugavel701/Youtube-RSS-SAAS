import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, Plus, Workflow, Zap } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/app/automations")({
  head: () => ({
    meta: [
      { title: "Automations — trigger, condition, action" },
      {
        name: "description",
        content:
          "Wire monitored events to the tools your team already uses with trigger → condition → action automations.",
      },
      { property: "og:title", content: "Automations — VelzX" },
      { property: "og:description", content: "Turn insight into action without human hand-offs." },
    ],
  }),
  component: AutomationsPage,
});

const FLOWS = [
  {
    id: "f1",
    name: "New competitor video → Slack",
    trigger: "New video on a tracked competitor",
    condition: "Relevance score ≥ 80",
    action: "Post summary to Slack #market-intel",
    runs: 218,
    enabled: true,
  },
  {
    id: "f2",
    name: "Pricing mention → Notion doc",
    trigger: "Keyword match: pricing, packaging",
    condition: "Source category is Competitor",
    action: "Append row to Notion pricing tracker",
    runs: 46,
    enabled: true,
  },
  {
    id: "f3",
    name: "Weekly digest → LinkedIn draft",
    trigger: "Every Friday 15:00",
    condition: "At least 5 new insights",
    action: "Generate LinkedIn post draft",
    runs: 12,
    enabled: false,
  },
];

const RECIPES = [
  "Escalate high-severity alerts to PagerDuty",
  "Push new insights into HubSpot deal notes",
  "Create Linear issue from product feedback mention",
  "Email founders when a competitor raises funding",
];

function AutomationsPage() {
  const [flows, setFlows] = useState(FLOWS);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Automations"
        description="Connect what VelzX detects to what your team does next — no manual triage in between."
        actions={
          <Button variant="hero" size="sm" onClick={() => toast.success("Automation builder opened")}>
            <Plus /> New automation
          </Button>
        }
      />

      <div className="space-y-3">
        {flows.map((f) => (
          <div key={f.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-primary">
                  <Workflow className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.runs} runs / 30d</p>
                </div>
              </div>
              <Switch
                checked={f.enabled}
                aria-label={`Enable ${f.name}`}
                onCheckedChange={(v) => {
                  setFlows((prev) => prev.map((x) => (x.id === f.id ? { ...x, enabled: v } : x)));
                  toast.success(`${f.name} ${v ? "enabled" : "paused"}`);
                }}
              />
            </div>
            <div className="mt-5 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {[
                { label: "Trigger", value: f.trigger },
                { label: "Condition", value: f.condition },
                { label: "Action", value: f.action },
              ].map((step, i) => (
                <div key={step.label} className="contents">
                  <div className="rounded-xl border border-border bg-background p-3.5">
                    <p className="text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase">
                      {step.label}
                    </p>
                    <p className="mt-1 text-xs">{step.value}</p>
                  </div>
                  {i < 2 && (
                    <ArrowRight className="mx-auto hidden size-4 text-muted-foreground md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Zap className="size-4 text-primary" /> Recipe library
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {RECIPES.map((r) => (
            <button
              key={r}
              onClick={() => toast.success("Recipe added")}
              className="card-lift flex items-center justify-between gap-3 rounded-xl border border-border p-4 text-left text-sm"
            >
              {r}
              <Plus className="size-4 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}