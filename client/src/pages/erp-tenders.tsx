import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { TENDER_PLATFORMS } from "@/config/erp";

export default function ERPTenders() {
  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Employés", path: "/employees" },
    { label: "Projets", path: "/projects" },
    { label: "Documents", path: "/documents" },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Marchés Publics Algériens">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Plateformes de Marchés Publics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TENDER_PLATFORMS.map((platform) => (
            <a
              key={platform.url}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-tender-${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Card className="p-6 hover-elevate cursor-pointer transition-all">
                <p className="font-semibold text-lg">{platform.name}</p>
                <p className="text-sm text-muted-foreground mt-2">Accéder →</p>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </ERPLayout>
  );
}
