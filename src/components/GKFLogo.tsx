'use client';

import React from 'react';
import Image from 'next/image';

interface GKFLogoProps {
  variant?: 'light' | 'dark' | 'emblem';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export default function GKFLogo({
  variant = 'light',
  size = 'md',
  className = '',
}: GKFLogoProps) {
  // Dimensions for full logo: aspect ratio ~ 944 / 368 = 2.56
  const dimensions = {
    sm: { width: 110, height: 43 },
    md: { width: 145, height: 57 },
    lg: { width: 190, height: 74 },
    xl: { width: 240, height: 94 },
  };

  const emblemDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 44, height: 44 },
    lg: { width: 56, height: 56 },
    xl: { width: 72, height: 72 },
  };

  if (variant === 'emblem') {
    const dim = emblemDimensions[size];
    return (
      <div className={`relative flex items-center justify-center flex-shrink-0 ${className}`}>
        <Image
          src="/images/gkf-emblem.png"
          alt="GKF Emblem"
          width={dim.width}
          height={dim.height}
          className="object-contain"
          priority
        />
      </div>
    );
  }

  const dim = dimensions[size];
  const src = variant === 'dark' ? '/images/gkf-logo-white-tight.png' : '/images/gkf-logo-tight.png';

  return (
    <div className={`relative flex items-center flex-shrink-0 ${className}`}>
      <Image
        src={src}
        alt="Geoffrey Karema Foundation - GKF Building with Purpose"
        width={dim.width}
        height={dim.height}
        className="object-contain"
        priority
      />
    </div>
  );
}
