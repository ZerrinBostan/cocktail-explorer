import '@/drizzle/envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { users } from './schema';
import * as schema from './schema';

export const db = drizzle(sql, { schema });

export const insertUser = async (user) => {
  return db.insert(users).values(user).returning();
};
