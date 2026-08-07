import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { AuthShell, OrDivider, SocialButtons } from "@/components/velzx/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your workspace — VelzX" },
      {
        name: "description",
        content:
          "Create a free VelzX workspace and start monitoring five YouTube channels or RSS feeds with AI summaries today.",
      },
      { property: "og:title", content: "Create your VelzX workspace" },
      {
        property: "og:description",
        content: "Five channels free forever. Your first AI briefing in minutes.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Five channels free forever. No credit card, no sales call, no setup call."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!agreed) {
            toast.error("Please accept the Terms and Privacy Policy to continue");
            return;
          }
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate({ to: "/verify-email" });
          }, 700);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" required autoComplete="name" placeholder="Priya Raman" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" required autoComplete="organization" placeholder="Northwind" />
          </div>
        </div>
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="8+ characters"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
        </div>
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
            className="mt-0.5"
          />
          <span>
            I agree to the <span className="text-primary">Terms of Service</span> and{" "}
            <span className="text-primary">Privacy Policy</span>, and consent to product updates.
          </span>
        </label>
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          {loading ? "Creating workspace…" : "Start Monitoring Free"}
        </Button>
      </form>
      <OrDivider />
      <SocialButtons verb="Sign up" />
    </AuthShell>
  );
}