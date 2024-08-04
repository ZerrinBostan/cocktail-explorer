import 'server-only';

import { cache } from 'react';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';

import { users } from '@/drizzle/schema';
import { verifySession } from '@/app/auth/02-stateless-session';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.query.users.findMany({
      where: eq(users.id, session.userId),
      columns: {
        id: true,
        name: true,
        email: true,
      },
    });

    const user = data[0];

    return user;
  } catch (error) {
    console.log('Failed to fetch user:', error.message);
    return null;
  }
});
