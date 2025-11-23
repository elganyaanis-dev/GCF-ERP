import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Lock, Shield, AlertCircle } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: "admin" | "system";
}

export default function AdminConsole() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isSupremeAdmin = typeof user === "object" && user ? (user as any).isSupremeAdmin : false;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load admin communications
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch("/api/admin/communications");
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    if (isSupremeAdmin) {
      loadMessages();
      const interval = setInterval(loadMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isSupremeAdmin]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/communications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: inputValue,
          sender: (user as any)?.name || "Admin",
          type: "admin",
        }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages([...messages, newMessage]);
        setInputValue("");
      } else {
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le message",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupremeAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Accès Refusé</h1>
          <p className="text-muted-foreground mb-4">
            Vous n'avez pas les permissions pour accéder à la console administrateur
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t">
            <Shield className="w-4 h-4" />
            <span>Admin Suprême uniquement</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b bg-card">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Console Admin Suprême</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Communication directe pour développement et modifications du projet
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Lock className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aucun message. Commencez une conversation.</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <Card
              key={msg.id}
              className={`p-4 ${
                msg.type === "admin"
                  ? "bg-primary/10 border-primary/30 ml-12"
                  : "bg-muted/50 border-muted/50 mr-12"
              }`}
              data-testid={`message-${msg.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{msg.sender}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.timestamp).toLocaleTimeString("fr-FR")}
                </span>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{msg.content}</p>
            </Card>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-6 border-t bg-card">
        <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tapez votre message de développement, demandes de modification, feedback..."
            className="resize-none min-h-24"
            data-testid="textarea-admin-message"
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="flex-1"
              data-testid="button-send-admin-message"
            >
              <Send className="w-4 h-4 mr-2" />
              Envoyer Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
