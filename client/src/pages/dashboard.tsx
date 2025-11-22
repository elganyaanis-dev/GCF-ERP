import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, FolderKanban, FileText, Calendar, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const statCards = [
    {
      title: "Employés actifs",
      value: stats?.totalEmployees || 0,
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Projets en cours",
      value: stats?.activeProjects || 0,
      change: "+8%",
      icon: FolderKanban,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Documents",
      value: stats?.totalDocuments || 0,
      change: "+23%",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Congés en attente",
      value: stats?.pendingLeaves || 0,
      change: "-5%",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const recentProjects = stats?.recentProjects || [];
  const pendingLeaves = stats?.pendingLeaves || [];

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2" data-testid="heading-dashboard">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre activité Rail Electr & GCF
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover-elevate transition-all" data-testid={`card-stat-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground" data-testid={`stat-value-${index}`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>{' '}
                vs mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              Projets récents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FolderKanban className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Aucun projet récent</p>
              </div>
            ) : (
              recentProjects.map((project: any, index: number) => (
                <div key={index} className="flex items-start justify-between p-4 rounded-lg bg-accent/50 hover-elevate" data-testid={`project-${index}`}>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      {project.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {project.clientName}
                    </p>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <Badge variant={
                    project.status === 'completed' ? 'default' :
                    project.status === 'in_progress' ? 'secondary' :
                    'outline'
                  }>
                    {project.status === 'completed' ? 'Terminé' :
                     project.status === 'in_progress' ? 'En cours' :
                     'Planification'}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Actions en attente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeaves === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Aucune action en attente</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        Demandes de congés
                      </p>
                      <p className="text-xs text-muted-foreground">
                        À approuver
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900/30">
                    {pendingLeaves}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        Rapports mensuels
                      </p>
                      <p className="text-xs text-muted-foreground">
                        À générer
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30">
                    3
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Taux de réalisation
                </p>
                <p className="text-3xl font-bold text-primary">
                  87%
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Budget utilisé
                </p>
                <p className="text-3xl font-bold text-green-600">
                  64%
                </p>
              </div>
              <CheckCircle2 className="h-12 w-12 text-green-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Documents traités
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  156
                </p>
              </div>
              <FileText className="h-12 w-12 text-purple-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
