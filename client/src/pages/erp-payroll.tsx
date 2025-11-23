import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/hooks/useRole";

export default function ERPPayroll() {
  const { accreditationLevel } = useRole();
  const { data: payrolls = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/payroll"],
  });

  const canProcess = accreditationLevel >= 2;

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
    <ERPLayout menuItems={menuItems} title="Gestion de la Paie">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Paie</h2>
            <p className="text-sm text-muted-foreground">Calcul conforme algérien - CNSS, IRG, Assurance Chômage</p>
          </div>
          {canProcess && (
            <Button data-testid="button-process-payroll">
              <Plus className="w-4 h-4 mr-2" /> Traiter
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payrolls?.length ? (
            payrolls.map((payroll: any) => (
              <Card key={payroll.id} className="p-4 hover-elevate" data-testid={`card-payroll-${payroll.id}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{payroll.month}/{payroll.year}</p>
                    <p className="text-sm text-muted-foreground">{payroll.status}</p>
                  </div>
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8 col-span-3">Aucune paie trouvée</p>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
