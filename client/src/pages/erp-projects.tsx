import { FolderKanban, BarChart3, Globe, FileText, Calendar, Users } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ERPProjects() {
  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Projets", icon: FolderKanban, path: "/projects" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Projets">
      <div className="p-8 space-y-6">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" /> Projets & Gantt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Gestion de projets avec support Gantt, suivi budgétaire, allocation de ressources et supervision
            </p>
            <div className="flex gap-3">
              <Button>Créer un projet</Button>
              <Button variant="outline">Voir Gantt</Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Projets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">En Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Budget Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-- DA</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Avancement Moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--%</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ERPLayout>
  );
}
