'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GKFLogo from '@/components/GKFLogo';
import GKFHelpingHand from '@/components/GKFHelpingHand';
import {
  Compass,
  Users,
  GraduationCap,
  Sprout,
  Target,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen text-[#172B36] selection:bg-[#FFC801]/30">

      {/* ── 1. HERO SECTION ──────────────────────────────────── */}
      <section
        className="relative bg-cover bg-center py-24 sm:py-32 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 61, 46, 0.88), rgba(23, 43, 54, 0.92)), url('/images/bg-highway-lights.jpg')`,
        }}
      >
        {/* Subtle geometric ripple graphic in hero background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
          <svg className="w-[1200px] h-[1200px]" viewBox="0 0 1000 1000" fill="none" stroke="currentColor">
            <circle cx="500" cy="500" r="100" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="500" cy="500" r="200" strokeWidth="1.5" />
            <circle cx="500" cy="500" r="320" strokeWidth="1" strokeDasharray="8 8" />
            <circle cx="500" cy="500" r="450" strokeWidth="2" />
            <circle cx="500" cy="500" r="580" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-6">
            {/* Logo & tagline pill */}
            <div className="inline-flex items-center gap-3 bg-[#0B3D2E]/90 border border-[#FFC600]/40 rounded-full px-4 py-2 backdrop-blur-md shadow-lg">
              <GKFLogo variant="dark" size="sm" />
              <div className="h-5 w-px bg-white/25" />
              <div className="flex items-center gap-1.5 text-[#FFC600] text-[11px] font-bold tracking-[0.16em] uppercase">
                <GKFHelpingHand size="sm" className="w-4 h-4 bg-white/10 rounded-full p-0.5" />
                <span>Building with Purpose</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
            >
              Lending a guiding hand where it matters most.
            </h1>

            {/* Sub-headline & mission statement with Lending Hand icon */}
            <div className="flex items-start gap-3.5 sm:gap-4 max-w-2xl">
              <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-2xl p-1.5 shadow-md flex items-center justify-center border border-white/20 mt-0.5">
                <Image
                  src="/images/gkf-lending-hand-clean.png"
                  alt="GKF Lending Hand Symbol"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                True change begins when a young person is given the tools, confidence, and backing to chart their own course. GKF creates a circle of support around youth, combining safe, school-based mentorship, parent and guardian workshops, and post-secondary scholarship pathways to help young people navigate life&apos;s turning points with clarity and hope.
              </p>
            </div>

            {/* Accent quote */}
            <div className="font-accent text-sm text-[#FFC600] font-medium pt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFC600]/80" />
              <span>&ldquo;Real People. Real Change. Lasting Impact.&rdquo;</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/hubs-safeguarding"
                className="bg-[#FFC801] hover:bg-[#e6b400] text-[#172B36] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
                style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
              >
                <span>Partner with us</span>
                <ArrowRight className="w-4 h-4 text-[#172B36]" />
              </Link>

              <Link
                href="/me-analytics"
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all"
                style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
              >
                Explore our impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. KEY IMPACT PILLARS (3 cards) ──────────────────── */}
      <section className="bg-white py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#172B36]/60">
                What we do
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#172B36] tracking-tight mt-2"
                style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
              >
                Three pillars of lasting change
              </h2>
            </div>
            <p className="text-sm text-[#172B36]/60 max-w-md">
              A comprehensive framework integrating individual purpose, domestic stability, and long-term economic mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Pillar 01 */}
            <div className="group bg-white rounded-2xl border border-[#D9E8E2] p-8 hover:border-[#EF9332]/60 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EF9332] to-[#FFC801]" />
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold text-[#EF9332] tracking-wider"
                    style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                  >
                    01
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#EF9332]/10 text-[#EF9332] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                </div>
                <h3
                  className="text-lg font-bold text-[#172B36] mt-4"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  Holistic Youth Guidance
                </h3>
                <p className="text-sm text-[#172B36]/65 leading-relaxed mt-3">
                  Helping young people discover their core values, set clear life goals, and build unshakeable self-efficacy.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#EF9332] group-hover:translate-x-1 transition-transform">
                <span>Purpose & self-authoring</span>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="group bg-white rounded-2xl border border-[#D9E8E2] p-8 hover:border-[#FFC801] hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC801] to-[#EF9332]" />
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold text-[#b38b00] tracking-wider"
                    style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                  >
                    02
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FFC801]/15 text-[#b38b00] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <h3
                  className="text-lg font-bold text-[#172B36] mt-4"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  Reinforced Homes & Communities
                </h3>
                <p className="text-sm text-[#172B36]/65 leading-relaxed mt-3">
                  Partnering with parents and guardians to build supportive environments that nurture growth beyond the classroom.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#b38b00] group-hover:translate-x-1 transition-transform">
                <span>Parent workshops & guardian support</span>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="group bg-white rounded-2xl border border-[#D9E8E2] p-8 hover:border-[#114C5A]/60 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#114C5A] to-[#0B3D2E]" />
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold text-[#114C5A] tracking-wider"
                    style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                  >
                    03
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#114C5A]/10 text-[#114C5A] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
                <h3
                  className="text-lg font-bold text-[#172B36] mt-4"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  Lifelong Educational Pathways
                </h3>
                <p className="text-sm text-[#172B36]/65 leading-relaxed mt-3">
                  Sponsoring higher education and vocational training to ensure financial barriers never halt ambition.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#114C5A] group-hover:translate-x-1 transition-transform">
                <span>Scholarships & vocational grants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. MISSION & VISION (WITH WATER RIPPLE CATALYST IMAGE) ──────────────── */}
      <section className="bg-[#EBF2EE] py-20 sm:py-24 relative overflow-hidden">
        {/* Subtle decorative background accent rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-[0.04]">
          <svg className="w-[800px] h-[800px]" viewBox="0 0 800 800" fill="none" stroke="#172B36">
            <circle cx="400" cy="400" r="150" strokeWidth="2" />
            <circle cx="400" cy="400" r="280" strokeWidth="1.5" />
            <circle cx="400" cy="400" r="390" strokeWidth="1" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#D9E8E2] shadow-sm">
            
            {/* Left: Mission & Vision Cards (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GKFLogo variant="light" size="sm" />
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172B36] tracking-tight"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  &ldquo;Together we create lasting change.&rdquo;
                </h2>
                <p className="text-sm text-[#172B36]/60">
                  Grounding every initiative in long-term accountability, sustainable growth, and genuine human connection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Mission Card */}
                <div className="bg-[#EBF2EE] p-5 sm:p-6 rounded-2xl border border-[#D9E8E2] space-y-2 hover:border-[#EF9332]/40 transition">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#EF9332]/15 text-[#EF9332] flex items-center justify-center">
                      <Sprout className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#EF9332] uppercase tracking-wider">
                      Our Mission
                    </span>
                  </div>
                  <p className="text-sm text-[#172B36]/75 leading-relaxed">
                    To empower communities through sustainable development, innovative leadership, and accessible education by deploying scalable, technology-enabled frameworks.
                  </p>
                </div>

                {/* Vision Card */}
                <div className="bg-[#EBF2EE] p-5 sm:p-6 rounded-2xl border border-[#D9E8E2] space-y-2 hover:border-[#114C5A]/40 transition">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#114C5A]/15 text-[#114C5A] flex items-center justify-center">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#114C5A] uppercase tracking-wider">
                      Our Vision
                    </span>
                  </div>
                  <p className="text-sm text-[#172B36]/75 leading-relaxed">
                    A globally connected, self-sustaining ecosystem where every individual has the opportunity, equity, and resources to thrive.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Ripple Effect Card with Water Ripple Image (lg:col-span-5) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-[#172B36] rounded-3xl p-4 sm:p-5 text-white shadow-xl border border-[#114C5A] space-y-4 group">
                <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src="/images/water-ripple.jpg"
                    alt="Water droplet causing expanding concentric ripples - symbolizing the catalytic impact of GKF mentorship"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172B36] via-[#172B36]/25 to-transparent" />
                  
                  {/* Floating badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#172B36] text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1.5 border border-white/40">
                    <span className="w-2 h-2 rounded-full bg-[#EF9332] animate-pulse" />
                    <span>The Ripple Effect</span>
                  </div>

                  {/* Caption on image */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <p className="text-xs font-semibold text-white drop-shadow-md leading-snug">
                      One intentional intervention ripples across families, classrooms, and generations.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FFC801]" />
                    <span
                      className="font-bold text-[#FFC801] uppercase tracking-wider text-[11px]"
                      style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                    >
                      Building with Purpose
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">
                    Community · Impact
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. A SUNDAY WITH US ──────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: heading + photo */}
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#172B36]/60">
                  A Sunday with us
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#172B36] tracking-tight mt-2"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  Four hours that change a trajectory
                </h2>
                <p className="text-sm text-[#172B36]/65 leading-relaxed mt-3 max-w-lg">
                  Every Sunday, partner schools open their grounds to our mentorship hubs. Each four-hour session follows the same trusted rhythm — community, self-authoring, skills, and personal attention.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-[#D9E8E2] bg-white max-w-md group">
                <Image
                  src="/images/student-writing.png"
                  alt="Student writing goals in mentorship notebook"
                  width={570}
                  height={380}
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              <div className="pt-2">
                <Link
                  href="/programs"
                  className="bg-[#172B36] hover:bg-[#114C5A] text-white px-7 py-3 rounded-full font-medium text-sm transition inline-flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  <span>See the full programme</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: 4-hour timeline */}
            <div className="space-y-8 relative pl-2 sm:pl-4">
              <div className="absolute left-[18px] sm:left-[26px] top-4 bottom-8 w-0.5 bg-gradient-to-b from-[#172B36] via-[#EF9332] to-[#D9E8E2]" />

              {[
                { hour: 1, title: 'Group empowerment & reflection', desc: 'General assembly, peer discussion and resilience check-ins addressing personal and domestic challenges.' },
                { hour: 2, title: 'Self-authoring & goal setting', desc: 'Structured work on individual life goals, career guidance and academic action plans.' },
                { hour: 3, title: 'Skills & critical thinking workshop', desc: 'Interactive modules on financial literacy, life skills, substance-abuse awareness and critical thinking.' },
                { hour: 4, title: '1-on-1 mentoring & support', desc: 'Dedicated one-on-one time between assigned mentors and mentees — personalised coaching and progress logging.' },
              ].map((step) => (
                <div key={step.hour} className="relative flex items-start gap-4 sm:gap-6 group">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#172B36] group-hover:bg-[#EF9332] text-white font-bold flex items-center justify-center text-xs flex-shrink-0 z-10 shadow-sm mt-0.5 transition-colors duration-300">
                    {step.hour}
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-[#172B36]/40">
                      Hour {step.hour}
                    </div>
                    <h3
                      className="text-sm sm:text-base font-bold text-[#172B36] group-hover:text-[#EF9332] transition-colors"
                      style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#172B36]/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA BANNER ────────────────────────────────────── */}
      <section
        className="relative bg-cover bg-center text-white py-16 sm:py-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 61, 46, 0.90), rgba(17, 76, 90, 0.92)), url('/images/bg-interlocked-hands.jpg')`,
        }}
      >
        {/* Subtle decorative concentric ripples */}
        <div className="absolute right-10 -bottom-10 pointer-events-none opacity-[0.08]">
          <svg className="w-80 h-80" viewBox="0 0 400 400" fill="none" stroke="currentColor">
            <circle cx="200" cy="200" r="50" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="100" strokeWidth="2" />
            <circle cx="200" cy="200" r="160" strokeWidth="1" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/20 shadow-md flex-shrink-0 backdrop-blur-sm">
                <GKFHelpingHand size="lg" />
              </div>
              <div className="space-y-1.5 max-w-xl">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  Give one Sunday. Change one story.
                </h2>
                <p className="text-sm sm:text-base text-slate-300">
                  Whether you mentor, host, fund or build — there is a place for you in this work.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/hubs-safeguarding"
                className="bg-[#FFC801] hover:bg-[#e6b400] text-[#172B36] font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
                style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
              >
                <span>Get involved</span>
                <ArrowRight className="w-4 h-4 text-[#172B36]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
