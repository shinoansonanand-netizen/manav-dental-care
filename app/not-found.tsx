import React from 'react';
import Link from 'next/link';
import { Home, Calendar } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-700 font-extrabold text-2xl flex items-center justify-center mx-auto mb-6">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          The dental service or page you are looking for may have been moved or is currently undergoing clinical updates.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0b2545] text-white font-semibold text-sm hover:bg-[#0d9488] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/book-appointment"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors"
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Book Visit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
