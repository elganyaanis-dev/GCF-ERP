import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, FolderKanban, FileText, BarChart3, Shield } from "lucide-react";
import railElectrLogo from "@assets/image_1763848297043.png";
import gcfLogo from "@assets/channels4_profile_1763848297051.jpg";

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: "Gestion RH",
      description: "Gestion complète des employés, congés, paie et formations"
    },
    {
      icon: FolderKanban,
      title: "Gestion de Projets",
      description: "Planification, suivi budgétaire et diagrammes Gantt interactifs"
    },
    {
      icon: FileText,
      title: "Gestion Documentaire",
      description: "Stockage sécurisé avec versioning et recherche avancée"
    },
    {
      icon: BarChart3,
      title: "Analytics & Rapports",
      description: "KPIs en temps réel et rapports personnalisés"
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Authentification multi-facteurs et logs d'audit complets"
    },
    {
      icon: Building2,
      title: "Multi-entreprises",
      description: "Support complet Rail Electr et GCF avec données isolées"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img 
              src={railElectrLogo} 
              alt="Rail Electr" 
              className="h-12 w-auto object-contain"
              data-testid="logo-rail-electr-landing"
            />
            <div className="h-8 w-px bg-border" />
            <img 
              src={gcfLogo} 
              alt="GCF" 
              className="h-10 w-auto object-contain rounded-full"
              data-testid="logo-gcf-landing"
            />
          </div>
          <Button asChild size="default" data-testid="button-login">
            <a href="/api/login">
              Se connecter
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground">
            ERP Rail Electr & GCF
          </h1>
          <p className="text-xl text-muted-foreground">
            Système de gestion intégré pour l'ingénierie ferroviaire et la construction civile
          </p>
          <p className="text-base text-muted-foreground">
            Gérez vos ressources humaines, projets, documents et analytics dans une plateforme unique et sécurisée
          </p>
          <div className="pt-6">
            <Button asChild size="lg" className="text-lg px-8" data-testid="button-get-started">
              <a href="/api/login">
                Commencer maintenant
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground mb-3">
            Fonctionnalités complètes
          </h2>
          <p className="text-muted-foreground">
            Tout ce dont vous avez besoin pour gérer votre entreprise efficacement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate active-elevate-2 transition-all" data-testid={`card-feature-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Card>
          <CardContent className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Cloud-based</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support technique</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Disponibilité</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Rail Electr & GCF. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <img src={railElectrLogo} alt="Rail Electr" className="h-8 w-auto opacity-70" />
              <img src={gcfLogo} alt="GCF" className="h-7 w-auto opacity-70 rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
