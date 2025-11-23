import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ERPLayout } from "@/components/erp-layout";

export default function ERPInventory() {
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const { toast } = useToast();

  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Employés", path: "/employees" },
    { label: "Projets", path: "/projects" },
  ];

  const { data: items, isLoading } = useQuery({
    queryKey: ["/api/inventory"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/inventory", { credentials: "include" });
        if (!res.ok) return [];
        return res.json();
      } catch (e) {
        return [];
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!code || !name || !quantity) {
        toast({ title: "Erreur", description: "Tous les champs sont requis", variant: "destructive" });
        throw new Error("Champs vides");
      }

      const res = await apiRequest("POST", "/api/inventory", {
        code,
        name,
        quantityInStock: parseInt(quantity),
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Succès", description: "Article ajouté à l'inventaire" });
      setCode("");
      setName("");
      setQuantity("");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Gestion d'Inventaire">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Package className="text-blue-600" />
              Inventaire & Stock
            </h1>
            <p className="text-muted-foreground mt-2">Gérez votre stock de produits et matériaux</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2" data-testid="button-new-inventory">
            <Plus className="w-4 h-4" />
            Ajouter un Article
          </Button>
        </div>

        {showForm && (
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle>Ajouter un Article</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Code Article</label>
                <Input placeholder="SKU-001" value={code} onChange={(e) => setCode(e.target.value)} className="mt-1" data-testid="input-inventory-code" />
              </div>

              <div>
                <label className="text-sm font-medium">Nom</label>
                <Input placeholder="Nom du produit" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" data-testid="input-inventory-name" />
              </div>

              <div>
                <label className="text-sm font-medium">Quantité en Stock</label>
                <Input type="number" min="0" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1" data-testid="input-inventory-quantity" />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending} className="flex-1" data-testid="button-submit-inventory">
                  Ajouter
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {!items || items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucun article en inventaire</p>
            </div>
          ) : (
            items.map((item: any) => (
              <Card key={item.id} className="hover-elevate">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Code: {item.code}</p>
                    </div>
                    <Badge variant={item.quantityInStock < (item.minThreshold || 10) ? "destructive" : "default"}>
                      {item.quantityInStock} unités
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {item.quantityInStock < (item.minThreshold || 10) && (
                    <div className="flex gap-2 text-sm text-amber-600 items-center">
                      <AlertTriangle className="w-4 h-4" />
                      Stock faible - Veuillez réapprovisionner
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
