'use client';

import React from 'react';
import { GKF_PILLARS, GKFPillar } from '@/data/pillars';
import {
  BookOpen,
  Compass,
  Sparkles,
  Lightbulb,
  Heart,
  Shield,
  Scale,
} from 'lucide-react';

const ICON_MAP = {
  BookOpen,
  Compass,
  Sparkles,
  Lightbulb,
  Heart,
  Shield,
  Scale,
};

interface Props {
  variant?: 'light' | 'white';
  showSubtitle?: boolean;
}

export default function GKFPillarsSection({ variant = 'white', showSubtitle = true }: Props) {
  const bgClass = variant === 'white' ? 'bg-white' : 'bg-[#EBF2EE]';

  return (
    <section className={`${bgClass} py-16 sm:py-24 border-b border-slate-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span
            className="text-[12px] font-bold tracking-[0.2em] text-[#EF9332] uppercase mb-3 block"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            OUR FOUNDING PRINCIPLES
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#172B36] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            The 7 Pillars of GKF
          </h2>
          {showSubtitle && (
            <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
              Every mentorship session, curriculum module, and community endowment decision at the Geoffrey Karema Foundation is anchored in these seven enduring tenets.
            </p>
          )}
        </div>

        {/* 7 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {GKF_PILLARS.map((pillar, index) => {
            const Icon = ICON_MAP[pillar.iconName] || Sparkles;
            const isLast = index === GKF_PILLARS.length - 1;

            return (
              <div
                key={pillar.id}
                className={`group bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/70 hover:border-[#EF9332]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isLast ? 'md:col-span-2 lg:col-span-3 lg:max-w-2xl lg:mx-auto' : ''
                }`}
              >
                {/* Top Colored Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-opacity"
                  style={{ backgroundColor: pillar.color }}
                />

                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-xs font-black tracking-widest text-slate-400 group-hover:text-[#EF9332] transition-colors"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      {pillar.number}
                    </span>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: pillar.bgLight, color: pillar.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    className="text-xl font-extrabold text-[#172B36] mb-2"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-bold text-[#EF9332] mb-3 leading-snug">
                    {pillar.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-[#172B36] transition-colors">
                  <span>Pillar {pillar.number} of 07</span>
                  <span className="text-[#EF9332] opacity-0 group-hover:opacity-100 transition-opacity">
                    GKF Principle →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
