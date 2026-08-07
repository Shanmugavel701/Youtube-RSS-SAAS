import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { NAV_GROUPS } from "@/data/velzx";
import { Logo } from "./Logo";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-3.5">
        {collapsed ? (
          <span className="mx-auto grid size-8 place-items-center rounded-[10px] bg-gradient-brand shadow-glow">
            <Sparkles className="size-4 text-white" />
          </span>
        ) : (
          <Logo to="/app" />
        )}
      </SidebarHeader>

      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active =
                    item.url === "/app" ? pathname === "/app" : pathname.startsWith(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                        <Link to={item.url} className="flex items-center gap-2.5">
                          <item.icon className="size-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="border-t border-sidebar-border p-3">
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
            <p className="flex items-center gap-2 text-xs font-medium">
              <Sparkles className="size-3.5 text-sidebar-primary" /> AI credits
            </p>
            <Progress value={68} className="mt-2.5 h-1.5" />
            <p className="mt-2 text-[0.7rem] text-muted-foreground">68,400 of 100,000 remaining</p>
            <Link
              to="/app/billing"
              className="mt-2.5 inline-block text-[0.7rem] font-medium text-sidebar-primary hover:underline"
            >
              Upgrade plan →
            </Link>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}