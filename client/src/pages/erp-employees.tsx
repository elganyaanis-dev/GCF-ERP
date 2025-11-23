import { Users, FileText, BarChart3, Globe, Calendar } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ERPEmployees() {
  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Paie", icon: Calendar, path: "/payroll" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Employés">
      <div className="p-8 space-y-6">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> Employés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Gestion complète des employés avec profils, contrats, allocations et conformité algérienne
            </p>
            <div className="flex gap-3">
              <Button>Ajouter un employé</Button>
              <Button variant="outline">Importer depuis Excel</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Employés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">CDI/CDD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">En Congés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ERPLayout>
  );
}
