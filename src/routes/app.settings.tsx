import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Mail, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/velzx/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — profile, workspace, and team" },
      {
        name: "description",
        content: "Manage your profile, workspace defaults, team members, notifications, and appearance.",
      },
      { property: "og:title", content: "Settings — VelzX" },
      { property: "og:description", content: "Configure your workspace, team, and notifications." },
    ],
  }),
  component: SettingsPage,
});

const TEAM = [
  { name: "Priya Raman", email: "priya@northlane.io", role: "Owner" },
  { name: "Ravi Menon", email: "ravi@northlane.io", role: "Admin" },
  { name: "Dana Okafor", email: "dana@northlane.io", role: "Analyst" },
  { name: "Tomas Weber", email: "tomas@northlane.io", role: "Viewer" },
];

const NOTIFICATIONS = [
  { label: "Daily digest email", desc: "One summary of everything analyzed in the last 24 hours.", on: true },
  { label: "Real-time alert emails", desc: "Send an email the moment a high-severity rule fires.", on: true },
  { label: "Weekly report delivery", desc: "Deliver scheduled briefings to your inbox.", on: true },
  { label: "Product announcements", desc: "Occasional updates about new VelzX capabilities.", on: false },
];

function SettingsPage() {
  const { theme, toggle } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Workspace configuration, team access, and delivery preferences." />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-5">
          <div className="max-w-xl space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname" defaultValue="Priya Raman" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="priya@northlane.io" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Job title</Label>
              <Input id="role" defaultValue="Head of Strategy" />
            </div>
            <Button variant="hero" size="sm" onClick={() => toast.success("Profile saved")}>
              Save changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="workspace" className="mt-5">
          <div className="max-w-xl space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="grid gap-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" defaultValue="Northlane Analytics" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" defaultValue="B2B SaaS" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="focus">Intelligence focus</Label>
              <Textarea
                id="focus"
                rows={4}
                defaultValue="Pricing strategy, agent infrastructure, enterprise buying signals, category positioning."
              />
            </div>
            <Button variant="hero" size="sm" onClick={() => toast.success("Workspace updated")}>
              Save workspace
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold">Team members</h2>
                <p className="text-xs text-muted-foreground">4 of 10 seats used on the Growth plan.</p>
              </div>
              <Button variant="soft" size="sm" onClick={() => toast.success("Invite sent")}>
                <Plus /> Invite member
              </Button>
            </div>
            <ul className="mt-5 divide-y divide-border">
              {TEAM.map((m) => (
                <li key={m.email} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-gradient-brand text-xs font-semibold text-brand-foreground">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="rounded-full text-xs">
                      {m.role}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${m.name}`}
                      onClick={() => toast.success(`${m.name} removed`)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-5">
          <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-soft">
            <ul className="divide-y divide-border">
              {NOTIFICATIONS.map((n) => (
                <li key={n.label} className="flex items-start justify-between gap-6 py-4">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="size-3.5 text-primary" /> {n.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch defaultChecked={n.on} aria-label={n.label} />
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="mt-5">
          <div className="max-w-xl rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-sm font-semibold">Theme</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose how VelzX looks on this device.
            </p>
            <div className="mt-4 flex gap-2">
              {(["light", "dark"] as const).map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? "hero" : "outline"}
                  size="sm"
                  className="capitalize"
                  onClick={() => {
                    if (theme !== t) toggle();
                  }}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}