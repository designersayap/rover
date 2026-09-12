'use client';

import React, { forwardRef, ButtonHTMLAttributes, HTMLAttributes } from 'react';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    active = false,
    icon,
    children,
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`rv-chip ${active ? 'rv-chipActive' : ''} ${className}`.trim()}
      {...props}
    >
      {icon && <span className="rv-chipIcon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
});

export interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(function ChipGroup(
  { children, className = '', ...props },
  ref
) {
  return (
    <div ref={ref} className={`rv-chipGroup ${className}`.trim()} {...props}>
      {children}
    </div>
  );
});
