import { ReactNode } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ERP_CONFIG, TENDER_PLATFORMS } from "@/config/erp";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { LucideIcon, LogOut, ArrowLeftRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  label: string;
  icon?: LucideIcon;
  path: string;
}

interface ERPLayoutProps {
  children: ReactNode;
  menuItems: MenuItem[];
  title: string;
}

export function ERPLayout({ children, menuItems, title }: ERPLayoutProps) {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const selectedERP = sessionStorage.getItem("selected_erp") || "gcf";
  const erpConfig = ERP_CONFIG[selectedERP as keyof typeof ERP_CONFIG];
  
  const userEmail = typeof user === "object" && user ? (user as any)?.email : "Utilisateur";
  const isSupremeAdmin = userEmail === "elganya.anis@gmail.com";

  const handleChangeERP = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleLogout = () => {
    fetch("/api/logout", { method: "POST" }).then(() => {
      window.location.href = "/";
    });
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={style}>
      <div className="flex h-screen w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-4 mb-4 border-b">
              <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {erpConfig?.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {erpConfig?.subtitle}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleChangeERP}
                className="w-full mt-3 justify-start gap-2 hover-elevate"
                data-testid="button-change-erp-sidebar"
              >
                <ArrowLeftRight className="h-4 w-4" />
                <span>Changer d'ERP</span>
              </Button>
            </div>

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
                          data-testid={`button-nav-${item.label.toLowerCase()}`}
                        >
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

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
                      data-testid={`link-tender-${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-card/80 to-card/50 backdrop-blur-md sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover-elevate" data-testid="button-sidebar-toggle" />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    {title}
                  </h1>
                  <Badge variant="secondary" className="text-xs">
                    {erpConfig?.code.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {erpConfig?.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pl-6 border-l">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('fr-FR')}</span>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium" data-testid="text-user-email">{userEmail}</p>
                {isSupremeAdmin && (
                  <Badge className="mt-1 bg-purple-600 hover:bg-purple-700">Supreme Admin</Badge>
                )}
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleChangeERP}
                title="Changer d'ERP"
                data-testid="button-change-erp"
                className="hover-elevate"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleLogout}
                title="Déconnexion"
                data-testid="button-logout"
                className="hover-elevate"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-muted/5 to-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
