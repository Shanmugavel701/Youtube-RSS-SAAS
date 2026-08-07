import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketingHeader } from "@/components/velzx/MarketingHeader";
import { MarketingFooter } from "@/components/velzx/MarketingFooter";
import { DashboardPreview } from "@/components/velzx/DashboardPreview";
import { Section, SectionHeading } from "@/components/velzx/Section";
import { FAQS, INTEGRATIONS, PLANS, TESTIMONIALS } from "@/data/velzx";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  Building2,
  Check,
  CircleDot,
  Gauge,
  Languages,
  LineChart,
  Play,
  Quote,
  Radar,
  Rss,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Tags,
  Terminal,
  Workflow,
  Youtube,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VelzX — Turn Every Video Into Business Intelligence" },
      {
        name: "description",
        content:
          "VelzX monitors YouTube channels and RSS feeds, summarizes videos with AI, detects trends, and delivers actionable insights in minutes.",
      },
      { property: "og:title", content: "VelzX — Turn Every Video Into Business Intelligence" },
      {
        property: "og:description",
        content:
          "Monitor. Analyze. Discover. Decide. AI-powered intelligence from every channel and feed that matters to your market.",
      },
    ],
  }),
  component: Landing,
});

const LOGOS = ["Northwind", "Cortexa", "Helios", "Vantage", "Lumen", "Arclight"];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI video summaries",
    body: "Every upload becomes a structured brief: thesis, claims, numbers, and the decisions it should trigger.",
  },
  {
    icon: LineChart,
    title: "Trend detection",
    body: "Statistical spike detection across topics, so you see momentum weeks before it reaches the mainstream.",
  },
  {
    icon: Radar,
    title: "Competitor monitoring",
    body: "Track cadence, positioning shifts, product mentions, and share of voice against your named rivals.",
  },
  {
    icon: Rss,
    title: "RSS + YouTube ingestion",
    body: "One pipeline for channels, playlists, newsrooms, blogs, and changelogs — deduplicated and canonicalized.",
  },
  {
    icon: Tags,
    title: "Entity & brand recognition",
    body: "Companies, people, products, and technologies extracted and linked into a searchable graph.",
  },
  {
    icon: Languages,
    title: "Sentiment & narrative",
    body: "Understand how the market talks about you, not just how often — per channel, per topic, over time.",
  },
  {
    icon: ScanSearch,
    title: "Answer-grade AI search",
    body: "Ask questions across everything you monitor and get answers with timestamped, citable sources.",
  },
  {
    icon: BellRing,
    title: "Alerts that matter",
    body: "Rule-based triggers to email, Slack, Discord, or webhook — keyword, company, product, or channel scoped.",
  },
  {
    icon: Workflow,
    title: "Automations",
    body: "If-this-then-that workflows that push finished insight into your CRM, CMS, or data warehouse.",
  },
  {
    icon: BookOpen,
    title: "Knowledge base",
    body: "Collections, folders, tags, and bookmarks turn scattered research into durable institutional memory.",
  },
  {
    icon: Terminal,
    title: "Developer API",
    body: "REST and webhooks over every object, with typed SDKs and generous rate limits on Business plans.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise controls",
    body: "SSO, SCIM, retention policies, audit logs, and regional processing for regulated workspaces.",
  },
];

const STEPS = [
  {
    icon: Youtube,
    title: "Connect your sources",
    body: "Add YouTube channels, playlists, and any RSS feed. VelzX backfills history and watches for new items continuously.",
  },
  {
    icon: Sparkles,
    title: "AI extracts the substance",
    body: "Transcription, summarization, keywords, entities, sentiment, and topic clustering run automatically per item.",
  },
  {
    icon: Gauge,
    title: "Insight reaches your team",
    body: "Dashboards, alerts, reports, and automations deliver conclusions where your team already works.",
  },
];

