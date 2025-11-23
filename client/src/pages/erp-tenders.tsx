import { Globe, BarChart3, ExternalLink, FileText, Users } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TENDER_PLATFORMS } from "@/config/erp";

export default function ERPTenders() {
  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Documents", icon: FileText, path: "/documents" },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Marchés Publics Algérie">
      <div className="p-8 space-y-6">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" /> Plateformes Algériennes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Accès direct aux 7 principales plateformes de marchés publics algériens
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {TENDER_PLATFORMS.map((platform) => (
                <a
                  key={platform.url}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button variant="outline" className="w-full justify-between hover-elevate">
                    <span>{platform.name}</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Marchés Suivis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Participations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Remportés</CardTitle>
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
