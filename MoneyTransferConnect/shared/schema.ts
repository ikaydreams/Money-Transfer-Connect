import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Transfers table
export const transfers = pgTable("transfers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  transactionId: text("transaction_id").notNull().unique(),
  fromCountry: text("from_country").notNull(),
  toCountry: text("to_country").notNull(),
  sendAmount: decimal("send_amount", { precision: 10, scale: 2 }).notNull(),
  receiveAmount: decimal("receive_amount", { precision: 10, scale: 2 }).notNull(),
  fee: decimal("fee", { precision: 10, scale: 2 }).notNull(),
  exchangeRate: decimal("exchange_rate", { precision: 10, scale: 5 }).notNull(),
  status: text("status").notNull().default("completed"),
  paymentMethod: text("payment_method").notNull(),
  recipientFirstName: text("recipient_first_name").notNull(),
  recipientLastName: text("recipient_last_name").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  recipientPhone: text("recipient_phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Exchange rates table
export const exchangeRates = pgTable("exchange_rates", {
  id: serial("id").primaryKey(),
  fromCurrency: text("from_currency").notNull(),
  toCurrency: text("to_currency").notNull(),
  rate: decimal("rate", { precision: 10, scale: 5 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTransferSchema = createInsertSchema(transfers).omit({
  id: true,
  createdAt: true,
});

export const insertExchangeRateSchema = createInsertSchema(exchangeRates).omit({
  id: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTransfer = z.infer<typeof insertTransferSchema>;
export type Transfer = typeof transfers.$inferSelect;

export type InsertExchangeRate = z.infer<typeof insertExchangeRateSchema>;
export type ExchangeRate = typeof exchangeRates.$inferSelect;
