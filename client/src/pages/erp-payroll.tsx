import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Users, Settings, FileText, BarChart3, Globe, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { ERP_CONFIG, TENDER_PLATFORMS } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ERPPayroll() {
  const [, navigate] = useLocation();
  const selectedERP = sessionStorage.getItem("selected_erp") || "gcf";
  const erpConfig = ERP_CONFIG[selectedERP as keyof typeof ERP_CONFIG];

  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Paie", icon: Calendar, path: "/payroll" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Paramètres", icon: Settings, path: "/settings" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
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
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="flex items-center justify-between px-6 py-4 border-b bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Paie</h1>
            </div>
          </header>

          <main className="p-8">
            <Card>
              <CardHeader>
                <CardTitle>Gestion de la Paie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Module de paie (Conformité algérienne, CNSS 8%, IRG, allocations) pour {erpConfig?.name}
                </p>
                <Button>Générer un bulletin de paie</Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
