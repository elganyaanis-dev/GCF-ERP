import { useQuery } from "@tanstack/react-query";
import { ERPLayout } from "@/components/erp-layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, CheckCircle2, Clock, AlertCircle, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ERPMissions() {
  const { data: missions = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/missions"],
  });

  const menuItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Employés", path: "/employees" },
    { label: "Projets", path: "/projects" },
    { label: "Missions", path: "/missions" },
    { label: "Documents", path: "/documents" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  const stats = {
    totalMissions: missions?.length || 0,
    activeMissions: missions?.filter((m: any) => m.status === 'active').length || 0,
    completedMissions: missions?.filter((m: any) => m.status === 'completed').length || 0,
    totalTasks: missions?.reduce((sum: number, m: any) => sum + (m.tasks?.length || 0), 0) || 0,
  };

  const phases = [
    { id: 'planification', label: 'Planification', color: 'bg-blue-100 text-blue-800', icon: Clock },
    { id: 'execution', label: 'Exécution', color: 'bg-orange-100 text-orange-800', icon: Zap },
    { id: 'validation', label: 'Validation', color: 'bg-purple-100 text-purple-800', icon: AlertCircle },
    { id: 'completion', label: 'Clôture', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  ];

  return (
    <ERPLayout menuItems={menuItems} title="Gestion des Missions">
      <div className="p-3 sm:p-6 space-y-6">
        {/* KPIs - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            label="Total Missions"
            value={stats.totalMissions}
            icon={Users}
            color="bg-blue-600"
            description="Tous les statuts"
          />
          <StatCard
            label="Missions Actives"
            value={stats.activeMissions}
            icon={Zap}
            color="bg-orange-600"
            trend={8}
            description="En cours"
          />
          <StatCard
            label="Missions Complétées"
            value={stats.completedMissions}
            icon={CheckCircle2}
            color="bg-green-600"
            description="Finalisées"
          />
          <StatCard
            label="Total Tâches"
            value={stats.totalTasks}
            icon={Clock}
            color="bg-purple-600"
            trend={12}
            description="Toutes phases"
          />
        </div>

        {/* Phases Overview */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Phases des Missions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              {phases.map((phase) => {
                const PhaseIcon = phase.icon;
                const phaseMissions = missions.filter((m: any) => m.phase === phase.id);
                return (
                  <div
                    key={phase.id}
                    className={`p-3 sm:p-4 rounded-lg border-2 hover-elevate transition-all cursor-pointer ${phase.color}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <PhaseIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-semibold text-sm truncate">{phase.label}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold">{phaseMissions.length} missions</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Missions & Tâches</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Dashboard complet des missions par phase</p>
          </div>
          <Button className="gap-2 flex-shrink-0 text-sm w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nouvelle Mission</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>
        </div>

        {/* Missions by Phase - Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4">
            <TabsTrigger value="active" className="text-xs sm:text-sm">Actives</TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm">Complétées</TabsTrigger>
            <TabsTrigger value="phases" className="text-xs sm:text-sm">Par Phase</TabsTrigger>
            <TabsTrigger value="all" className="hidden sm:inline-flex text-xs sm:text-sm">Tous</TabsTrigger>
          </TabsList>

          {/* Active Missions */}
          <TabsContent value="active" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {missions
                .filter((m: any) => m.status === 'active')
                .map((mission: any) => (
                  <MissionCard key={mission.id} mission={mission} phases={phases} />
                ))}
              {missions.filter((m: any) => m.status === 'active').length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  Aucune mission active
                </div>
              )}
            </div>
          </TabsContent>

          {/* Completed Missions */}
          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {missions
                .filter((m: any) => m.status === 'completed')
                .map((mission: any) => (
                  <MissionCard key={mission.id} mission={mission} phases={phases} />
                ))}
              {missions.filter((m: any) => m.status === 'completed').length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  Aucune mission complétée
                </div>
              )}
            </div>
          </TabsContent>

          {/* By Phases */}
          <TabsContent value="phases" className="space-y-6">
            {phases.map((phase) => (
              <div key={phase.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${phase.color}`}>
                    {phase.label}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {missions
                    .filter((m: any) => m.phase === phase.id)
                    .map((mission: any) => (
                      <MissionCard key={mission.id} mission={mission} phases={phases} />
                    ))}
                  {missions.filter((m: any) => m.phase === phase.id).length === 0 && (
                    <p className="text-xs text-muted-foreground">Aucune mission</p>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* All Missions */}
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {missions.map((mission: any) => (
                <MissionCard key={mission.id} mission={mission} phases={phases} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ERPLayout>
  );
}

function MissionCard({ mission, phases }: any) {
  const phase = phases.find((p: any) => p.id === mission.phase);
  const completedTasks = mission.tasks?.filter((t: any) => t.completed).length || 0;
  const totalTasks = mission.tasks?.length || 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card className="hover-elevate transition-all overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-card to-muted/50">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base truncate">{mission.name}</CardTitle>
          <Badge className={mission.status === 'active' ? 'bg-green-600' : 'bg-blue-600'}>
            {mission.status === 'active' ? 'Actif' : 'Complété'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <p className="text-xs text-muted-foreground line-clamp-2">{mission.description || 'Pas de description'}</p>

        {/* Phase Badge */}
        {phase && (
          <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${phase.color}`}>
            {phase.label}
          </div>
        )}

        {/* Tasks Progress */}
        {totalTasks > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Tâches</span>
              <span className="font-semibold">
                {completedTasks}/{totalTasks}
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground text-right">{progress}%</p>
          </div>
        )}

        {/* Assignees */}
        {mission.assignees && mission.assignees.length > 0 && (
          <div className="flex items-center gap-1 -space-x-2 pt-2">
            {mission.assignees.slice(0, 3).map((assignee: string, idx: number) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-card"
                title={assignee}
              >
                {assignee?.[0]}
              </div>
            ))}
            {mission.assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold border-2 border-card">
                +{mission.assignees.length - 3}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
