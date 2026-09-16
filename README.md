# MANAV DENTAL CARE V1.0

A premium, modern dental clinic website built with Next.js App Router, Tailwind CSS, and MySQL.

## Project Architecture & Technology Stack
*   **Framework**: Next.js 15+ (App Router)
*   **Styling**: Tailwind CSS & Framer Motion
*   **Database**: MySQL (via `mysql2` connection pooling)
*   **Authentication**: Secure HttpOnly cookie-based session for Admin operations
*   **API**: RESTful API endpoints for appointment management

## Setup & Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Configure all environment variables, particularly:
   *   `DATABASE_URL` (MySQL connection string)
   *   `ADMIN_PASSCODE` (Secure passcode for the admin dashboard)
   *   `ADMIN_SESSION_SECRET` (Strong secret key for session cookies)
   *   All contact details (`NEXT_PUBLIC_CLINIC_PHONE`, etc.)

3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Database Setup
The application uses MySQL. Ensure `DATABASE_URL` is set in your `.env.local` file. The application will automatically attempt to create the `appointments` table and required indexes upon the first database query.

## Appointment API
*   **POST `/api/appointments`**: Publicly accessible endpoint to submit an appointment request. Rate-limited to prevent abuse.
*   **GET `/api/appointments`**: Admin-only endpoint to retrieve all appointments. Requires an active admin session.
*   **PATCH `/api/appointments`**: Admin-only endpoint to update appointment status. Requires an active admin session.

## Admin Authentication
Admin access is secured using HttpOnly, SameSite, Secure (in production) cookies. 
*   **Login**: Submit `ADMIN_PASSCODE` to `POST /api/admin/login` to receive a session cookie.
*   **Session**: The session cookie validates against `ADMIN_SESSION_SECRET`.
*   **Logout**: `POST /api/admin/logout` clears the session.

## Testing Commands
*   **Build check**: `npx next build`
*   **Type check**: `npx tsc --noEmit`
*   **Lint**: `npm run lint`
*   **Production data verify**: `STRICT_PRODUCTION_VERIFICATION=true npm run verify:data`

## Production Deployment
Deployment is blocked by `verify-production-data.mjs` if any placeholder data remains.
Before deploying to Vercel/Netlify, ensure all `NEXT_PUBLIC_` contact details are fully configured in the production environment variables.

## Known Launch Dependencies & Clinic Information Required
The website is technically complete. However, deployment is blocked pending clinic confirmation of:
*   Official Telephone, WhatsApp, and Email
*   Exact Address (Door/Building number)
*   Official Maps Pins (Google/Apple)
*   Confirmed Opening Hours
*   Doctor Registration Number
*   Official Social Media URLs
