'use client';

import React, { forwardRef, HTMLAttributes } from 'react';

export interface MediaCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  selected?: boolean;
  badge?: React.ReactNode;
  overlay?: React.ReactNode;
}

export const MediaCard = forwardRef<HTMLDivElement, MediaCardProps>(function MediaCard(
  {
    src,
    alt = 'Media thumbnail',
    selected = false,
    badge,
    overlay,
    className = '',
    children,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={`rv-mediaCard ${selected ? 'rv-mediaCardSelected' : ''} ${className}`.trim()}
      role="button"
      tabIndex={0}
      {...props}
    >
      <img src={src} alt={alt} className="rv-mediaCardThumb" />

      {badge && <div className="rv-mediaCardBadge">{badge}</div>}

      {overlay && <div className="rv-mediaCardOverlay">{overlay}</div>}

      {children}
    </div>
  );
});
