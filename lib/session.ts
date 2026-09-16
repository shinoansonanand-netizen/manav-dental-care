import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'admin_session';

export async function createSession() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not set');
  }
  
  // Create a secure hash to store in the cookie
  const sessionData = crypto.createHmac('sha256', secret)
    .update('admin_authenticated')
    .digest('hex');

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifySession(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie || !sessionCookie.value) return false;

  const expectedHash = crypto.createHmac('sha256', secret)
    .update('admin_authenticated')
    .digest('hex');

  return sessionCookie.value === expectedHash;
}
