'use client';

import React, { forwardRef, HTMLAttributes } from 'react';

export interface MediaCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  src?: string;
  alt?: string;
  variant?: 'tile' | 'list';
  aspectRatio?: string | number;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  selected?: boolean;
  badge?: React.ReactNode;
  overlay?: React.ReactNode;
  actions?: React.ReactNode;
  bottomContent?: React.ReactNode;
  mediaContent?: React.ReactNode;
}

export const MediaCard = forwardRef<HTMLDivElement, MediaCardProps>(function MediaCard(
  {
    src,
    alt = 'Media thumbnail',
    variant = 'tile',
    aspectRatio,
    title,
    subtitle,
    selected = false,
    badge,
    overlay,
    actions,
    bottomContent,
    mediaContent,
    className = '',
    style,
    children,
    ...props
  },
  ref
) {
  const isList = variant === 'list';

  // Format aspect ratio if string like "16:9" or "9:16"
  const computedAspectRatio = typeof aspectRatio === 'string' && aspectRatio.includes(':')
    ? aspectRatio.replace(':', ' / ')
    : aspectRatio;

  return (
    <div
      ref={ref}
      className={`rv-mediaCard ${isList ? 'rv-mediaCardList' : 'rv-mediaCardTile'} ${aspectRatio ? 'rv-mediaCardAspect' : ''} ${selected ? 'rv-mediaCardSelected' : ''} ${className}`.trim()}
      role="button"
      tabIndex={0}
      style={{
        ...(!isList && computedAspectRatio ? { aspectRatio: computedAspectRatio } : {}),
        ...style,
      }}
      {...props}
    >
      <div
        className="rv-mediaCardThumbWrapper"
        style={!isList && computedAspectRatio ? { aspectRatio: computedAspectRatio } : undefined}
      >
        {mediaContent ? (
          mediaContent
        ) : src ? (
          <img src={src} alt={alt} className="rv-mediaCardThumb" loading="lazy" />
        ) : null}

        {badge && <div className="rv-mediaCardBadge">{badge}</div>}

        {!isList && (overlay || actions || bottomContent) && (
          <div className="rv-mediaCardOverlay">
            {overlay}
            {actions && <div className="rv-mediaCardActions">{actions}</div>}
            {bottomContent && (
              <div className="rv-mediaCardBottomBar">
                {bottomContent}
              </div>
            )}
          </div>
        )}
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
