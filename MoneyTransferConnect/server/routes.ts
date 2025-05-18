import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransferSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the money transfer application
  
  // Get all exchange rates
  app.get("/api/exchange-rates", async (req, res) => {
    try {
      const rates = await storage.getAllExchangeRates();
      res.json(rates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exchange rates" });
    }
  });

  // Get specific exchange rate
  app.get("/api/exchange-rates/:from/:to", async (req, res) => {
    try {
      const { from, to } = req.params;
      const rate = await storage.getExchangeRate(from, to);
      
      if (!rate) {
        return res.status(404).json({ message: "Exchange rate not found" });
      }
      
      res.json(rate);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exchange rate" });
    }
  });

  // Create a new transfer
  app.post("/api/transfers", async (req, res) => {
    try {
      const validatedData = insertTransferSchema.parse(req.body);
      const transfer = await storage.createTransfer(validatedData);
      res.status(201).json(transfer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transfer data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create transfer" });
    }
  });

  // Get a specific transfer by ID
  app.get("/api/transfers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const transfer = await storage.getTransfer(id);
      
      if (!transfer) {
        return res.status(404).json({ message: "Transfer not found" });
      }
      
      res.json(transfer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transfer" });
    }
  });

  // Get a specific transfer by transaction ID
  app.get("/api/transfers/transaction/:transactionId", async (req, res) => {
    try {
      const { transactionId } = req.params;
      const transfer = await storage.getTransferByTransactionId(transactionId);
      
      if (!transfer) {
        return res.status(404).json({ message: "Transfer not found" });
      }
      
      res.json(transfer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transfer" });
    }
  });

  // Register a new user
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get user's transfers
  app.get("/api/users/:id/transfers", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const transfers = await storage.getTransfersByUserId(userId);
      res.json(transfers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user transfers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
