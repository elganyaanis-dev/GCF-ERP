import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, FileText, DollarSign, LineChart, PieChart } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";
import { StatCard } from "@/components/stat-card";

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
      color: "bg-blue-600",
      trend: 12,
      description: "Croissance stable"
    },
    {
      label: "Projets Actifs",
      value: stats?.activeProjects || "0",
      icon: TrendingUp,
      color: "bg-green-600",
      trend: 8,
      description: "En cours de réalisation"
    },
    {
      label: "Documents",
      value: stats?.totalDocuments || "0",
      icon: FileText,
      color: "bg-purple-600",
      trend: 25,
      description: "Archivés et actifs"
    },
    {
      label: "Budget Utilisé",
      value: "68%",
      icon: DollarSign,
      color: "bg-amber-600",
      trend: -5,
      description: "Environ 2.3M DZD"
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

        {/* KPIs Premium - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {kpis.map((kpi, idx) => (
            <StatCard
              key={idx}
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              color={kpi.color}
              trend={kpi.trend}
              description={kpi.description}
            />
          ))}
        </div>

        {/* Metrics - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="hover-elevate">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-blue-600" />
                Rapport Mensuel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Performance RH", value: "85%", color: "from-blue-400 to-blue-600" },
                { label: "Avancement Projets", value: "72%", color: "from-green-400 to-green-600" },
                { label: "Conformité Réglementaire", value: "95%", color: "from-purple-400 to-purple-600" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.label}</span>
                    <Badge className="bg-gradient-to-r" style={{ background: `linear-gradient(to right, var(--color1), var(--color2))` }}>
                      {item.value}
                    </Badge>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${item.color}`} style={{ width: item.value }}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-orange-600" />
                Indicateurs Clés (KPIs)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Taux de Satisfaction", value: "4.2/5.0", status: "Excellent" },
                { label: "Productivité Globale", value: "92%", status: "Très Bon" },
                { label: "Budget Maîtrisé", value: "68%", status: "Normal" },
                { label: "Qualité Livrables", value: "89%", status: "Bon" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover-elevate">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.status}</p>
                  </div>
                  <Badge variant="outline" className="text-base">{item.value}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Card className="hover-elevate border-l-4 border-l-indigo-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Rapports Professionnels Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {[
                { name: "Rapport RH Mensuel", desc: "Paie, congés, formations" },
                { name: "Analyse Budgétaire", desc: "Dépenses vs prévisions" },
                { name: "Performance Projets", desc: "Avancements et livrables" },
                { name: "Conformité Réglementaire", desc: "Algérie & normes DCE" },
                { name: "Audit Trail Complet", desc: "Historique des modifications" },
                { name: "Analytics Timesheet", desc: "Heures et productivité" },
              ].map((report) => (
                <div key={report.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 sm:p-4 border rounded-lg hover-elevate cursor-pointer bg-card/50 transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{report.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{report.desc}</p>
                  </div>
                  <Badge className="ml-0 sm:ml-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-xs flex-shrink-0">PDF</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
