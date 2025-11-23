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
        {/* Stats Cards - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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

        {/* Filters & Actions - Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 bg-card p-3 sm:p-4 rounded-lg border">
          <div className="flex-1 relative min-w-0">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 text-sm"
              data-testid="input-search-employees"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hover-elevate flex-shrink-0 h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover-elevate flex-shrink-0 h-9 w-9">
              <Download className="h-4 w-4" />
            </Button>
            {canAdd && (
              <Button data-testid="button-add-employee" className="gap-2 flex-shrink-0 text-sm">
                <Plus className="w-4 h-4" /> 
                <span className="hidden sm:inline">Ajouter</span>
              </Button>
            )}
          </div>
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
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg hover-elevate transition-all bg-card/50 hover:bg-card/80"
                    data-testid={`row-employee-${emp.id}`}
                  >
                    <div className="flex-1 w-full sm:w-auto min-w-0">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
                          {emp.firstName?.[0]}{emp.lastName?.[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm truncate" data-testid={`text-name-${emp.id}`}>
                            {emp.firstName} {emp.lastName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {emp.email && (
                              <a href={`mailto:${emp.email}`} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 truncate">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{emp.email.split('@')[0]}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{emp.position || "N/A"}</p>
                        <p className="text-xs text-muted-foreground">{emp.department || "N/A"}</p>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0 text-xs">
                        {emp.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                      <Button size="icon" variant="ghost" className="hover-elevate flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9">
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
