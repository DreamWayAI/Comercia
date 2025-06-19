import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProposalSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all proposals
  app.get("/api/proposals", async (req, res) => {
    try {
      const proposals = await storage.getAllProposals();
      res.json(proposals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch proposals" });
    }
  });

  // Get single proposal
  app.get("/api/proposals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid proposal ID" });
      }

      const proposal = await storage.getProposal(id);
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      res.json(proposal);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch proposal" });
    }
  });

  // Create new proposal
  app.post("/api/proposals", async (req, res) => {
    try {
      // Ensure company field is handled properly
      const dataToValidate = {
        ...req.body,
        company: req.body.company || null
      };
      const validatedData = insertProposalSchema.parse(dataToValidate);
      const proposal = await storage.createProposal(validatedData);
      res.status(201).json(proposal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
        console.log("Request body:", JSON.stringify(req.body, null, 2));
        return res.status(400).json({ 
          message: "Invalid proposal data", 
          errors: error.errors 
        });
      }
      console.log("Server error:", error);
      res.status(500).json({ message: "Failed to create proposal" });
    }
  });

  // Generate PDF endpoint
  app.post("/api/proposals/:id/pdf", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid proposal ID" });
      }

      const proposal = await storage.getProposal(id);
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      // TODO: Implement actual PDF generation
      // For now, return a success message
      res.json({ 
        message: "PDF generation successful",
        downloadUrl: `/api/proposals/${id}/download`
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
