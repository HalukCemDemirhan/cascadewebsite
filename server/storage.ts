import { users, investorSessions, type User, type InsertUser, type InvestorSession, type InsertInvestorSession } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createInvestorSession(sessionData: InsertInvestorSession): Promise<InvestorSession>;
  getInvestorSession(sessionId: string): Promise<InvestorSession | undefined>;
  updateInvestorSessionAccess(sessionId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createInvestorSession(sessionData: InsertInvestorSession): Promise<InvestorSession> {
    const [session] = await db
      .insert(investorSessions)
      .values(sessionData)
      .returning();
    return session;
  }

  async getInvestorSession(sessionId: string): Promise<InvestorSession | undefined> {
    const [session] = await db.select().from(investorSessions).where(eq(investorSessions.sessionId, sessionId));
    return session || undefined;
  }

  async updateInvestorSessionAccess(sessionId: string): Promise<void> {
    await db
      .update(investorSessions)
      .set({ lastAccessed: new Date() })
      .where(eq(investorSessions.sessionId, sessionId));
  }
}

export const storage = new DatabaseStorage();
