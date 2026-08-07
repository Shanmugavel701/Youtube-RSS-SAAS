import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthShell, OrDivider, SocialButtons } from "@/components/velzx/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — VelzX Intelligence Platform" },
      {
        name: "description",
        content:
          "Sign in to your VelzX workspace to review AI briefings, alerts, and competitor intelligence.",
      },
      { property: "og:title", content: "Sign in — VelzX" },
      { property: "og:description", content: "Access your VelzX intelligence workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to pick up your workspace where the last briefing left off."
      footer={
        <>
          New to VelzX?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Create account
          </Link>
        </>
      }
    >
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            toast.success("Welcome back to VelzX");
            navigate({ to: "/app" });
          }, 700);
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Checkbox id="remember" defaultChecked />
          Remember me for 30 days
        </label>
        <Button type="submit" variant="hero" size="lg" className="mt-1 w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <OrDivider />
      <SocialButtons />
    </AuthShell>
  );
}