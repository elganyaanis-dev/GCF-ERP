import { Users, BarChart3, Globe, FileText, Building2 } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ERPOrganization() {
  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Organisation", icon: Building2, path: "/organization" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Structure Organisationnelle">
      <div className="p-8 space-y-6">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Organigramme Autonome
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Directions, pôles, services, unités avec hiérarchie
            </p>
            <div className="flex gap-3">
              <Button>Ajouter Direction</Button>
              <Button variant="outline">Voir Hiérarchie</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Directions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Pôles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Unités</CardTitle>
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
