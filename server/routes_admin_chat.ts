import type { Express, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "./auth_v2";
import { db } from "./db";
import { sql } from "drizzle-orm";

// Middleware to check if user is supreme admin
const requireSupremeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userEmail = (req.user as any)?.claims?.email;
  if (userEmail !== "elganya.anis@gmail.com") {
    return res.status(403).json({ message: "Access denied. Supreme admin only." });
  }
  next();
};

export function setupAdminChat(app: Express) {
  // Get admin chat messages
  app.get("/api/admin-chat", isAuthenticated, requireSupremeAdmin, async (req: Request, res: Response) => {
    try {
      const messages = await db.execute(
        sql`SELECT * FROM admin_chat_messages ORDER BY created_at DESC LIMIT 50`
      );
      res.json((messages as any).rows || []);
    } catch (error: any) {
      console.error("Error fetching admin chat:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Send admin chat message
  app.post("/api/admin-chat", isAuthenticated, requireSupremeAdmin, async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      const userEmail = (req.user as any)?.claims?.email || "elganya.anis@gmail.com";

      if (!message || message.trim().length === 0) {
        return res.status(400).json({ message: "Message cannot be empty" });
      }

      const result = await db.execute(
        sql`INSERT INTO admin_chat_messages (sender_email, message, message_type, sender_role)
            VALUES (${userEmail}, ${message}, 'instruction', 'supreme_admin')
            RETURNING *`
      );

      res.status(201).json(((result as any).rows || [])[0]);
    } catch (error: any) {
      console.error("Error sending admin chat message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Mark messages as read
  app.patch("/api/admin-chat/read", isAuthenticated, requireSupremeAdmin, async (req: Request, res: Response) => {
    try {
      await db.execute(
        sql`UPDATE admin_chat_messages SET read = true WHERE read = false`
      );
      res.json({ message: "Messages marked as read" });
    } catch (error: any) {
      console.error("Error marking messages as read:", error);
      res.status(500).json({ message: "Failed to update messages" });
    }
  });
}
