'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-data';

export default function FixedMobileCTA() {
  const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    CLINIC_CONFIG.contact.whatsappMessageTemplate
  )}`;

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] md:hidden"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call CTA */}
        <a
          href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors active:scale-95"
          aria-label="Call Manav Dental Care"
        >
          <Phone className="w-5 h-5 text-teal-700 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Call</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors active:scale-95"
          aria-label="Chat with Manav Dental Care on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* Book Appointment CTA */}
        <Link
          href="/book-appointment"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#0b2545] hover:bg-[#07172c] text-white shadow-xs transition-all active:scale-95"
          aria-label="Book an Appointment online"
        >
          <Calendar className="w-5 h-5 text-teal-300 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Book</span>
        </Link>
      </div>
    </aside>
  );
}
