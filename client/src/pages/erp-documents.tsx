import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ERPDocuments() {
  const { data: documents = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/documents"],
  });

  const menuItems = [
    { label: "Dashboard", icon: FileText, path: "/dashboard" },
    { label: "Documents", icon: FileText, path: "/documents" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Documents">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Documents</h2>
          <Button data-testid="button-add-document">
            <Plus className="w-4 h-4 mr-2" /> Créer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents?.length ? (
            documents.map((doc: any) => (
              <Card key={doc.id} className="p-4">
                <p className="font-semibold">{doc.title}</p>
                <p className="text-sm text-muted-foreground">{doc.type}</p>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">Aucun document trouvé</p>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
