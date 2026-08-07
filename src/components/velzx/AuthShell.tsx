import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Quote, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden border-r border-border bg-card/40 p-12 lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-24 size-[34rem] rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div className="relative">
          <Logo />
          <h2 className="mt-16 max-w-md text-4xl leading-tight font-semibold">
            Intelligence that <span className="text-gradient-brand">arrives before</span> the meeting.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            VelzX watches the channels and feeds that move your market, then hands your team the
            conclusions — sourced, structured, and ready to act on.
          </p>

          <div className="mt-12 grid max-w-md gap-3">
            {[
              { icon: Sparkles, text: "AI summaries within four minutes of publication" },
              { icon: TrendingUp, text: "Trend spikes detected across every monitored topic" },
              { icon: ShieldCheck, text: "SOC 2 Type II · GDPR ready · data never trained on" },
            ].map((f) => (
              <div
                key={f.text}
                className="glass-panel flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
              >
                <f.icon className="size-4 shrink-0 text-primary" />
                {f.text}
              </div>
            ))}
          </div>
        </div>

        <figure className="relative max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft">
          <Quote className="size-5 text-primary/50" />
          <blockquote className="mt-3 text-sm leading-relaxed">
            “We replaced a four-person research rotation. Monday now opens with a briefing that used
            to take two days.”
          </blockquote>
          <figcaption className="mt-4 text-xs text-muted-foreground">
            Priya Raman · VP Strategy, Northwind
          </figcaption>
        </figure>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
              Back to site
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="animate-rise w-full max-w-md">
            <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
              {children}
            </div>
            {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}

export function SocialButtons({ verb = "Continue" }: { verb?: string }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-accent"
      >
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.3 3.8l-.1.1 3.4 2.6c2-1.8 3-4.6 3-8.4z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.1 0 5.7-1 7.5-2.8l-3.6-2.7c-1 .7-2.3 1.2-3.9 1.2-3 0-5.6-2-6.5-4.8l-.1.1-3.5 2.7C3.7 21.3 7.6 24 12 24z"
          />
          <path fill="#FBBC05" d="M5.5 14.9c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.5A11.9 11.9 0 0 0 .5 12.6c0 1.9.5 3.6 1.4 5.1l3.6-2.8z" />
          <path
            fill="#EA4335"
            d="M12 4.7c2.1 0 3.6.9 4.4 1.7l3.2-3.1C17.7 1.5 15.1.5 12 .5 7.6.5 3.7 3.2 1.9 7.1l3.6 2.8C6.4 6.8 9 4.7 12 4.7z"
          />
        </svg>
        {verb} with Google
      </button>
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-accent"
      >
        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
          <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.7 2.7 1.2 3.4.9.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0C17.6 3.6 18.6 4 18.6 4c.6 1.5.2 2.7.1 3 .8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9A11.5 11.5 0 0 0 12 .5z" />
        </svg>
        {verb} with GitHub
      </button>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">or</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}