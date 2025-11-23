import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { BarChart3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ERPProjects() {
  const { data: projects = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/projects"],
  });

  const menuItems = [
    { label: "Dashboard", icon: BarChart3, path: "/dashboard" },
    { label: "Projets", icon: BarChart3, path: "/projects" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Projets">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projets</h2>
          <Button data-testid="button-add-project">
            <Plus className="w-4 h-4 mr-2" /> Nouveau
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.length ? (
            projects.map((proj: any) => (
              <Card key={proj.id} className="p-4">
                <p className="font-semibold">{proj.name}</p>
                <p className="text-sm text-muted-foreground">{proj.status}</p>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">Aucun projet trouvé</p>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
