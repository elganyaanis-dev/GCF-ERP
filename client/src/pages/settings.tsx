import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Building2, Shield, Bell, Code } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2" data-testid="heading-settings">
          Paramètres
        </h1>
        <p className="text-muted-foreground">
          Configuration de l'application Rail Electr & GCF
        </p>
      </div>

      {/* Company Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informations entreprise
          </CardTitle>
          <CardDescription>
            Gérez les informations de votre organisation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nom de l'entreprise</Label>
              <Input id="company-name" defaultValue="Rail Electr & GCF" data-testid="input-company-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Email</Label>
              <Input id="company-email" type="email" defaultValue="contact@railelectr.gn" data-testid="input-company-email" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Adresse</Label>
            <Input id="company-address" defaultValue="Conakry, Guinée" data-testid="input-company-address" />
          </div>
          <div className="flex justify-end pt-4">
            <Button data-testid="button-save-company">
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sécurité
          </CardTitle>
          <CardDescription>
            Paramètres de sécurité et d'accès
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">
                Ajouter une couche de sécurité supplémentaire
              </p>
            </div>
            <Switch data-testid="switch-2fa" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Journalisation des actions</Label>
              <p className="text-sm text-muted-foreground">
                Enregistrer toutes les actions utilisateurs
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-audit-logs" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Session timeout</Label>
              <p className="text-sm text-muted-foreground">
                Déconnexion automatique après inactivité
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-session-timeout" />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Gérez vos préférences de notification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Notifications email</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir les notifications par email
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-email-notifications" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Alertes projets</Label>
              <p className="text-sm text-muted-foreground">
                Alertes pour échéances et budgets
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-project-alerts" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Notifications RH</Label>
              <p className="text-sm text-muted-foreground">
                Demandes de congés et paie
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-hr-notifications" />
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            API & Intégrations
          </CardTitle>
          <CardDescription>
            Gérez les clés API et les intégrations externes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Clé API principale</Label>
            <div className="flex gap-2">
              <Input readOnly value="sk_live_••••••••••••••••" className="font-mono" data-testid="input-api-key" />
              <Button variant="outline" data-testid="button-regenerate-api-key">
                Régénérer
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Utilisez cette clé pour accéder à l'API REST
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Webhooks actifs</Label>
              <p className="text-sm text-muted-foreground">
                Événements en temps réel vers vos systèmes
              </p>
            </div>
            <Switch data-testid="switch-webhooks" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
