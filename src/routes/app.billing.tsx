import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, CreditCard, Download, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/data/velzx";

export const Route = createFileRoute("/app/billing")({
  head: () => ({
    meta: [
      { title: "Billing & usage — VelzX workspace" },
      {
        name: "description",
        content: "Review plan usage, AI credit consumption, payment method, and invoice history.",
      },
      { property: "og:title", content: "Billing — VelzX" },
      { property: "og:description", content: "Plan, usage, and invoices in one place." },
    ],
  }),
  component: BillingPage,
});

const USAGE = [
  { label: "AI summaries", used: 6420, limit: 10000 },
  { label: "Monitored channels", used: 146, limit: 500 },
  { label: "AI search queries", used: 812, limit: 2000 },
  { label: "Report deliveries", used: 34, limit: 100 },
];

const INVOICES = [
  { id: "INV-2026-031", date: "Mar 01, 2026", amount: "$149.00", status: "Paid" },
  { id: "INV-2026-022", date: "Feb 01, 2026", amount: "$149.00", status: "Paid" },
  { id: "INV-2026-011", date: "Jan 01, 2026", amount: "$149.00", status: "Paid" },
];

function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & usage"
        description="You're on the Growth plan, renewing April 1, 2026."
        actions={
          <Button variant="hero" size="sm" onClick={() => toast.success("Upgrade flow opened")}>
            <Sparkles /> Upgrade plan
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {USAGE.map((u) => {
          const pct = Math.round((u.used / u.limit) * 100);
          return (
            <div key={u.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="text-xs text-muted-foreground">{u.label}</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">
                {u.used.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / {u.limit.toLocaleString()}
                </span>
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{pct}% of monthly allowance</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-2xl border p-6 shadow-soft ${
              p.name === "Growth" ? "border-primary bg-brand-soft/50" : "border-border bg-card"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{p.name}</h2>
              {p.name === "Growth" && (
                <Badge className="rounded-full bg-gradient-brand text-xs text-brand-foreground">
                  Current
                </Badge>
              )}
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {p.price}
              <span className="text-xs font-normal text-muted-foreground"> {p.cadence}</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.blurb}</p>
            <ul className="mt-4 flex-1 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={p.name === "Growth" ? "outline" : "soft"}
              size="sm"
              className="mt-5"
              onClick={() => toast.success(`${p.name} selected`)}
            >
              {p.name === "Growth" ? "Manage plan" : p.cta}
            </Button>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Payment method</h2>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-4">
            <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-primary">
              <CreditCard className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium">Visa ending 4242</p>
              <p className="text-xs text-muted-foreground">Expires 04 / 2028</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => toast.success("Card update opened")}>
            Update card
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Invoices</h2>
          <ul className="mt-4 divide-y divide-border">
            {INVOICES.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 py-3.5">
                <div>
                  <p className="text-sm font-medium">{i.id}</p>
                  <p className="text-xs text-muted-foreground">{i.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{i.amount}</span>
                  <Badge variant="secondary" className="rounded-full bg-success/15 text-xs text-success">
                    {i.status}
                  </Badge>
                  <Button variant="ghost" size="icon" aria-label={`Download ${i.id}`} onClick={() => toast.success("Downloading")}>
                    <Download />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}