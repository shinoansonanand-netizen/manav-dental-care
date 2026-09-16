import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Activity, Sparkles, Shield, Smile, HeartHandshake, CheckCircle2, Award, Users, Stethoscope } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { TREATMENTS } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'Dental Treatments & Procedures | Manav Dental Care Padur OMR',
  description: 'Explore comprehensive dental services at Manav Dental Care in Padur, OMR: Root Canal, Dental Implants, Braces, Aligners, Crowns, Pediatric & Cosmetic Dentistry.',
};

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Activity,
  Sparkles,
  Shield,
  Smile,
  HeartHandshake,
  CheckCircle2,
  Users,
  Stethoscope,
  Award
};

export default function TreatmentsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Treatments' }]} />
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Our Dental Specialties
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-4">
              Comprehensive Dental Treatments in Padur, OMR
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We offer comprehensive dental services spanning preventive, restorative, cosmetic, 
              and surgical care. Every procedure is preceded by a personalized clinical evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* Treatments List */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TREATMENTS.map((t) => {
              const Icon = iconMap[t.iconName] || Activity;
              return (
                <div
                  key={t.id}
                  className="rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={t.heroImage}
                        alt={t.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-[#0b2545]">
                        {t.category}
                      </span>
                      <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/95 text-teal-700 flex items-center justify-center shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0b2545] mb-2.5">
                        {t.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                        {t.shortDescription}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                        <div className="font-semibold text-slate-700">Common Indications:</div>
                        <ul className="list-disc list-inside space-y-1">
                          {t.whoNeedsIt.slice(0, 2).map((ind, i) => (
                            <li key={i} className="line-clamp-1">{ind}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/treatments/${t.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 hover:bg-[#0b2545] text-[#0b2545] hover:text-white font-semibold text-sm transition-colors border border-slate-200 hover:border-transparent group"
                    >
                      <span>Explore Procedure & FAQs</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clinical Disclaimer */}
          <div className="mt-16 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center max-w-2xl mx-auto text-xs text-slate-500">
            <strong>Medical Responsibility Notice:</strong> All treatments require prior clinical and radiographic 
            assessment to establish diagnostic validity. We do not guarantee treatment outcomes as biological healing 
            varies among individuals.
          </div>
        </div>
      </section>
    </div>
  );
}
