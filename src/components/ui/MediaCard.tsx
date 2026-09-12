'use client';

import React, { forwardRef, HTMLAttributes } from 'react';

export interface MediaCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  src: string;
  alt?: string;
  variant?: 'tile' | 'list';
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  selected?: boolean;
  badge?: React.ReactNode;
  overlay?: React.ReactNode;
}

export const MediaCard = forwardRef<HTMLDivElement, MediaCardProps>(function MediaCard(
  {
    src,
    alt = 'Media thumbnail',
    variant = 'tile',
    title,
    subtitle,
    selected = false,
    badge,
    overlay,
    className = '',
    children,
    ...props
  },
  ref
) {
  const isList = variant === 'list';

  return (
    <div
      ref={ref}
      className={`rv-mediaCard ${isList ? 'rv-mediaCardList' : 'rv-mediaCardTile'} ${selected ? 'rv-mediaCardSelected' : ''} ${className}`.trim()}
      role="button"
      tabIndex={0}
      {...props}
    >
      <div className="rv-mediaCardThumbWrapper">
        <img src={src} alt={alt} className="rv-mediaCardThumb" />
        {badge && <div className="rv-mediaCardBadge">{badge}</div>}
        {!isList && overlay && <div className="rv-mediaCardOverlay">{overlay}</div>}
      </div>

      {(title || subtitle || children) && (
        <div className="rv-mediaCardContent">
          {title && <div className="rv-mediaCardTitle">{title}</div>}
          {subtitle && <div className="rv-mediaCardSubtitle">{subtitle}</div>}
          {children}
        </div>
      )}
    </div>
  );
});
