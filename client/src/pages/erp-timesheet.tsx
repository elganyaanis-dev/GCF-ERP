import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ERPLayout } from "@/components/erp-layout";

export default function ERPTimesheet() {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hoursWorked, setHoursWorked] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { toast } = useToast();

  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Employés", path: "/employees" },
    { label: "Projets", path: "/projects" },
  ];

  const { data: timesheets, isLoading } = useQuery({
    queryKey: ["/api/timesheets"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/timesheets", { credentials: "include" });
        if (!res.ok) return [];
        return res.json();
      } catch (e) {
        return [];
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!date || !hoursWorked || !taskDescription.trim()) {
        toast({ title: "Erreur", description: "Tous les champs sont requis", variant: "destructive" });
        throw new Error("Champs vides");
      }

      const res = await apiRequest("POST", "/api/timesheets", {
        date,
        hoursWorked: parseFloat(hoursWorked),
        taskDescription,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Succès", description: "Feuille de temps enregistrée" });
      setDate(new Date().toISOString().split('T')[0]);
      setHoursWorked("");
      setTaskDescription("");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/timesheets"] });
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Feuilles de Temps">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Clock className="text-green-600" />
              Feuilles de Temps
            </h1>
            <p className="text-muted-foreground mt-2">Enregistrez vos heures de travail quotidiennes</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2" data-testid="button-new-timesheet">
            <Plus className="w-4 h-4" />
            Nouvelle Entrée
          </Button>
        </div>

        {showForm && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Enregistrer les Heures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" data-testid="input-timesheet-date" />
              </div>

              <div>
                <label className="text-sm font-medium">Heures Travaillées</label>
                <Input type="number" step="0.5" min="0" max="12" placeholder="8" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} className="mt-1" data-testid="input-timesheet-hours" />
              </div>

              <div>
                <label className="text-sm font-medium">Description de la Tâche</label>
                <textarea placeholder="Détaillez ce que vous avez accompli..." value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md mt-1 min-h-[100px]" data-testid="textarea-timesheet-task" />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending} className="flex-1" data-testid="button-submit-timesheet">
                  Enregistrer
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {!timesheets || timesheets.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune feuille de temps pour le moment</p>
            </div>
          ) : (
            timesheets.map((ts: any) => (
              <Card key={ts.id} className="hover-elevate">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{ts.date}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{ts.hoursWorked}h travaillées</p>
                    </div>
                    <Badge variant={ts.status === "approved" ? "default" : ts.status === "rejected" ? "destructive" : "secondary"}>
                      {ts.status === "submitted" ? "Soumise" : ts.status === "approved" ? "Approuvée" : "Rejetée"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{ts.taskDescription}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
