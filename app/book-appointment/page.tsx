import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppointmentForm from '@/components/AppointmentForm';
import { CLINIC_CONFIG } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'Book an Appointment | Manav Dental Care Padur OMR',
  description: 'Book your dental consultation with Dr. Vallabh Mahadevan at Manav Dental Care in Padur, OMR Chennai. Simple online scheduling.',
};

export default function BookAppointmentPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Book Appointment' }]} />
        </div>
      </div>

      <section className="py-12 lg:py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Clinic Guidance */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
                  Direct Clinic Scheduling
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-4">
                  Request Your Dental Appointment
                </h1>
                <p className="text-base text-slate-600 leading-relaxed">
                  Fill out the form with your preferred date and time slot. Our reception team will reach out 
                  promptly to confirm availability and discuss any preliminary instructions.
                </p>
              </div>

              {/* What to Expect Card */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 space-y-4">
                <h3 className="text-base font-bold text-[#0b2545] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <span>What to Bring for Your Consultation</span>
                </h3>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Any previous dental records, radiographs, or OPG scans if available.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>List of any current medications (blood thinners, diabetic therapy, etc.).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Arrive 10 minutes ahead of your slot for seamless reception check-in.</span>
                  </li>
                </ul>
              </div>

              {/* Urgent Contact Card */}
              <div className="p-6 rounded-3xl bg-teal-50/50 border border-teal-200/80">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-1">
                  Immediate Toothache or Emergency?
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  If you are in severe pain or require prompt attention, call our desk directly rather than waiting for an email response:
                </p>
                <a
                  href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b2545] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-300" />
                  <span>Call {CLINIC_CONFIG.contact.displayPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Appointment Form */}
            <div className="lg:col-span-7">
              <AppointmentForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
