'use client';

import React, { useState } from 'react';

type Tab = 'mentor' | 'partner' | 'message';

interface FormState {
  submitted: boolean;
  loading: boolean;
}

export default function GetInvolvedPage() {
  const [activeTab, setActiveTab] = useState<Tab>('mentor');
  const [formState, setFormState] = useState<FormState>({ submitted: false, loading: false });

  // Mentor form
  const [mentorForm, setMentorForm] = useState({
    name: '', email: '', profession: '', availability: '', motivation: '',
  });

  // Partner form
  const [partnerForm, setPartnerForm] = useState({
    orgName: '', contactName: '', contactEmail: '', partnerType: '', details: '',
  });

  // Message form
  const [messageForm, setMessageForm] = useState({
    name: '', email: '', message: '',
  });

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setFormState({ submitted: false, loading: false });
  };

  const simulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ submitted: false, loading: true });
    setTimeout(() => setFormState({ submitted: true, loading: false }), 1200);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'mentor', label: 'Apply to mentor' },
    { id: 'partner', label: 'Partner with us' },
    { id: 'message', label: 'Send a message' },
  ];

  const roleCards = [
    {
      title: 'Mentor',
      body: 'Walk alongside a young person through the Sunday sessions — group leadership, self-authoring guidance and one-on-one coaching. All mentors complete vetting and child-protection training before being placed in a school hub.',
    },
    {
      title: 'Partner',
      body: 'Schools host the Sunday hubs; companies, NGOs and local funds sponsor student cohorts. Partnerships are formalised through MOUs so everyone knows their role and the programme runs safely inside an institution.',
    },
    {
      title: 'Give your skills',
      body: 'Accountants, counsellors, artisans, tech professionals — life-skills workshops run on real expertise. Share what you know for one Sunday or a whole term. Your background is the curriculum.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-[#EBF2EE] px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#172B36]/60 mb-5"
          >
            Get involved
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#172B36] leading-tight mb-6"
            style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
          >
            There is a place for you in this work.
          </h1>
          <p className="text-lg text-[#172B36]/70 leading-relaxed max-w-2xl">
            Whether you can give four hours on a Sunday, a school hall for a term, or funding for
            a cohort of students — your contribution goes directly to a young person&apos;s future.
          </p>
        </div>
      </section>

      {/* ── ROLE CARDS ───────────────────────────────────────── */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {roleCards.map((card) => (
            <div
              key={card.title}
              className="border border-[#D9E8E2] rounded-2xl p-8 flex flex-col"
            >
              <h3
                className="text-xl font-bold text-[#172B36] mb-4"
                style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
              >
                {card.title}
              </h3>
              <p className="text-[#172B36]/65 text-sm leading-relaxed flex-1">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TABBED FORM ──────────────────────────────────────── */}
      <section className="bg-[#EBF2EE] px-6 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Rounded card */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

            {/* Tab pills */}
            <div className="flex items-center gap-2 px-8 pt-8 pb-6 border-b border-[#D9E8E2]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#172B36] text-white'
                      : 'text-[#172B36]/60 hover:text-[#172B36]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form body */}
            <div className="px-8 py-8">

              {/* ── TAB 1: Mentor application ── */}
              {activeTab === 'mentor' && (
                <div>
                  <h2
                    className="text-2xl font-bold text-[#172B36] mb-6"
                    style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                  >
                    Become a mentor
                  </h2>

                  {formState.submitted ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#EBF2EE] flex items-center justify-center mx-auto text-[#EF9332] text-2xl">✓</div>
                      <p className="font-semibold text-[#172B36]">Application received</p>
                      <p className="text-sm text-[#172B36]/60">We&apos;ll be in touch within five working days.</p>
                    </div>
                  ) : (
                    <form onSubmit={simulateSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Full name</label>
                          <input
                            type="text" required
                            value={mentorForm.name}
                            onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Email</label>
                          <input
                            type="email" required
                            value={mentorForm.email}
                            onChange={(e) => setMentorForm({ ...mentorForm, email: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Profession</label>
                          <input
                            type="text" required
                            value={mentorForm.profession}
                            onChange={(e) => setMentorForm({ ...mentorForm, profession: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Availability</label>
                          <select
                            required
                            value={mentorForm.availability}
                            onChange={(e) => setMentorForm({ ...mentorForm, availability: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] bg-white focus:outline-none focus:border-[#EF9332] transition"
                          >
                            <option value="">Select…</option>
                            <option value="one-sunday">One Sunday only</option>
                            <option value="monthly">Monthly</option>
                            <option value="full-term">Full term</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">What draws you to this work?</label>
                        <textarea
                          rows={4} required
                          value={mentorForm.motivation}
                          onChange={(e) => setMentorForm({ ...mentorForm, motivation: e.target.value })}
                          className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formState.loading}
                        className="bg-[#172B36] hover:bg-[#114C5A] text-white px-8 py-3.5 rounded-full font-medium text-sm transition disabled:opacity-60"
                      >
                        {formState.loading ? 'Sending…' : 'Submit application'}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* ── TAB 2: Partner form ── */}
              {activeTab === 'partner' && (
                <div>
                  <h2
                    className="text-2xl font-bold text-[#172B36] mb-6"
                    style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                  >
                    Partner with us
                  </h2>

                  {formState.submitted ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#EBF2EE] flex items-center justify-center mx-auto text-[#EF9332] text-2xl">✓</div>
                      <p className="font-semibold text-[#172B36]">Enquiry received</p>
                      <p className="text-sm text-[#172B36]/60">A member of our team will follow up within five working days.</p>
                    </div>
                  ) : (
                    <form onSubmit={simulateSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Organisation / School name</label>
                          <input
                            type="text" required
                            value={partnerForm.orgName}
                            onChange={(e) => setPartnerForm({ ...partnerForm, orgName: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Contact name</label>
                          <input
                            type="text" required
                            value={partnerForm.contactName}
                            onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Email</label>
                          <input
                            type="email" required
                            value={partnerForm.contactEmail}
                            onChange={(e) => setPartnerForm({ ...partnerForm, contactEmail: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Partnership type</label>
                          <select
                            required
                            value={partnerForm.partnerType}
                            onChange={(e) => setPartnerForm({ ...partnerForm, partnerType: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] bg-white focus:outline-none focus:border-[#EF9332] transition"
                          >
                            <option value="">Select…</option>
                            <option value="school-hub">Host a school hub</option>
                            <option value="cohort-sponsor">Sponsor a student cohort</option>
                            <option value="ngo">NGO collaboration</option>
                            <option value="corporate">Corporate CSR partnership</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Tell us about your interest</label>
                        <textarea
                          rows={4}
                          value={partnerForm.details}
                          onChange={(e) => setPartnerForm({ ...partnerForm, details: e.target.value })}
                          className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formState.loading}
                        className="bg-[#172B36] hover:bg-[#114C5A] text-white px-8 py-3.5 rounded-full font-medium text-sm transition disabled:opacity-60"
                      >
                        {formState.loading ? 'Sending…' : 'Submit enquiry'}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* ── TAB 3: General message ── */}
              {activeTab === 'message' && (
                <div>
                  <h2
                    className="text-2xl font-bold text-[#172B36] mb-6"
                    style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                  >
                    Send a message
                  </h2>

                  {formState.submitted ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#EBF2EE] flex items-center justify-center mx-auto text-[#EF9332] text-2xl">✓</div>
                      <p className="font-semibold text-[#172B36]">Message sent</p>
                      <p className="text-sm text-[#172B36]/60">Thank you for reaching out. We&apos;ll respond shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={simulateSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Your name</label>
                          <input
                            type="text" required
                            value={messageForm.name}
                            onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Email</label>
                          <input
                            type="email" required
                            value={messageForm.email}
                            onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                            className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#172B36]/60 mb-1.5 uppercase tracking-wide">Message</label>
                        <textarea
                          rows={5} required
                          value={messageForm.message}
                          onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                          className="w-full border border-[#D9E8E2] rounded-xl px-4 py-3 text-sm text-[#172B36] focus:outline-none focus:border-[#EF9332] transition resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formState.loading}
                        className="bg-[#172B36] hover:bg-[#114C5A] text-white px-8 py-3.5 rounded-full font-medium text-sm transition disabled:opacity-60"
                      >
                        {formState.loading ? 'Sending…' : 'Send message'}
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
