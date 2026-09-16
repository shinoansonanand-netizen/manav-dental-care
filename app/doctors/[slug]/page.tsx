import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Award, CheckCircle2, Calendar, Shield } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppointmentForm from '@/components/AppointmentForm';
import { DOCTORS } from '@/lib/clinic-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DOCTORS.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);

  if (!doctor) {
    return { title: 'Doctor Not Found' };
  }

  return {
    title: `${doctor.name} | Chief Dental Surgeon | Manav Dental Care Padur`,
    description: `${doctor.name} (${doctor.qualifications}) specializes in ${doctor.specialization} at Manav Dental Care, Padur, OMR Chennai.`,
  };
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs
            items={[
              { name: 'Doctors', href: '/doctors' },
              { name: doctor.name },
            ]}
          />
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Photo & Highlights */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-auto aspect-4/5 object-cover"
                />
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-teal-600 shrink-0" />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900">Registered Dental Practitioner</strong>
                    Licensed by State Dental Council
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <Calendar className="w-5 h-5 text-teal-600 shrink-0" />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900">Consultation Timings</strong>
                    Mon–Sat: 9:30 AM – 1:30 PM, 5:00 PM – 8:30 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Right Biography & Expertise */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5 text-teal-700" />
                {doctor.designation}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-2">
                {doctor.name}
              </h1>

              <div className="text-base sm:text-lg font-bold text-teal-800 mb-6">
                {doctor.qualifications} • {doctor.specialization}
              </div>

              <div className="prose text-slate-600 space-y-4 text-base leading-relaxed mb-8">
                <p>{doctor.bio}</p>
                <div className="p-5 rounded-2xl bg-slate-50 border-l-4 border-teal-600 italic text-slate-800 my-6">
                  &ldquo;{doctor.philosophy}&rdquo;
                </div>
                <p>
                  At Manav Dental Care, Dr. Vallabh personally supervises all clinical diagnoses, ensuring 
                  that patients are informed with full clarity before any restorative, orthodontic, or surgical 
                  procedure is initiated.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-bold text-[#0b2545] mb-4">
                  Areas of Specialized Practice
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.areasOfExpertise.map((exp, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking CTA Anchor */}
              <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-[#0b2545] text-base">
                    Consult with Dr. Vallabh Mahadevan
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Appointments booked in advance receive dedicated priority scheduling.
                  </p>
                </div>
                <a
                  href="#book-consult"
                  className="px-6 py-3 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white text-sm font-semibold transition-colors shrink-0 shadow-xs"
                >
                  Book Appointment Now
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Appointment form section */}
      <section className="py-16 bg-slate-50 border-t border-slate-100" id="book-consult">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm initialTreatment="General Dental Consultation" />
        </div>
      </section>
    </div>
  );
}
