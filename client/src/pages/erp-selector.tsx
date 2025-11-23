import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Lock, Shield } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Groupe GCF - Système ERP Intégré V5
            </h1>
            <p className="text-slate-400">
              Sélectionnez une filiale pour accéder à son système autonome sécurisé
            </p>
          </div>
          {isSupremeAdmin && (
            <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg px-4 py-2">
              <p className="text-purple-300 text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" /> Supreme Admin
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {ERPS.map((erp) => (
          <Card
            key={erp.id}
            className="bg-slate-800/50 border-slate-700 hover-elevate transition-all cursor-pointer group"
          >
            <div className={`h-40 bg-gradient-to-br ${erp.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="p-6">
              <div className="mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{erp.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{erp.subtitle}</p>
              <Button
                onClick={() => onSelectERP(erp.id)}
                className="w-full group-hover:translate-x-1 transition-transform"
              >
                Accéder <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="max-w-7xl mx-auto bg-slate-800/50 border border-slate-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Fonctionnalités Principales V5</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Users className="h-6 w-6 text-blue-400" />
            <h3 className="font-semibold text-white">RH Autonome</h3>
            <p className="text-sm text-slate-400">Employés, paie, congés, formations</p>
          </div>
          <div className="space-y-2">
            <Building2 className="h-6 w-6 text-green-400" />
            <h3 className="font-semibold text-white">Structure Autonome</h3>
            <p className="text-sm text-slate-400">Organigramme dédié</p>
          </div>
          <div className="space-y-2">
            <ArrowRight className="h-6 w-6 text-purple-400" />
            <h3 className="font-semibold text-white">Permissions RBAC</h3>
            <p className="text-sm text-slate-400">Hiérarchie stricte</p>
          </div>
          <div className="space-y-2">
            <Lock className="h-6 w-6 text-red-400" />
            <h3 className="font-semibold text-white">Sécurité Avancée</h3>
            <p className="text-sm text-slate-400">Audit & logs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
