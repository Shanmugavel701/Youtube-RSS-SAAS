import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, Plug } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INTEGRATIONS } from "@/data/velzx";

export const Route = createFileRoute("/app/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — connect VelzX to your stack" },
      {
        name: "description",
        content: "Route VelzX intelligence into Slack, Notion, HubSpot, Linear, Sheets, and webhooks.",
      },
      { property: "og:title", content: "Integrations — VelzX" },
      { property: "og:description", content: "Deliver insight where your team already works." },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const [connected, setConnected] = useState<string[]>(["Slack", "Notion"]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="VelzX is only useful where decisions get made. Connect the tools your team already opens every day."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((i) => {
          const name = typeof i === "string" ? i : i.name;
          const blurb =
            typeof i === "string" ? "Push summaries, alerts, and reports automatically." : i.blurb;
          const isOn = connected.includes(name);
          return (
            <div key={name} className="card-lift flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-primary">
                  <Plug className="size-4" />
                </span>
                {isOn && (
                  <Badge variant="secondary" className="rounded-full bg-success/15 text-xs text-success">
                    <Check className="size-3" /> Connected
                  </Badge>
                )}
              </div>
              <h2 className="mt-4 text-sm font-semibold">{name}</h2>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{blurb}</p>
              <Button
                variant={isOn ? "outline" : "soft"}
                size="sm"
                className="mt-5"
                onClick={() => {
                  setConnected((prev) =>
                    isOn ? prev.filter((n) => n !== name) : [...prev, name],
                  );
                  toast.success(`${name} ${isOn ? "disconnected" : "connected"}`);
                }}
              >
                {isOn ? "Disconnect" : "Connect"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}