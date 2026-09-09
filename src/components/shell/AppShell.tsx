'use client';

import React from 'react';

export interface AppShellProps {
  children?: React.ReactNode;
  className?: string;
  brand?: string;
  style?: React.CSSProperties;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  className = '',
  brand,
  style,
}) => {
  return (
    <div
      className={`rv-container ${className}`.trim()}
      data-rv-brand={brand}
      style={style}
    >
      {children}
    </div>
  );
};

export interface MainContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`rv-mainContent ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};
