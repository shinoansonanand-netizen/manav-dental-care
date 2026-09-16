'use client';

import React from 'react';
import { Award, Layers, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: Award,
      title: 'Experienced Dental Care',
      subtitle: 'Comprehensive clinical diagnosis & gentle delivery',
    },
    {
      icon: Layers,
      title: 'Comprehensive Treatments',
      subtitle: 'From preventive maintenance to advanced restorations',
    },
    {
      icon: HeartHandshake,
      title: 'Patient-Focused Approach',
      subtitle: 'Transparent consultations with your comfort first',
    },
    {
      icon: ShieldCheck,
      title: 'Modern Clinical Experience',
      subtitle: 'Strict sterilization & digital diagnostic imaging',
    },
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-8 relative z-10" aria-label="Clinical Trust Pillars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 hover:bg-teal-50/40 border border-slate-100 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0b2545] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
