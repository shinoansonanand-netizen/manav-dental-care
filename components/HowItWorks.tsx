'use client';

import React from 'react';
import { Calendar, MessagesSquare, FileText, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Book',
      description: 'Request your appointment online, by phone, or WhatsApp at your convenience.',
      icon: Calendar,
    },
    {
      num: '02',
      title: 'Consult',
      description: 'Discuss your symptoms, concerns, and goals in a private, unrushed consultation.',
      icon: MessagesSquare,
    },
    {
      num: '03',
      title: 'Plan',
      description: 'Understand your diagnosis, imaging findings, and transparent treatment choices.',
      icon: FileText,
    },
    {
      num: '04',
      title: 'Treat',
      description: 'Receive gentle, evidence-based dental care with a focus on long-term oral health.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Patient Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-3">
            How Your Visit Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A seamless, transparent clinical process designed for your comfort and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/60 p-7 rounded-2xl border border-slate-100 hover:bg-teal-50/30 transition-all duration-200 group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-[#0b2545]/20 group-hover:text-teal-700/40 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white text-teal-700 shadow-xs border border-slate-100 flex items-center justify-center group-hover:bg-[#0b2545] group-hover:text-teal-300 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0b2545] mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
