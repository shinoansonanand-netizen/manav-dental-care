'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, Calendar } from 'lucide-react';
import { DOCTORS } from '@/lib/clinic-data';

export default function DoctorSection() {
  const doctor = DOCTORS[0]; // Dr. Vallabh Mahadevan

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-100" id="doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Doctor Image Column */}
            <div className="lg:col-span-5 relative bg-slate-100 min-h-[380px] lg:min-h-full">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545]/70 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white lg:hidden">
                <div className="text-xl font-bold">{doctor.name}</div>
                <div className="text-xs text-teal-200">{doctor.designation}</div>
              </div>

              <div className="hidden lg:block absolute top-6 left-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-xs font-bold text-[#0b2545] shadow-xs">
                  <Award className="w-3.5 h-3.5 text-teal-700" />
                  Clinical Lead
                </span>
              </div>
            </div>

            {/* Doctor Info Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
                  Meet Your Dentist
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-2">
                  {doctor.name}
                </h2>
                
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-teal-800 mb-6">
                  <span>{doctor.qualifications}</span>
                  <span>•</span>
                  <span>{doctor.specialization}</span>
                </div>

                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  {doctor.bio}
                </p>

                {/* Clinical Philosophy Quote */}
                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#0d9488] mb-6 text-sm italic text-slate-700">
                  &ldquo;{doctor.philosophy}&rdquo;
                </div>

                {/* Key Focus Areas */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Areas of Clinical Focus
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {doctor.areasOfExpertise.slice(0, 4).map((area, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={`/doctors/${doctor.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white font-semibold text-sm shadow-xs transition-colors"
                >
                  <span>View Doctor Profile</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </Link>

                <Link
                  href="/book-appointment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold text-sm transition-colors border border-teal-200"
                >
                  <Calendar className="w-4 h-4 text-teal-700" />
                  <span>Consult with Dr. Vallabh</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
