import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { sessions } from '@/drizzle/schema';
import { db } from '@/drizzle/db';

const secretKey = process.env.SECRET;

if (!secretKey) {
  throw new Error('SECRET environment variable is not defined.');
}

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}

export async function decrypt(session = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session:', error.message);
    return null;
  }
}

export async function createSession(id) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const data = await db
    .insert(sessions)
    .values({
      userId: id,
      expiresAt,
    })
    .returning({ id: sessions.id });

  const sessionId = data[0].id;

  const session = await encrypt({ userId: id, sessionId, expiresAt });

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}
