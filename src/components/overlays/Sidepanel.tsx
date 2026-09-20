'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface SidepanelProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  width?: number | string;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
  customHeader?: React.ReactNode;
}

export function Sidepanel({
  open = true,
  onClose,
  title,
  subtitle,
  headerLeft,
  headerRight,
  width,
  className = '',
  children,
  ariaLabel = 'Details Sidepanel',
  customHeader,
}: SidepanelProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to dismiss (called unconditionally before early return)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const style = width ? ({ '--rv-sidepanel-width': typeof width === 'number' ? `${width}px` : width } as React.CSSProperties) : undefined;

  return createPortal(
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className="rv-sidepanelBackdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`rv-sidepanel ${className}`.trim()}
        style={style}
        aria-label={ariaLabel}
      >
        {/* Mobile Grab Handle */}
        <div className="rv-sidepanelGrabHandleWrap">
          <div className="rv-sidepanelGrabHandle" />
        </div>

        {/* Header */}
        {customHeader ? (
          customHeader
        ) : (
          <div className="rv-sidepanelHeader">
            <div className="rv-sidepanelHeaderLeft">
              {headerLeft}
              {(title || subtitle) && (
                <div className="rv-sidepanelTitleWrap">
                  {title && (
                    typeof title === 'string' ? (
                      <h2 className="rv-sidepanelTitle" title={title}>
                        {title}
                      </h2>
                    ) : (
                      title
                    )
                  )}
                  {subtitle && (
                    typeof subtitle === 'string' ? (
                      <span className="rv-sidepanelSubtitle">{subtitle}</span>
                    ) : (
                      subtitle
                    )
                  )}
                </div>
              )}
            </div>

            {headerRight}

            {onClose && (
              <button
                type="button"
                className="rv-btn rv-btnGhost rv-btnIcon rv-sidepanelCloseBtn"
                onClick={onClose}
                aria-label="Close sidepanel"
                title="Close sidepanel"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="rv-sidepanelBody">
          {children}
        </div>
      </aside>
    </>,
    document.body
  );
}

export function SidepanelHeader({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`rv-sidepanelHeader ${className}`.trim()}>{children}</div>;
}

export function SidepanelBody({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`rv-sidepanelBody ${className}`.trim()}>{children}</div>;
}
