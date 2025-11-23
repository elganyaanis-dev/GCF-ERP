import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Users, TrendingUp, MapPin, Mail, Zap, Hammer, Truck, Settings } from "lucide-react";

const subsidiaryDetails = {
  railelectr: {
    title: "Électrification Ferroviaire",
    pdg: "M. HARBI Moulka",
    description: "Électrification ferroviaire, caténaires, sous-stations, tramway et métro",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    employees: 450,
    projects: 12,
  },
  infrarail: {
    title: "Infrastructures Ferroviaires",
    pdg: "M. ROUAINIA Toufik",
    description: "Construction d'infrastructures ferroviaires, production de béton et agrégats",
    icon: Hammer,
    pdgTitle: "PDG",
    location: "Rouiba, Alger",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    employees: 380,
    projects: 8,
  },
  infrafer: {
    title: "Transport & Logistique",
    pdg: "M. HAMIDOUCHE M. Lamine",
    description: "Transport routier et ferroviaire (fret et logistique)",
    icon: Truck,
    location: "Alger",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    employees: 620,
    projects: 15,
  },
  setirail: {
    title: "Ingénierie Ferroviaire",
    pdg: "M. TALEB Farouk",
    description: "Ingénierie ferroviaire (études, conception, supervision, BIM)",
    icon: Settings,
    location: "Alger",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    employees: 220,
    projects: 18,
  },
};

export default function Subsidiaries() {
  const { data: subsidiaries, isLoading } = useQuery({
    queryKey: ["/api/subsidiaries"],
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const filiales = subsidiaries?.filter((s: any) => s.type === "subsidiary") || [];
  const mainGroup = subsidiaries?.find((s: any) => s.type === "main");

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div data-testid="section-header">
        <h1 className="text-4xl font-bold text-foreground mb-2" data-testid="heading-subsidiaries">
          Groupe GCF SPA Algérie
        </h1>
        <p className="text-lg text-muted-foreground">
          Structure hiérarchique officielle validée par le Journal Officiel Algérien
        </p>
      </div>

      {/* Main Group Card */}
      {mainGroup && (
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{mainGroup.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Birkhadem, Alger
                    </div>
                  </CardDescription>
                </div>
              </div>
              <Badge variant="default" className="text-sm">Holding d'État</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <p className="text-lg font-semibold">100% d'État</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Création</p>
                <p className="text-lg font-semibold">Mai 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Président CA</p>
                <p className="text-lg font-semibold">M. AÏACH Karim</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Directeur Général</p>
                <p className="text-lg font-semibold">M. Samir BOUAKLINE</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filiales Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Filiales Opérationnelles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filiales.map((subsidiary: any) => {
            const details = subsidiaryDetails[subsidiary.code as keyof typeof subsidiaryDetails];
            const Icon = details?.icon || Building2;

            return (
              <Card
                key={subsidiary.id}
                className="hover-elevate transition-all overflow-hidden"
                data-testid={`card-subsidiary-${subsidiary.code}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${details?.bgColor}`}>
                      <Icon className={`h-6 w-6 ${details?.color}`} />
                    </div>
                    <Badge variant="secondary">{subsidiary.type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{subsidiary.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    {details?.title || "Filiale du Groupe GCF"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Description */}
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {details?.description || subsidiary.description}
                  </p>

                  {/* PDG Info */}
                  <div className="border-t pt-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Président Directeur Général
                    </p>
                    <p className="text-base font-semibold text-foreground">{details?.pdg}</p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{details?.location || subsidiary.location || "Alger"}</span>
                  </div>

                  {/* Email */}
                  {subsidiary.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${subsidiary.email}`}
                        className="hover:text-foreground transition-colors"
                        data-testid={`link-email-${subsidiary.code}`}
                      >
                        {subsidiary.email}
                      </a>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="border-t pt-4 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Employés
                      </p>
                      <p className="font-semibold text-lg">{details?.employees || "—"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Projets
                      </p>
                      <p className="font-semibold text-lg">{details?.projects || "—"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <Card className="border border-muted">
        <CardHeader>
          <CardTitle className="text-lg">Résumé du Groupe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Filiales</p>
              <p className="text-3xl font-bold text-foreground">{filiales.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Employés Total</p>
              <p className="text-3xl font-bold text-foreground">1,670+</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Projets Actifs</p>
              <p className="text-3xl font-bold text-foreground">53</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Année Fiscale</p>
              <p className="text-3xl font-bold text-foreground">2024-2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
