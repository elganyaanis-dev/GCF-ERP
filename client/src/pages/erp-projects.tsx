import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Projets">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Projets</h2>
            <p className="text-sm text-muted-foreground">Suivi des projets, ressources et budgets</p>
          </div>
          <Button data-testid="button-add-project">
            <Plus className="w-4 h-4 mr-2" /> Nouveau
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.length ? (
            projects.map((proj: any) => (
              <Card key={proj.id} className="p-4 hover-elevate" data-testid={`card-project-${proj.id}`}>
                <p className="font-semibold">{proj.name}</p>
                <p className="text-sm text-muted-foreground">{proj.status}</p>
                <p className="text-xs text-muted-foreground mt-2">Budget: {proj.budget || "N/A"}</p>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8 col-span-3">Aucun projet trouvé</p>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
