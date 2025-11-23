import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function OrgStructure() {
  const [showCentralDirForm, setShowCentralDirForm] = useState(false);
  const [showPoleServiceForm, setShowPoleServiceForm] = useState(false);
  const [selectedPole, setSelectedPole] = useState<string | null>(null);

  const [centralDirData, setCentralDirData] = useState({ name: "", type: "" });
  const [poleServiceData, setPoleServiceData] = useState({ poleId: "", name: "", type: "" });

  const { data: centralDirs } = useQuery({
    queryKey: ["/api/organization/central-directions"],
  });

  const { data: poles } = useQuery({
    queryKey: ["/api/organization/poles"],
  });

  const { data: poleServices } = useQuery({
    queryKey: selectedPole ? ["/api/organization/poles", selectedPole, "services"] : [],
    enabled: !!selectedPole,
    queryFn: async () => {
      const res = await fetch(`/api/organization/poles/${selectedPole}/services`, {
        credentials: "include",
      });
      return res.json();
    },
  });

  const createCentralDirMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/organization/central-directions", data);
      return res.json();
    },
    onSuccess: () => {
      setCentralDirData({ name: "", type: "" });
      setShowCentralDirForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/organization/central-directions"] });
    },
  });

  const createPoleServiceMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/organization/pole-services", data);
      return res.json();
    },
    onSuccess: () => {
      setPoleServiceData({ poleId: "", name: "", type: "" });
      setShowPoleServiceForm(false);
      if (selectedPole) {
        queryClient.invalidateQueries({
          queryKey: ["/api/organization/poles", selectedPole, "services"],
        });
      }
    },
  });

  const handleCreateCentralDir = () => {
    if (centralDirData.name && centralDirData.type) {
      createCentralDirMutation.mutate(centralDirData);
    }
  };

  const handleCreatePoleService = () => {
    if (poleServiceData.poleId && poleServiceData.name && poleServiceData.type) {
      createPoleServiceMutation.mutate(poleServiceData);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Structure Organisationnelle Complète</h1>

      <Tabs defaultValue="central-dirs" className="w-full">
        <TabsList>
          <TabsTrigger value="central-dirs">Directions Centrales (DG)</TabsTrigger>
          <TabsTrigger value="pole-services">Services par Pôle</TabsTrigger>
        </TabsList>

        {/* CENTRAL DIRECTIONS */}
        <TabsContent value="central-dirs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Directions Centrales</h2>
            <Button
              onClick={() => setShowCentralDirForm(!showCentralDirForm)}
              data-testid="button-new-central-dir"
            >
              Ajouter Direction
            </Button>
          </div>

          {showCentralDirForm && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <Input
                  placeholder="Nom"
                  value={centralDirData.name}
                  onChange={(e) =>
                    setCentralDirData({ ...centralDirData, name: e.target.value })
                  }
                  data-testid="input-central-dir-name"
                />
                <select
                  value={centralDirData.type}
                  onChange={(e) =>
                    setCentralDirData({ ...centralDirData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  data-testid="select-central-dir-type"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="market">Marché</option>
                  <option value="realization">Réalisation</option>
                  <option value="hr">Ressources Humaines</option>
                  <option value="materials">Matériels</option>
                  <option value="studies">Études</option>
                </select>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateCentralDir}
                    disabled={createCentralDirMutation.isPending}
                    className="flex-1"
                    data-testid="button-submit-central-dir"
                  >
                    Créer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCentralDirForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {centralDirs?.map((dir: any) => (
              <Card key={dir.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>{dir.name}</CardTitle>
                    <Badge>{dir.type}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* POLE SERVICES */}
        <TabsContent value="pole-services" className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Sélectionner un Pôle</label>
              <select
                value={selectedPole || ""}
                onChange={(e) => setSelectedPole(e.target.value || null)}
                className="w-full px-3 py-2 border rounded-md mt-1"
                data-testid="select-pole-for-services"
              >
                <option value="">-- Choisir un pôle --</option>
                {poles?.map((pole: any) => (
                  <option key={pole.id} value={pole.id}>
                    {pole.name} ({pole.region})
                  </option>
                ))}
              </select>
            </div>
            {selectedPole && (
              <Button
                onClick={() => setShowPoleServiceForm(!showPoleServiceForm)}
                className="mt-6"
                data-testid="button-new-pole-service"
              >
                Ajouter Service
              </Button>
            )}
          </div>

          {selectedPole && showPoleServiceForm && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <select
                  value={poleServiceData.type}
                  onChange={(e) =>
                    setPoleServiceData({ ...poleServiceData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  data-testid="select-pole-service-type"
                >
                  <option value="">Sélectionner un service</option>
                  <option value="support">Soutien (RH & CNAS)</option>
                  <option value="realization">Réalisation</option>
                  <option value="procurement">Achats & Inventaire</option>
                  <option value="studies">Études</option>
                  <option value="projects">Projets & Chef de Projet</option>
                </select>
                <Input
                  placeholder="Nom du service"
                  value={poleServiceData.name}
                  onChange={(e) =>
                    setPoleServiceData({ ...poleServiceData, name: e.target.value })
                  }
                  data-testid="input-pole-service-name"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreatePoleService}
                    disabled={createPoleServiceMutation.isPending}
                    className="flex-1"
                    data-testid="button-submit-pole-service"
                  >
                    Créer Service
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPoleServiceForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedPole && (
            <div className="grid gap-4 mt-4">
              {poleServices?.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Aucun service pour ce pôle
                </div>
              ) : (
                poleServices?.map((service: any) => (
                  <Card key={service.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <Badge>{service.type}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
