import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ArrowRight, Globe, TrendingUp } from "lucide-react";

const SUBSIDIARIES = [
  {
    id: "gcf",
    name: "GCF SPA ALGÉRIE",
    type: "Holding d'État",
    description: "Vue globale, stratégies, statistiques consolidées",
    color: "from-blue-600 to-blue-800",
    icon: "building",
    minAccreditation: 0,
  },
  {
    id: "railelectr",
    name: "RAILELECTR SPA",
    type: "Électrification Ferroviaire",
    description: "Caténaires, métro, tramway, électrification ferroviaire",
    color: "from-yellow-600 to-yellow-800",
    icon: "building",
    minAccreditation: 0,
  },
  {
    id: "infrarail",
    name: "INFRARAIL SPA",
    type: "Infrastructures Ferroviaires",
    description: "Construction, béton, agrégats, infrastructures",
    color: "from-orange-600 to-orange-800",
    icon: "building",
    minAccreditation: 0,
  },
  {
    id: "infrafer",
    name: "INFRAFER EPE",
    type: "Transport & Logistique",
    description: "Transport routier, fret, logistique ferroviaire",
    color: "from-green-600 to-green-800",
    icon: "building",
    minAccreditation: 0,
  },
  {
    id: "setirail",
    name: "SETIRAIL SPA",
    type: "Ingénierie Ferroviaire",
    description: "Études, conception BIM, supervision, ingénierie",
    color: "from-purple-600 to-purple-800",
    icon: "building",
    minAccreditation: 0,
  },
];

const MARKET_PLATFORMS = [
  {
    name: "DZ Tenders",
    description: "Portail des appels d'offres + application mobile",
    url: "https://www.dztenders.com/fr/",
    icon: "📋",
  },
  {
    name: "DZ Marchés",
    description: "Plateforme complète: appels d'offres, attributions, annulations",
    url: "https://dzmarches.net/",
    icon: "🏪",
  },
  {
    name: "Tenders-360",
    description: "Application avec alertes, filtres, suivi d'attribution",
    url: "https://www.tenders-360.com/",
    icon: "🎯",
  },
  {
    name: "SmartMarchés",
    description: "Application mobile: notifications, résultats d'appels",
    url: "https://smartmarches.com/SmartPlus/",
    icon: "📱",
  },
  {
    name: "MS Marchés",
    description: "Appels d'offres publics et privés en Algérie",
    url: "https://www.msmarches.com/",
    icon: "💼",
  },
  {
    name: "TopTenders",
    description: "Appels d'offres, attributions, annulations",
    url: "https://www.toptenderspro.com/",
    icon: "⭐",
  },
  {
    name: "Algérie Marchés",
    description: "Portail complet: suivi appels d'offres + attributions",
    url: "https://algeriemarches.dz/",
    icon: "🇩🇿",
  },
];

export default function SubsidiarySelector() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<string | null>(null);

  const handleSelectSubsidiary = (subsidiaryId: string) => {
    setSelectedSubsidiary(subsidiaryId);
    // Store in sessionStorage and navigate to dashboard
    sessionStorage.setItem("selected_subsidiary", subsidiaryId);
    setTimeout(() => {
      navigate("/dashboard");
    }, 300);
  };

  const userEmail = typeof user === "object" && user ? (user as any)?.email : "";
  const isSupremeAdmin = userEmail === "elganya.anis@gmail.com";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              GCF ERP
            </div>
            {isSupremeAdmin && (
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                Supreme Admin
              </Badge>
            )}
          </div>
          <div className="text-sm text-slate-400">
            Connecté en tant que: <span className="text-white font-semibold">{userEmail}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Subsidiaries Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Sélectionnez votre entité
            </h1>
            <p className="text-slate-400">
              Accédez à l'ERP de GCF ou de l'une de ses filiales opérationnelles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUBSIDIARIES.map((subsidiary) => (
              <button
                key={subsidiary.id}
                onClick={() => handleSelectSubsidiary(subsidiary.id)}
                className="text-left"
                data-testid={`button-select-subsidiary-${subsidiary.id}`}
              >
                <Card className="h-full hover-elevate cursor-pointer border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white">
                          {subsidiary.name}
                        </CardTitle>
                        <p className="text-sm text-slate-400 mt-1">
                          {subsidiary.type}
                        </p>
                      </div>
                      <div><Building2 className="w-6 h-6 text-slate-300" /></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm mb-4">
                      {subsidiary.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                      Accéder <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </section>

        {/* Market Section */}
        <section>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-6 h-6 text-cyan-400" />
              <h2 className="text-4xl font-bold text-white">
                Marchés Publics Algérie
              </h2>
            </div>
            <p className="text-slate-400">
              Accès direct aux 7 principales plateformes de suivi des appels d'offres
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MARKET_PLATFORMS.map((platform, idx) => (
              <a
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left"
                data-testid={`link-market-${platform.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Card className="h-full hover-elevate border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 hover:from-slate-700/50 hover:to-slate-600/30 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white">
                          {platform.name}
                        </CardTitle>
                      </div>
                      <div className="text-3xl">{platform.icon}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm mb-4">
                      {platform.description}
                    </p>
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                      Ouvrir <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Info Section for Supreme Admin */}
        {isSupremeAdmin && (
          <section className="mt-16 pt-12 border-t border-slate-700">
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Accès Complet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-300">
                <p>
                  ✓ Vous avez accès à l'intégralité du système ERP avec accréditation ultime (niveau 5)
                </p>
                <p>
                  ✓ Accédez à GCF pour une vue globale des statistiques et de la gestion stratégique
                </p>
                <p>
                  ✓ Créez de nouvelles filiales et gérez les droits d'accès depuis Admin Console
                </p>
                <p>
                  ✓ Utilisez le canal Admin Chat (bouton violet) pour envoyer des instructions en temps réel
                </p>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
