'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { BEFORE_AFTER_CASES } from '@/lib/clinic-data';

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Smile Makeover', 'Crowns', 'Restorative Dentistry'];

  const filteredCases = activeTab === 'All'
    ? BEFORE_AFTER_CASES
    : BEFORE_AFTER_CASES.filter(c => c.category === activeTab);

  return (
    <section className="py-20 bg-white border-t border-slate-100" id="results">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Clinical Restorations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-3">
            Real Clinical Outcomes
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Documented treatment cases illustrating functional restoration and aesthetic harmony.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === cat
                  ? 'bg-[#0b2545] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Clinical Documentation
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0b2545] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                {item.description}
              </p>

              {/* Side by side comparison */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1.5">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-200">
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} - Initial condition`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider">
                      Initial
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 text-center font-medium">
                    Pre-treatment presentation
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-200">
                    <img
                      src={item.afterImage}
                      alt={`${item.title} - Restored outcome`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#0d9488]/90 text-white text-[10px] font-bold uppercase tracking-wider">
                      Restored
                    </span>
                  </div>
                  <p className="text-[11px] text-teal-800 text-center font-semibold">
                    Post-treatment result
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-800">Clinical Note:</strong> {item.notes}
              </div>
            </div>
          ))}
        </div>

        {/* Required Medical Disclaimer */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 leading-relaxed mb-8">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Medical Disclaimer:</strong> Individual results may vary. Treatment suitability, procedure outcomes, 
            and healing times depend on individual clinical conditions and patient compliance. Photographic records 
            are displayed for patient education and require preliminary clinical examination.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/results"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900"
          >
            <span>View All Clinical Restorations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
