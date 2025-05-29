import { users, waitlistEntries, type User, type InsertUser, type WaitlistEntry, type InsertWaitlistEntry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getWaitlistEntry(id: number): Promise<WaitlistEntry | undefined>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistCount(): Promise<number>;
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

  async getWaitlistEntry(id: number): Promise<WaitlistEntry | undefined> {
    const [entry] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.id, id));
    return entry || undefined;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    const [entry] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.email, email));
    return entry || undefined;
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const [entry] = await db
      .insert(waitlistEntries)
      .values(insertEntry)
      .returning();
    return entry;
  }

  async getWaitlistCount(): Promise<number> {
    const result = await db.select({ count: 'count(*)' }).from(waitlistEntries);
    return parseInt(result[0]?.count as string) || 0;
  }
}

export const storage = new DatabaseStorage();
