import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Clock, ExternalLink, Sparkles, User } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SEARCH_SUGGESTIONS } from "@/data/velzx";

export const Route = createFileRoute("/app/search")({
  head: () => ({
    meta: [
      { title: "AI Search — ask across everything you monitor" },
      {
        name: "description",
        content:
          "Ask natural-language questions across every monitored channel and feed, with cited, timestamped sources.",
      },
      { property: "og:title", content: "AI Search — VelzX" },
      { property: "og:description", content: "Answers with sources, across your entire watchlist." },
    ],
  }),
  component: AiSearchPage,
});

type Msg = { role: "user" | "assistant"; text: string; sources?: string[] };

const SEED: Msg[] = [
  {
    role: "user",
    text: "What changed in competitor pricing this month?",
  },
  {
    role: "assistant",
    text: "Three of four tracked competitors moved pricing in the last 30 days. Northwind AI shifted from per-seat to a hybrid seat + credit model and raised its entry tier 22%. Cortexa Labs introduced an annual-only enterprise tier with a $24k floor. Helios Insights left list price unchanged but removed API access from its mid tier, effectively raising the price of parity. Vantage Signal made no announced change; its last pricing page edit was 84 days ago.",
    sources: [
      "Northwind AI — “Pricing that scales with outcomes” (14:22)",
      "Cortexa Labs Q3 investor update (RSS, Mar 12)",
      "Helios Insights changelog — API tier revision",
    ],
  },
];

const HISTORY = [
  "Competitor pricing changes — 30d",
  "Agentic workflow mentions",
  "Product mentions by channel",
  "Sentiment shift after launch",
];

function AiSearchPage() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "assistant",
        text: "Synthesizing across 146 monitored sources… Based on the last 14 days of coverage, the dominant signal is consolidation: buyers are reducing vendor count while increasing spend per vendor, and every tracked competitor now leads with measurable ROI rather than model capability.",
        sources: ["a16z — Inside the agent stack (08:41)", "Y Combinator — Enterprise AI budgets (12:07)"],
      },
    ]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Search"
        description="Ask anything across your monitored universe. Every answer is grounded in timestamped, citable sources."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_18rem]">
        <div className="flex min-h-[32rem] flex-col rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3">
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                    m.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-gradient-brand text-brand-foreground"
                  }`}
                >
                  {m.role === "user" ? <User className="size-4" /> : <Sparkles className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    {m.role === "user" ? "You" : "VelzX AI"}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed">{m.text}</p>
                  {m.sources && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Sources
                      </p>
                      {m.sources.map((s) => (
                        <div
                          key={s}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2 text-xs"
                        >
                          <span className="truncate">{s}</span>
                          <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {SEARCH_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask across every channel and feed you monitor…"
                className="h-11 rounded-xl"
                aria-label="Ask VelzX AI"
              />
              <Button type="submit" variant="hero" size="icon" className="size-11" aria-label="Send">
                <ArrowUp />
              </Button>
            </form>
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="size-4 text-primary" /> History
          </h2>
          <ul className="mt-4 space-y-2">
            {HISTORY.map((h) => (
              <li key={h}>
                <button
                  onClick={() => send(h)}
                  className="w-full truncate rounded-lg px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {h}
                </button>
              </li>
            ))}
          </ul>
          <Badge variant="secondary" className="mt-5 rounded-full text-xs">
            146 sources indexed
          </Badge>
        </aside>
      </div>
    </div>
  );
}