import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, MoreHorizontal, Plus, Search, Trash2, Tv, Upload } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CHANNELS } from "@/data/velzx";

export const Route = createFileRoute("/app/channels")({
  head: () => ({
    meta: [
      { title: "Channels — VelzX monitoring" },
      {
        name: "description",
        content: "Add, import, and monitor YouTube channels and RSS feeds across your workspace.",
      },
      { property: "og:title", content: "Channel management — VelzX" },
      { property: "og:description", content: "Every source you monitor, in one control surface." },
    ],
  }),
  component: ChannelsPage,
});

function ChannelsPage() {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState(CHANNELS);

  const filtered = rows.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.handle.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Channels"
        description="Every YouTube channel and RSS feed VelzX watches for your workspace. 146 of 500 sources used."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => toast.success("Import started")}>
              <Upload /> Import
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Export queued")}>
              <Download /> Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero" size="sm">
                  <Plus /> Add channel
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a source</DialogTitle>
                  <DialogDescription>
                    Paste a YouTube channel, playlist, or RSS/Atom feed URL. History is backfilled
                    automatically.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="url">Source URL</Label>
                    <Input id="url" placeholder="https://youtube.com/@ycombinator" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cat">Category</Label>
                    <Input id="cat" placeholder="Competitor · Venture · Media" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="hero" onClick={() => toast.success("Channel added — backfill running")}>
                    Add & start monitoring
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      <div className="relative max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search channels"
          className="pl-9"
          aria-label="Search channels"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Monitor</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-brand text-xs font-semibold text-brand-foreground">
                      {c.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{c.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{c.handle}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{c.category}</TableCell>
                <TableCell className="text-sm">{c.subs}</TableCell>
                <TableCell className="text-sm">{c.videos.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-full text-xs ${
                      c.status === "Active"
                        ? "bg-success/15 text-success"
                        : c.status === "Syncing"
                          ? "bg-warning/15 text-warning"
                          : ""
                    }`}
                  >
                    {c.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={c.monitored}
                    aria-label={`Monitor ${c.name}`}
                    onCheckedChange={(v) => {
                      setRows((prev) =>
                        prev.map((r) => (r.id === c.id ? { ...r, monitored: v } : r)),
                      );
                      toast.success(`${v ? "Monitoring" : "Paused"} ${c.name}`);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Actions for ${c.name}`}>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.success("Resync queued")}>
                        Resync now
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.success("Rule created")}>
                        Create alert rule
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setRows((prev) => prev.filter((r) => r.id !== c.id));
                          toast.success("Channel removed");
                        }}
                      >
                        <Trash2 className="size-4" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-primary">
              <Tv className="size-5" />
            </span>
            <p className="mt-4 text-sm font-medium">No sources match “{query}”</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different name, or add the channel directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}