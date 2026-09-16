'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Patient Stories', href: '/patient-stories' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 py-3'
            : 'bg-white border-b border-slate-100/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-hidden"
              aria-label="Manav Dental Care - Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0b2545] to-[#0d9488] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-teal-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#0b2545] group-hover:text-[#0d9488] transition-colors leading-tight">
                  MANAV DENTAL CARE
                </span>
                <span className="text-xs font-medium text-slate-500 tracking-wider uppercase">
                  Padur • OMR Chennai
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#0d9488] bg-teal-50/80 font-semibold'
                        : 'text-slate-600 hover:text-[#0b2545] hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0d9488] transition-colors py-1.5 px-2"
                aria-label={`Call Manav Dental Care at ${CLINIC_CONFIG.contact.displayPhone}`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-teal-700">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{CLINIC_CONFIG.contact.displayPhone}</span>
              </a>

              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/book-appointment"
                className="px-3.5 py-1.5 rounded-lg bg-[#0b2545] text-white text-xs font-semibold"
              >
                Book
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-[#0b2545] hover:bg-slate-100 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0b2545] flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4 text-teal-300" />
                  </div>
                  <span className="font-bold text-[#0b2545] text-sm">MANAV DENTAL CARE</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col gap-1.5 mt-6" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'text-[#0d9488] bg-teal-50 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
              <Link
                href="/book-appointment"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0b2545] text-white font-semibold text-sm shadow-xs"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                Book Appointment
              </Link>
              <a
                href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                Call {CLINIC_CONFIG.contact.displayPhone}
              </a>
              <div className="text-xs text-center text-slate-500 pt-2">
                Padur, OMR, Chennai • Mon–Sat
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
