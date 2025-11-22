import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export default function Messaging() {
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [showNewConv, setShowNewConv] = useState(false);
  const [newConvName, setNewConvName] = useState("");

  const { data: conversations } = useQuery({
    queryKey: ["/api/conversations"],
  });

  const { data: messages } = useQuery({
    queryKey: selectedConv ? ["/api/conversations", selectedConv, "messages"] : [],
    enabled: !!selectedConv,
    queryFn: async () => {
      const res = await fetch(`/api/conversations/${selectedConv}/messages`, {
        credentials: "include",
      });
      return res.json();
    },
  });

  const createConvMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiRequest("POST", "/api/conversations", { name, type: "direct" });
      return res.json();
    },
    onSuccess: (data) => {
      setNewConvName("");
      setShowNewConv(false);
      setSelectedConv(data.id);
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
  });

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", `/api/conversations/${selectedConv}/messages`, {
        content,
      });
      return res.json();
    },
    onSuccess: () => {
      setMessageInput("");
      if (selectedConv) {
        queryClient.invalidateQueries({
          queryKey: ["/api/conversations", selectedConv, "messages"],
        });
      }
    },
  });

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConv) {
      sendMutation.mutate(messageInput);
    }
  };

  const handleCreateConv = () => {
    if (newConvName.trim()) {
      createConvMutation.mutate(newConvName);
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar with conversations */}
      <div className="w-64 border-r bg-card/50 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg mb-3">Conversations</h2>
          <Button
            size="sm"
            className="w-full"
            onClick={() => setShowNewConv(true)}
            data-testid="button-new-conversation"
          >
            Nouvelle
          </Button>
        </div>

        {showNewConv && (
          <div className="p-4 border-b space-y-2">
            <Input
              placeholder="Nom de la conversation"
              value={newConvName}
              onChange={(e) => setNewConvName(e.target.value)}
              data-testid="input-conv-name"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleCreateConv}
                disabled={createConvMutation.isPending}
                data-testid="button-create-conv"
              >
                Créer
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNewConv(false)}
                data-testid="button-cancel-conv"
              >
                Annuler
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          {conversations?.map((conv: any) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConv(conv.id)}
              className={`p-3 border-b cursor-pointer hover:bg-accent/50 ${
                selectedConv === conv.id ? "bg-accent" : ""
              }`}
              data-testid={`button-conversation-${conv.id}`}
            >
              <p className="font-medium text-sm truncate">{conv.name}</p>
              <p className="text-xs text-muted-foreground">
                {conv.lastMessageAt
                  ? format(new Date(conv.lastMessageAt), "dd MMM HH:mm")
                  : "Aucun message"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Message area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages?.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.senderId
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                    data-testid={`message-${msg.id}`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {format(new Date(msg.createdAt), "HH:mm")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4 flex gap-2">
              <Input
                placeholder="Écrivez un message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSendMessage();
                  }
                }}
                data-testid="input-message-text"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || sendMutation.isPending}
                data-testid="button-send-message"
              >
                Envoyer
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Sélectionnez une conversation
          </div>
        )}
      </div>
    </div>
  );
}
