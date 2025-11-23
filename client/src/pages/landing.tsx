import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Zap, Lock, Globe, Users, TrendingUp } from "lucide-react";

// Subsidiaries data
const SUBSIDIARIES = [
  {
    id: "gcf",
    name: "GCF SPA ALGÉRIE",
    type: "Holding d'État",
    description: "Groupe des Chemins de Fer - Holding central",
    color: "from-blue-600 to-blue-800",
    lightColor: "bg-blue-50 dark:bg-blue-950",
    textColor: "text-blue-700 dark:text-blue-300",
    icon: "🏢",
  },
  {
    id: "railelectr",
    name: "RAILELECTR SPA",
    type: "Électrification Ferroviaire",
    description: "Électrification ferroviaire, caténaires, métro, tramway",
    color: "from-yellow-600 to-yellow-800",
    lightColor: "bg-yellow-50 dark:bg-yellow-950",
    textColor: "text-yellow-700 dark:text-yellow-300",
    icon: "⚡",
  },
  {
    id: "infrarail",
    name: "INFRARAIL SPA",
    type: "Infrastructures Ferroviaires",
    description: "Construction infrastructures ferroviaires, béton, agrégats",
    color: "from-orange-600 to-orange-800",
    lightColor: "bg-orange-50 dark:bg-orange-950",
    textColor: "text-orange-700 dark:text-orange-300",
    icon: "🏗️",
  },
  {
    id: "infrafer",
    name: "INFRAFER EPE",
    type: "Transport & Logistique",
    description: "Transport routier & ferroviaire, fret et logistique",
    color: "from-green-600 to-green-800",
    lightColor: "bg-green-50 dark:bg-green-950",
    textColor: "text-green-700 dark:text-green-300",
    icon: "🚚",
  },
  {
    id: "setirail",
    name: "SETIRAIL SPA",
    type: "Ingénierie Ferroviaire",
    description: "Ingénierie, études, conception BIM, supervision",
    color: "from-purple-600 to-purple-800",
    lightColor: "bg-purple-50 dark:bg-purple-950",
    textColor: "text-purple-700 dark:text-purple-300",
    icon: "🔧",
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Gestion RH",
    description: "Employés, paie, congés, formations",
  },
  {
    icon: TrendingUp,
    title: "Projets & Budgets",
    description: "Gantt, suivi budgétaire, KPIs",
  },
  {
    icon: Globe,
    title: "Multi-Tenant",
    description: "Isolation données par filiale",
  },
  {
    icon: Lock,
    title: "Sécurité",
    description: "RBAC, audit logs, conformité",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Analytics temps réel",
  },
  {
    icon: Building2,
    title: "Scalabilité",
    description: "Architecture enterprise",
  },
];

export default function Landing() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubsidiarySelect = (subsidiaryId: string) => {
    setSelectedSubsidiary(subsidiaryId);
    // Redirect to login with subsidiary context
    setTimeout(() => {
      window.location.href = `/api/login?subsidiary=${subsidiaryId}`;
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="text-white text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              GCF ERP
            </div>
          </div>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" data-testid="button-login-header">
            <a href="/api/login">
              Se connecter
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="space-y-6 max-w-3xl mx-auto">
          <Badge className="mx-auto bg-blue-500/20 text-blue-300 border-blue-500/50">
            Système de Gestion Intégré - v1.0
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
            Groupe GCF
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Système Unifié
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Plateforme ERP complète pour le Groupe des Chemins de Fer Algérien. Gérez 5 entités avec une architecture multi-tenant performante et sécurisée.
          </p>
        </div>
      </section>

      {/* Subsidiaries Selection */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">
            Sélectionnez votre entité
          </h2>
          <p className="text-slate-400 text-lg">
            Accédez à votre ERP dédié - GCF ou l'une de ses 4 filiales opérationnelles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {SUBSIDIARIES.map((subsidiary) => (
            <button
              key={subsidiary.id}
              onClick={() => handleSubsidiarySelect(subsidiary.id)}
              disabled={selectedSubsidiary === subsidiary.id}
              className="group relative h-full transition-all duration-300 hover:scale-105"
              data-testid={`button-subsidiary-${subsidiary.id}`}
            >
              <Card className={`h-full border-2 border-slate-700 bg-slate-800/50 backdrop-blur hover:border-slate-500 transition-all cursor-pointer ${
                selectedSubsidiary === subsidiary.id ? 'ring-2 ring-primary' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-5xl">{subsidiary.icon}</div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-white text-sm leading-tight text-left">
                    {subsidiary.name}
                  </h3>
                  <Badge variant="outline" className="w-fit mt-2 text-xs border-slate-600">
                    {subsidiary.type}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-400 text-left">
                    {subsidiary.description}
                  </p>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-slate-800/30 rounded-3xl my-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Fonctionnalités complètes
          </h2>
          <p className="text-slate-400">
            Tout ce dont vous avez besoin pour gérer votre entreprise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-slate-700 bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                <CardContent className="pt-6">
                  <Icon className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "5", label: "Entités" },
            { number: "34", label: "Tables DB" },
            { number: "20+", label: "API Endpoints" },
            { number: "17", label: "Pages" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="space-y-4">
          <p className="text-slate-400 text-lg">
            Ou accédez directement avec votre compte
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8" data-testid="button-login-cta">
            <a href="/api/login">
              Se connecter maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm text-slate-400">
          <p>© 2025 Groupe GCF - Tous droits réservés</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-200 transition">Sécurité</a>
            <a href="#" className="hover:text-slate-200 transition">Confidentialité</a>
            <a href="#" className="hover:text-slate-200 transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
