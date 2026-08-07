import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, FolderOpen, Search, Star, Tag } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Base — your saved intelligence" },
      {
        name: "description",
        content:
          "A searchable library of saved insights, summaries, and research collections built from monitored sources.",
      },
      { property: "og:title", content: "Knowledge Base — VelzX" },
      { property: "og:description", content: "Every insight worth keeping, organized and searchable." },
    ],
  }),
  component: KnowledgePage,
});

const COLLECTIONS = [
  { name: "Pricing & packaging", count: 38 },
  { name: "Agent infrastructure", count: 52 },
  { name: "Enterprise buying signals", count: 24 },
  { name: "Category narratives", count: 19 },
];

const ENTRIES = [
  {
    title: "Hybrid seat + credit pricing is becoming the category default",
    excerpt:
      "Across 14 vendor announcements, seat-only pricing appears in only three. Buyers accept credits when consumption maps to a business outcome they already measure.",
    tags: ["Pricing", "Enterprise"],
    saved: "Mar 18, 2026",
    starred: true,
  },
  {
    title: "Evaluation tooling is the emerging moat, not model choice",
    excerpt:
      "Panelists repeatedly framed model swaps as commodity operations, while eval suites and memory design were described as multi-quarter engineering investments.",
    tags: ["Agents", "Infrastructure"],
    saved: "Mar 17, 2026",
    starred: true,
  },
  {
    title: "Procurement cycles compress when ROI is pre-quantified",
    excerpt:
      "Deals with a documented baseline metric closed in 31 days on average versus 74 for capability-led pitches.",
    tags: ["GTM", "Sales"],
    saved: "Mar 15, 2026",
    starred: false,
  },
  {
    title: "Category language is shifting from “AI-powered” to “decision speed”",
    excerpt:
      "Positioning copy across tracked competitors moved measurably toward outcome verbs over the last two quarters.",
    tags: ["Positioning", "Brand"],
    saved: "Mar 12, 2026",
    starred: false,
  },
];

function KnowledgePage() {
  const [query, setQuery] = useState("");
  const filtered = ENTRIES.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Base"
        description="Saved insights become institutional memory — searchable, taggable, and citable months later."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COLLECTIONS.map((c) => (
          <div key={c.name} className="card-lift rounded-2xl border border-border bg-card p-5 shadow-soft">
            <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-primary">
              <FolderOpen className="size-4" />
            </span>
            <p className="mt-4 text-sm font-semibold">{c.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.count} saved insights</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search saved insights"
          className="pl-9"
          aria-label="Search saved insights"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((e) => (
          <article key={e.title} className="card-lift rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm leading-snug font-semibold">{e.title}</h2>
              <Star
                className={`size-4 shrink-0 ${e.starred ? "fill-warning text-warning" : "text-muted-foreground"}`}
              />
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{e.excerpt}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {e.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full font-normal">
                  <Tag className="size-3" /> {t}
                </Badge>
              ))}
              <span className="ml-auto text-xs text-muted-foreground">{e.saved}</span>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-soft">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-primary">
            <BookOpen className="size-5" />
          </span>
          <p className="mt-4 text-sm font-medium">Nothing saved matches “{query}”</p>
          <p className="mt-1 text-xs text-muted-foreground">Save an insight from any video to start a collection.</p>
        </div>
      )}
    </div>
  );
}