'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, Search, Calendar, Phone } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { GENERAL_FAQS, CLINIC_CONFIG } from '@/lib/clinic-data';

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = GENERAL_FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Frequently Asked Questions' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Patient Guidance
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Find clear, medically responsible answers to common patient questions regarding appointments, 
              procedures, pain management, and oral care.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions e.g. root canal, implants, kids..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs text-sm text-slate-900 focus:outline-hidden focus:border-teal-600 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No matching questions found. Please contact our clinic directly for specific inquiries.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-colors bg-white hover:border-slate-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-[#0b2545] text-base sm:text-lg flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-teal-600 shrink-0" />
                        {faq.question}
                      </span>
                      <span className="p-1 rounded-lg bg-slate-50 text-slate-500 shrink-0">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-slate-600 leading-relaxed pl-14">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Fallback Support CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200/80 text-center">
            <h3 className="text-xl font-bold text-[#0b2545] mb-2">
              Have a Question Not Listed Here?
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              Our clinical coordinator will be glad to assist you with specific queries regarding treatments, costs, and availability.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0b2545] text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-300" />
                <span>Call {CLINIC_CONFIG.contact.displayPhone}</span>
              </a>

              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Book a Consultation</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
