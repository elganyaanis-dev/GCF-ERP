import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ERPEmployees() {
  const { data: employees = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/employees"],
  });

  const menuItems = [
    { label: "Dashboard", icon: Users, path: "/dashboard" },
    { label: "Employés", icon: Users, path: "/employees" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Employés">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Employés</h2>
          <Button data-testid="button-add-employee">
            <Plus className="w-4 h-4 mr-2" /> Ajouter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees?.length ? (
            employees.map((emp: any) => (
              <Card key={emp.id} className="p-4">
                <p className="font-semibold">{emp.firstName} {emp.lastName}</p>
                <p className="text-sm text-muted-foreground">{emp.position}</p>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">Aucun employé trouvé</p>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
