'use client';

import React from 'react';

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  brand?: string;
}

export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ children, className = '', brand, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-container ${className}`.trim()}
        data-rv-brand={brand}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AppShell.displayName = 'AppShell';

export interface MainContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const MainContent = React.forwardRef<HTMLDivElement, MainContentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-mainContent ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MainContent.displayName = 'MainContent';
