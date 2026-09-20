'use client';

import React, { forwardRef, ButtonHTMLAttributes, HTMLAttributes } from 'react';

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
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
      role="tab"
      aria-selected={active}
      className={`rv-tab ${active ? 'rv-tabActive' : ''} ${className}`.trim()}
      {...props}
    >
      {icon && <span className="rv-tabIcon">{icon}</span>}
      <span className="rv-tabLabel">{children}</span>
    </button>
  );
});

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { children, className = '', ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="tablist"
      className={`rv-tabList ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
});

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { children, className = '', ...props },
  ref
) {
  return (
    <div ref={ref} className={`rv-tabs ${className}`.trim()} {...props}>
      {children}
    </div>
  );
});
