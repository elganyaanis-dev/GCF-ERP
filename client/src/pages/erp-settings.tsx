import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ERPSettings() {
  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Employés", path: "/employees" },
    { label: "Projets", path: "/projects" },
    { label: "Documents", path: "/documents" },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Paramètres">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Paramètres ERP</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Informations Générales</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Nom de l'Entreprise</label>
                <input 
                  type="text" 
                  className="w-full mt-2 px-3 py-2 rounded border border-input"
                  data-testid="input-company-name"
                  defaultValue="Nom ERP"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <input 
                  type="email" 
                  className="w-full mt-2 px-3 py-2 rounded border border-input"
                  data-testid="input-email"
                  defaultValue="contact@erp.dz"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Paramètres Financiers</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Devise</label>
                <select className="w-full mt-2 px-3 py-2 rounded border border-input">
                  <option>DZD - Dinar Algérien</option>
                  <option>USD - Dollar</option>
                  <option>EUR - Euro</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Taux CNSS (%)</label>
                <input 
                  type="number" 
                  className="w-full mt-2 px-3 py-2 rounded border border-input"
                  data-testid="input-cnss-rate"
                  defaultValue="8"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex gap-3">
          <Button data-testid="button-save-settings" className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Enregistrer
          </Button>
          <Button variant="outline" data-testid="button-cancel-settings">Annuler</Button>
        </div>
      </div>
    </ERPLayout>
  );
}
