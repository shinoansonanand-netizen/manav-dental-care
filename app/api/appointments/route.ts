import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';
import { 
  createAppointment, 
  getAllAppointments, 
  updateAppointmentStatus, 
  AppointmentStatus 
} from '@/lib/appointment-store';

// Lightweight in-memory rate limiter for V1.0
// Max 5 requests per IP per hour to prevent spam
const rateLimit = new Map<string, { count: number, resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const record = rateLimit.get(ip);
  if (!record || record.resetTime < now) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

// Replaced with verifySession

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (ip !== 'unknown' && isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const preferred_date = typeof body.preferred_date === 'string' ? body.preferred_date.trim() : '';
    const preferred_time = typeof body.preferred_time === 'string' ? body.preferred_time.trim() : '';
    const treatment = typeof body.treatment === 'string' ? body.treatment.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    // Server-side validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Full name is required (minimum 2 characters).' },
        { status: 400 }
      );
    }

    // Phone validation: digits with optional +, at least 10 digits
    const cleanedDigits = phone.replace(/[^0-9]/g, '');
    if (!phone || cleanedDigits.length < 10) {
      return NextResponse.json(
        { success: false, error: 'A valid telephone or mobile number with at least 10 digits is required.' },
        { status: 400 }
      );
    }

    // Email format validation (optional)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!preferred_date) {
      return NextResponse.json(
        { success: false, error: 'Please select a preferred date for your visit.' },
        { status: 400 }
      );
    }

    if (!preferred_time) {
      return NextResponse.json(
        { success: false, error: 'Please select a preferred time slot.' },
        { status: 400 }
      );
    }

    const created = await createAppointment({
      name,
      phone,
      email: email || undefined,
      preferred_date,
      preferred_time,
      treatment: treatment || 'General Dental Consultation',
      message: message || undefined
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment request received. Our team will contact you shortly to confirm your appointment.',
        appointment: {
          id: created.id,
          name: created.name,
          phone: created.phone,
          preferred_date: created.preferred_date,
          preferred_time: created.preferred_time,
          treatment: created.treatment,
          status: created.status,
          created_at: created.created_at
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API /api/appointments POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Something went wrong while submitting your request. Please try again or contact the clinic directly.' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as AppointmentStatus | null;
    const query = searchParams.get('q')?.toLowerCase() || '';

    let list = await getAllAppointments();

    if (status && ['pending', 'contacted', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      list = list.filter(a => a.status === status);
    }

    if (query) {
      list = list.filter(a => 
        a.name.toLowerCase().includes(query) || 
        a.phone.toLowerCase().includes(query) ||
        (a.email && a.email.toLowerCase().includes(query)) ||
        a.treatment.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      total: list.length,
      appointments: list
    });
  } catch (error) {
    console.error('API /api/appointments GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve appointments.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid appointment ID is required.' },
        { status: 400 }
      );
    }

    const validStatuses: AppointmentStatus[] = ['pending', 'contacted', 'confirmed', 'completed', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updated = await updateAppointmentStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Appointment status updated to ${status}`,
      appointment: updated
    });
  } catch (error) {
    console.error('API /api/appointments PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update appointment.' },
      { status: 500 }
    );
  }
}
