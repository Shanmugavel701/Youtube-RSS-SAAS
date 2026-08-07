import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { CalendarClock, Download, FileText, Mail, Plus, Users } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Reports — scheduled intelligence briefings" },
      {
        name: "description",
        content:
          "Build, schedule, and deliver executive intelligence briefings assembled automatically from monitored sources.",
      },
      { property: "og:title", content: "Reports — VelzX" },
      { property: "og:description", content: "Executive briefings, delivered on schedule." },
    ],
  }),
  component: ReportsPage,
});

const TEMPLATES = [
  {
    name: "Weekly market briefing",
    blurb: "Top movements, sentiment shifts, and three recommended actions.",
    cadence: "Every Monday, 07:00",
    recipients: 9,
    status: "Active",
  },
  {
    name: "Competitor pricing digest",
    blurb: "Pricing-page edits, packaging language, and tier changes across tracked rivals.",
    cadence: "1st of month",
    recipients: 4,
    status: "Active",
  },
  {
    name: "Product mention roundup",
    blurb: "Every mention of your products with tone, context, and timestamped source.",
    cadence: "Every Friday, 16:00",
    recipients: 12,
    status: "Paused",
  },
];

const RECENT = [
  { name: "Weekly market briefing — Week 12", date: "Mar 18, 2026", pages: 6 },
  { name: "Competitor pricing digest — March", date: "Mar 01, 2026", pages: 4 },
  { name: "Weekly market briefing — Week 11", date: "Mar 11, 2026", pages: 7 },
  { name: "Product mention roundup — Week 10", date: "Mar 06, 2026", pages: 3 },
];

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Turn a week of monitoring into a briefing your leadership team will actually read."
        actions={
          <Button variant="hero" size="sm" onClick={() => toast.success("Report builder opened")}>
            <Plus /> New report
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.name} className="card-lift flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-primary">
                <FileText className="size-4" />
              </span>
              <Badge
                variant="secondary"
                className={`rounded-full text-xs ${t.status === "Active" ? "bg-success/15 text-success" : ""}`}
              >
                {t.status}
              </Badge>
            </div>
            <h2 className="mt-4 text-sm font-semibold">{t.name}</h2>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{t.blurb}</p>
            <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-3.5" /> {t.cadence}
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-3.5" /> {t.recipients} recipients
              </div>
            </dl>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.success("Preview ready")}>
                Preview
              </Button>
              <Button variant="soft" size="sm" className="flex-1" onClick={() => toast.success("Sent to recipients")}>
                <Mail /> Send now
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="text-sm font-semibold">Recent deliveries</h2>
        <ul className="mt-4 divide-y divide-border">
          {RECENT.map((r) => (
            <li key={r.name} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.date} · {r.pages} pages
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => toast.success("Downloading PDF")}>
                <Download /> PDF
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}