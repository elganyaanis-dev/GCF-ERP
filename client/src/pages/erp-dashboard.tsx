import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, FileText, DollarSign, TrendingUp, BookOpen, Briefcase, MapPin } from "lucide-react";
import { useRole, canViewPayroll } from "@/hooks/useRole";
import { StatCard } from "@/components/stat-card";

export default function ERPDashboard() {
  const { role, accreditationLevel, poleServiceId, isLoading: roleLoading } = useRole();
  
  const { data: stats = {}, isLoading: statsLoading } = useQuery<any>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: myFormations = [], isLoading: formationsLoading } = useQuery<any[]>({
    queryKey: ["/api/formations"],
  });

  const { data: myOrders = [], isLoading: ordersLoading } = useQuery<any[]>({
    queryKey: ["/api/mission-orders"],
  });

  const { data: myTravels = [], isLoading: travelsLoading } = useQuery<any[]>({
    queryKey: ["/api/travels"],
  });

  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Projets", icon: TrendingUp, path: "/projects" },
    { label: "Documents", icon: FileText, path: "/documents" },
    ...(canViewPayroll(role, accreditationLevel) ? [{ label: "Paie", icon: DollarSign, path: "/payroll" }] : []),
  ];

  const isLoading = roleLoading || statsLoading || formationsLoading || ordersLoading || travelsLoading;

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  // Employee level (0): Personal dashboard
  if (accreditationLevel === 0) {
    return (
      <ERPLayout menuItems={menuItems} title="Mon Espace">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Formations Éligibles"
              value={myFormations.length}
              icon={BookOpen}
              color="bg-blue-600"
              description="Recommandées"
              data-testid="card-formations"
            />

            <StatCard
              label="Ordres de Mission"
              value={myOrders.length}
              icon={Briefcase}
              color="bg-green-600"
              description="En cours"
            />

            <StatCard
              label="Ordres de Déplacement"
              value={myTravels.length}
              icon={MapPin}
              color="bg-orange-600"
              description="Actifs"
            />

            <StatCard
              label="Mes Documents"
              value={stats.totalDocuments || 0}
              icon={FileText}
              color="bg-purple-600"
              description="Archivés"
            />
          </div>

          <Card className="p-6" data-testid="card-formations-list">
            <h2 className="text-lg font-bold mb-4">Formations Recommandées</h2>
            {myFormations.length > 0 ? (
              <div className="space-y-3">
                {myFormations.slice(0, 5).map((form: any) => (
                  <div key={form.id} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <div>
                      <p className="font-medium">{form.title}</p>
                      <p className="text-xs text-muted-foreground">{form.provider}</p>
                    </div>
                    <p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Recommandée</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucune formation recommandée</p>
            )}
          </Card>
        </div>
      </ERPLayout>
    );
  }

  // Manager/Chef de service level (1)
  if (accreditationLevel === 1) {
    return (
      <ERPLayout menuItems={menuItems} title="Gestion du Service">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6 hover-elevate" data-testid="card-service-employees">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Employés du Service</p>
                  <p className="text-3xl font-bold">{stats.totalEmployees || 0}</p>
                </div>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-service-projects">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Projets du Service</p>
                  <p className="text-3xl font-bold">{stats.activeProjects || 0}</p>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-service-documents">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Documents Service</p>
                  <p className="text-3xl font-bold">{stats.totalDocuments || 0}</p>
                </div>
                <FileText className="h-5 w-5 text-orange-600" />
              </div>
            </Card>
          </div>

          <Card className="p-6" data-testid="card-service-info">
            <h2 className="text-lg font-bold mb-4">Vue d'ensemble du Service</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Vous êtes Chef de Service - Accès complet aux données de votre service</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Gestion des employés de votre service</li>
                <li>Suivi des projets</li>
                <li>Gestion des documents</li>
                <li>Approvals et validations</li>
              </ul>
            </div>
          </Card>
        </div>
      </ERPLayout>
    );
  }

  // RH level (2+)
  if (role === "rh" || accreditationLevel >= 2) {
    return (
      <ERPLayout menuItems={menuItems} title="Tableau de Bord RH">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 hover-elevate" data-testid="card-total-employees">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Employés</p>
                  <p className="text-3xl font-bold">{stats.totalEmployees || 0}</p>
                </div>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-payroll">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Paies Traitées</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-formations-count">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Formations</p>
                  <p className="text-3xl font-bold">{myFormations.length}</p>
                </div>
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-documents-count">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Documents RH</p>
                  <p className="text-3xl font-bold">{stats.totalDocuments || 0}</p>
                </div>
                <FileText className="h-5 w-4 text-orange-600" />
              </div>
            </Card>
          </div>

          <Card className="p-6" data-testid="card-rh-info">
            <h2 className="text-lg font-bold mb-4">Actions RH</h2>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Accès complet à toutes les fonctionnalités RH</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Gestion complète des employés</li>
                <li>Traitement de la paie</li>
                <li>Formations et développement</li>
                <li>Ordres de mission et déplacements</li>
                <li>Évaluations et performance</li>
              </ul>
            </div>
          </Card>
        </div>
      </ERPLayout>
    );
  }

  // Default dashboard for admin/director
  return (
    <ERPLayout menuItems={menuItems} title="Tableau de Bord Exécutif">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 hover-elevate" data-testid="card-employees">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Employés actifs</p>
                <p className="text-3xl font-bold">{stats.totalEmployees || 0}</p>
              </div>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-projects">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Projets en cours</p>
                <p className="text-3xl font-bold">{stats.activeProjects || 0}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-documents">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Documents</p>
                <p className="text-3xl font-bold">{stats.totalDocuments || 0}</p>
              </div>
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-pending">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">En attente</p>
                <p className="text-3xl font-bold">{stats.pendingLeaves || 0}</p>
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
