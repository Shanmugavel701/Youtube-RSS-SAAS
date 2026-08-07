import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { BookOpen, LifeBuoy, MessageCircle, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/velzx";

export const Route = createFileRoute("/app/help")({
  head: () => ({
    meta: [
      { title: "Help & support — VelzX" },
      {
        name: "description",
        content: "Guides, walkthroughs, FAQs, and direct support for your VelzX workspace.",
      },
      { property: "og:title", content: "Help & support — VelzX" },
      { property: "og:description", content: "Answers, guides, and a human when you need one." },
    ],
  }),
  component: HelpPage,
});

const RESOURCES = [
  { title: "Getting started guide", desc: "Set up your first watchlist in under ten minutes.", icon: BookOpen },
  { title: "Product walkthrough", desc: "A 6-minute tour of dashboards, search, and reports.", icon: PlayCircle },
  { title: "Talk to support", desc: "Average first response time: 42 minutes.", icon: MessageCircle },
];

function HelpPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & support"
        description="Everything you need to get more out of VelzX — plus a real human when documentation isn't enough."
        actions={
          <Button variant="hero" size="sm" onClick={() => toast.success("Support chat opened")}>
            <LifeBuoy /> Contact support
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <button
            key={r.title}
            onClick={() => toast.success(`Opening ${r.title}`)}
            className="card-lift rounded-2xl border border-border bg-card p-5 text-left shadow-soft"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-primary">
              <r.icon className="size-4" />
            </span>
            <p className="mt-4 text-sm font-semibold">{r.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-sm font-semibold">Frequently asked</h2>
        <Accordion type="single" collapsible className="mt-3">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}