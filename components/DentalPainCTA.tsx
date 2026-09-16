'use client';

import React from 'react';
import { AlertCircle, Phone, MessageCircle, Clock } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-data';

export default function DentalPainCTA() {
  const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    'Hello Manav Dental Care, I am experiencing dental pain / an emergency and need clinical assistance.'
  )}`;

  return (
    <section className="py-14 bg-gradient-to-r from-[#0b2545] via-[#0e315a] to-[#0b2545] text-white relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xs flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Prompt Attention for Dental Pain</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              Experiencing Dental Pain?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
              Contact the clinic to discuss your symptoms and determine the appropriate next step. 
              We prioritize urgent dental distress and painful conditions during clinic hours.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-teal-300">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>{CLINIC_CONFIG.timings.weekdays}</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
            <a
              href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call the Clinic</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
