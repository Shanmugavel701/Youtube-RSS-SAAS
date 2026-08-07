import { Link } from "@tanstack/react-router";
import { Bell, LogOut, Search, Settings, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";

const NOTIFICATIONS = [
  { title: "Competitor pricing change detected", detail: "a16z · 26m ago" },
  { title: "Weekly report delivered", detail: "9 recipients · 1h ago" },
  { title: "Trend spike: agentic AI workflows", detail: "+62% · yesterday" },
];

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-card/80 px-3 backdrop-blur-xl sm:px-5">
      <SidebarTrigger aria-label="Toggle sidebar" />
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search videos, channels, entities…"
          className="h-9 rounded-xl pl-9"
          aria-label="Search workspace"
        />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NOTIFICATIONS.map((n) => (
              <DropdownMenuItem key={n.title} className="flex flex-col items-start gap-0.5 py-2.5">
                <span className="text-sm">{n.title}</span>
                <span className="text-xs text-muted-foreground">{n.detail}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-1 grid size-8 place-items-center rounded-full bg-gradient-brand text-xs font-semibold text-brand-foreground"
              aria-label="Account menu"
            >
              PR
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>Priya Raman</span>
              <span className="text-xs font-normal text-muted-foreground">
                priya@northwind.ai · Business
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/settings">
                <User className="size-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/app/settings">
                <Settings className="size-4" /> Workspace settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">
                <LogOut className="size-4" /> Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}