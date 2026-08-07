import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Copy, KeyRound, Plus, Terminal } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/api")({
  head: () => ({
    meta: [
      { title: "API & webhooks — VelzX developer access" },
      {
        name: "description",
        content: "Manage API keys, review endpoints, and configure webhooks for programmatic access to VelzX.",
      },
      { property: "og:title", content: "API — VelzX" },
      { property: "og:description", content: "Programmatic access to every insight VelzX generates." },
    ],
  }),
  component: ApiPage,
});

const KEYS = [
  { name: "Production", key: "vzx_live_••••••••••••7f2a", created: "Jan 12, 2026", scope: "Read/Write" },
  { name: "Analytics reader", key: "vzx_live_••••••••••••1c94", created: "Feb 03, 2026", scope: "Read" },
];

const ENDPOINTS = [
  { method: "GET", path: "/v1/channels", desc: "List monitored sources" },
  { method: "GET", path: "/v1/videos", desc: "Paginated analyzed items with summaries" },
  { method: "POST", path: "/v1/search", desc: "Natural-language query with cited sources" },
  { method: "POST", path: "/v1/webhooks", desc: "Register an event subscription" },
];

function ApiPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="API & webhooks"
        description="Everything in the VelzX UI is available programmatically. Rate limit: 600 requests / minute."
        actions={
          <Button variant="hero" size="sm" onClick={() => toast.success("New key created")}>
            <Plus /> Create key
          </Button>
        }
      />

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <KeyRound className="size-4 text-primary" /> API keys
        </h2>
        <ul className="mt-4 divide-y divide-border">
          {KEYS.map((k) => (
            <li key={k.name} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="text-sm font-medium">{k.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{k.key}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="rounded-full text-xs">
                  {k.scope}
                </Badge>
                <span className="text-xs text-muted-foreground">created {k.created}</span>
                <Button variant="ghost" size="icon" aria-label={`Copy ${k.name} key`} onClick={() => toast.success("Key copied")}>
                  <Copy />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Endpoints</h2>
          <ul className="mt-4 space-y-2.5">
            {ENDPOINTS.map((e) => (
              <li key={e.path} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <Badge
                  variant="secondary"
                  className="rounded-md font-mono text-[0.65rem] tracking-wide"
                >
                  {e.method}
                </Badge>
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs">{e.path}</p>
                  <p className="text-xs text-muted-foreground">{e.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Terminal className="size-4 text-primary" /> Quickstart
          </h2>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-foreground/95 p-4 font-mono text-xs leading-relaxed text-background">
{`curl https://api.velzx.com/v1/videos \\
  -H "Authorization: Bearer $VELZX_API_KEY" \\
  -G -d limit=20 -d sentiment=positive

# → { "data": [ { "id": "vd_1", "summary": "...",
#      "entities": { ... }, "score": 92 } ] }`}
          </pre>
        </div>
      </div>
    </div>
  );
}