import { NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    const adminPasscode = process.env.ADMIN_PASSCODE;
    
    if (!adminPasscode || passcode !== adminPasscode) {
      return NextResponse.json({ success: false, error: 'Invalid passcode' }, { status: 401 });
    }

    if (!process.env.ADMIN_SESSION_SECRET) {
      console.error("ADMIN_SESSION_SECRET is missing.");
      return NextResponse.json({ success: false, error: 'Server misconfiguration' }, { status: 500 });
    }

    await createSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
