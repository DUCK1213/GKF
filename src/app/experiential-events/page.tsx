'use client';

import React, { useState, useEffect } from 'react';
import { GKFDatabaseEngine } from '@/lib/supabaseMock';
import { ExperientialEvent, INITIAL_EVENTS } from '@/data/mockData';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  Compass,
  FileCheck,
  PhoneCall,
  Plus,
  Building,
  Award,
} from 'lucide-react';

export default function ExperientialEventsPage() {
  const [events, setEvents] = useState<ExperientialEvent[]>(INITIAL_EVENTS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'retreat' | 'field_trip' | 'campus_tour' | 'networking_mixer'>('all');
  const [registerModalEvent, setRegisterModalEvent] = useState<ExperientialEvent | null>(null);
  const [studentCode, setStudentCode] = useState('GKF-MRG-014');
  const [parentConsentSigned, setParentConsentSigned] = useState(true);
  const [emergencyPhone, setEmergencyPhone] = useState('+254 722 000 111');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const engine = GKFDatabaseEngine.getInstance();
    setEvents(engine.getEvents());

    const handleDataChange = () => {
      setEvents(engine.getEvents());
    };

    window.addEventListener('gkf-data-change', handleDataChange);
    return () => window.removeEventListener('gkf-data-change', handleDataChange);
  }, []);

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter((e) => e.type === activeFilter);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerModalEvent) return;
    const engine = GKFDatabaseEngine.getInstance();
    engine.registerForEvent(registerModalEvent.id, 1);
    setRegistrationSuccess(true);
    setTimeout(() => {
      setRegisterModalEvent(null);
      setRegistrationSuccess(false);
    }, 1500);
  };

  const sponsorsDirectory = [
    {
      company: 'Safaricom Foundation',
      sector: 'Telecommunications & Digital Tech',
      mentorsAvailable: 8,
      opportunities: 'Software Engineering Apprenticeships & Tech Hub Visits',
      logoText: 'SAF',
      color: 'bg-emerald-600',
    },
    {
      company: 'Kenya Commercial Bank (KCB) Foundation',
      sector: 'Banking & 2Jiajiri Agribusiness',
      mentorsAvailable: 12,
      opportunities: 'Micro-Enterprise Seed Capital & Financial Literacy Seminars',
      logoText: 'KCB',
      color: 'bg-blue-600',
    },
    {
      company: 'Kakuzi PLC Agribusiness',
      sector: 'Commercial Horticulture & Avocado Export',
      mentorsAvailable: 6,
      opportunities: 'Agronomy Internships & Export Value Chain Tours',
      logoText: 'KKZ',
      color: 'bg-amber-600',
    },
    {
      company: 'Equity Group Foundation',
      sector: 'Higher Education & Wings to Fly',
      mentorsAvailable: 10,
      opportunities: 'University Admissions Coaching & Leadership Mentorship',
      logoText: 'EGF',
      color: 'bg-red-700',
    },
  ];

  return (
    <div className="bg-[#F1F6F4] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div
          className="relative bg-cover bg-center rounded-2xl p-6 sm:p-8 text-white shadow-xl overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(23, 43, 54, 0.90), rgba(17, 76, 90, 0.85)), url('/images/bg-sunrise-mountain.jpg')`,
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF9932] text-[#172B36]">
                  Module 3: Beyond the Classroom
                </span>
                <span className="text-xs text-[#D9E8E2] font-mono">
                  Retreats · Industry Expeditions · Campus Tours · Mixers
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Experiential Events & Exposure Networking Portal
              </h1>
              <p className="text-sm text-[#D9E8E2] max-w-2xl leading-relaxed">
                Bridging the opportunity divide. Structured out-of-school experiences designed to broaden horizons, connect graduating cohorts with corporate leaders, and cultivate social capital.
              </p>
            </div>

            <div className="bg-[#172B36]/90 border border-[#FF9932]/40 rounded-xl p-4 text-center min-w-[240px]">
              <div className="text-xs text-slate-300">Total Registered Mentees</div>
              <div className="text-3xl font-extrabold text-[#FFC801] mt-1">
                {events.reduce((acc, curr) => acc + curr.registered_count, 0)}
              </div>
              <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                98% Parental Consent Tracked
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-[#114C5A]">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'retreat', label: 'Teambuilding Retreats' },
              { id: 'field_trip', label: 'Industry Field Trips' },
              { id: 'campus_tour', label: 'University Campus Tours' },
              { id: 'networking_mixer', label: 'Corporate Mixers' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as typeof activeFilter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeFilter === f.id
                    ? 'bg-[#FF9932] text-[#172B36] shadow'
                    : 'bg-[#114C5A] text-slate-200 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => {
            const capacityPercent = Math.round((evt.registered_count / evt.capacity) * 100);
            const consentPercent = Math.round((evt.consent_collected / evt.registered_count) * 100);

            return (
              <div
                key={evt.id}
                className="bg-white rounded-xl border border-[#D9E8E2] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#114C5A] text-[#FFC801]">
                      {evt.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FF9932]" />
                      {evt.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-[#172B36] leading-snug">
                      {evt.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FF9932]" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>

                  {/* Participating Hubs & Sponsors */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Participating Hubs:</span>
                      <span className="font-bold text-[#114C5A]">{evt.hub_participants.join(', ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Corporate Sponsors:</span>
                      <span className="font-bold text-[#172B36]">{evt.partner_sponsors.join(', ')}</span>
                    </div>
                  </div>

                  {/* Registration Capacity Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Capacity Enrolled:</span>
                      <strong className="text-[#172B36]">
                        {evt.registered_count} / {evt.capacity} Students ({capacityPercent}%)
                      </strong>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF9932] to-[#FFC801]"
                        style={{ width: `${capacityPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Parental Consent Status */}
                  <div className="bg-[#F1F6F4] p-3 rounded-lg border border-[#D9E8E2] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>Parental Consents Signed:</span>
                    </div>
                    <span className="font-bold text-emerald-700">
                      {evt.consent_collected} / {evt.registered_count} ({consentPercent}%)
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <PhoneCall className="w-3 h-3 text-[#FF9932]" />
                    <span>Emergency Lead: <strong>{evt.emergency_lead}</strong></span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#D9E8E2] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Registration Active
                  </span>
                  <button
                    onClick={() => setRegisterModalEvent(evt)}
                    className="bg-[#172B36] hover:bg-[#114C5A] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#FF9932]" />
                    Register Student
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Sponsors & Alumni Networking Mixer Directory */}
        <div className="bg-white rounded-xl border border-[#D9E8E2] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E8E2]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-[#FF9932] tracking-wider">
                  Social Capital Expansion
                </span>
                <span className="text-xs bg-[#114C5A] text-[#FFC801] px-2 py-0.5 rounded font-mono">
                  4 Corporate Partners Active
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#172B36] mt-1">
                Annual GKF Networking Mixer & Sponsor Directory
              </h3>
              <p className="text-xs text-slate-500">
                Directly linking senior mentees and graduates with corporate mentors, CSR apprenticeship programs, and university scholarship boards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sponsorsDirectory.map((sponsor, idx) => (
              <div
                key={idx}
                className="bg-[#F1F6F4] p-4 rounded-xl border border-[#D9E8E2] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-lg ${sponsor.color} text-white flex items-center justify-center font-extrabold text-xs shadow`}
                    >
                      {sponsor.logoText}
                    </div>
                    <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {sponsor.mentorsAvailable} Vetted Mentors
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#172B36] mt-3">{sponsor.company}</h4>
                  <div className="text-[11px] font-semibold text-[#114C5A] mt-0.5">{sponsor.sector}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {sponsor.opportunities}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-right">
                  <span className="text-[11px] font-bold text-[#FF9932] cursor-pointer hover:underline">
                    Match with Mentee →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Register Student for Event */}
        {registerModalEvent && (
          <div className="fixed inset-0 z-50 bg-[#172B36]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D9E8E2] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9E8E2]">
                <div>
                  <h3 className="font-extrabold text-base text-[#172B36]">
                    Register Student for Event
                  </h3>
                  <p className="text-xs text-slate-500">{registerModalEvent.title}</p>
                </div>
                <button
                  onClick={() => setRegisterModalEvent(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              {registrationSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-base text-emerald-900">
                    Registration & Consent Verified!
                  </div>
                  <p className="text-xs text-slate-500">
                    Student has been added to the event roster. Emergency lead notified.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Student Anonymous Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentCode}
                      onChange={(e) => setStudentCode(e.target.value)}
                      className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#172B36]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Verified Guardian Emergency Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      className="w-full bg-[#F1F6F4] border border-[#D9E8E2] rounded-lg px-3 py-2 text-xs text-[#172B36]"
                    />
                  </div>

                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-950">
                      <input
                        type="checkbox"
                        checked={parentConsentSigned}
                        onChange={(e) => setParentConsentSigned(e.target.checked)}
                        className="rounded text-[#FF9932] focus:ring-[#FF9932] w-4 h-4"
                        required
                      />
                      <span>Physical Parental Consent Form Signed & Verified on File</span>
                    </label>
                    <p className="text-[10px] text-amber-800 mt-1 pl-6">
                      Mandatory requirement under GKF Minor Safeguarding Protocol (ISO/IEC 27701) before boarding transport.
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#D9E8E2]">
                    <button
                      type="button"
                      onClick={() => setRegisterModalEvent(null)}
                      className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FF9932] hover:bg-[#FF9932]/90 text-[#172B36] font-extrabold px-5 py-2 rounded-lg flex items-center gap-1.5 shadow"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm Registration
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
