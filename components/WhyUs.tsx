'use client';

import React from 'react';
import { UserCheck, Stethoscope, Smile, ShieldAlert } from 'lucide-react';

export default function WhyUs() {
  const cards = [
    {
      icon: UserCheck,
      title: 'Personalized Care',
      description: 'Treatment plans tailored to individual needs, lifestyle requirements, and clinical priorities.',
      tag: 'Custom Roadmaps'
    },
    {
      icon: Stethoscope,
      title: 'Experienced Expertise',
      description: 'Experienced dental professionals providing thorough diagnostic evaluations and gentle clinical delivery.',
      tag: 'Clinical Rigor'
    },
    {
      icon: Smile,
      title: 'Comfortable Experience',
      description: 'A calm, patient-friendly environment designed to minimize dental anxiety and optimize comfort.',
      tag: 'Stress-Free'
    },
    {
      icon: ShieldAlert,
      title: 'Comprehensive Dentistry',
      description: 'Multiple dental specialties under one roof, from preventive cleaning to restorative implant solutions.',
      tag: 'All Under One Roof'
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-4">
            Dental Care Designed Around You
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            At Manav Dental Care in Padur, we prioritize clear communication, patient comfort, and transparent 
            treatment planning. You are fully informed before any procedure begins.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white p-7 rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-[#0b2545] group-hover:text-teal-300 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider text-teal-800 uppercase px-2 py-0.5 rounded-full bg-teal-50">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0b2545] mb-2 group-hover:text-[#0d9488] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-400 group-hover:text-teal-700 transition-colors">
                  Patient First Standard
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
