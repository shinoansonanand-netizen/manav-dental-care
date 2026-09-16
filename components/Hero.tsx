'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Star, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 rounded-full bg-sky-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>Padur, OMR • Chennai</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0b2545] tracking-tight leading-[1.12] mb-4">
              Your Smile. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] to-[#0284c7]">
                Our Expertise.
              </span>
            </h1>

            {/* Supporting Subheading */}
            <p className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">
              Advanced Dental Care in Padur, OMR
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              Experience gentle, patient-focused dentistry tailored to your comfort. From painless root canals 
              and precision implants to routine preventive care, Dr. Vallabh Mahadevan and our clinical team 
              provide comprehensive oral healthcare you can trust.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <Calendar className="w-5 h-5 text-teal-300" />
                <span>Book an Appointment</span>
              </Link>

              <Link
                href="/treatments"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-xs transition-colors"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicator */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200/80 w-full max-w-lg">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Trusted by Our Patients in Padur & OMR
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-teal-600 inline" />
                Sterilized Clinical Environment
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
                  alt="Modern clean clinical environment at Manav Dental Care"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-center transform hover:scale-102 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545]/80 via-transparent to-transparent" />
                
                {/* Overlay Card Details */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-teal-200 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                    Strict Sterilization Protocols
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    Comfort-First Clinical Experience
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Modern diagnostic imaging and gentle treatment techniques.
                  </p>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3.5 max-w-xs">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold shrink-0">
                  <Star className="w-6 h-6 fill-teal-600 text-teal-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Led By
                  </div>
                  <div className="text-sm font-bold text-[#0b2545]">
                    Dr. Vallabh Mahadevan
                  </div>
                  <div className="text-xs text-teal-700 font-medium">
                    Personalized Dental Consultations
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
