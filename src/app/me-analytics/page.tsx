'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ME_SCALE_BENCHMARKS,
  COHORT_M_AND_E_TRENDS,
  SECTOR_DISTRIBUTION,
  INITIAL_STUDENTS,
  INITIAL_HUBS,
} from '@/data/mockData';
import { RESEARCH_PAPERS, ResearchPaper } from '@/data/researchPapers';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Download,
  FileText,
  CheckCircle2,
  TrendingUp,
  X,
  ExternalLink,
  ChevronRight,
  Eye,
  Filter,
} from 'lucide-react';

export default function ImpactPage() {
  // Gallery category filter
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'hubs' | 'community' | 'wellbeing' | 'retreats'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    title: string;
    category: string;
    categoryLabel: string;
    caption: string;
    location: string;
  } | null>(null);

  // Research Brief Download Modal
  const [downloadModalPaper, setDownloadModalPaper] = useState<ResearchPaper | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadOrg, setLeadOrg] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Photo gallery items
  const galleryItems = [
    {
      id: 'photo-1',
      src: '/images/student-writing.png',
      title: 'Hour 2: Goal Authoring in Form 3',
      category: 'hubs' as const,
      categoryLabel: 'Sunday Hubs',
      caption: 'A mentee at Murang\'a High Hub writes her 3-year academic and career roadmap into her personal logotherapy journal.',
      location: 'Murang\'a High School Hub',
    },
    {
      id: 'photo-2',
      src: '/images/community-workshop.png',
      title: 'Community & Guardian Alignment',
      category: 'community' as const,
      categoryLabel: 'Community & Parents',
      caption: 'Parents and community elders gathering for a parallel Saturday workshop on constructive parenting and countering dogmatic misinformation.',
      location: 'Kigumo Sub-County Center',
    },
    {
      id: 'photo-3',
      src: '/images/bg-care-portrait.jpg',
      title: 'Psychological Resilience & Healing',
      category: 'wellbeing' as const,
      categoryLabel: 'Mental Wellbeing',
      caption: 'Emotional regulation and self-compassion frameworks helping youth navigate domestic trauma, parental alcoholism, and household stress.',
      location: 'Kangema Girls Hub',
    },
    {
      id: 'photo-4',
      src: '/images/bg-interlocked-hands.jpg',
      title: 'Solidarity & Peer Accountability',
      category: 'hubs' as const,
      categoryLabel: 'Sunday Hubs',
      caption: 'Four secondary school mentees concluding their Hour 4 one-on-one session with a shared pledge of mutual support.',
      location: 'Ihura Secondary Hub',
    },
    {
      id: 'photo-5',
      src: '/images/hero-classroom.png',
      title: 'Hour 1: Group Empowerment Assembly',
      category: 'hubs' as const,
      categoryLabel: 'Sunday Hubs',
      caption: 'Over 80 students gathered in the central hall for the Sunday morning CBT resilience check-in and group reflection.',
      location: 'Maragua Ridge Hub',
    },
    {
      id: 'photo-6',
      src: '/images/bg-sunrise-mountain.jpg',
      title: 'Aberdares Leadership Expedition',
      category: 'retreats' as const,
      categoryLabel: 'Retreats & Expeditions',
      caption: 'Dawn campfire reflection during the quarterly teambuilding retreat, building peer trust and emotional grit in nature.',
      location: 'Aberdare Outdoor Center',
    },
    {
      id: 'photo-7',
      src: '/images/bg-misty-lamp-path.jpg',
      title: 'Guided Mentorship Pathways',
      category: 'wellbeing' as const,
      categoryLabel: 'Mental Wellbeing',
      caption: 'Illuminating life directions for at-risk youth who previously lacked adult guidance or long-term horizons.',
      location: 'Murang\'a County Network',
    },
    {
      id: 'photo-8',
      src: '/images/bg-highway-lights.jpg',
      title: 'A Map for the Future',
      category: 'retreats' as const,
      categoryLabel: 'Retreats & Expeditions',
      caption: 'Connecting graduating Form 4 cohorts with university scholarships, technical apprenticeships, and vocational endowments.',
      location: 'Nairobi Exposure Tour',
    },
  ];

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === galleryFilter);

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadModalPaper) return;
    setDownloadSuccess(true);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([downloadModalPaper.fullTextMarkdown], { type: 'text/markdown' });
      element.href = URL.createObjectURL(file);
      element.download = `${downloadModalPaper.id}.md`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadModalPaper(null);
      setDownloadSuccess(false);
      setLeadName('');
      setLeadOrg('');
      setLeadEmail('');
    }, 1200);
  };

  return (
    <div className="bg-white min-h-screen text-[#172B36]">

      {/* ── SECTION 1: HERO (SCREENSHOT 1) ── */}
      <section className="bg-[#172B36] text-white pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span
              className="text-[12px] font-bold tracking-[0.2em] text-[#EF9332] uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              IMPACT &amp; MONITORING
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.12] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              We measure what we claim — and publish it.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Every GKF cohort is tracked with validated scales on self-efficacy, resilience and goal clarity. Baseline and end-line results flow into this dashboard for partners, donors and grant officers.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 4-COLUMN METRICS BAR (SCREENSHOT 1) ── */}
      <section className="bg-white py-12 sm:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Metric 1 */}
            <div>
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172B36] tracking-tight"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                1,200+
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                students enrolled
              </p>
            </div>

            {/* Metric 2 */}
            <div>
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172B36] tracking-tight"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                15+
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                partner school hubs
              </p>
            </div>

            {/* Metric 3 */}
            <div>
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172B36] tracking-tight"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                94%
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                goal retention rate
              </p>
            </div>

            {/* Metric 4 */}
            <div>
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172B36] tracking-tight"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                4 hrs
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                of structured mentorship, every Sunday
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: M&E DASHBOARD (BASELINE VS. END-LINE) (SCREENSHOT 1) ── */}
      <section className="bg-[#EBF2EE] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span
              className="text-[12px] font-semibold tracking-[0.2em] text-[#172B36]/70 uppercase mb-3 block"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              M&amp;E DASHBOARD
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#172B36] mb-3"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Baseline vs. end-line outcomes
            </h2>
            <p className="text-sm sm:text-base text-[#172B36]/75 max-w-2xl leading-relaxed">
              Aggregated scores from the most recent evaluated cohort, measured at intake and at program completion with internationally validated instruments.
            </p>
          </div>

          {/* 3 Outcome Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Card 1: Self-efficacy */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/50 flex items-center justify-between">
              <div>
                <h3
                  className="font-bold text-lg text-[#172B36]"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Self-efficacy
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  General Self-Efficacy Scale
                </p>
              </div>
              <div
                className="text-2xl sm:text-3xl font-black text-[#EF9332]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                +23
              </div>
            </div>

            {/* Card 2: Resilience */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/50 flex items-center justify-between">
              <div>
                <h3
                  className="font-bold text-lg text-[#172B36]"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Resilience
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Brief Resilience Scale
                </p>
              </div>
              <div
                className="text-2xl sm:text-3xl font-black text-[#EF9332]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                +25
              </div>
            </div>

            {/* Card 3: Goal clarity */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/50 flex items-center justify-between">
              <div>
                <h3
                  className="font-bold text-lg text-[#172B36]"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Goal clarity
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Goal Clarity Index
                </p>
              </div>
              <div
                className="text-2xl sm:text-3xl font-black text-[#EF9332]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                +37
              </div>
            </div>
          </div>

          {/* Interactive Visualizer Card: Baseline vs. Endline Breakdown */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-sm border border-slate-200/50 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold text-[#172B36]"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Psychometric Score Comparisons (% Score)
                </h3>
                <p className="text-xs text-slate-500">
                  Pre-intervention intake baseline versus post-intervention graduation assessment
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-slate-300" />
                  <span className="text-slate-600">Baseline</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#EF9332]" />
                  <span className="text-[#172B36]">Endline</span>
                </div>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ME_SCALE_BENCHMARKS}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="metric"
                    tick={{ fontSize: 12, fill: '#475569' }}
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: '#64748B' }}
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#172B36',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      border: 'none',
                    }}
                    formatter={(val: any) => [`${val}%`, 'Score']}
                  />
                  <Bar dataKey="baseline" fill="#94A3B8" radius={[4, 4, 0, 0]} name="Baseline" />
                  <Bar dataKey="endline" fill="#EF9332" radius={[4, 4, 0, 0]} name="Endline" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
              <div>
                <strong className="text-[#172B36] block mb-0.5">Self-Efficacy (+23%)</strong>
                Students report elevated confidence in organizing personal effort and facing academic obstacles without quitting.
              </div>
              <div>
                <strong className="text-[#172B36] block mb-0.5">Resilience (+25%)</strong>
                CBT tools provide emotional equilibrium when confronting family stressors, alcoholism at home, or peer pressure.
              </div>
              <div>
                <strong className="text-[#172B36] block mb-0.5">Goal Clarity (+37%)</strong>
                Frankl&apos;s logotherapy exercises provide concrete 3-year roadmaps across education, agriculture, and vocational skills.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FIELD STORIES & PHOTO GALLERY (NEW ADDITION) ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span
                className="text-[12px] font-semibold tracking-[0.2em] text-[#172B36]/70 uppercase mb-3 block"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                FIELD STORIES &amp; PHOTO GALLERY
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#172B36]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Moments of transformation across our hubs
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2 leading-relaxed">
                Real youth, dedicated mentors, and engaged communities in Murang&apos;a County — captured across Sunday sessions, home visits, and teambuilding retreats.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'hubs', label: 'Sunday Hubs' },
                { id: 'community', label: 'Community & Parents' },
                { id: 'wellbeing', label: 'Mental Wellbeing' },
                { id: 'retreats', label: 'Retreats & Expeditions' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setGalleryFilter(f.id as any)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition ${
                    galleryFilter === f.id
                      ? 'bg-[#172B36] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer bg-[#FBFAF4] rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#172B36]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.categoryLabel}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      className="font-bold text-sm text-[#172B36] group-hover:text-[#EF9332] transition-colors"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span>{item.location}</span>
                    <span className="text-[#EF9332] font-semibold group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: RESEARCH BRIEFS & WHITEPAPERS (SCREENSHOT 2) ── */}
      <section className="bg-[#EBF2EE] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span
              className="text-[12px] font-semibold tracking-[0.2em] text-[#172B36]/70 uppercase mb-3 block"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              FOR EDUCATIONAL PARTNERS
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#172B36] mb-2"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Research briefs &amp; whitepapers
            </h2>
            <p className="text-sm sm:text-base text-[#172B36]/75 max-w-2xl leading-relaxed">
              Written by GKF program leads for school administrators, funders and education researchers. Free to download and share.
            </p>
          </div>

          {/* Two White Download Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brief 1 */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-sm border border-slate-200/50 flex flex-col justify-between">
              <div>
                <span
                  className="text-[11px] font-bold tracking-wider text-[#EF9332] uppercase mb-2 block"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  PDF · FREE DOWNLOAD
                </span>
                <h3
                  className="font-bold text-lg sm:text-xl text-[#172B36] mb-2"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Resilience &amp; self-efficacy outcomes in school-based Sunday mentorship
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Research Brief No. 1 · Pilot cohort evaluation · 8 pages
                </p>
              </div>

              <div>
                <button
                  onClick={() => setDownloadModalPaper(RESEARCH_PAPERS[1] || RESEARCH_PAPERS[0])}
                  className="inline-block bg-[#EF9332] hover:bg-[#e08527] text-white px-6 py-2.5 rounded-full font-medium text-xs transition shadow-sm"
                >
                  Download brief
                </button>
              </div>
            </div>

            {/* Brief 2 */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-sm border border-slate-200/50 flex flex-col justify-between">
              <div>
                <span
                  className="text-[11px] font-bold tracking-wider text-[#EF9332] uppercase mb-2 block"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  PDF · FREE DOWNLOAD
                </span>
                <h3
                  className="font-bold text-lg sm:text-xl text-[#172B36] mb-2"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Self-authoring as a goal-clarity intervention for marginalized youth
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Research Brief No. 2 · Curriculum methods paper · 6 pages
                </p>
              </div>

              <div>
                <button
                  onClick={() => setDownloadModalPaper(RESEARCH_PAPERS[0])}
                  className="inline-block bg-[#EF9332] hover:bg-[#e08527] text-white px-6 py-2.5 rounded-full font-medium text-xs transition shadow-sm"
                >
                  Download brief
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CALLOUT "PARTNER WITH AN EVIDENCE-BASED PROGRAM" (SCREENSHOT 2) ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#172B36] mb-2"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Partner with an evidence-based program
              </h2>
              <p className="text-[#172B36]/70 text-sm sm:text-base max-w-xl leading-relaxed">
                Funders and schools: request the full M&amp;E dataset, visit a Sunday session, or start a conversation about hosting a hub.
              </p>
            </div>

            <div>
              <Link
                href="/hubs-safeguarding"
                className="inline-block bg-[#EF9332] hover:bg-[#e08527] text-white px-7 py-3 rounded-full font-medium text-sm transition shadow-sm whitespace-nowrap"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL FOR GALLERY PHOTO ── */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-[#172B36]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-4">
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-[#172B36]/80 hover:bg-[#172B36] text-white p-2 rounded-full transition shadow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#EF9332] uppercase tracking-wider">
                  {selectedPhoto.categoryLabel}
                </span>
                <span className="text-xs text-slate-400">
                  {selectedPhoto.location}
                </span>
              </div>
              <h3
                className="text-xl font-bold text-[#172B36]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: DOWNLOAD RESEARCH BRIEF ── */}
      {downloadModalPaper && (
        <div className="fixed inset-0 z-50 bg-[#172B36]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EF9332]">
                  GKF Research Hub
                </span>
                <h3 className="font-extrabold text-base text-[#172B36] mt-0.5">
                  Download Research Brief
                </h3>
              </div>
              <button
                onClick={() => setDownloadModalPaper(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FBFAF4] p-4 rounded-2xl border border-[#D9E8E2] space-y-1">
              <div className="font-bold text-xs text-[#172B36]">
                {downloadModalPaper.title}
              </div>
              <div className="text-[11px] text-slate-500">
                {downloadModalPaper.authors} · {downloadModalPaper.publishDate}
              </div>
            </div>

            {downloadSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Download Started!</div>
                <div className="text-xs text-slate-600">
                  Thank you for reviewing our evidence-based research.
                </div>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Dr. Catherine Wangari"
                    className="w-full bg-[#FBFAF4] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#EF9332]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Institution / School / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={leadOrg}
                    onChange={(e) => setLeadOrg(e.target.value)}
                    placeholder="e.g. Ministry of Education / Rotary Club"
                    className="w-full bg-[#FBFAF4] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#EF9332]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="catherine@partner.org"
                    className="w-full bg-[#FBFAF4] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#EF9332]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#EF9332] hover:bg-[#e08527] text-white py-3 rounded-full font-bold text-xs shadow-md transition"
                  >
                    Download Research PDF
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
