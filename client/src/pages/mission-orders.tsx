import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function MissionOrders() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    projectId: "",
    destination: "",
    purpose: "",
    startDate: "",
    endDate: "",
    duration: 1,
    transportMode: "vehicle",
    estimatedBudget: 0,
  });

  const { data: orders, isLoading } = useQuery({
    queryKey: ["/api/mission-orders"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/mission-orders", data);
      return res.json();
    },
    onSuccess: () => {
      setFormData({
        employeeId: "",
        projectId: "",
        destination: "",
        purpose: "",
        startDate: "",
        endDate: "",
        duration: 1,
        transportMode: "vehicle",
        estimatedBudget: 0,
      });
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/mission-orders"] });
    },
  });

  const handleSubmit = () => {
    if (
      formData.employeeId &&
      formData.destination &&
      formData.purpose
    ) {
      createMutation.mutate({
        ...formData,
        duration: parseInt(formData.duration.toString()) || 1,
        estimatedBudget: parseFloat(formData.estimatedBudget.toString()) || 0,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ordres de Mission</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          data-testid="button-new-mission-order"
        >
          Nouvel Ordre
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer un Ordre de Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="ID de l'employé"
              value={formData.employeeId}
              onChange={(e) =>
                setFormData({ ...formData, employeeId: e.target.value })
              }
              data-testid="input-mission-employee-id"
            />
            <Input
              placeholder="ID du projet (optionnel)"
              value={formData.projectId}
              onChange={(e) =>
                setFormData({ ...formData, projectId: e.target.value })
              }
              data-testid="input-mission-project-id"
            />
            <Input
              placeholder="Destination"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              data-testid="input-mission-destination"
            />
            <textarea
              placeholder="Objectif de la mission"
              value={formData.purpose}
              onChange={(e) =>
                setFormData({ ...formData, purpose: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              data-testid="textarea-mission-purpose"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                data-testid="input-mission-start-date"
              />
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                data-testid="input-mission-end-date"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Durée (jours)"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value) || 1,
                  })
                }
                data-testid="input-mission-duration"
              />
              <select
                value={formData.transportMode}
                onChange={(e) =>
                  setFormData({ ...formData, transportMode: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
                data-testid="select-mission-transport"
              >
                <option value="vehicle">Véhicule</option>
                <option value="flight">Avion</option>
                <option value="train">Train</option>
                <option value="other">Autre</option>
              </select>
            </div>
            <Input
              type="number"
              placeholder="Budget estimé (DA)"
              value={formData.estimatedBudget}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimatedBudget: parseFloat(e.target.value),
                })
              }
              data-testid="input-mission-budget"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={createMutation.isPending}
                className="flex-1"
                data-testid="button-submit-mission-order"
              >
                Créer
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
                data-testid="button-cancel-mission-order"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center">Chargement...</div>
      ) : orders?.length === 0 ? (
        <div className="text-center text-muted-foreground">
          Aucun ordre de mission
        </div>
      ) : (
        <div className="grid gap-4">
          {orders?.map((order: any) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {order.orderNumber}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Vers {order.destination}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Objectif:</span>{" "}
                  {order.purpose}
                </p>
                <p>
                  <span className="font-semibold">Période:</span>{" "}
                  {format(new Date(order.startDate), "dd MMM yyyy")} -{" "}
                  {format(new Date(order.endDate), "dd MMM yyyy")}
                </p>
                <p>
                  <span className="font-semibold">Durée:</span> {order.duration}{" "}
                  jour(s)
                </p>
                {order.estimatedBudget && (
                  <p>
                    <span className="font-semibold">Budget:</span>{" "}
                    {order.estimatedBudget} DA
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
