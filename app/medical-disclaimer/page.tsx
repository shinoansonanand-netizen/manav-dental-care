import React from 'react';
import { Metadata } from 'next';
import { AlertCircle, Phone } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CLINIC_CONFIG } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'Medical Disclaimer | Manav Dental Care Padur',
  description: 'Medical and clinical disclaimer regarding informational content provided on the Manav Dental Care website.',
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Medical Disclaimer' }]} />
        </div>
      </div>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <span>Patient Advisory</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-4">
          Medical & Clinical Disclaimer
        </h1>
        <p className="text-xs text-slate-400 mb-8">
          Important information regarding website content and professional clinical advice.
        </p>

        <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
          
          <div className="p-5 rounded-2xl bg-slate-50 border-l-4 border-[#0d9488] text-slate-800 font-medium text-base">
            The content presented across this website—including articles, treatment descriptions, procedure outlines, 
            and FAQ answers—is provided solely for educational and general informational purposes.
          </div>

          <h2 className="text-xl font-bold text-[#0b2545] pt-4">1. Not a Substitute for Medical Evaluation</h2>
          <p>
            No information on this site should be interpreted as medical advice, clinical diagnosis, or a definitive treatment plan. 
            Oral health conditions can only be accurately diagnosed through in-person clinical examinations, radiographic analysis, 
            and evaluation of individual medical histories by a qualified dentist or oral healthcare specialist.
          </p>

          <h2 className="text-xl font-bold text-[#0b2545] pt-4">2. Individual Treatment Variability</h2>
          <p>
            Every patient presents with unique oral anatomy, medical backgrounds, and healing responses. Expected treatment outcomes, 
            number of visits, and procedural suitability vary significantly among individuals. Never disregard professional dental 
            or medical advice or delay seeking clinical attention because of something you have read on this website.
          </p>

          <h2 className="text-xl font-bold text-[#0b2545] pt-4">3. Emergency Situations</h2>
          <p>
            If you are experiencing acute dental trauma, severe facial swelling, continuous bleeding, or difficulty breathing/swallowing, 
            do not rely on website messages or online forms. Please seek immediate urgent emergency care or call our clinic directly 
            during operating hours.
          </p>

          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
            <div>
              <h3 className="font-bold text-rose-950 text-base">Urgent Dental Assistance</h3>
              <p className="text-xs sm:text-sm text-rose-800 mt-1">
                Call our direct reception desk during clinic hours for emergency assessment.
              </p>
            </div>
            <a
              href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>{CLINIC_CONFIG.contact.displayPhone}</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
