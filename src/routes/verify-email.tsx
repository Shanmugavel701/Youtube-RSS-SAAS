import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/velzx/Logo";
import { ThemeToggle } from "@/components/velzx/ThemeToggle";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — VelzX" },
      {
        name: "description",
        content: "Confirm your email address to activate your VelzX intelligence workspace.",
      },
      { property: "og:title", content: "Verify your email — VelzX" },
      { property: "og:description", content: "One click to activate your VelzX workspace." },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
      />
      <header className="relative flex items-center justify-between px-6 py-6">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="relative flex flex-1 items-center justify-center px-5 pb-16">
        <div className="animate-rise w-full max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-card">
          <span className="animate-pulse-ring mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-glow">
            <BadgeCheck className="size-7" />
          </span>
          <h1 className="mt-7 text-2xl font-semibold sm:text-3xl">Workspace created</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            We sent a verification link to your work email. Confirm it to unlock AI summaries,
            alerts, and competitor intelligence.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm">
            <Mail className="size-4 text-primary" />
            Verification link expires in 24 hours
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/onboarding">
                Continue to onboarding <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <RefreshCw /> Resend email
            </Button>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Wrong address?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up again
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}