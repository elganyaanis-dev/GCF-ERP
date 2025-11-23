import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ERPLayout } from "@/components/erp-layout";

export default function ERPContracts() {
  const [showForm, setShowForm] = useState(false);
  const [contractNumber, setContractNumber] = useState("");
  const [name, setName] = useState("");
  const [vendor, setVendor] = useState("");
  const [value, setValue] = useState("");
  const { toast } = useToast();

  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Documents", path: "/documents" },
    { label: "Paramètres", path: "/settings" },
  ];

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["/api/contracts"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/contracts", { credentials: "include" });
        if (!res.ok) return [];
        return res.json();
      } catch (e) {
        return [];
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!contractNumber || !name) {
        toast({ title: "Erreur", description: "Les champs obligatoires sont requis", variant: "destructive" });
        throw new Error("Champs vides");
      }

      const res = await apiRequest("POST", "/api/contracts", {
        contractNumber,
        name,
        vendor,
        value: value ? parseFloat(value) : null,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Succès", description: "Contrat créé avec succès" });
      setContractNumber("");
      setName("");
      setVendor("");
      setValue("");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/contracts"] });
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Contrats">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="text-purple-600" />
              Contrats
            </h1>
            <p className="text-muted-foreground mt-2">Gérez les contrats de service, emploi et fournitures</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2" data-testid="button-new-contract">
            <Plus className="w-4 h-4" />
            Nouveau Contrat
          </Button>
        </div>

        {showForm && (
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Créer un Contrat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Numéro de Contrat</label>
                <Input placeholder="CTR-2025-001" value={contractNumber} onChange={(e) => setContractNumber(e.target.value)} className="mt-1" data-testid="input-contract-number" />
              </div>

              <div>
                <label className="text-sm font-medium">Nom du Contrat</label>
                <Input placeholder="Contrat de Service" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" data-testid="input-contract-name" />
              </div>

              <div>
                <label className="text-sm font-medium">Fournisseur/Partenaire</label>
                <Input placeholder="Nom du fournisseur" value={vendor} onChange={(e) => setVendor(e.target.value)} className="mt-1" data-testid="input-contract-vendor" />
              </div>

              <div>
                <label className="text-sm font-medium">Valeur (DZD)</label>
                <Input type="number" placeholder="0" value={value} onChange={(e) => setValue(e.target.value)} className="mt-1" data-testid="input-contract-value" />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending} className="flex-1" data-testid="button-submit-contract">
                  Créer
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {!contracts || contracts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucun contrat enregistré</p>
            </div>
          ) : (
            contracts.map((contract: any) => (
              <Card key={contract.id} className="hover-elevate">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{contract.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{contract.contractNumber}</p>
                    </div>
                    <Badge>{contract.status === "active" ? "Actif" : "Expiré"}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {contract.vendor && <p className="text-sm"><strong>Fournisseur:</strong> {contract.vendor}</p>}
                  {contract.value && <p className="text-sm"><strong>Valeur:</strong> {contract.value} DZD</p>}
                  {contract.endDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Expire le: {new Date(contract.endDate).toLocaleDateString("fr-FR")}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
