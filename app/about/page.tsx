import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DOCTORS } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'About Manav Dental Care | Best Dental Practice in Padur, OMR',
  description: 'Learn about Manav Dental Care, our sterilization protocols, clinical ethos, and Dr. Vallabh Mahadevan in Padur, OMR Chennai.',
};

export default function AboutPage() {
  const doctor = DOCTORS[0];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb banner */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'About Clinic' }]} />
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              About Our Practice
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-6">
              Clinical Excellence Guided by Empathy & Precision
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Manav Dental Care was founded with a singular purpose: to deliver high-precision dental treatments 
              in a tranquil, reassuring environment where patients feel heard, respected, and thoroughly cared for.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy & Pillars */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=900&auto=format&fit=crop"
                  alt="Manav Dental Care Clinical Room"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-[#0b2545] text-white shadow-xl max-w-xs hidden sm:block">
                <div className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                  Our Promise
                </div>
                <div className="text-sm font-bold mt-1">
                  Transparent Diagnostics & Conservative Treatment Planning
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight mb-4">
                Redefining the Dental Experience in Padur, OMR
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Too often, dental visits are postponed due to anxiety or confusion regarding treatment options. 
                At Manav Dental Care, we invert that experience. Our consultations are unrushed; we review your 
                radiographs with you on screen, explain the biological rationale behind each option, and proceed 
                only with your informed understanding.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b2545] text-sm">Multi-Tier Sterilization</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Class-B autoclave sterilization, sterile pouched instruments, and disposable consumables ensure unmatched asepsis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b2545] text-sm">Pain-Management Focus</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Topical numbing gels, gentle anesthetic delivery, and ergonomic operatory positions minimize patient discomfort.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b2545] text-sm">Conservation of Natural Teeth</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      We focus on saving viable tooth structure through precision endodontics and bonded restorations before considering extraction.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white font-semibold text-sm shadow-xs transition-colors"
              >
                <span>Meet Dr. Vallabh Mahadevan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Leadership Profile preview */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] mb-4">
              Clinical Leadership
            </h2>
            <p className="text-base text-slate-600 mb-8">
              Under the clinical leadership of {doctor.name}, Manav Dental Care delivers high standards 
              of modern dentistry along the OMR corridor.
            </p>
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-left flex flex-col sm:flex-row items-center gap-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-28 h-28 rounded-2xl object-cover shrink-0 border border-slate-200"
              />
              <div>
                <h3 className="text-xl font-bold text-[#0b2545]">{doctor.name}</h3>
                <div className="text-sm font-semibold text-teal-700 mb-2">{doctor.qualifications} • {doctor.specialization}</div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{doctor.bio}</p>
                <Link
                  href={`/doctors/${doctor.slug}`}
                  className="text-xs font-bold text-[#0b2545] hover:text-teal-700 inline-flex items-center gap-1"
                >
                  <span>Full Profile & Clinical Background</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
