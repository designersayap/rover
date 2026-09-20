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
  actionsPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  bottomContent?: React.ReactNode;
  bottomContentPosition?: 'left' | 'right' | 'between' | 'center';
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
    actionsPosition = 'top-right',
    bottomContent,
    bottomContentPosition = 'right',
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

  const actionsClass = actionsPosition === 'bottom-right'
    ? 'rv-actions-bottom-right'
    : actionsPosition === 'top-left'
    ? 'rv-actions-top-left'
    : actionsPosition === 'bottom-left'
    ? 'rv-actions-bottom-left'
    : 'rv-actions-top-right';

  const bottomClass = bottomContentPosition === 'left'
    ? 'rv-bottom-left'
    : bottomContentPosition === 'between'
    ? 'rv-bottom-between'
    : bottomContentPosition === 'center'
    ? 'rv-bottom-center'
    : 'rv-bottom-right';

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
            {actions && <div className={`rv-mediaCardActions ${actionsClass}`}>{actions}</div>}
            {bottomContent && (
              <div className={`rv-mediaCardBottomBar ${bottomClass}`}>
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
