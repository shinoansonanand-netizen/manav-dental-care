'use client';

import React from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Phone } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-data';

export default function LocationMapSection() {
  return (
    <section className="py-20 bg-white border-t border-slate-100" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Visit Our Clinic
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-3">
            Location & Clinic Timings
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Conveniently situated along Rajiv Gandhi Salai (OMR) in Padur, easily accessible from Siruseri IT park, Kelambakkam, and Navalur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Clinic Details Card */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0b2545] text-teal-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0b2545]">
                    {CLINIC_CONFIG.name}
                  </h3>
                  <p className="text-xs text-teal-700 font-semibold">
                    Padur, OMR • Chennai
                  </p>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-4 text-sm text-slate-700 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Address</strong>
                    <p className="text-slate-600 leading-relaxed">
                      {CLINIC_CONFIG.address.fullAddress}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Landmark: {CLINIC_CONFIG.address.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                  <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Consultation Hours</strong>
                    <p className="text-slate-600">{CLINIC_CONFIG.timings.weekdays}</p>
                    <p className="text-slate-600 mt-0.5">{CLINIC_CONFIG.timings.sunday}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                  <Phone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Phone Inquiries</strong>
                    <a
                      href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
                      className="text-teal-700 font-semibold hover:underline"
                    >
                      {CLINIC_CONFIG.contact.displayPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200/80">
              <a
                href={CLINIC_CONFIG.maps.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0b2545] hover:bg-[#07172c] text-white font-semibold text-sm shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4 text-teal-300" />
                <span>Open in Google Maps</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={CLINIC_CONFIG.maps.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Apple Maps</span>
                </a>

                <a
                  href={CLINIC_CONFIG.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold text-xs border border-teal-200 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-700" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Responsive Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-xs relative min-h-[380px] bg-slate-100">
            <iframe
              title="Manav Dental Care Location Map"
              src={CLINIC_CONFIG.maps.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            
            <div className="absolute bottom-4 right-4 z-10 hidden sm:block">
              <a
                href={CLINIC_CONFIG.maps.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md shadow-md text-xs font-bold text-[#0b2545] hover:text-teal-700 transition-colors border border-slate-200"
              >
                <span>Open in Google Maps →</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