const BENEFITS = [
  { stat: "94%", label: "less manual research time", detail: "Median across 120 workspaces" },
  { stat: "4 min", label: "from upload to insight", detail: "P50 end-to-end processing" },
  { stat: "12.4M", label: "items analyzed to date", detail: "Videos and feed entries" },
  { stat: "99.98%", label: "ingestion uptime", detail: "Trailing 12 months" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden px-5 pt-16 pb-20 lg:px-8 lg:pt-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 grid-backdrop opacity-70" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
          />
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="animate-rise gap-2 rounded-full border-border bg-card/80 px-3 py-1 text-xs font-medium backdrop-blur"
              >
                <CircleDot className="size-3 text-primary" />
                Monitor. Analyze. Discover. Decide.
              </Badge>
              <h1 className="animate-rise mt-6 text-4xl leading-[1.05] font-semibold sm:text-6xl lg:text-[4.25rem]">
                Turn Every Video Into <span className="text-gradient-brand">Business Intelligence.</span>
              </h1>
              <p className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                VelzX automatically monitors YouTube channels and RSS feeds, summarizes videos with
                AI, detects trends, and delivers actionable insights in minutes.
              </p>
              <div className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/signup">
                    Start Free <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <a href="#cta">Book Demo</a>
                </Button>
                <Button asChild variant="ghost" size="xl">
                  <a href="#dashboard-preview">
                    <Play /> Watch Demo
                  </a>
                </Button>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                No credit card required · 5 channels free forever · Setup in under 3 minutes
              </p>
            </div>

            <div id="dashboard-preview" className="animate-rise mt-16 scroll-mt-24">
              <DashboardPreview />
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <section className="border-y border-border bg-card/40 px-5 py-10 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-center text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Trusted by intelligence teams at
            </p>
            <div className="mt-7 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {LOGOS.map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center gap-2 text-base font-semibold text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  <Building2 className="size-4" />
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <Section id="features">
          <SectionHeading
            eyebrow="Platform"
            title="One system of record for everything your market says"
            description="Fifteen capabilities that replace the patchwork of watch-later playlists, spreadsheets, and shared docs your team uses to stay informed."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="card-lift group rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-primary transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* HOW IT WORKS */}
        <Section id="how-it-works" className="border-y border-border bg-card/40">
          <SectionHeading
            eyebrow="How it works"
            title="From raw feed to decided action in three moves"
            description="No scraping scripts, no prompt engineering, no analyst backlog. VelzX runs the pipeline end to end."
          />
          <ol className="mt-14 grid gap-6 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="card-lift relative rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <span className="absolute top-6 right-6 text-4xl font-bold text-border">
                  0{i + 1}
                </span>
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* BENEFITS / STATS */}
        <Section id="benefits">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Benefits"
                title="Coverage of a research team, cost of a seat"
                description="Intelligence work fails on throughput, not talent. VelzX removes the watching, the note-taking, and the formatting — leaving your team the judgment calls."
              />
              <ul className="mt-8 space-y-3">
                {[
                  "Never miss a competitor announcement again",
                  "Brief executives with citations, not opinions",
                  "Quantify narrative shifts across quarters",
                  "Turn insight into published content in one click",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                      <Check className="size-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <Button asChild variant="hero" size="lg" className="mt-9">
                <Link to="/signup">
                  Explore Trends <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <div
                  key={b.label}
                  className="card-lift rounded-2xl border border-border bg-card p-7 shadow-soft"
                >
                  <div className="text-3xl font-semibold tracking-tight text-gradient-brand">
                    {b.stat}
                  </div>
                  <p className="mt-2 text-sm font-medium">{b.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* AI WORKFLOW */}
        <Section id="ai-workflow" className="border-y border-border bg-card/40">
          <SectionHeading
            eyebrow="AI workflow"
            title="A transparent pipeline you can audit"
            description="Each stage is inspectable, versioned, and exportable — because intelligence you can't trace is intelligence you can't defend."
          />
          <div className="mt-14 grid gap-3 md:grid-cols-5">
            {[
              { step: "Ingest", detail: "YouTube + RSS polling, dedupe, canonical URLs" },
              { step: "Transcribe", detail: "Diarized transcript with timestamps" },
              { step: "Enrich", detail: "Entities, keywords, sentiment, topics" },
              { step: "Synthesize", detail: "Summaries, trends, competitor deltas" },
              { step: "Deliver", detail: "Dashboards, alerts, reports, API" },
            ].map((s, i) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <span className="text-xs font-medium tracking-wider text-primary uppercase">
                  Stage {i + 1}
                </span>
                <h3 className="mt-2 text-sm font-semibold">{s.step}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* INTEGRATIONS */}
        <Section id="integrations">
          <SectionHeading
            eyebrow="Integrations"
            title="Insight delivered where work happens"
            description="Push finished intelligence into the tools your team already opens every morning."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {INTEGRATIONS.map((name) => (
              <span
                key={name}
                className="card-lift rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium shadow-soft"
              >
                {name}
              </span>
            ))}
          </div>
        </Section>

        {/* PRICING */}
        <Section id="pricing" className="border-y border-border bg-card/40">
          <SectionHeading
            eyebrow="Pricing"
            title="Priced for the value of a decision"
            description="Start free on five channels. Upgrade when coverage — not curiosity — becomes the constraint."
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-5">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`card-lift relative flex flex-col rounded-2xl border bg-card p-6 shadow-soft ${
                  p.highlight ? "border-primary/60 ring-1 ring-primary/25" : "border-border"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-brand-foreground uppercase">
                    Most popular
                  </span>
                )}
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
                  <span className="text-xs text-muted-foreground">{p.cadence}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.blurb}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={p.highlight ? "hero" : "outline"}
                  size="sm"
                  className="mt-6 w-full"
                >
                  <Link to={p.name === "Enterprise" ? "/signup" : "/signup"}>{p.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </Section>

        {/* TESTIMONIALS */}
        <Section id="testimonials">
          <SectionHeading
            eyebrow="Customers"
            title="Teams that stopped guessing"
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="card-lift flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <Quote className="size-6 text-primary/50" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-brand-soft text-xs font-semibold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="text-xs">
                    <span className="block font-semibold">{t.name}</span>
                    <span className="text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" className="border-y border-border bg-card/40">
          <SectionHeading eyebrow="FAQ" title="Answers before you ask" />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-sm font-medium">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* CTA */}
        <Section id="cta">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-card sm:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 size-[32rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
              style={{ background: "var(--gradient-brand)" }}
            />
            <div className="relative">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Transform Data into Decisions this week
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                Connect your first five channels free. Your first AI briefing lands before your next
                stand-up.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/signup">
                    Start Monitoring Free <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/login">Sign in to workspace</Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <MarketingFooter />
    </div>
  );
}
