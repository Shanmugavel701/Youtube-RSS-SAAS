import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Briefcase,
  Building2,
  Check,
  GraduationCap,
  HeartPulse,
  Landmark,
  Megaphone,
  PartyPopper,
  Rocket,
  Rss,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/velzx/Logo";
import { ThemeToggle } from "@/components/velzx/ThemeToggle";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your workspace — VelzX onboarding" },
      {
        name: "description",
        content:
          "Five quick steps: tell us about your company, industry, first channel, and the topics you want VelzX to track.",
      },
      { property: "og:title", content: "Set up your VelzX workspace" },
      { property: "og:description", content: "Five steps to your first AI intelligence briefing." },
    ],
  }),
  component: OnboardingPage,
});

const INDUSTRIES = [
  { label: "SaaS & Software", icon: Cpu },
  { label: "Agency & Consulting", icon: Briefcase },
  { label: "Financial Services", icon: Landmark },
  { label: "Healthcare", icon: HeartPulse },
  { label: "Education", icon: GraduationCap },
  { label: "Media & Creator", icon: Megaphone },
];

const INTERESTS = [
  "Marketing",
  "AI",
  "Finance",
  "Technology",
  "Education",
  "Healthcare",
  "Startup",
  "Business",
];

const STEPS = ["Welcome", "Company", "Industry", "First channel", "Interests"];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>(["AI", "Technology"]);

  const next = () => {
    if (step === STEPS.length - 1) {
      toast.success("Workspace ready — monitoring has started");
      navigate({ to: "/app" });
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-backdrop opacity-50" />
      <header className="relative flex items-center justify-between px-6 py-6">
        <Logo />
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative flex flex-1 items-start justify-center px-5 pb-20">
        <div className="w-full max-w-2xl">
          <Progress value={((step + 1) / STEPS.length) * 100} className="h-1.5" />
          <div className="mt-3 flex justify-between text-[0.7rem] text-muted-foreground">
            {STEPS.map((s, i) => (
              <span key={s} className={i <= step ? "font-medium text-primary" : ""}>
                {s}
              </span>
            ))}
          </div>

          <div
            key={step}
            className="animate-rise mt-8 rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10"
          >
            {step === 0 && (
              <div className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-glow">
                  <PartyPopper className="size-6" />
                </span>
                <h1 className="mt-6 text-2xl font-semibold sm:text-3xl">Welcome to VelzX</h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  In under three minutes you'll have continuous monitoring running and your first AI
                  briefing scheduled. Let's tune VelzX to your market.
                </p>
              </div>
            )}

            {step === 1 && (
              <div>
                <h1 className="text-xl font-semibold">Tell us about your company</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  This names your workspace and shapes the competitor suggestions we surface.
                </p>
                <div className="mt-7 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company name</Label>
                    <Input id="company" placeholder="Northwind AI" defaultValue="Northwind AI" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="northwind.ai" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="size">Team size</Label>
                      <Input id="size" placeholder="11–50" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="text-xl font-semibold">Which industry do you operate in?</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  We use this to pre-tune entity recognition and topic clustering.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {INDUSTRIES.map((ind) => {
                    const active = industry === ind.label;
                    return (
                      <button
                        key={ind.label}
                        type="button"
                        onClick={() => setIndustry(ind.label)}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all ${
                          active
                            ? "border-primary bg-brand-soft text-accent-foreground shadow-soft"
                            : "border-border hover:border-primary/40 hover:bg-accent"
                        }`}
                      >
                        <ind.icon className="size-4 text-primary" />
                        {ind.label}
                        {active && <Check className="ml-auto size-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="text-xl font-semibold">Add your first source</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Paste a YouTube channel URL or an RSS feed. We'll backfill history immediately.
                </p>
                <div className="mt-7 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="source">Channel or feed URL</Label>
                    <Input id="source" placeholder="https://youtube.com/@ycombinator" />
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <p className="flex items-center gap-2 text-xs font-medium">
                      <Rss className="size-3.5 text-primary" /> Popular starting points
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["@ycombinator", "@a16z", "@lennyspodcast", "stratechery.com/feed"].map(
                        (s) => (
                          <span
                            key={s}
                            className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {s}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h1 className="text-xl font-semibold">Choose your interests</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Interests prioritize what lands at the top of your dashboard and digests.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {INTERESTS.map((i) => {
                    const active = interests.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setInterests((prev) =>
                            prev.includes(i) ? prev.filter((p) => p !== i) : [...prev, i],
                          )
                        }
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                          active
                            ? "border-primary bg-gradient-brand text-brand-foreground shadow-soft"
                            : "border-border hover:border-primary/40 hover:bg-accent"
                        }`}
                      >
                        {active ? <Check className="size-3.5" /> : <Brain className="size-3.5" />}
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-9 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft /> Back
              </Button>
              <div className="flex items-center gap-2">
                {step > 0 && step < STEPS.length - 1 && (
                  <Button variant="ghost" onClick={next}>
                    Skip
                  </Button>
                )}
                <Button variant="hero" size="lg" onClick={next}>
                  {step === STEPS.length - 1 ? (
                    <>
                      Finish setup <Rocket />
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Building2 className="size-3.5" /> Workspace settings can be changed anytime in Settings
          </p>
        </div>
      </main>
    </div>
  );
}