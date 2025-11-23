import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, Search, Users, Mail, Phone, Briefcase, Eye, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/hooks/useRole";
import { StatCard } from "@/components/stat-card";

export default function ERPEmployees() {
  const { accreditationLevel } = useRole();
  const { data: employees = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/employees"],
  });

  const canAdd = accreditationLevel >= 2;

  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Employés", path: "/employees" },
    { label: "Projets", path: "/projects" },
    { label: "Documents", path: "/documents" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Employés">
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Total Employés"
            value={employees?.length || "0"}
            icon={Users}
            color="bg-blue-600"
            description="Actifs et inactifs"
          />
          <StatCard
            label="Contrats Actifs"
            value={Math.ceil((employees?.length || 0) * 0.85)}
            icon={Briefcase}
            color="bg-green-600"
            trend={5}
            description="CDI et CDD"
          />
          <StatCard
            label="Formations Prévues"
            value={Math.ceil((employees?.length || 0) * 0.3)}
            icon={Users}
            color="bg-purple-600"
            trend={12}
            description="Ce mois"
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center justify-between gap-4 bg-card p-4 rounded-lg border">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un employé..."
              className="pl-10"
              data-testid="input-search-employees"
            />
          </div>
          <Button variant="outline" size="icon" className="hover-elevate">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="hover-elevate">
            <Download className="h-4 w-4" />
          </Button>
          {canAdd && (
            <Button data-testid="button-add-employee" className="gap-2">
              <Plus className="w-4 h-4" /> Ajouter
            </Button>
          )}
        </div>

        {/* Employees List */}
        <Card data-testid="card-employees-list">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Liste des Employés ({employees?.length || 0})</span>
              <Badge variant="outline">{employees?.length || 0} résultats</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {employees?.length ? (
              <div className="space-y-2">
                {employees.map((emp: any) => (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover-elevate transition-all bg-card/50 hover:bg-card/80"
                    data-testid={`row-employee-${emp.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                          {emp.firstName?.[0]}{emp.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold" data-testid={`text-name-${emp.id}`}>
                            {emp.firstName} {emp.lastName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {emp.email && (
                              <a href={`mailto:${emp.email}`} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {emp.email}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{emp.position || "Non défini"}</p>
                        <p className="text-xs text-muted-foreground">{emp.department || "N/A"}</p>
                      </div>
                      <Badge variant="outline">
                        {emp.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                      <Button size="icon" variant="ghost" className="hover-elevate">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-muted-foreground">Aucun employé trouvé</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
