import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CLINIC_CONFIG } from '@/lib/clinic-data';

export const metadata: Metadata = {
  title: 'Privacy Policy | Manav Dental Care Padur',
  description: 'Privacy Policy and patient data handling standards for Manav Dental Care in Padur, OMR Chennai.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />
        </div>
      </div>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mb-8">
          Last Updated: September 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            At <strong>Manav Dental Care</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the clinic&rdquo;), 
            we respect your personal privacy and are committed to protecting the personal and medical information 
            you share with us through our website.
          </p>

          <h2 className="text-xl font-bold text-[#0b2545] pt-4">1. Information We Collect</h2>
          <p>
            When you request an appointment or submit an enquiry via our website, we collect personal contact details including:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Your full name</li>
            <li>Your telephone / mobile contact number</li>
            <li>Your email address (if provided)</li>
            <li>Preferred appointment dates and time slots</li>
            <li>General oral health concerns, symptoms, or messages you choose to describe</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0b2545] pt-4">2. How Your Information is Used</h2>
          <p>
            We use the information collected exclusively for legitimate medical practice workflows:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Scheduling and confirming your dental appointments</li>
            <li>Communicating regarding appointment rescheduling or pre-procedure preparations</li>
            <li>Responding to your specific oral care questions and enquiries</li>
            <li>Maintaining internal administrative clinical visit records</li>
          </ul>
          <p>
            We <strong>never</strong> sell, rent, or lease your personal information to third-party advertisers or marketing agencies.
          </p>

          <h2 className="text-xl font-bold text-[#0b2545] pt-4">3. Data Protection and Confidentiality</h2>
          <p>
            We implement administrative and technical security measures to safeguard your information against unauthorized access, 
            alteration, or disclosure. All clinical notes recorded during in-person visits remain protected under applicable medical 
            confidentiality standards.
          </p>

          <h2 className="text-xl font-bold text-[#0b2545] pt-4">4. Third-Party Services & Links</h2>
          <p>
            Our website may include links to third-party platforms such as Google Maps, Apple Maps, or WhatsApp to facilitate directions 
            and messaging. These third parties operate under their respective privacy policies.
          </p>

          <h2 className="text-xl font-bold text-[#0b2545] pt-4">5. Contact Regarding Privacy</h2>
          <p>
            If you have questions about this policy or wish to request removal of your contact details from our appointment enquiry log, 
            please contact our clinic at:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
            <strong>Manav Dental Care</strong><br />
            {CLINIC_CONFIG.address.fullAddress}<br />
            Phone: {CLINIC_CONFIG.contact.displayPhone}<br />
            Email: {CLINIC_CONFIG.contact.email}
          </div>
        </div>
      </section>
    </div>
  );
}
