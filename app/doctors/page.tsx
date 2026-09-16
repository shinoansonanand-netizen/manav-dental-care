import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle2, Calendar } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DOCTORS } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'Meet Our Dentists | Dr. Vallabh Mahadevan | Manav Dental Care Padur',
  description: 'Meet Dr. Vallabh Mahadevan, Chief Dental Surgeon at Manav Dental Care in Padur, OMR Chennai. Dedicated to gentle, evidence-based oral healthcare.',
};

export default function DoctorsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb banner */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Doctors' }]} />
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Clinical Team
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-4">
              Experienced, Compassionate Dental Surgeons
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Our clinical lead and dental team prioritize gentle technique, continuous education, 
              and open communication to ensure your comfort during every appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Cards */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="lg:col-span-12 bg-slate-50/70 rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all p-8 sm:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-4">
                    <div className="rounded-2xl overflow-hidden shadow-md bg-white border-2 border-white aspect-4/5">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/60 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <Award className="w-3.5 h-3.5 text-teal-700" />
                        <span>{doc.designation}</span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-2">
                        {doc.name}
                      </h2>

                      <div className="text-sm sm:text-base font-semibold text-teal-800 mb-4">
                        {doc.qualifications} • {doc.specialization}
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                        {doc.bio}
                      </p>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm italic text-slate-700 mb-6">
                        &ldquo;{doc.philosophy}&rdquo;
                      </div>

                      <div className="mb-6">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Clinical Competencies
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {doc.areasOfExpertise.map((exp, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                              <span>{exp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/doctors/${doc.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white font-semibold text-sm transition-colors shadow-xs"
                      >
                        <span>View In-Depth Profile</span>
                        <ArrowRight className="w-4 h-4 text-teal-300" />
                      </Link>

                      <Link
                        href="/book-appointment"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span>Book an Appointment</span>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
