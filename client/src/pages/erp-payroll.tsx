import { Calendar, BarChart3, Globe, FileText, Users, DollarSign } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ERPPayroll() {
  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Paie", icon: Calendar, path: "/payroll" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Gestion de la Paie">
      <div className="p-8 space-y-6">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" /> Paie Algérienne Conforme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              CNSS 8%, Assurance Chômage, IRG progressif, allocations automatiques
            </p>
            <div className="flex gap-3">
              <Button>Générer Bulletins</Button>
              <Button variant="outline">Imprimer Paies</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Employés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Masse Salariale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-- DA</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">CNSS Mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-- DA</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">IRG Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-- DA</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ERPLayout>
  );
}
