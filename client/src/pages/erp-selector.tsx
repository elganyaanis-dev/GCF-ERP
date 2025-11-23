import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Lock, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ERP_CONFIG } from "@/config/erp";

const ERPS = Object.values(ERP_CONFIG);

export default function ERPSelector({
  onSelectERP,
}: {
  onSelectERP: (erp: string) => void;
}) {
  const { user } = useAuth();
  const userEmail = typeof user === "object" && user ? (user as any)?.email : "";
  const isSupremeAdmin = userEmail === "elganya.anis@gmail.com";

  const handleLogout = () => {
    fetch("/api/logout", { method: "POST" }).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header avec user info et logout */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Groupe GCF - Système ERP V5 Intégré
            </h1>
            <p className="text-slate-400">
              Holding d'État • 6 ERPs Autonomes • Architecture Ultra-Moderne
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3">
              <p className="text-sm text-slate-300" data-testid="text-user-email">{userEmail}</p>
              {isSupremeAdmin && (
                <div className="flex items-center gap-1 text-purple-300 text-xs font-semibold mt-1">
                  <Shield className="h-3 w-3" /> Supreme Admin
                </div>
              )}
            </div>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Grid des ERPs - 6 éléments */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {ERPS.map((erp) => (
          <Card
            key={erp.id}
            className="bg-slate-800/50 border-slate-700 hover-elevate transition-all cursor-pointer group"
            onClick={() => onSelectERP(erp.id)}
            data-testid={`card-erp-${erp.id}`}
          >
            <div className={`h-32 bg-gradient-to-br ${erp.color} rounded-t-lg flex items-center justify-center relative overflow-hidden`}>
              <Building2 className="h-12 w-12 text-white/80" />
              {erp.niveau === "Filiale Opérationnelle (Récente)" && (
                <div className="absolute top-2 right-2 bg-yellow-500/20 border border-yellow-500/50 rounded px-2 py-1">
                  <p className="text-xs text-yellow-300 font-bold">NOUVELLE</p>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{erp.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{erp.code}</p>
                </div>
              </div>
              
              <p className="text-sm text-slate-300 mb-4 line-clamp-2">{erp.subtitle}</p>

              <div className="space-y-2 mb-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium">PDG:</span>
                  <span>{erp.pdg}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Siège:</span>
                  <span>{erp.siege}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Statut:</span>
                  <span className={erp.niveau === "Holding d'État" ? "text-blue-400" : "text-green-400"}>{erp.niveau}</span>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => onSelectERP(erp.id)}
                data-testid={`button-select-${erp.id}`}
              >
                Accéder <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer info */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-2xl font-bold text-blue-400">6</p>
              <p className="text-sm text-slate-300">ERPs Autonomes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">32+</p>
              <p className="text-sm text-slate-300">Modules Complets</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">100%</p>
              <p className="text-sm text-slate-300">Isolation Multi-Tenant</p>
            </div>
          </div>
          
          <p className="text-slate-300 text-sm mb-4">
            Chaque filiale dispose d'un système ERP complètement autonome avec ses propres données,
            utilisateurs, configurations et permissions RBAC - dans une architecture moderne et sécurisée.
          </p>
          
          <p className="text-slate-400 text-xs">
            Architecture Premium • Conformité Algérienne • Sécurité Entreprise-Grade • Performance Optimisée
          </p>

          {isSupremeAdmin && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-purple-400 text-xs font-semibold">
                ✓ Accès illimité à toutes les filiales + paramètres système en tant que Supreme Admin
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
