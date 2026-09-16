'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { TREATMENTS, CLINIC_CONFIG } from '@/lib/clinic-data';

interface AppointmentFormProps {
  initialTreatment?: string;
  isCompact?: boolean;
}

export default function AppointmentForm({ initialTreatment = '', isCompact = false }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: 'Morning (9:30 AM - 1:00 PM)',
    treatment: initialTreatment || 'General Dental Consultation',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessResponse(null);

    // Basic client checks
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    const digitsOnly = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone || digitsOnly.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile or phone number.');
      return;
    }

    if (!formData.preferred_date) {
      setErrorMessage('Please choose your preferred appointment date.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Unable to submit appointment request.');
      }

      setSuccessResponse(data.message || 'Appointment Request Received.');
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferred_date: '',
        preferred_time: 'Morning (9:30 AM - 1:00 PM)',
        treatment: 'General Dental Consultation',
        message: ''
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong while submitting your request. Please try again or call the clinic directly.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-xl ${isCompact ? 'p-6 sm:p-8' : 'p-8 sm:p-12'}`}>
      
      {/* Header info */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
          Online Appointment Request
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
          Schedule Your Dental Visit
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          Select your preferred time slot. Our clinic coordinator will call to confirm availability.
        </p>
      </div>

      {/* Success Notification */}
      {successResponse && (
        <div className="mb-8 p-6 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-4 text-teal-900 animate-fadeIn">
          <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base text-teal-950">
              Appointment Request Received
            </h4>
            <p className="text-sm text-teal-800 mt-1">
              Thank you. Our team will contact you shortly via phone or WhatsApp to confirm your appointment.
            </p>
            <p className="text-xs text-teal-700 mt-2">
              For urgent toothaches, please call us directly at{' '}
              <a href={`tel:${CLINIC_CONFIG.contact.primaryPhone}`} className="underline font-bold">
                {CLINIC_CONFIG.contact.displayPhone}
              </a>.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong>Submission Notice:</strong> {errorMessage}
          </div>
        </div>
      )}

      {/* Form Elements */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="e.g. Anitha Sundaram"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-600 text-sm transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              required
              placeholder="e.g. +91 98400 12345"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-600 text-sm transition-colors"
            />
          </div>
        </div>

        {/* Email & Treatment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g. patient@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-600 text-sm transition-colors"
            />
          </div>

          <div>
            <label htmlFor="treatment" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Treatment / Primary Concern
            </label>
            <select
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-teal-600 text-sm transition-colors"
            >
              <option value="General Dental Consultation">General Dental Consultation</option>
              {TREATMENTS.map((t) => (
                <option key={t.id} value={t.title}>
                  {t.title}
                </option>
              ))}
              <option value="Severe Tooth Pain / Emergency">Severe Tooth Pain / Emergency</option>
              <option value="Second Opinion / Treatment Review">Second Opinion / Treatment Review</option>
            </select>
          </div>
        </div>

        {/* Preferred Date & Preferred Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="preferred_date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Preferred Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              id="preferred_date"
              required
              min={minDateString}
              value={formData.preferred_date}
              onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-teal-600 text-sm transition-colors"
            />
          </div>

          <div>
            <label htmlFor="preferred_time" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Preferred Time Slot <span className="text-rose-500">*</span>
            </label>
            <select
              id="preferred_time"
              value={formData.preferred_time}
              onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-teal-600 text-sm transition-colors"
            >
              <option value="Morning (9:30 AM - 1:00 PM)">Morning (9:30 AM - 1:00 PM)</option>
              <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
              <option value="Any Convenient Slot">Any Convenient Slot</option>
            </select>
          </div>
        </div>

        {/* Message / Symptoms */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Any Symptoms or Specific Questions? <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Tell us briefly about any tooth sensitivity, pain location, or preferred time details..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-600 text-sm transition-colors"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Request...</span>
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5 text-teal-300" />
                <span>Request Appointment</span>
              </>
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-xs text-slate-400 pt-2">
          Your personal details are kept strictly confidential for medical scheduling purposes only.
        </p>
      </form>
    </div>
  );
}
