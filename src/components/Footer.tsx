'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#172B36] text-slate-300 text-xs py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Foundation Name & Mission */}
          <div className="md:col-span-5 space-y-2">
            <h3
              className="text-base font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Geoffrey Karema Foundation
            </h3>
            <p className="text-slate-300/80 text-xs leading-relaxed max-w-sm">
              School-based Sunday mentorship that helps young people find purpose, build resilience, and break generational cycles of poverty.
            </p>
          </div>

          {/* Col 2: EXPLORE */}
          <div className="md:col-span-3 space-y-3">
            <h4
              className="text-[11px] font-bold uppercase tracking-widest text-slate-400"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              EXPLORE
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Our approach
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/hubs-safeguarding" className="hover:text-white transition">
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: WAYS TO HELP */}
          <div className="md:col-span-4 space-y-3">
            <h4
              className="text-[11px] font-bold uppercase tracking-widest text-slate-400"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              WAYS TO HELP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/hubs-safeguarding" className="hover:text-white transition">
                  Mentor a young person
                </Link>
              </li>
              <li>
                <Link href="/hubs-safeguarding" className="hover:text-white transition">
                  Partner your school with us
                </Link>
              </li>
              <li>
                <Link href="/endowment-fund" className="hover:text-white transition">
                  Fund a student cohort
                </Link>
              </li>
              <li>
                <Link href="/hubs-safeguarding" className="hover:text-white transition">
                  Volunteer your professional skills
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/hubs-safeguarding"
                className="inline-block bg-[#EF9332] hover:bg-[#e08527] text-white px-5 py-2.5 rounded-full font-medium text-xs transition shadow-sm"
              >
                Start a conversation
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-white/10 text-[11px] text-slate-400">
          <p>© 2026 Geoffrey Karema Foundation. Every young person deserves a map for their future.</p>
        </div>
      </div>
    </footer>
  );
}
