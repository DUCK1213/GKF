'use client';

import React, { useState } from 'react';
import {
  ScrollText,
  BookOpen,
  Globe,
  Shield,
  Compass,
  Scale,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  FileText,
  Layers,
} from 'lucide-react';

export default function GKFCharterSection() {
  const [activeSection, setActiveSection] = useState<'all' | 'preamble' | 'article1' | 'article2'>('all');

  return (
    <section id="founding-charter" className="bg-[#172B36] text-white py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle background watermarks / geometry */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#EF9332]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#114C5A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Charter Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-[0.2em] text-[#FFC801]">
            <ScrollText className="w-3.5 h-3.5 text-[#EF9332]" />
            <span>Official Institutional Document</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            GKF Foundation Founding Charter
          </h2>

          <p
            className="text-lg sm:text-xl font-medium text-[#EF9332] tracking-wide"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Knowledge. Wisdom. Humanity.
          </p>

          <p className="text-xs sm:text-sm text-slate-300">
            Founding Edition – 2026 · Registered &amp; Established for Public Benefit
          </p>

          {/* Institutional metadata badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 text-left text-xs">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC801] block">
                Institutional Orientation
              </span>
              <p className="text-slate-200 font-medium">
                African Philosophy with Universal Intellectual Heritage
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF9332] block">
                Geographical Mandate
              </span>
              <p className="text-slate-200 font-medium">
                Kenya and Africa, with Global Partnerships
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Institutional Character
              </span>
              <p className="text-slate-200 font-medium">
                Independent, Nonpartisan, Nonprofit &amp; Knowledge-Driven
              </p>
            </div>
          </div>

          {/* Segmented Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-6">
            {[
              { id: 'all', label: 'Complete Charter' },
              { id: 'preamble', label: 'Preamble' },
              { id: 'article1', label: 'Article I: Identity & Character' },
              { id: 'article2', label: 'Article II: Foundational Philosophy' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  activeSection === tab.id
                    ? 'bg-[#EF9332] text-white shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CHARTER BODY CONTAINER ── */}
        <div className="bg-[#1C3441] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-14 leading-relaxed text-slate-200">
          
          {/* ─────────────────────────────────────────────────────────── */}
          {/* PREAMBLE                                                    */}
          {/* ─────────────────────────────────────────────────────────── */}
          {(activeSection === 'all' || activeSection === 'preamble') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-xl bg-[#EF9332]/20 text-[#EF9332] flex items-center justify-center font-bold">
                  §
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-[#EF9332] uppercase">
                    Declaration of Conviction
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    Preamble
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                <p className="text-base sm:text-lg text-white font-medium italic border-l-2 border-[#EF9332] pl-4 py-1">
                  &ldquo;We, the founders and custodians of the GKF Foundation, recognizing the transformative power of knowledge in the advancement of human civilization, hereby establish this Foundation as an institution dedicated to the pursuit, preservation, advancement and practical application of knowledge for the benefit of humanity.&rdquo;
                </p>

                <p>
                  Throughout history, civilizations have developed systems of knowledge, philosophy, science, culture and innovation that have shaped human understanding. From the ancient intellectual traditions of Africa and Mesopotamia to the philosophical schools of Greece, the scientific and literary traditions of Asia, and the diverse intellectual contributions of other societies, humanity has continually sought to understand its existence, its environment and its possibilities.
                </p>

                <p>
                  We acknowledge that knowledge is a universal inheritance, belonging not exclusively to any nation, civilization, institution or generation, but to humanity as a whole.
                </p>

                <p>
                  We recognize Africa&apos;s historical and contemporary contributions to this inheritance and affirm the importance of strengthening African intellectual institutions, preserving indigenous knowledge systems and creating opportunities for Africans to participate meaningfully in global knowledge production.
                </p>

                <p>
                  We believe that education should extend beyond the acquisition of qualifications, that research should address real human challenges, that innovation should serve society, and that intellectual development must be accompanied by ethical responsibility.
                </p>

                <p>
                  We further recognize that the advancement of humanity requires individuals who can think independently, question established assumptions, engage constructively with differing perspectives and translate understanding into meaningful action.
                </p>

                <p>
                  It is upon these convictions that the GKF Foundation is established.
                </p>

                <p className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-medium">
                  The Foundation shall serve as a platform for intellectual inquiry, research, education, innovation, cultural preservation and human development, guided by the conviction that knowledge must ultimately contribute to the wellbeing and advancement of humanity.
                </p>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────── */}
          {/* ARTICLE I: NAME, IDENTITY AND INSTITUTIONAL CHARACTER       */}
          {/* ─────────────────────────────────────────────────────────── */}
          {(activeSection === 'all' || activeSection === 'article1') && (
            <div className="space-y-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-xl bg-[#FFC801]/20 text-[#FFC801] flex items-center justify-center font-bold">
                  I
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-[#FFC801] uppercase">
                    Institutional Framework
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    Article I: Name, Identity and Institutional Character
                  </h3>
                </div>
              </div>

              {/* 1.1 Name */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#EF9332]">1.1</span> Name
                </h4>
                <p className="text-sm text-slate-300">
                  The institution shall be known as the <strong className="text-white">GKF Foundation</strong>, hereinafter referred to as &ldquo;the Foundation&rdquo;. Its full registered legal name shall be determined and adopted during registration.
                </p>
              </div>

              {/* 1.2 Institutional Character */}
              <div className="space-y-3 pt-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#EF9332]">1.2</span> Institutional Character
                </h4>
                <p className="text-xs text-slate-400 mb-2">The Foundation shall be:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {[
                    { label: 'a. Public Benefit', text: 'A nonprofit institution established for public benefit.' },
                    { label: 'b. Independence', text: 'Independent in its intellectual, administrative and institutional operations.' },
                    { label: 'c. Nonpartisan', text: 'Nonpartisan and independent of political party control.' },
                    { label: 'd. Academic Freedom', text: 'Committed to academic freedom, intellectual independence and freedom of inquiry.' },
                    { label: 'e. Inclusive', text: 'Inclusive of different cultures, disciplines, backgrounds and philosophical traditions.' },
                    { label: 'f. Sustainable Development', text: 'Dedicated to advancing knowledge, education, research, innovation and sustainable human development.' },
                    { label: 'g. Institutional Accountability', text: 'Accountable to its governing institutions, beneficiaries, partners and applicable laws.' },
                  ].map(item => (
                    <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                      <span className="text-[11px] font-bold text-[#FFC801] uppercase tracking-wider block mb-1">
                        {item.label}
                      </span>
                      <span className="text-slate-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1.3 Geographical Orientation */}
              <div className="space-y-2 pt-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#EF9332]">1.3</span> Geographical Orientation
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Foundation shall be headquartered in Kenya and shall pursue its mandate throughout Kenya and other African countries. It may establish partnerships, research collaborations, institutional relationships and international programmes with organizations and individuals across the world.
                </p>
              </div>

              {/* 1.4 Institutional Independence */}
              <div className="space-y-2 pt-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#EF9332]">1.4</span> Institutional Independence
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Foundation shall maintain independence from political, religious, commercial and ideological interests that seek to compromise its founding philosophy or public-benefit objectives. It shall not discriminate on the basis of ethnicity, nationality, gender, religion, disability, social background or political affiliation.
                </p>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────── */}
          {/* ARTICLE II: THE FOUNDATIONAL PHILOSOPHY                     */}
          {/* ─────────────────────────────────────────────────────────── */}
          {(activeSection === 'all' || activeSection === 'article2') && (
            <div className="space-y-7 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  II
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                    Philosophical Cornerstone
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    Article II: The Foundational Philosophy
                  </h3>
                </div>
              </div>

              {/* 2.1 The Central Philosophical Conviction */}
              <div className="bg-[#114C5A]/40 border border-[#114C5A] rounded-3xl p-6 sm:p-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFC801]">
                  2.1 The Central Philosophical Conviction
                </span>
                <blockquote className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  &ldquo;Knowledge is the foundation of progress, wisdom is the expression of understanding, and service to humanity is the highest application of both.&rdquo;
                </blockquote>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Foundation recognizes that human progress is not measured exclusively by economic growth, technological advancement or material prosperity, but also by the intellectual, ethical, cultural and social development of individuals and communities.
                </p>
              </div>

              {/* 2.2 Knowledge as a Universal Inheritance */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#EF9332]">2.2</span> Knowledge as a Universal Inheritance
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Foundation recognizes that knowledge has been accumulated through the contributions of different civilizations and generations. It shall therefore promote the study, preservation, exchange and advancement of knowledge without unjustified cultural or geographical limitations. It shall recognize the value of:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  {[
                    'Scientific and technological knowledge.',
                    'Philosophical and intellectual traditions.',
                    'Indigenous and traditional knowledge systems.',
                    'Historical and cultural knowledge.',
                    'Practical, experiential and professional knowledge.',
                    'Artistic, creative and literary expression.',
                  ].map((field, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#EF9332] shrink-0 mt-0.5" />
                      <span className="text-slate-200">{field}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic pt-1">
                  No legitimate field of knowledge shall be dismissed merely because of its geographical, cultural or historical origin.
                </p>
              </div>

              {/* 2.3 The African Philosophical Foundation */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#EF9332]">2.3</span> The African Philosophical Foundation
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Foundation shall draw particular inspiration from African intellectual traditions, including <strong className="text-white">Ubuntu</strong>, <strong className="text-white">Sankofa</strong> and other philosophical systems that emphasize human interconnectedness, collective responsibility, historical consciousness and intergenerational learning.
                </p>
                <p className="text-sm text-[#FFC801] font-medium leading-relaxed">
                  It shall promote the understanding that African societies must become active producers, custodians and contributors of knowledge rather than remain primarily consumers of knowledge generated elsewhere.
                </p>
              </div>

              {/* 2.4 Knowledge and Ethical Responsibility */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#EF9332]">2.4</span> Knowledge and Ethical Responsibility
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Foundation recognizes that knowledge and technological capabilities can be used constructively or destructively. It shall therefore promote the responsible application of knowledge, guided by human dignity, integrity, justice, environmental responsibility and the common good.
                </p>
              </div>

              {/* 2.5 Intellectual Freedom */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#EF9332]">2.5</span> Intellectual Freedom
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Foundation shall encourage questioning, debate, experimentation, critical examination and the peaceful exchange of ideas. It shall not impose a single philosophical, religious, political or scientific worldview as a condition for intellectual participation. Claims shall be open to examination and evaluated according to appropriate evidence, reasoning and disciplinary standards.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
