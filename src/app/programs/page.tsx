'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProgramsPage() {
  const hubFeatures = [
    {
      title: 'Formal school MOUs',
      desc: 'We establish memoranda of understanding with partner schools so students learn on safe, trusted ground — no travel, no new environment, no barrier to showing up.',
    },
    {
      title: 'Counselor & teacher collaboration',
      desc: 'We work closely with school counselors to identify students who lack guidance — without stigmatizing them — and refer them gently into the Sunday sessions.',
    },
    {
      title: 'Safe & accountable',
      desc: 'Every mentor passes a background check and child-protection training. Session logs, check-in/check-out and safeguarding check-ins are recorded at every event.',
    },
  ];

  const sundayStructure = [
    {
      n: '1',
      text: 'Group empowerment & reflection — assembly, peer discussion, CBT resilience check-ins.',
    },
    {
      n: '2',
      text: 'Self-authoring & goal setting — life goals, career guidance, academic action plans.',
    },
    {
      n: '3',
      text: 'Skills workshop — financial literacy, life skills, substance-abuse awareness, critical thinking.',
    },
    {
      n: '4',
      text: '1-on-1 mentoring — personalized coaching, progress logging, safeguarding check-ins.',
    },
  ];

  return (
    <div className="bg-white min-h-screen text-[#172B36]">

      {/* ── SECTION 1: HERO ── */}
      <section className="bg-[#EBF2EE] pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span
              className="text-[12px] font-semibold tracking-[0.2em] text-[#172B36]/70 uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              OUR PROGRAMS
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#172B36] leading-[1.12] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Built inside schools. Carried by the community.
            </h1>
            <p className="text-base sm:text-lg text-[#172B36]/75 leading-relaxed max-w-3xl">
              Operating directly within schools gives us safe, trusted access to at-risk youth — while community workshops extend that same guidance to parents and guardians.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: IN-SCHOOL MENTORSHIP HUBS + THE SUNDAY STRUCTURE ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left: Hub Features */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#172B36] mb-4"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  In-school mentorship hubs
                </h2>
                <p className="text-[#172B36]/75 text-sm sm:text-base leading-relaxed">
                  Each partner school hosts a weekly four-hour Sunday mentorship session with a fixed rhythm: group empowerment, self-authoring and goal setting, a skills and critical-thinking workshop, and dedicated one-on-one mentoring.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {hubFeatures.map(({ title, desc }) => (
                  <div
                    key={title}
                    className="border-l-2 border-[#172B36]/30 pl-4 py-0.5 space-y-1"
                  >
                    <h3
                      className="font-bold text-[#172B36] text-sm sm:text-base"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      {title}
                    </h3>
                    <p className="text-[#172B36]/75 text-xs sm:text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: The Sunday Structure Dark Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#172B36] rounded-3xl p-7 sm:p-9 text-white shadow-lg space-y-6">
                <span
                  className="text-[11px] font-bold tracking-[0.2em] text-[#EF9332] uppercase block"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  THE SUNDAY STRUCTURE
                </span>

                <div className="space-y-5">
                  {sundayStructure.map(({ n, text }) => (
                    <div key={n} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-[#EF9332] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        {n}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: BEYOND THE CLASSROOM / COMMUNITY ENGAGEMENT ── */}
      <section className="bg-[#EBF2EE] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Community Workshop Photo */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
                <Image
                  src="/images/community-workshop.png"
                  alt="Community engagement workshop with parents and guardians"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>

            {/* Right: Community features */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span
                  className="text-[12px] font-semibold tracking-[0.2em] text-[#172B36]/70 uppercase mb-3 block"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  BEYOND THE CLASSROOM
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#172B36]"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Community engagement
                </h2>
              </div>

              {/* Block 1 */}
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold text-[#172B36] mb-2"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Parent &amp; guardian workshops
                </h3>
                <p className="text-[#172B36]/75 text-sm sm:text-base leading-relaxed">
                  Periodic parallel workshops for parents focus on constructive parenting, substance-abuse awareness, and critical thinking to counter dogmatic misinformation — so change at school is reinforced at home.
                </p>
              </div>

              {/* Block 2 */}
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold text-[#172B36] mb-2"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Institutional funding partnerships
                </h3>
                <p className="text-[#172B36]/75 text-sm sm:text-base leading-relaxed">
                  We secure local development funds, philanthropic grants and corporate sponsorships to subsidize program costs for marginalized students — so no child is ever turned away for money.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: BRING THE PROGRAM TO YOUR SCHOOL ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#172B36] mb-2"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Bring the program to your school
              </h2>
              <p className="text-[#172B36]/70 text-sm sm:text-base max-w-xl leading-relaxed">
                We&apos;re welcoming new partner schools, funders and corporate sponsors for the pilot phase.
              </p>
            </div>

            <div>
              <Link
                href="/hubs-safeguarding"
                className="inline-block bg-[#172B36] hover:bg-[#114C5A] text-white px-7 py-3 rounded-full font-medium text-sm transition shadow-sm whitespace-nowrap"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
