import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "AI Summaries", href: "#features" },
      { label: "Trend Detection", href: "#features" },
      { label: "Competitor Intelligence", href: "#features" },
      { label: "Automations", href: "#ai-workflow" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#benefits" },
      { label: "Customers", href: "#testimonials" },
      { label: "Pricing", href: "#pricing" },
      { label: "Careers", href: "#cta" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#integrations" },
      { label: "API Reference", href: "#integrations" },
      { label: "Changelog", href: "#how-it-works" },
      { label: "Security", href: "#faq" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            VelzX turns continuous video and feed monitoring into decision-ready intelligence for
            modern teams.
          </p>
          <div className="mt-5 flex gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border px-2.5 py-1">SOC 2 Type II</span>
            <span className="rounded-full border border-border px-2.5 py-1">GDPR ready</span>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} VelzX Intelligence, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/login" className="hover:text-foreground">
              Sign in
            </Link>
            <Link to="/signup" className="hover:text-foreground">
              Create account
            </Link>
            <a href="#faq" className="hover:text-foreground">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}