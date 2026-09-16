import React from 'react';
import { Metadata } from 'next';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppointmentForm from '@/components/AppointmentForm';
import { CLINIC_CONFIG } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'Contact Us & Clinic Location | Manav Dental Care Padur OMR',
  description: 'Contact Manav Dental Care in Padur, OMR Chennai. Address, phone, WhatsApp consultation, operating hours and interactive Google Maps directions.',
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    CLINIC_CONFIG.contact.whatsappMessageTemplate
  )}`;

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Contact' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Get in Touch
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-4">
              Contact Manav Dental Care
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We are located on the main Rajiv Gandhi Salai (OMR) in Padur. Reach out to schedule 
              a consultation, clarify treatment questions, or obtain driving directions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* Visit Us */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0b2545] mb-2">Visit Us</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {CLINIC_CONFIG.address.fullAddress}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Landmark: {CLINIC_CONFIG.address.landmark}
                </p>
              </div>
              <a
                href={CLINIC_CONFIG.maps.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Call */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0b2545] mb-2">Call Clinic</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  For appointments and immediate inquiries:
                </p>
                <a
                  href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
                  className="text-base font-bold text-[#0b2545] hover:text-teal-700"
                >
                  {CLINIC_CONFIG.contact.displayPhone}
                </a>
              </div>
              <a
                href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
                className="mt-6 text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
              >
                <span>Call Directly</span>
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* WhatsApp */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0b2545] mb-2">WhatsApp</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  Quick text enquiry for time slots and directions:
                </p>
                <div className="text-xs text-slate-500">
                  Instant message dispatch
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
              >
                <span>Message on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hours */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0b2545] mb-2">Opening Hours</h3>
                <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <p>{CLINIC_CONFIG.timings.weekdays}</p>
                  <p>{CLINIC_CONFIG.timings.sunday}</p>
                </div>
              </div>
              <span className="mt-6 text-xs font-semibold text-slate-400">
                Prior booking recommended
              </span>
            </div>

          </div>

          {/* Map + Form Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Interactive Map */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xs h-[420px] bg-slate-100">
                <iframe
                  title="Manav Dental Care Location Map"
                  src={CLINIC_CONFIG.maps.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={CLINIC_CONFIG.maps.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0b2545] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors"
                >
                  <Navigation className="w-4 h-4 text-teal-300" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={CLINIC_CONFIG.maps.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors border border-slate-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Apple Maps</span>
                </a>
              </div>
            </div>

            {/* Right: Embedded Appointment Form */}
            <div className="lg:col-span-6">
              <AppointmentForm isCompact={true} />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
