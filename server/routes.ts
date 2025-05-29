import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist signup endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = insertWaitlistEntrySchema.parse(req.body);
      
      // Check if email already exists
      const existingEntry = await storage.getWaitlistEntryByEmail(data.email);
      if (existingEntry) {
        return res.status(409).json({ 
          message: "This email is already registered",
          field: "email"
        });
      }

      const entry = await storage.createWaitlistEntry(data);
      res.status(201).json({ 
        message: "Successfully joined waitlist",
        entry: {
          id: entry.id,
          fullName: entry.fullName,
          email: entry.email
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      }
      
      console.error("Waitlist signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get waitlist count
  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (error) {
      console.error("Get waitlist count error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
