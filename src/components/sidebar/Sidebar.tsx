'use client';

import React from 'react';
import { ResizeHandle } from './ResizeHandle';

export type SidebarState = 'full' | 'rail-only' | 'collapsed';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  state?: SidebarState;
  className?: string;
  width?: number | string;
  onResize?: (deltaX: number) => void;
  resizable?: boolean;
  dataBuilderUi?: boolean;
  innerClassName?: string;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      state = 'full',
      className = '',
      width,
      onResize,
      resizable = false,
      style,
      dataBuilderUi = true,
      innerClassName = '',
      ...props
    },
    ref
  ) => {
    const stateClass =
      state === 'rail-only'
        ? 'rv-sidebarRailOnly'
        : state === 'collapsed'
        ? 'rv-sidebarCollapsed'
        : '';

    const inlineStyle: React.CSSProperties = {
      ...style,
      ...(width !== undefined && state === 'full'
        ? { width: typeof width === 'number' ? `${width}px` : width }
        : {}),
    };

    return (
      <aside
        ref={ref}
        className={`rv-sidebarShell ${stateClass} ${className}`.trim()}
        style={inlineStyle}
        data-builder-ui={dataBuilderUi ? 'true' : undefined}
        {...props}
      >
        <div className={`rv-sidebar ${innerClassName}`.trim()}>
          {children}
          {resizable && state === 'full' && <ResizeHandle onResize={onResize} />}
        </div>
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
}

export const SidebarBody = React.forwardRef<HTMLDivElement, SidebarBodyProps>(
  ({ children, className = '', open, ...props }, ref) => {
    const openClass = open ? 'rv-sidebarBodyOpen' : '';
    return (
      <div
        ref={ref}
        className={`rv-sidebarBody ${openClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarBody.displayName = 'SidebarBody';

export interface SidebarPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const SidebarPanel = React.forwardRef<HTMLDivElement, SidebarPanelProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-sidebarPanel ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarPanel.displayName = 'SidebarPanel';
