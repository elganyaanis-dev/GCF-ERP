import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ERPCommunications() {
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("feedback");
  const { toast } = useToast();

  const { data: communications } = useQuery({
    queryKey: ["/api/erp-communications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/erp-communications", { credentials: "include" });
        if (!res.ok) return [];
        return res.json();
      } catch (e) {
        return [];
      }
    },
  });

  const sendMutation = useMutation({
    mutationFn: async () => {
      if (!subject.trim() || !message.trim()) {
        toast({ title: "Erreur", description: "Tous les champs sont requis", variant: "destructive" });
        throw new Error("Champs vides");
      }

      const res = await apiRequest("POST", "/api/erp-communications", {
        subject,
        message,
        type,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Succès", description: "Message envoyé à l'équipe ERP" });
      setSubject("");
      setMessage("");
      setType("feedback");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/erp-communications"] });
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MessageCircle className="text-blue-600" />
            Communications ERP
          </h1>
          <p className="text-muted-foreground mt-2">Envoyez des modifications, suggestions et retours directement à l'équipe</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
          data-testid="button-new-communication"
        >
          <Send className="w-4 h-4" />
          Nouveau Message
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle>Envoyer un Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md mt-1"
                data-testid="select-communication-type"
              >
                <option value="feedback">Retour & Suggestion</option>
                <option value="modification">Demande de Modification</option>
                <option value="bug">Rapport de Bug</option>
                <option value="feature">Nouvelle Fonctionnalité</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Sujet</label>
              <Input
                placeholder="Sujet du message"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1"
                data-testid="input-communication-subject"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Détalez votre demande, suggestion ou retour..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 min-h-[150px]"
                data-testid="textarea-communication-message"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => sendMutation.mutate()}
                disabled={sendMutation.isPending}
                className="flex-1 gap-2"
                data-testid="button-send-communication"
              >
                <Send className="w-4 h-4" />
                Envoyer
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* MESSAGES LIST */}
      <div className="grid gap-4">
        {!communications || communications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun message pour le moment</p>
          </div>
        ) : (
          communications.map((comm: any) => (
            <Card key={comm.id} className="hover-elevate">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{comm.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(comm.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <Badge variant={
                    comm.type === "urgent" ? "destructive" :
                    comm.type === "bug" ? "destructive" :
                    comm.type === "feature" ? "default" :
                    comm.type === "modification" ? "secondary" :
                    "outline"
                  }>
                    {comm.type === "feedback" ? "Retour" :
                     comm.type === "modification" ? "Modification" :
                     comm.type === "bug" ? "Bug" :
                     comm.type === "feature" ? "Fonctionnalité" :
                     "Urgent"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{comm.message}</p>
                {comm.response && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-md border border-green-200 dark:border-green-800">
                    <p className="text-xs font-semibold text-green-900 dark:text-green-200">Réponse:</p>
                    <p className="text-sm mt-1">{comm.response}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
