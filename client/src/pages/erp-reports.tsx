import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, FileText, DollarSign } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";

export default function ERPReports() {
  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Paie", path: "/payroll" },
    { label: "Projets", path: "/projects" },
  ];

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/reports/stats"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/reports/stats", { credentials: "include" });
        if (!res.ok) return {};
        return res.json();
      } catch (e) {
        return {};
      }
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  const kpis = [
    {
      label: "Total Employés",
      value: stats?.totalEmployees || "0",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Projets Actifs",
      value: stats?.activeProjects || "0",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Documents",
      value: stats?.totalDocuments || "0",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      label: "Paie Totale",
      value: stats?.totalPayroll ? `${Math.round(stats.totalPayroll / 1000)}K DZD` : "0",
      icon: DollarSign,
      color: "text-amber-600",
    },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Rapports & Analyses">
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="text-indigo-600" />
            Rapports & Analyses
          </h1>
          <p className="text-muted-foreground mt-2">Vue d'ensemble des performances clés et métriques</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <Card key={idx} className="hover-elevate">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Rapport Mensuel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                <span className="text-sm font-medium">Performance RH</span>
                <Badge>85%</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                <span className="text-sm font-medium">Avancement Projets</span>
                <Badge>72%</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                <span className="text-sm font-medium">Conformité</span>
                <Badge>95%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Indicateurs Clés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                <span className="text-sm font-medium">Taux Satisfaction</span>
                <Badge variant="secondary">4.2/5</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                <span className="text-sm font-medium">Productivité</span>
                <Badge>92%</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                <span className="text-sm font-medium">Budget Utilisé</span>
                <Badge>68%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle>Rapports Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Rapport RH Mensuel", "Analyse Budgétaire", "Performance Projets", "Conformité Réglementaire", "Audit Trail", "Analyse Timesheet"].map((report) => (
                <div key={report} className="flex items-center justify-between p-3 border rounded-md hover-elevate cursor-pointer">
                  <span className="text-sm">{report}</span>
                  <Badge variant="outline">Télécharger</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
