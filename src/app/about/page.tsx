'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-[#172B36]">

      {/* ── SECTION 1: OUR APPROACH HERO ── */}
      <section className="bg-[#EBF2EE] pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span
              className="text-[12px] font-semibold tracking-[0.2em] text-[#172B36]/70 uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              OUR APPROACH
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#172B36] leading-[1.12] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              We don&apos;t fill young people with advice. We help them write their own path.
            </h1>
            <p className="text-base sm:text-lg text-[#172B36]/75 leading-relaxed max-w-3xl">
              The foundation exists to address the root causes of aimlessness, poverty and family dysfunction — with a psychological framework that treats each student as the author of their own future.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TWO-COLUMN PILLARS & PHOTO ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Resilience photo */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-md border border-[#D9E8E2] group">
                <Image
                  src="/images/about-resilience-sprout.jpg"
                  alt="A resilient green seedling emerging through rocky ground, symbolizing purpose, growth, and perseverance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172B36]/70 via-[#172B36]/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFC801] block mb-1">
                    Resilience &amp; Purpose
                  </span>
                  <p className="text-xs text-white/95 leading-snug drop-shadow-sm">
                    Growth takes root and thrives even in the most challenging terrain.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Three pillars */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-10">
              {/* Item 1 */}
              <div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#172B36] mb-3"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Meaning before anything else
                </h3>
                <p className="text-[#172B36]/75 text-sm sm:text-base leading-relaxed">
                  Following Viktor Frankl&apos;s logotherapy, we start where hopelessness starts: a young person who cannot see why effort matters. Guided self-authoring exercises help them define life goals, name their personal strengths, and write an actionable career or life path in their own words. Purpose is not lectured — it is authored.
                </p>
              </div>

              {/* Item 2 */}
              <div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#172B36] mb-3"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Resilience built with CBT
                </h3>
                <p className="text-[#172B36]/75 text-sm sm:text-base leading-relaxed">
                  Using Cognitive Behavioral Therapy principles, mentors help students confront limiting beliefs, navigate domestic stressors — like parental alcoholism or rigid misinformation at home — and develop the psychological resilience to persist through adversity.
                </p>
              </div>

              {/* Item 3 */}
              <div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#172B36] mb-3"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  The whole life, not just school
                </h3>
                <p className="text-[#172B36]/75 text-sm sm:text-base leading-relaxed">
                  Every student works on tailored goal-setting tracks spanning education, vocational skills, financial literacy and personal well-being, so progress in one area reinforces the others.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: MONITORING & EVALUATION ── */}
      <section className="bg-[#EBF2EE] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-10">
            <span
              className="text-[12px] font-semibold tracking-[0.2em] text-[#172B36]/70 uppercase mb-3 block"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              MONITORING &amp; EVALUATION
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#172B36]"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              We measure what we claim
            </h2>
          </div>

          {/* Two White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Card 1: What we count */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-sm border border-slate-200/50">
              <h3
                className="text-lg sm:text-xl font-bold text-[#172B36] mb-5"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                What we count
              </h3>
              <ul className="space-y-3.5 text-sm sm:text-base text-[#172B36]/80 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#172B36] font-bold text-lg leading-none mt-0.5">•</span>
                  <span>Sunday attendance and session completion</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#172B36] font-bold text-lg leading-none mt-0.5">•</span>
                  <span>Frequency and quality of mentor–mentee interactions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#172B36] font-bold text-lg leading-none mt-0.5">•</span>
                  <span>Goal completion rates on personal action plans</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#172B36] font-bold text-lg leading-none mt-0.5">•</span>
                  <span>Academic retention and vocational placement</span>
                </li>
              </ul>
            </div>

            {/* Card 2: What we listen for */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-sm border border-slate-200/50">
              <h3
                className="text-lg sm:text-xl font-bold text-[#172B36] mb-5"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                What we listen for
              </h3>
              <ul className="space-y-3.5 text-sm sm:text-base text-[#172B36]/80 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#172B36] font-bold text-lg leading-none mt-0.5">•</span>
                  <span>Changes in self-efficacy, measured with validated scales such as the General Self-Efficacy Scale at quarterly evaluations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#172B36] font-bold text-lg leading-none mt-0.5">•</span>
                  <span>Emotional resilience improvement through structured feedback surveys</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#172B36] font-bold text-lg leading-none mt-0.5">•</span>
                  <span>Mentor and student feedback that feeds directly into curriculum design</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Designed to keep improving dark container */}
          <div className="bg-[#172B36] rounded-3xl p-7 sm:p-10 text-white shadow-lg">
            <h3
              className="text-xl sm:text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Designed to keep improving
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mb-7 leading-relaxed">
              We apply human-centered design so administrators and mentors continuously refine the Sunday curriculum based on real feedback from students and mentors:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Step 1 */}
              <div className="bg-[#223E4C]/85 border border-white/5 rounded-2xl p-4 text-xs leading-relaxed text-slate-200 flex flex-col justify-between">
                <p>
                  <strong className="text-[#EF9332] font-bold">1 Empathize</strong> — listen to students and mentors
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#223E4C]/85 border border-white/5 rounded-2xl p-4 text-xs leading-relaxed text-slate-200 flex flex-col justify-between">
                <p>
                  <strong className="text-[#EF9332] font-bold">2 Define</strong> — name the real barrier
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#223E4C]/85 border border-white/5 rounded-2xl p-4 text-xs leading-relaxed text-slate-200 flex flex-col justify-between">
                <p>
                  <strong className="text-[#EF9332] font-bold">3 Ideate</strong> — generate options together
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[#223E4C]/85 border border-white/5 rounded-2xl p-4 text-xs leading-relaxed text-slate-200 flex flex-col justify-between">
                <p>
                  <strong className="text-[#EF9332] font-bold">4 Prototype</strong> — test changes in a session
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-[#223E4C]/85 border border-white/5 rounded-2xl p-4 text-xs leading-relaxed text-slate-200 flex flex-col justify-between">
                <p>
                  <strong className="text-[#EF9332] font-bold">5 Test</strong> — keep what measurably works
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: SEE THE PROGRAM IN ACTION ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#172B36] mb-2"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                See the program in action
              </h2>
              <p className="text-[#172B36]/70 text-sm sm:text-base max-w-xl leading-relaxed">
                Learn how the Sunday mentorship hubs, parent workshops and school partnerships work on the ground.
              </p>
            </div>

            <div>
              <Link
                href="/programs"
                className="inline-block bg-[#172B36] hover:bg-[#114C5A] text-white px-7 py-3 rounded-full font-medium text-sm transition shadow-sm whitespace-nowrap"
              >
                Explore programs
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
