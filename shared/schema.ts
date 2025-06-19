import { pgTable, text, serial, integer, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  company: text("company"),
  currency: text("currency").notNull(),
  rooms: jsonb("rooms").notNull(),
  totalArea: decimal("total_area", { precision: 10, scale: 2 }).notNull(),
  materialsCost: decimal("materials_cost", { precision: 10, scale: 2 }).notNull(),
  discountPercent: decimal("discount_percent", { precision: 5, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).notNull(),
  finalCost: decimal("final_cost", { precision: 10, scale: 2 }).notNull(),
  createdAt: text("created_at").notNull(),
});

export const roomSchema = z.object({
  id: z.number(),
  area: z.number().positive(),
  type: z.enum(['1', '2', '3', '4']),
  material: z.enum(['enamel', 'paint', 'primer']),
  materialQty: z.number().optional(),
  materialCost: z.number().optional(),
});

export const insertProposalSchema = createInsertSchema(proposals).omit({
  id: true,
  createdAt: true,
}).extend({
  rooms: z.array(roomSchema),
  totalArea: z.union([z.string(), z.number()]).transform(val => parseFloat(val.toString())),
  materialsCost: z.union([z.string(), z.number()]).transform(val => parseFloat(val.toString())),
  discountPercent: z.union([z.string(), z.number()]).transform(val => parseFloat(val.toString())),
  discount: z.union([z.string(), z.number()]).transform(val => parseFloat(val.toString())),
  finalCost: z.union([z.string(), z.number()]).transform(val => parseFloat(val.toString())),
}).transform((data) => ({
  ...data,
  company: data.company || null,
}));

export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type Proposal = typeof proposals.$inferSelect;
export type Room = z.infer<typeof roomSchema>;
