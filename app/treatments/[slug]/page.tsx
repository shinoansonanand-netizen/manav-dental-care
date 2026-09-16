import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppointmentForm from '@/components/AppointmentForm';
import { TREATMENTS } from '@/lib/clinic-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);

  if (!treatment) {
    return { title: 'Treatment Not Found' };
  }

  return {
    title: `${treatment.title} in Padur, OMR | Manav Dental Care`,
    description: treatment.shortDescription,
    alternates: {
      canonical: `/treatments/${treatment.slug}`,
    },
    openGraph: {
      title: `${treatment.title} | Manav Dental Care Padur`,
      description: treatment.shortDescription,
      images: [treatment.heroImage],
    },
  };
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs
            items={[
              { name: 'Treatments', href: '/treatments' },
              { name: treatment.title },
            ]}
          />
        </div>
      </div>

      {/* Treatment Hero */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4">
                {treatment.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-4">
                {treatment.title}
              </h1>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6 font-medium">
                {treatment.shortDescription}
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-8">
                {treatment.fullOverview}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#book-form"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white font-semibold text-sm shadow-md transition-colors"
                >
                  <span>Book Consultation for {treatment.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/treatments"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 transition-colors"
                >
                  View Other Treatments
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 relative">
                <img
                  src={treatment.heroImage}
                  alt={treatment.title}
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                  <div className="flex items-center gap-1.5 text-teal-300 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    Evidence-Based Clinical Protocol
                  </div>
                  <div>Conducted under gentle local anesthesia where applicable.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clinical Suitability Note */}
      <section className="bg-teal-50/50 border-y border-teal-100/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 text-xs sm:text-sm text-teal-900">
          <AlertCircle className="w-5 h-5 text-teal-700 shrink-0" />
          <span>
            <strong>Clinical Notice:</strong> {treatment.suitabilityNote}
          </span>
        </div>
      </section>

      {/* Who Needs It & Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Who May Need It */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0b2545] mb-4">
                Who May Need {treatment.title}?
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                You may benefit from this procedure if you present with any of the following clinical symptoms:
              </p>
              <ul className="space-y-3.5">
                {treatment.whoNeedsIt.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Clinical Benefits */}
            <div className="p-8 rounded-3xl bg-teal-50/40 border border-teal-100 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0b2545] mb-4">
                Key Benefits & Expected Advantages
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Our approach to {treatment.title.toLowerCase()} emphasizes functional longevity:
              </p>
              <ul className="space-y-3.5">
                {treatment.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Step-by-Step Treatment Process */}
      <section className="py-16 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] mb-3">
              Step-by-Step Clinical Process
            </h2>
            <p className="text-sm text-slate-600">
              What to expect during your appointment at Manav Dental Care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatment.procedureSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#0b2545] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {treatment.faqs && treatment.faqs.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-600">
                Common patient queries about {treatment.title.toLowerCase()}.
              </p>
            </div>

            <div className="space-y-4">
              {treatment.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <h4 className="text-base font-bold text-[#0b2545] flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 pl-8 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Appointment Booking */}
      <section className="py-16 bg-slate-50 border-t border-slate-100" id="book-form">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm initialTreatment={treatment.title} />
        </div>
      </section>
    </div>
  );
}
