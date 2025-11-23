import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Users, FolderKanban, FileText, Calendar, Settings, BarChart3, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { ERP_CONFIG, TENDER_PLATFORMS } from "@/App";
import { useState } from "react";

export default function ERPDashboard() {
  const [, navigate] = useLocation();
  const selectedERP = sessionStorage.getItem("selected_erp") || "gcf";
  const erpConfig = ERP_CONFIG[selectedERP as keyof typeof ERP_CONFIG];
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats", selectedERP],
  });

  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Projets", icon: FolderKanban, path: "/projects" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Paie", icon: Calendar, path: "/payroll" },
    { label: "Organisation", icon: Users, path: "/organization" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
    { label: "Paramètres", icon: Settings, path: "/settings" },
  ];

  const statCards = [
    {
      title: "Employés actifs",
      value: stats?.totalEmployees || 0,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Projets en cours",
      value: stats?.activeProjects || 0,
      icon: FolderKanban,
      color: "text-green-600",
    },
    {
      title: "Documents",
      value: stats?.totalDocuments || 0,
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Congés en attente",
      value: stats?.pendingLeaves || 0,
      icon: Calendar,
      color: "text-amber-600",
    },
  ];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <div className="p-4 mb-4">
              <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {erpConfig?.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {erpConfig?.subtitle}
              </p>
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

            {/* Tender Platforms */}
            <SidebarGroup className="mt-auto">
              <SidebarGroupLabel>Marchés Publics Algérie</SidebarGroupLabel>
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="flex items-center justify-between px-6 py-4 border-b bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold">{erpConfig?.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {erpConfig?.subtitle}
                </p>
              </div>
            </div>
          </header>

          <main className="p-8 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <Card key={index} className="hover-elevate transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Données en temps réel
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Welcome Section */}
            <Card>
              <CardHeader>
                <CardTitle>Bienvenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Système ERP autonome pour {erpConfig?.name}. 
                  Accédez aux modules via le menu latéral.
                </p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
