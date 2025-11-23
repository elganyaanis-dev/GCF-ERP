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
              Groupe GCF - Système ERP Intégré V5
            </h1>
            <p className="text-slate-400">
              Sélectionnez une filiale pour accéder à son système autonome sécurisé
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

      {/* Grid des ERPs */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {ERPS.map((erp) => (
          <Card
            key={erp.id}
            className="bg-slate-800/50 border-slate-700 hover-elevate transition-all cursor-pointer group"
            onClick={() => onSelectERP(erp.id)}
            data-testid={`card-erp-${erp.id}`}
          >
            <div className={`h-32 bg-gradient-to-br ${erp.color} rounded-t-lg flex items-center justify-center`}>
              <Building2 className="h-12 w-12 text-white/80" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-1">{erp.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{erp.subtitle}</p>

              <div className="space-y-2 mb-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>Gestion RH complète</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  <span>Isolation multi-tenant</span>
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
          <p className="text-slate-400 text-sm">
            Chaque filiale dispose d'un système ERP complètement autonome avec ses propres données,
            utilisateurs et configurations.
          </p>
          {isSupremeAdmin && (
            <p className="text-purple-400 text-xs font-semibold mt-3">
              ✓ Vous avez accès illimité à toutes les filiales en tant que Supreme Admin
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
