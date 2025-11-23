import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Users, Settings, FileText, BarChart3, Globe, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { ERP_CONFIG, TENDER_PLATFORMS } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function ERPSettings() {
  const [, navigate] = useLocation();
  const { logout } = useAuth();
  const selectedERP = sessionStorage.getItem("selected_erp") || "gcf";
  const erpConfig = ERP_CONFIG[selectedERP as keyof typeof ERP_CONFIG];

  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Paramètres", icon: Settings, path: "/settings" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const handleLogout = () => {
    sessionStorage.removeItem("selected_erp");
    logout();
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <div className="p-4 mb-4">
              <h2 className="text-lg font-bold">{erpConfig?.name}</h2>
              <p className="text-xs text-muted-foreground">{erpConfig?.subtitle}</p>
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
                          className="flex items-center gap-2 w-full"
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

            <SidebarGroup className="mt-auto">
              <SidebarGroupLabel>Marchés Publics</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-2">
                  {TENDER_PLATFORMS.map((platform) => (
                    <a
                      key={platform.url}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground block truncate hover-elevate px-2 py-1 rounded"
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" /> Déconnexion
              </Button>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="flex items-center justify-between px-6 py-4 border-b bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Paramètres</h1>
            </div>
          </header>

          <main className="p-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de la Filiale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nom</p>
                    <p className="font-semibold">{erpConfig?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="font-semibold">{erpConfig?.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramétrages Spécifiques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Paramètres au niveau de la filiale {erpConfig?.name}
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Grille Salariale
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Organigramme
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Politiques RH
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Conformité
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
