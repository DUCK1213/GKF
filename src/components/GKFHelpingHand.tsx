'use client';

import React from 'react';
import Image from 'next/image';

interface GKFHelpingHandProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withBadge?: boolean;
}

export default function GKFHelpingHand({
  size = 'md',
  className = '',
  withBadge = false,
}: GKFHelpingHandProps) {
  const sizeMap = {
    sm: 40,
    md: 64,
    lg: 96,
    xl: 140,
  };

  const dim = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      <Image
        src="/images/gkf-hand-tight.png"
        alt="GKF Supporting Helping Hand Symbol - Mentorship & Community Nurturing"
        width={dim}
        height={dim}
        className="object-contain hover:scale-105 transition-transform"
      />
      {withBadge && (
        <span className="sr-only">GKF Supporting Symbol</span>
      )}
    </div>
  );
}
