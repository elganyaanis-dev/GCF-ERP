import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ERPOrganization() {
  const { data: structure, isLoading } = useQuery({
    queryKey: ["/api/organization"],
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
    <ERPLayout menuItems={menuItems} title="Structure Organisationnelle">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Organisation</h2>
          <Button data-testid="button-add-unit">
            <Plus className="w-4 h-4 mr-2" /> Ajouter
          </Button>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground">Organigramme en construction</p>
        </Card>
      </div>
    </ERPLayout>
  );
}
