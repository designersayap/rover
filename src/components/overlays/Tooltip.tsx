'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  zIndex?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 500,
  className = '',
  zIndex = 9999,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({
    top: -9999,
    left: -9999,
    opacity: 0,
  });

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current || !isVisible) return;

    let triggerEl: HTMLElement = triggerRef.current;
    if (triggerEl.style.display === 'contents' && triggerEl.firstElementChild) {
      triggerEl = triggerEl.firstElementChild as HTMLElement;
    }
    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    if (tooltipRect.width === 0) return;

    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    const gap = 6;
    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerCenterX - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + gap;
        left = triggerCenterX - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerCenterY - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = triggerCenterY - tooltipRect.height / 2;
        left = triggerRect.right + gap;
        break;
    }

    const padding = 8;
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));

    setTooltipStyle({
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      opacity: 1,
      zIndex,
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease',
    });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
    setTooltipStyle({ top: -9999, left: -9999, opacity: 0 });
  };

  if (!content) return <>{children}</>;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'contents' }}
      >
        {children}
      </div>

      {mounted &&
        isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`rv-tooltip ${className}`.trim()}
            style={tooltipStyle}
            role="tooltip"
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};
