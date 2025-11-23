import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, FileText, DollarSign, TrendingUp } from "lucide-react";

export default function ERPDashboard() {
  const { data: stats = {}, isLoading } = useQuery<any>({
    queryKey: ["/api/dashboard/stats"],
  });

  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Projets", icon: TrendingUp, path: "/projects" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Paie", icon: DollarSign, path: "/payroll" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Tableau de Bord">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 hover-elevate transition-all" data-testid="card-employees">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Employés actifs</p>
                <p className="text-3xl font-bold">{stats.totalEmployees || 0}</p>
                <p className="text-xs text-muted-foreground mt-2">Données en temps réel</p>
              </div>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 hover-elevate transition-all" data-testid="card-projects">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Projets en cours</p>
                <p className="text-3xl font-bold">{stats.activeProjects || 0}</p>
                <p className="text-xs text-muted-foreground mt-2">Données en temps réel</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 hover-elevate transition-all" data-testid="card-documents">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Documents</p>
                <p className="text-3xl font-bold">{stats.totalDocuments || 0}</p>
                <p className="text-xs text-muted-foreground mt-2">Données en temps réel</p>
              </div>
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6 hover-elevate transition-all" data-testid="card-pending">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">En attente</p>
                <p className="text-3xl font-bold">{stats.pendingLeaves || 0}</p>
                <p className="text-xs text-muted-foreground mt-2">Données en temps réel</p>
              </div>
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </Card>
        </div>

        <Card className="p-6" data-testid="card-recent-projects">
          <h2 className="text-lg font-bold mb-4">Projets Récents</h2>
          {stats.recentProjects && stats.recentProjects.length > 0 ? (
            <div className="space-y-3">
              {stats.recentProjects.map((project: any) => (
                <div key={project.id} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Aucun projet récent</p>
          )}
        </Card>
      </div>
    </ERPLayout>
  );
}
