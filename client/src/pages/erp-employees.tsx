import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRole } from "@/hooks/useRole";

export default function ERPEmployees() {
  const { accreditationLevel } = useRole();
  const { data: employees = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/employees"],
  });

  const canAdd = accreditationLevel >= 2;

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
    <ERPLayout menuItems={menuItems} title="Gestion des Employés">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un employé..."
              className="pl-10"
              data-testid="input-search-employees"
            />
          </div>
          {canAdd && (
            <Button data-testid="button-add-employee">
              <Plus className="w-4 h-4 mr-2" /> Ajouter
            </Button>
          )}
        </div>

        <Card className="p-6" data-testid="card-employees-list">
          <h2 className="text-lg font-bold mb-4">Liste des Employés</h2>
          {employees?.length ? (
            <div className="space-y-3">
              {employees.map((emp: any) => (
                <div
                  key={emp.id}
                  className="flex justify-between items-center p-4 bg-muted/50 rounded hover-elevate"
                  data-testid={`row-employee-${emp.id}`}
                >
                  <div>
                    <p className="font-medium" data-testid={`text-name-${emp.id}`}>{emp.firstName} {emp.lastName}</p>
                    <p className="text-xs text-muted-foreground">{emp.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{emp.position || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">{emp.department || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Aucun employé</p>
          )}
        </Card>
      </div>
    </ERPLayout>
  );
}
