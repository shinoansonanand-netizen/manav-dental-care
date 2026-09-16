import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Quote, CheckCircle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PATIENT_REVIEWS } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'Patient Stories & Verified Reviews | Manav Dental Care Padur',
  description: 'Read authentic experiences and testimonials from patients treated at Manav Dental Care in Padur, OMR Chennai.',
};

export default function PatientStoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Patient Stories' }]} />
        </div>
      </div>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Real Experiences
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-4">
              Patient Stories & Reviews
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We take great pride in patient comfort and clinical outcomes. Here is what our patients 
              have shared about their visits to Manav Dental Care in Padur, OMR.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PATIENT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-slate-50/70 p-8 rounded-3xl border border-slate-200/70 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-300" />
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="font-bold text-[#0b2545] text-base">
                    {review.author}
                  </div>
                  <div className="text-xs font-semibold text-teal-700 mt-0.5">
                    Treatment: {review.treatmentName}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                    <span>{review.source} • {review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-[#0b2545] text-white text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Have You Visited Manav Dental Care?</h3>
            <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
              Your feedback helps us continuously improve our patient care standards and assists others in making informed oral health decisions.
            </p>
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors shadow-md"
            >
              <span>Schedule Your Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
