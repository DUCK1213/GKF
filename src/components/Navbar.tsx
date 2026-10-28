'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GKFLogo from '@/components/GKFLogo';
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Calendar,
  GraduationCap,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  return (
    <>
      {/* Main Clean White Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <GKFLogo variant="light" size="md" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2 text-sm font-medium">
              <Link
                href="/"
                className={`transition px-3.5 py-1.5 rounded-full ${
                  pathname === '/'
                    ? 'bg-[#D6E2DD] text-[#172B36] font-semibold'
                    : 'text-[#172B36]/75 hover:text-[#172B36]'
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`transition px-3.5 py-1.5 rounded-full ${
                  pathname === '/about'
                    ? 'bg-[#D6E2DD] text-[#172B36] font-semibold'
                    : 'text-[#172B36]/75 hover:text-[#172B36]'
                }`}
              >
                About
              </Link>

              {/* Programs */}
              <div className="relative group">
                <Link
                  href="/programs"
                  onMouseEnter={() => setProgramsDropdownOpen(true)}
                  className={`inline-flex items-center gap-1 transition px-3.5 py-1.5 rounded-full ${
                    pathname.startsWith('/programs') || pathname.startsWith('/sunday-ledger') || pathname.startsWith('/experiential-events')
                      ? 'bg-[#D6E2DD] text-[#172B36] font-semibold'
                      : 'text-[#172B36]/75 hover:text-[#172B36]'
                  }`}
                >
                  <span>Programs</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#172B36]" />
                </Link>

                {programsDropdownOpen && (
                  <div
                    onMouseLeave={() => setProgramsDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 text-xs"
                  >
                    <Link
                      href="/programs"
                      onClick={() => setProgramsDropdownOpen(false)}
                      className="p-3 rounded-xl hover:bg-slate-50 flex items-start gap-2.5 transition"
                    >
                      <div className="p-1.5 rounded-lg bg-[#EF9332]/10 text-[#EF9332] mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#172B36]">Overview & Philosophy</div>
                        <div className="text-[11px] text-slate-500">In-School Hubs & Sunday Rhythm</div>
                      </div>
                    </Link>

                    <Link
                      href="/sunday-ledger"
                      onClick={() => setProgramsDropdownOpen(false)}
                      className="p-3 rounded-xl hover:bg-slate-50 flex items-start gap-2.5 transition"
                    >
                      <div className="p-1.5 rounded-lg bg-[#FF9932]/10 text-[#FF9932] mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#172B36]">Sunday Mentorship Ledger</div>
                        <div className="text-[11px] text-slate-500">4-Hour Rhythm & Offline Tracking</div>
                      </div>
                    </Link>

                    <Link
                      href="/experiential-events"
                      onClick={() => setProgramsDropdownOpen(false)}
                      className="p-3 rounded-xl hover:bg-slate-50 flex items-start gap-2.5 transition"
                    >
                      <div className="p-1.5 rounded-lg bg-[#114C5A]/10 text-[#114C5A] mt-0.5">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#172B36]">Experiential Events</div>
                        <div className="text-[11px] text-slate-500">Retreats, Field Tours & Mixers</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/me-analytics"
                className={`transition px-3.5 py-1.5 rounded-full ${
                  pathname === '/me-analytics'
                    ? 'bg-[#D6E2DD] text-[#172B36] font-semibold'
                    : 'text-[#172B36]/75 hover:text-[#172B36]'
                }`}
              >
                Impact
              </Link>

              <Link
                href="/hubs-safeguarding"
                className={`transition px-3.5 py-1.5 rounded-full ${
                  pathname === '/hubs-safeguarding'
                    ? 'bg-[#D6E2DD] text-[#172B36] font-semibold'
                    : 'text-[#172B36]/75 hover:text-[#172B36]'
                }`}
              >
                Get Involved
              </Link>
            </nav>

            {/* Right Action: Pill Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setMissionModalOpen(true)}
                className="bg-[#172B36] hover:bg-[#114C5A] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                Join the mission
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMissionModalOpen(true)}
                className="bg-[#172B36] text-white px-3 py-1.5 rounded-full font-bold text-xs"
              >
                Join
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-black rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-[#172B36]"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-[#172B36]"
            >
              About
            </Link>
            <Link
              href="/programs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-[#172B36]"
            >
              Programs
            </Link>
            <Link
              href="/sunday-ledger"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-[#172B36] pl-4 text-sm"
            >
              Sunday Mentorship Ledger
            </Link>
            <Link
              href="/experiential-events"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-[#172B36] pl-4 text-sm"
            >
              Experiential Events
            </Link>
            <Link
              href="/me-analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-[#172B36]"
            >
              Impact
            </Link>
            <Link
              href="/hubs-safeguarding"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-[#172B36]"
            >
              Get Involved
            </Link>
          </div>
        )}
      </header>

      {/* Join the Mission Modal */}
      {missionModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#172B36]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF9932]">
                  Join Geoffrey Karema Foundation
                </span>
                <h3 className="font-extrabold text-xl text-[#172B36] mt-0.5">
                  How would you like to participate?
                </h3>
              </div>
              <button
                onClick={() => setMissionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <Link
                href="/hubs-safeguarding"
                onClick={() => setMissionModalOpen(false)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#FF9932] hover:bg-amber-50/30 transition flex items-start gap-3.5 block"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF9932] text-[#172B36] flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#172B36]">Join as an Adult Mentor</h4>
                  <p className="text-slate-600 mt-1">
                    Commit 4 hours on Sundays at one of our partner school hubs. Undergo DCI background checks and safeguarding training.
                  </p>
                </div>
              </Link>

              <Link
                href="/hubs-safeguarding"
                onClick={() => setMissionModalOpen(false)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#FF9932] hover:bg-amber-50/30 transition flex items-start gap-3.5 block"
              >
                <div className="w-8 h-8 rounded-full bg-[#114C5A] text-white flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#172B36]">Partner Your School with Us</h4>
                  <p className="text-slate-600 mt-1">
                    Establish an in-school mentorship hub under formal MOU. Provide classrooms for Sunday sessions with zero transport barriers.
                  </p>
                </div>
              </Link>

              <Link
                href="/endowment-fund"
                onClick={() => setMissionModalOpen(false)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#FF9932] hover:bg-amber-50/30 transition flex items-start gap-3.5 block"
              >
                <div className="w-8 h-8 rounded-full bg-[#172B36] text-[#FFC801] flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#172B36]">Contribute to the Endowment Fund</h4>
                  <p className="text-slate-600 mt-1">
                    Support perpetual university scholarships and vocational grants for graduating mentees in Murang&apos;a County.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
