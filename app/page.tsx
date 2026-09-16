import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import WhyUs from '@/components/WhyUs';
import FeaturedTreatments from '@/components/FeaturedTreatments';
import DoctorSection from '@/components/DoctorSection';
import HowItWorks from '@/components/HowItWorks';
import PatientStoriesSection from '@/components/PatientStoriesSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import ClinicGallerySection from '@/components/ClinicGallerySection';
import DentalPainCTA from '@/components/DentalPainCTA';
import LocationMapSection from '@/components/LocationMapSection';
import AppointmentForm from '@/components/AppointmentForm';
import { TREATMENTS, CLINIC_CONFIG } from '@/lib/clinic-data';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Indicators Bar */}
      <TrustBar />

      {/* 3. Why Manav Dental Care */}
      <WhyUs />

      {/* 4. Featured Treatments */}
      <FeaturedTreatments />

      {/* 5. Comprehensive Dentistry Banner */}
      <section className="py-16 bg-gradient-to-br from-[#0b2545] to-[#07172c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
              Full Spectrum Dentistry
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Comprehensive Dentistry For All Ages
            </h2>
            <p className="text-base text-slate-300">
              Complete diagnostic, preventative, restorative, and aesthetic procedures tailored for every member of your family.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10">
            {TREATMENTS.map((t) => (
              <Link
                key={t.id}
                href={`/treatments/${t.slug}`}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-bold text-teal-300 uppercase tracking-wider mb-1">
                    {t.category}
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-teal-200 transition-colors line-clamp-2">
                    {t.title}
                  </h3>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-teal-300">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              <span>Explore All 10 Dental Disciplines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Meet the Dentist */}
      <DoctorSection />

      {/* 7. How Your Visit Works */}
      <HowItWorks />

      {/* 8. Patient Stories */}
      <PatientStoriesSection />

      {/* 9. Before & After / Results */}
      <BeforeAfterSection />

      {/* 10. Clinic Gallery */}
      <ClinicGallerySection />

      {/* 11. Dental Pain CTA */}
      <DentalPainCTA />

      {/* 12. Location + Map */}
      <LocationMapSection />

      {/* 13. Appointment CTA Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80" id="book-appointment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
                Ready For Your Visit?
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-4">
                Book Your Consultation With Dr. Vallabh Mahadevan
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Take the first step toward lasting oral health. Request your appointment online or call us directly. 
                Our coordinator will reach out promptly to confirm your scheduled slot.
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>Transparent consultation without unnecessary procedures</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>Hospital-grade sterilization & digital radiography</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>Convenient location on OMR, Padur with parking</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Prefer Direct Phone Assistance?
                </div>
                <div className="text-lg font-bold text-[#0b2545] mt-1">
                  {CLINIC_CONFIG.contact.displayPhone ? `Call: ${CLINIC_CONFIG.contact.displayPhone}` : 'Call: (Number pending)'}
                </div>
                <div className="text-xs text-teal-700 mt-0.5">
                  Mon – Sat: 9:30 AM – 1:30 PM, 5:00 PM – 8:30 PM
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AppointmentForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
