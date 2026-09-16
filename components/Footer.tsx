'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Mail, MapPin, Sparkles } from 'lucide-react';
import { CLINIC_CONFIG, TREATMENTS } from '@/lib/clinic-data';

// High-contrast accessible inline SVG icons for social media
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    CLINIC_CONFIG.contact.whatsappMessageTemplate
  )}`;

  return (
    <footer className="bg-[#07172c] text-slate-300 border-t border-slate-800" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 group mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0b2545] to-[#0d9488] flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5 text-teal-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors">
                    MANAV DENTAL CARE
                  </span>
                  <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">
                    Padur • OMR Chennai
                  </span>
                </div>
              </Link>

              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Premium, patient-focused dental practice led by Dr. Vallabh Mahadevan. 
                Delivering advanced restorative, preventive, and cosmetic dental treatments 
                with high clinical safety and gentle care.
              </p>

              {/* Social Icons with HIGH WCAG contrast */}
              <div className="flex items-center gap-3">
                {CLINIC_CONFIG.social.instagram && (
                  <a
                    href={CLINIC_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-teal-700 text-teal-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Follow Manav Dental Care on Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                )}
                {CLINIC_CONFIG.social.facebook && (
                  <a
                    href={CLINIC_CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-teal-700 text-teal-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Follow Manav Dental Care on Facebook"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                )}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-700 text-emerald-400 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              Registration & Clinical Compliance verified
            </div>
          </div>

          {/* Column 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About Clinic
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-teal-400 transition-colors">
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-teal-400 transition-colors">
                  Meet the Dentist
                </Link>
              </li>
              <li>
                <Link href="/patient-stories" className="hover:text-teal-400 transition-colors">
                  Patient Stories
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-teal-400 transition-colors">
                  Clinical Results
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-teal-400 transition-colors">
                  Clinic Gallery
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-teal-400 transition-colors">
                  Dental FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Contact & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Treatments (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Treatments
            </h4>
            <ul className="space-y-2 text-sm">
              {TREATMENTS.slice(0, 7).map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="hover:text-teal-400 transition-colors line-clamp-1"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/treatments"
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-block pt-1"
                >
                  View All Treatments →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact Clinic
            </h4>
            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  {CLINIC_CONFIG.address.fullAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
                  className="text-xs font-semibold hover:text-teal-400 transition-colors"
                >
                  {CLINIC_CONFIG.contact.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold hover:text-emerald-300 transition-colors"
                >
                  WhatsApp Consultation
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`mailto:${CLINIC_CONFIG.contact.email}`}
                  className="text-xs hover:text-teal-400 transition-colors"
                >
                  {CLINIC_CONFIG.contact.email}
                </a>
              </div>

              <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
                <strong className="text-slate-300 block mb-1">Consultation Hours:</strong>
                <p>{CLINIC_CONFIG.timings.weekdays}</p>
                <p className="mt-0.5">{CLINIC_CONFIG.timings.sunday}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MANAV DENTAL CARE. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/medical-disclaimer" className="hover:text-teal-400 transition-colors">
              Medical Disclaimer
            </Link>
            <Link href="/admin/appointments" className="hover:text-teal-400 transition-colors text-slate-500">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
