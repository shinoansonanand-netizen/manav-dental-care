import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Info, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BEFORE_AFTER_CASES } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'Clinical Results & Case Documentation | Manav Dental Care Padur',
  description: 'View documented clinical outcomes and smile restoration cases from Manav Dental Care in Padur, OMR Chennai.',
};

export default function ResultsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Clinical Results' }]} />
        </div>
      </div>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Clinical Records
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-4">
              Documented Clinical Restorations
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore documented cases representing aesthetic smile enhancement and functional tooth preservation 
              at our Padur clinic.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Medical Disclaimer Banner */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 mb-12 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 leading-relaxed max-w-4xl">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Clinical Responsibility Notice:</strong>
              Individual clinical results may vary. Treatment suitability and outcomes depend entirely on 
              individual anatomical conditions, remaining bone density, oral hygiene maintenance, and clinical evaluation. 
              Photographic case presentations are provided for patient education and do not constitute a guarantee of identical outcomes.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {BEFORE_AFTER_CASES.map((item) => (
              <div
                key={item.id}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-teal-100/70 text-teal-900 text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Verified Clinic Documentation
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0b2545] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-200 shadow-xs">
                      <img
                        src={item.beforeImage}
                        alt={`${item.title} Before`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold uppercase">
                        Before
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 text-center mt-2">
                      Pre-procedure state
                    </div>
                  </div>

                  <div>
                    <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-200 shadow-xs">
                      <img
                        src={item.afterImage}
                        alt={`${item.title} After`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#0d9488] text-white text-[10px] font-bold uppercase">
                        Restored
                      </span>
                    </div>
                    <div className="text-[11px] text-teal-800 font-semibold text-center mt-2">
                      Completed restoration
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                  <strong>Clinical Approach:</strong> {item.notes}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white font-bold text-sm shadow-md transition-colors"
            >
              <span>Schedule a Clinical Consultation</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
