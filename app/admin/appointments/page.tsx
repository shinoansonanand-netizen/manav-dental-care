'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  Search, 
  Phone, 
  RefreshCw, 
  Lock, 
  AlertCircle 
} from 'lucide-react';
import { AppointmentRecord, AppointmentStatus } from '@/lib/appointment-store';

export default function AdminAppointmentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check session on load
  useEffect(() => {
    fetch('/api/appointments').then(res => {
      if (res.ok) setIsAuthenticated(true);
    }).catch(console.error);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setPasscodeError('');
      } else {
        setPasscodeError('Invalid clinic passcode.');
      }
    } catch {
      setPasscodeError('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setAppointments([]);
  };

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/api/appointments';
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchQuery.trim()) params.append('q', searchQuery.trim());

      const qs = params.toString();
      if (qs) url += `?${qs}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
        if (selectedAppointment) {
          const updatedSelected = data.appointments.find((a: AppointmentRecord) => a.id === selectedAppointment.id);
          if (updatedSelected) setSelectedAppointment(updatedSelected);
        }
      }
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery, selectedAppointment]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;

    async function loadData() {
      try {
        let url = '/api/appointments';
        if (statusFilter !== 'all') url += `?status=${statusFilter}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!cancelled && data.success) {
          setAppointments(data.appointments);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchAppointments();
      }
    } catch (err) {
      console.error('Error changing status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#0b2545] text-teal-300 flex items-center justify-center mb-6">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#0b2545] tracking-tight">
            Clinic Staff Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Enter authorized access passcode to view incoming patient requests.
          </p>

          {passcodeError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passcodeError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Staff Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-teal-600 focus:outline-hidden"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                (Staff default demo passcode: <code className="text-slate-600">manav123</code>)
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0b2545] hover:bg-[#0d9488] text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Access Appointments Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Contacted</span>;
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800">Confirmed</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Completed</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Cancelled</span>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Staff Operations Portal
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0b2545] mt-1">
              Patient Appointment Requests
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAppointments}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Lock / Sign Out
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by patient name, telephone, or procedure..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') fetchAppointments(); }}
              className="w-full pl-11 pr-24 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-teal-600 focus:outline-hidden"
            />
            <button
              onClick={fetchAppointments}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#0b2545] text-white text-xs font-semibold hover:bg-slate-800"
            >
              Search
            </button>
          </div>

          <div className="md:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'all')}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:border-teal-600 focus:outline-hidden"
            >
              <option value="all">Filter by All Statuses</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table & Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main List */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Patients ({appointments.length})</span>
              <span>Status</span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-400 text-sm">
                Loading records...
              </div>
            ) : appointments.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                No appointment requests found matching this filter.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => setSelectedAppointment(apt)}
                    className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                      selectedAppointment?.id === apt.id ? 'bg-teal-50/60 border-l-4 border-teal-600' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0b2545]">{apt.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">#{apt.id}</span>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 font-medium">
                          <Phone className="w-3 h-3 text-teal-600" />
                          {apt.phone}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {apt.preferred_date}
                        </span>
                      </div>
                      <div className="text-xs text-teal-800 font-semibold mt-1">
                        {apt.treatment}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {getStatusBadge(apt.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            {selectedAppointment ? (
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Appointment ID: {selectedAppointment.id}
                    </span>
                    <h3 className="text-xl font-extrabold text-[#0b2545]">
                      {selectedAppointment.name}
                    </h3>
                  </div>
                  <div>
                    {getStatusBadge(selectedAppointment.status)}
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 mb-6">
                  <div>
                    <span className="block text-slate-400 font-bold uppercase text-[10px]">Contact Telephone</span>
                    <a
                      href={`tel:${selectedAppointment.phone}`}
                      className="font-bold text-[#0b2545] text-base hover:text-teal-700"
                    >
                      {selectedAppointment.phone}
                    </a>
                  </div>

                  {selectedAppointment.email && (
                    <div>
                      <span className="block text-slate-400 font-bold uppercase text-[10px]">Email</span>
                      <span>{selectedAppointment.email}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <span className="block text-slate-400 font-bold uppercase text-[10px]">Requested Date</span>
                      <span className="font-semibold text-slate-900">{selectedAppointment.preferred_date}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-bold uppercase text-[10px]">Preferred Time</span>
                      <span className="font-semibold text-slate-900">{selectedAppointment.preferred_time}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="block text-slate-400 font-bold uppercase text-[10px]">Treatment / Concern</span>
                    <span className="font-bold text-teal-800">{selectedAppointment.treatment}</span>
                  </div>

                  {selectedAppointment.message && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="block text-slate-500 font-bold uppercase text-[10px] mb-1">Patient Symptoms / Note</span>
                      <p className="text-xs text-slate-600 italic">&ldquo;{selectedAppointment.message}&rdquo;</p>
                    </div>
                  )}
                </div>

                {/* Status Update Control */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Update Appointment Status
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(['pending', 'contacted', 'confirmed', 'completed', 'cancelled'] as AppointmentStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedAppointment.id, st)}
                        disabled={updatingId === selectedAppointment.id || selectedAppointment.status === st}
                        className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          selectedAppointment.status === st
                            ? 'bg-[#0b2545] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 text-sm">
                Select an appointment from the left list to view complete details, contact information, and update its status.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
