import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, TrendingUp, Calendar, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";

export default function ERPProjects() {
  const { data: projects = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/projects"],
  });

  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Employés", path: "/employees" },
    { label: "Projets", path: "/projects" },
    { label: "Documents", path: "/documents" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  const stats = {
    totalProjects: projects?.length || 0,
    activeProjects: projects?.filter((p: any) => p.status === 'active').length || 0,
    completedProjects: projects?.filter((p: any) => p.status === 'completed').length || 0,
    totalBudget: projects?.reduce((sum: number, p: any) => sum + (p.budget || 0), 0) || 0,
  };

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Projets">
      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Projets"
            value={stats.totalProjects}
            icon={TrendingUp}
            color="bg-blue-600"
            description="Tous les statuts"
          />
          <StatCard
            label="Projets Actifs"
            value={stats.activeProjects}
            icon={Calendar}
            color="bg-green-600"
            trend={5}
            description="En cours"
          />
          <StatCard
            label="Projets Complétés"
            value={stats.completedProjects}
            icon={TrendingUp}
            color="bg-purple-600"
            description="Terminés"
          />
          <StatCard
            label="Budget Total"
            value={`${(stats.totalBudget / 1000000).toFixed(1)}M`}
            icon={DollarSign}
            color="bg-amber-600"
            description="DZD"
          />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Projets Actifs</h2>
            <p className="text-sm text-muted-foreground">Suivi des projets, ressources et budgets</p>
          </div>
          <Button data-testid="button-add-project" className="gap-2">
            <Plus className="w-4 h-4" /> Nouveau Projet
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.length ? (
            projects.map((proj: any) => (
              <Card key={proj.id} className="hover-elevate transition-all overflow-hidden" data-testid={`card-project-${proj.id}`}>
                <CardHeader className="pb-3 bg-gradient-to-r from-card to-muted/50">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{proj.name}</CardTitle>
                    <Badge className={proj.status === 'active' ? 'bg-green-600' : proj.status === 'completed' ? 'bg-blue-600' : 'bg-orange-600'}>
                      {proj.status === 'active' ? 'Actif' : proj.status === 'completed' ? 'Complété' : 'Planifié'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2">{proj.description || "Pas de description"}</p>
                  <div className="space-y-2">
                    {proj.budget && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-semibold">{proj.budget.toLocaleString()} DZD</span>
                      </div>
                    )}
                    {proj.progress !== undefined && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Avancement:</span>
                          <span className="font-semibold">{proj.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${proj.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">Aucun projet trouvé</p>
            </div>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
