import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/velzx/AppSidebar";
import { AppTopbar } from "@/components/velzx/AppTopbar";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppTopbar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="animate-rise mx-auto w-full max-w-[100rem]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}