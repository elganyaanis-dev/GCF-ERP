import { FileText, BarChart3, Globe, Users, Edit, Download } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ERPDocuments() {
  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Documents">
      <div className="p-8 space-y-6">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Documents Intégrés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Éditeur texte, support Excel, versioning, archivage
            </p>
            <div className="flex gap-3">
              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" /> Créer Document
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Importer
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Versions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Stockage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-- MB</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ERPLayout>
  );
}
