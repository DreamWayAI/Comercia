import { proposals, type Proposal, type InsertProposal } from "@shared/schema";

export interface IStorage {
  getProposal(id: number): Promise<Proposal | undefined>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  getAllProposals(): Promise<Proposal[]>;
}

export class MemStorage implements IStorage {
  private proposals: Map<number, Proposal>;
  private currentId: number;

  constructor() {
    this.proposals = new Map();
    this.currentId = 1;
  }

  async getProposal(id: number): Promise<Proposal | undefined> {
    return this.proposals.get(id);
  }

  async createProposal(insertProposal: InsertProposal): Promise<Proposal> {
    const id = this.currentId++;
    const proposal: Proposal = {
      ...insertProposal,
      id,
      createdAt: new Date().toISOString(),
      company: insertProposal.company || null,
      totalArea: insertProposal.totalArea.toString(),
      materialsCost: insertProposal.materialsCost.toString(),
      discountPercent: insertProposal.discountPercent.toString(),
      discount: insertProposal.discount.toString(),
      finalCost: insertProposal.finalCost.toString(),
    };
    this.proposals.set(id, proposal);
    return proposal;
  }

  async getAllProposals(): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
