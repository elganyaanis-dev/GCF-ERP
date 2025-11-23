import { BarChart3, Globe, FileText, Users, Settings, LogOut, Lock, Shield } from "lucide-react";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ERP_CONFIG } from "@/config/erp";

export default function ERPSettings() {
  const { logout } = useAuth();
  const selectedERP = (sessionStorage.getItem("selected_erp") || "gcf") as keyof typeof ERP_CONFIG;
  const erpConfig = ERP_CONFIG[selectedERP];

  const menuItems = [
    { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
    { label: "Paramètres", icon: Settings, path: "/settings" },
    { label: "Employés", icon: Users, path: "/employees" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Marchés Publics", icon: Globe, path: "/tenders" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("selected_erp");
    logout();
  };

  return (
    <ERPLayout menuItems={menuItems} title="Paramètres & Configuration">
      <div className="p-8 space-y-6">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Informations de la Filiale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Identifiant</p>
                <p className="font-semibold">{erpConfig?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type d'accès</p>
                <p className="font-semibold">Multi-Tenant Autonome</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-elevate transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Grille Salariale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configuration des grilles salariales
              </p>
              <Button variant="outline" className="w-full">
                Configurer
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Organigramme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Structures et hiérarchies
              </p>
              <Button variant="outline" className="w-full">
                Gérer
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Conformité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Paramètres légaux algériens
              </p>
              <Button variant="outline" className="w-full">
                Configurer
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Contrôle d'accès et audit
              </p>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Lock className="h-4 w-4" /> Paramètres RBAC
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Déconnexion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Vous allez revenir au sélecteur de filiales
            </p>
            <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Déconnexion
            </Button>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
