import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Organization() {
  const [showDirectionForm, setShowDirectionForm] = useState(false);
  const [showPoleForm, setShowPoleForm] = useState(false);
  const [showUnitForm, setShowUnitForm] = useState(false);

  const [directionData, setDirectionData] = useState({ name: "", location: "" });
  const [poleData, setPoleData] = useState({ name: "", region: "", location: "" });
  const [unitData, setUnitData] = useState({ name: "", city: "", poleId: "" });

  const { data: directions } = useQuery({
    queryKey: ["/api/organization/directions"],
  });

  const { data: poles } = useQuery({
    queryKey: ["/api/organization/poles"],
  });

  const { data: units } = useQuery({
    queryKey: ["/api/organization/units"],
  });

  const createDirectionMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/organization/directions", data);
      return res.json();
    },
    onSuccess: () => {
      setDirectionData({ name: "", location: "" });
      setShowDirectionForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/organization/directions"] });
    },
  });

  const createPoleMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/organization/poles", data);
      return res.json();
    },
    onSuccess: () => {
      setPoleData({ name: "", region: "", location: "" });
      setShowPoleForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/organization/poles"] });
    },
  });

  const createUnitMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/organization/units", data);
      return res.json();
    },
    onSuccess: () => {
      setUnitData({ name: "", city: "", poleId: "" });
      setShowUnitForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/organization/units"] });
    },
  });

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Structure Organisationnelle</h1>

      <Tabs defaultValue="directions" className="w-full">
        <TabsList>
          <TabsTrigger value="directions">Direction Générale</TabsTrigger>
          <TabsTrigger value="poles">Pôles Opérationnels</TabsTrigger>
          <TabsTrigger value="units">Unités</TabsTrigger>
        </TabsList>

        {/* DIRECTIONS */}
        <TabsContent value="directions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Direction Générale</h2>
            <Button
              onClick={() => setShowDirectionForm(!showDirectionForm)}
              data-testid="button-new-direction"
            >
              Ajouter
            </Button>
          </div>

          {showDirectionForm && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <Input
                  placeholder="Nom"
                  value={directionData.name}
                  onChange={(e) => setDirectionData({ ...directionData, name: e.target.value })}
                  data-testid="input-direction-name"
                />
                <Input
                  placeholder="Localisation"
                  value={directionData.location}
                  onChange={(e) => setDirectionData({ ...directionData, location: e.target.value })}
                  data-testid="input-direction-location"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => createDirectionMutation.mutate(directionData)}
                    disabled={createDirectionMutation.isPending}
                    className="flex-1"
                    data-testid="button-submit-direction"
                  >
                    Créer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDirectionForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {directions?.map((dir: any) => (
              <Card key={dir.id}>
                <CardHeader className="pb-3">
                  <CardTitle>{dir.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="font-semibold">Localisation:</span> {dir.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* POLES */}
        <TabsContent value="poles" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Pôles Opérationnels</h2>
            <Button
              onClick={() => setShowPoleForm(!showPoleForm)}
              data-testid="button-new-pole"
            >
              Ajouter
            </Button>
          </div>

          {showPoleForm && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <Input
                  placeholder="Nom du pôle"
                  value={poleData.name}
                  onChange={(e) => setPoleData({ ...poleData, name: e.target.value })}
                  data-testid="input-pole-name"
                />
                <select
                  value={poleData.region}
                  onChange={(e) => setPoleData({ ...poleData, region: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  data-testid="select-pole-region"
                >
                  <option value="">Sélectionner une région</option>
                  <option value="Extrême Est">Extrême Est (Annaba)</option>
                  <option value="Centre">Centre (Alger)</option>
                  <option value="Ouest">Ouest (Oran)</option>
                  <option value="Sud">Sud (Batna)</option>
                </select>
                <Input
                  placeholder="Localisation"
                  value={poleData.location}
                  onChange={(e) => setPoleData({ ...poleData, location: e.target.value })}
                  data-testid="input-pole-location"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => createPoleMutation.mutate(poleData)}
                    disabled={createPoleMutation.isPending}
                    className="flex-1"
                    data-testid="button-submit-pole"
                  >
                    Créer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPoleForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {poles?.map((pole: any) => (
              <Card key={pole.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>{pole.name}</CardTitle>
                    <Badge>{pole.region}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="font-semibold">Localisation:</span> {pole.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* UNITS */}
        <TabsContent value="units" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Unités Locales</h2>
            <Button
              onClick={() => setShowUnitForm(!showUnitForm)}
              data-testid="button-new-unit"
            >
              Ajouter
            </Button>
          </div>

          {showUnitForm && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <Input
                  placeholder="Nom de l'unité"
                  value={unitData.name}
                  onChange={(e) => setUnitData({ ...unitData, name: e.target.value })}
                  data-testid="input-unit-name"
                />
                <Input
                  placeholder="Ville"
                  value={unitData.city}
                  onChange={(e) => setUnitData({ ...unitData, city: e.target.value })}
                  data-testid="input-unit-city"
                />
                <select
                  value={unitData.poleId}
                  onChange={(e) => setUnitData({ ...unitData, poleId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  data-testid="select-unit-pole"
                >
                  <option value="">Sélectionner un pôle</option>
                  {poles?.map((pole: any) => (
                    <option key={pole.id} value={pole.id}>
                      {pole.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <Button
                    onClick={() => createUnitMutation.mutate(unitData)}
                    disabled={createUnitMutation.isPending}
                    className="flex-1"
                    data-testid="button-submit-unit"
                  >
                    Créer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowUnitForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {units?.map((unit: any) => (
              <Card key={unit.id}>
                <CardHeader className="pb-3">
                  <CardTitle>{unit.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="font-semibold">Ville:</span> {unit.city}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
