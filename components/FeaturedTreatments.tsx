'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Activity, Sparkles, Shield, Smile, HeartHandshake } from 'lucide-react';
import { TREATMENTS } from '@/lib/clinic-data';

// Map icon name to lucide icon component
const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Activity,
  Sparkles,
  Shield,
  Smile,
  HeartHandshake
};

export default function FeaturedTreatments() {
  // 6 core featured treatments matching Section 13
  const featuredSlugs = [
    'dental-implants',
    'root-canal',
    'braces-aligners',
    'crowns-bridges',
    'cosmetic-dentistry',
    'pediatric-dentistry'
  ];

  const featured = featuredSlugs
    .map(slug => TREATMENTS.find(t => t.slug === slug))
    .filter(Boolean);

  return (
    <section className="py-20 bg-white" id="treatments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
              Clinical Specializations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-3">
              Comprehensive Dental Care
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              From routine preventive care to advanced restorative and cosmetic dentistry.
            </p>
          </div>

          <div>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 text-[#0b2545] hover:text-[#0d9488] font-semibold text-sm border border-slate-200 hover:border-teal-200 transition-all group"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((treatment) => {
            if (!treatment) return null;
            const Icon = iconMap[treatment.iconName] || Activity;

            return (
              <div
                key={treatment.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={treatment.heroImage}
                      alt={treatment.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#0b2545] uppercase tracking-wider">
                      {treatment.category}
                    </span>
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/95 text-teal-700 flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#0b2545] mb-2.5 group-hover:text-[#0d9488] transition-colors">
                      {treatment.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                      {treatment.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors group-hover:underline decoration-2 underline-offset-4"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
