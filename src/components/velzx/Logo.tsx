import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-8 place-items-center rounded-[10px] bg-gradient-brand shadow-glow">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            d="M4 5.5 10.2 18.5a2 2 0 0 0 3.6 0L20 5.5"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="17.5" cy="7" r="2.2" fill="white" opacity="0.85" />
        </svg>
      </span>
      <span className="text-[1.05rem] font-semibold tracking-tight">VelzX</span>
    </Link>
  );
}