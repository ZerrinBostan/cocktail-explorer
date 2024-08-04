import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from './app/auth/stateless-session';

const protectedRoutes = ['/', '/cocktail-detail', '/saved-cocktails'];

export const config = {
  matcher: ['/' , '/cocktail-detail', '/saved-cocktails', '/login'],
};

export default async function middleware(req) {
  const cookieStore = cookies();
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookie = cookieStore.get('session')?.value;
  const session = await decrypt(cookie);

  if (path === '/login' && session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}
