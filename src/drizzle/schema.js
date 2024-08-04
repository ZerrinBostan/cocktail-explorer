import {
    serial,
    text,
    pgTable,
    uniqueIndex,
    integer,
    timestamp
  } from 'drizzle-orm/pg-core';
  
  export const users = pgTable(
    'users',
    {
      id: serial('id').primaryKey(),
      name: text('name').notNull(),
      email: text('email').unique().notNull(),
      password: text('password').notNull(),
    },
    (users) => {
      return {
        uniqueIdx: uniqueIndex('unique_idx').on(users.email),
      };
    }
  );
  
  export const sessions = pgTable('sessions', {
    id: serial('id').primaryKey(),
    userId: integer('userId')
      .references(() => users.id)
      .notNull(),
    expiresAt: timestamp('expires_at').notNull(),
  });
  