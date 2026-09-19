'use client';

import React from 'react';

export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isOpen?: boolean;
  icon?: React.ReactNode;
  hideOnMobile?: boolean;
}

export const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  (
    {
      className = '',
      isOpen,
      icon,
      hideOnMobile = false,
      type = 'button',
      'aria-label': ariaLabel = 'Toggle navigation',
      children,
      ...props
    },
    ref
  ) => {
    const hideMobileClass = hideOnMobile ? 'rv-sidebarToggleHideMobile' : '';

    return (
      <button
        ref={ref}
        type={type}
        className={`rv-btn rv-btnGhost rv-btnIcon rv-sidebarToggle ${hideMobileClass} ${isOpen ? 'rv-btnGhostActive' : ''} ${className}`.trim()}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        {...props}
      >
        {children ? (
          children
        ) : icon ? (
          icon
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rv-sidebarToggleIcon"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>
    );
  }
);

SidebarToggle.displayName = 'SidebarToggle';
