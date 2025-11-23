import { ReactNode } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ERP_CONFIG, TENDER_PLATFORMS } from "@/App";
import { useLocation } from "wouter";
import { LucideIcon } from "lucide-react";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

interface ERPLayoutProps {
  children: ReactNode;
  menuItems: MenuItem[];
  title: string;
}

export function ERPLayout({ children, menuItems, title }: ERPLayoutProps) {
  const [, navigate] = useLocation();
  const selectedERP = sessionStorage.getItem("selected_erp") || "gcf";
  const erpConfig = ERP_CONFIG[selectedERP as keyof typeof ERP_CONFIG];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            {/* ERP Header */}
            <div className="p-4 mb-4 border-b">
              <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {erpConfig?.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {erpConfig?.subtitle}
              </p>
            </div>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => navigate(item.path)}
                          className="flex items-center gap-2 w-full cursor-pointer"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Tender Platforms */}
            <SidebarGroup className="mt-auto">
              <SidebarGroupLabel className="text-xs">Marchés Publics</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-1">
                  {TENDER_PLATFORMS.map((platform) => (
                    <a
                      key={platform.url}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground block truncate hover-elevate px-2 py-1 rounded transition-colors"
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover-elevate" />
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-xs text-muted-foreground">
                  {erpConfig?.subtitle}
                </p>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
