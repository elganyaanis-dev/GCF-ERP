import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, FolderKanban, FileText, Calendar, BarChart3, Globe } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";

export default function ERPDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Projets", icon: FolderKanban, path: "/projects" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Paie", icon: Calendar, path: "/payroll" },
    { label: "Organisation", icon: Users, path: "/organization" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  const statCards = [
    {
      title: "Employés actifs",
      value: stats?.totalEmployees || 0,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Projets en cours",
      value: stats?.activeProjects || 0,
      icon: FolderKanban,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Documents",
      value: stats?.totalDocuments || 0,
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Congés en attente",
      value: stats?.pendingLeaves || 0,
      icon: Calendar,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950",
    },
  ];

  if (isLoading) {
    return (
      <ERPLayout menuItems={menuItems} title="Tableau de Bord">
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
      </ERPLayout>
    );
  }

  return (
    <ERPLayout menuItems={menuItems} title="Tableau de Bord">
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover-elevate transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
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

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" /> Système V5 Opérationnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Système ERP V5 multi-tenant avec architecture sécurisée, RBAC avancé, et isolation complète des données par filiale.
            </p>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
