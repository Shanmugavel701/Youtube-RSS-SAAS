import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Building2,
  FileText,
  Linkedin,
  Mail,
  Package,
  Play,
  ScrollText,
  Sparkles,
  Twitter,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VIDEOS } from "@/data/velzx";

export const Route = createFileRoute("/app/videos")({
  head: () => ({
    meta: [
      { title: "Videos — VelzX AI analysis" },
      {
        name: "description",
        content:
          "Read AI summaries, entities, sentiment, and generated content for every analyzed video and feed item.",
      },
      { property: "og:title", content: "Video intelligence — VelzX" },
      {
        property: "og:description",
        content: "Summaries, entities, sentiment, and one-click content generation.",
      },
    ],
  }),
  component: VideosPage,
});

const GENERATORS = [
  { label: "Generate blog", icon: FileText },
  { label: "Generate LinkedIn", icon: Linkedin },
  { label: "Generate tweet", icon: Twitter },
  { label: "Generate newsletter", icon: Mail },
];

function VideosPage() {
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const active = VIDEOS.find((v) => v.id === activeId)!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Videos"
        description="Every analyzed item, enriched with summaries, entities, sentiment, and ready-to-publish content."
        actions={
          <Button variant="hero" size="sm" onClick={() => toast.success("Opening AI chat for this item")}>
            <Sparkles /> Ask AI about this video
          </Button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[22rem_1fr]">
        {/* List */}
        <div className="space-y-3">
          {VIDEOS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveId(v.id)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                v.id === activeId
                  ? "border-primary bg-brand-soft/60 shadow-soft"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex gap-3">
                <span className="grid h-14 w-20 shrink-0 place-items-center rounded-lg bg-gradient-brand text-[0.7rem] font-medium text-brand-foreground">
                  {v.duration}
                </span>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium">{v.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {v.channel} · {v.uploaded}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <article className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="grid gap-5 sm:grid-cols-[16rem_1fr]">
            <div className="relative grid aspect-video place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
              <Play className="size-8" />
              <span className="absolute right-2 bottom-2 rounded-md bg-black/40 px-2 py-0.5 text-xs">
                {active.duration}
              </span>
            </div>
            <div>
              <h2 className="text-lg leading-snug font-semibold">{active.title}</h2>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {active.channel} · uploaded {active.uploaded}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="rounded-full bg-success/15 text-success hover:bg-success/15">
                  {active.sentiment} sentiment
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  Relevance {active.score}/100
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.success("Transcript opened")}>
                  <ScrollText /> Read transcript
                </Button>
                <Button variant="hero" size="sm" onClick={() => toast.success("AI chat ready")}>
                  <Sparkles /> Ask AI
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="summary" className="mt-7">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="entities">Entities</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="generate">Generate</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-5">
              <p className="text-sm leading-relaxed">{active.summary}</p>
              <h3 className="mt-6 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Keywords
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {active.keywords.map((k) => (
                  <Badge key={k} variant="secondary" className="rounded-full font-normal">
                    {k}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="entities" className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Companies", icon: Building2, items: active.companies },
                { title: "People", icon: Users, items: active.people },
                { title: "Products", icon: Package, items: active.products },
              ].map((group) => (
                <div key={group.title} className="rounded-xl border border-border p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold">
                    <group.icon className="size-3.5 text-primary" /> {group.title}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {group.items.map((i) => (
                      <li key={i} className="text-muted-foreground">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="topics" className="mt-5">
              <div className="flex flex-wrap gap-2">
                {active.topics.map((t) => (
                  <Badge key={t} variant="outline" className="rounded-full">
                    {t}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="generate" className="mt-5 grid gap-3 sm:grid-cols-2">
              {GENERATORS.map((g) => (
                <button
                  key={g.label}
                  onClick={() => toast.success(`${g.label} — draft ready`)}
                  className="card-lift flex items-center gap-3 rounded-xl border border-border p-4 text-left text-sm font-medium"
                >
                  <g.icon className="size-4 text-primary" />
                  {g.label}
                </button>
              ))}
            </TabsContent>
          </Tabs>
        </article>
      </div>
    </div>
  );
}