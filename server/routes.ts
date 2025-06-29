import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import crypto from "crypto";

// Simple password for investor access - in production this would be more secure
const INVESTOR_PASSWORD = "PerceptionLabs2024!";

export async function registerRoutes(app: Express): Promise<Server> {
  // Investor authentication routes
  app.post('/api/investor/login', async (req, res) => {
    try {
      const { password } = z.object({ password: z.string() }).parse(req.body);
      
      if (password !== INVESTOR_PASSWORD) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Create session
      const sessionId = crypto.randomUUID();
      await storage.createInvestorSession({ sessionId });

      res.json({ sessionId });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ error: 'Invalid request' });
    }
  });

  app.post('/api/investor/verify', async (req, res) => {
    try {
      const { sessionId } = z.object({ sessionId: z.string() }).parse(req.body);
      
      const session = await storage.getInvestorSession(sessionId);
      if (!session) {
        return res.json({ valid: false });
      }

      // Check if session is expired (24 hours)
      const now = new Date();
      const sessionTime = new Date(session.lastAccessed || session.createdAt!);
      const hoursDiff = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        return res.json({ valid: false });
      }

      // Update last accessed time
      await storage.updateInvestorSessionAccess(sessionId);
      res.json({ valid: true });
    } catch (error) {
      console.error('Verify error:', error);
      res.status(400).json({ error: 'Invalid request' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
