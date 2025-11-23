import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ERPPayroll() {
  const { data: payrolls = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/payroll"],
  });

  const menuItems = [
    { label: "Dashboard", icon: DollarSign, path: "/dashboard" },
    { label: "Paie", icon: DollarSign, path: "/payroll" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Gestion de la Paie">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Paie</h2>
          <Button data-testid="button-process-payroll">
            <Plus className="w-4 h-4 mr-2" /> Traiter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payrolls?.length ? (
            payrolls.map((payroll: any) => (
              <Card key={payroll.id} className="p-4">
                <p className="font-semibold">{payroll.month}/{payroll.year}</p>
                <p className="text-sm text-muted-foreground">{payroll.status}</p>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">Aucune paie trouvée</p>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
