import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function Travels() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    transportMode: "car",
    distance: 0,
    estimatedCost: 0,
  });

  const { data: travels, isLoading } = useQuery({
    queryKey: ["/api/travels"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/travels", data);
      return res.json();
    },
    onSuccess: () => {
      setFormData({
        employeeId: "",
        origin: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        transportMode: "car",
        distance: 0,
        estimatedCost: 0,
      });
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/travels"] });
    },
  });

  const handleSubmit = () => {
    if (formData.employeeId && formData.destination) {
      createMutation.mutate({
        ...formData,
        distance: parseInt(formData.distance.toString()) || 0,
        estimatedCost: parseFloat(formData.estimatedCost.toString()) || 0,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Déplacements</h1>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-new-travel">
          Nouveau Déplacement
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Enregistrer un Déplacement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="ID de l'employé"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              data-testid="input-travel-employee-id"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Départ"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                data-testid="input-origin"
              />
              <Input
                placeholder="Destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                data-testid="input-travel-destination"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                data-testid="input-departure-date"
              />
              <Input
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                data-testid="input-return-date"
              />
            </div>
            <select
              value={formData.transportMode}
              onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              data-testid="select-travel-transport"
            >
              <option value="car">Voiture</option>
              <option value="flight">Avion</option>
              <option value="train">Train</option>
              <option value="bus">Bus</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Distance (km)"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: parseFloat(e.target.value) })}
                data-testid="input-distance"
              />
              <Input
                type="number"
                placeholder="Coût estimé (DA)"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: parseFloat(e.target.value) })}
                data-testid="input-estimated-cost"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={createMutation.isPending}
                className="flex-1"
                data-testid="button-submit-travel"
              >
                Enregistrer
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
                data-testid="button-cancel-travel"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center">Chargement...</div>
      ) : travels?.length === 0 ? (
        <div className="text-center text-muted-foreground">Aucun déplacement enregistré</div>
      ) : (
        <div className="grid gap-4">
          {travels?.map((travel: any) => (
            <Card key={travel.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {travel.origin} → {travel.destination}
                  </CardTitle>
                  <Badge className={getStatusColor(travel.status)}>
                    {travel.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Période:</span>{" "}
                  {format(new Date(travel.departureDate), "dd MMM yyyy")} -{" "}
                  {format(new Date(travel.returnDate), "dd MMM yyyy")}
                </p>
                <p>
                  <span className="font-semibold">Transport:</span> {travel.transportMode}
                </p>
                {travel.distance && (
                  <p>
                    <span className="font-semibold">Distance:</span> {travel.distance} km
                  </p>
                )}
                {travel.estimatedCost && (
                  <p>
                    <span className="font-semibold">Coût estimé:</span> {travel.estimatedCost} DA
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
