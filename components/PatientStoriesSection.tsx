'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Quote, ArrowRight, CheckCircle } from 'lucide-react';
import { PATIENT_REVIEWS } from '@/lib/clinic-data';

export default function PatientStoriesSection() {
  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-100" id="patient-stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
              Patient Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-2">
              Patients Come for Treatment. <br className="hidden sm:inline" />
              <span className="text-[#0d9488]">They Leave With Confidence.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Verified clinical experiences from patients who visited our clinic in Padur, OMR.
            </p>
          </div>

          <div>
            <Link
              href="/patient-stories"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0b2545] hover:text-[#0d9488] font-semibold text-sm border border-slate-200 transition-colors group"
            >
              <span>Read More Patient Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATIENT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-bold text-[#0b2545]">
                  {review.author}
                </div>
                <div className="text-xs text-teal-700 font-semibold mt-0.5">
                  {review.treatmentName}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
                  <CheckCircle className="w-3 h-3 text-teal-600" />
                  <span>{review.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Verification */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Reviews are gathered directly from verified patient consultations. Individual results may vary based on clinical condition.
        </div>

      </div>
    </section>
  );
}
