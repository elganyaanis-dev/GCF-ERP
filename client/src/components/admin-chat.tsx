import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Send, MessageCircle, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface AdminChatMessage {
  id: string;
  sender_email: string;
  message: string;
  sender_role: string;
  message_type: "instruction" | "feedback" | "status" | "alert";
  read: boolean;
  created_at: string;
}

export function AdminChat() {
  const { user, isLoading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if user is supreme admin BEFORE all hooks
  const isSupremeAdmin = typeof user === "object" && user ? (user as any)?.email === "elganya.anis@gmail.com" : false;

  // Fetch admin chat messages - only for supreme admin AND auth is ready
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["/api/admin-chat"],
    refetchInterval: isSupremeAdmin ? 3000 : false,
    enabled: isSupremeAdmin && !authLoading,
    staleTime: 2000,
  });

  // Mutation to send message
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest("POST", "/api/admin-chat", {
        message: content,
      });
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin-chat"] });
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Count unread messages
  useEffect(() => {
    const unread = messages?.filter((m: AdminChatMessage) => !m.read).length || 0;
    setUnreadCount(unread);
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessageMutation.mutate(newMessage);
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "instruction":
        return "bg-blue-500/20 text-blue-700 border-blue-500/50";
      case "alert":
        return "bg-red-500/20 text-red-700 border-red-500/50";
      case "status":
        return "bg-green-500/20 text-green-700 border-green-500/50";
      case "feedback":
        return "bg-amber-500/20 text-amber-700 border-amber-500/50";
      default:
        return "bg-slate-500/20 text-slate-700 border-slate-500/50";
    }
  };

  // Return nothing if not supreme admin or auth still loading (after ALL hooks)
  if (!isSupremeAdmin || authLoading) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 group"
        data-testid="button-admin-chat-toggle"
        title="Admin Communication Channel"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-slate-900 rounded-full p-4 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-purple-400" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-96 z-50 flex flex-col border-2 border-purple-500/50 bg-slate-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="font-bold text-white">Admin Channel</h3>
                <p className="text-xs text-purple-300">Supreme Admin Only</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              data-testid="button-admin-chat-close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-400 text-sm">Chargement...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-400 text-sm text-center">
                  Pas de messages.<br/>Vous pouvez envoyer des instructions de développement depuis ici.
                </p>
              </div>
            ) : (
              messages.map((msg: AdminChatMessage) => (
                <div
                  key={msg.id}
                  className="space-y-1"
                  data-testid={`admin-chat-message-${msg.id}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">
                      {msg.sender_email}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getMessageTypeColor(msg.message_type)}`}
                    >
                      {msg.message_type}
                    </Badge>
                  </div>
                  <div className="bg-slate-800/70 rounded-lg p-3 border border-slate-700 text-sm text-slate-200 break-words">
                    {msg.message}
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(msg.created_at).toLocaleTimeString("fr-FR")}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-purple-500/30 p-4 space-y-2">
            <Textarea
              placeholder="Entrez une instruction de développement, bug, ou feedback..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  handleSendMessage();
                }
              }}
              className="resize-none h-20 text-sm bg-slate-800 border-purple-500/30 text-white placeholder-slate-500"
              data-testid="textarea-admin-chat-input"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sendMessageMutation.isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="sm"
              data-testid="button-admin-chat-send"
            >
              <Send className="w-4 h-4 mr-2" />
              {sendMessageMutation.isPending ? "Envoi..." : "Envoyer"}
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}
