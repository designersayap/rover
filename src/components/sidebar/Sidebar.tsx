'use client';

import React from 'react';
import { ResizeHandle } from './ResizeHandle';

export type SidebarState = 'full' | 'rail-only' | 'collapsed';

export interface SidebarProps {
  children?: React.ReactNode;
  state?: SidebarState;
  className?: string;
  width?: number | string;
  onResize?: (deltaX: number) => void;
  resizable?: boolean;
  style?: React.CSSProperties;
  dataBuilderUi?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  state = 'full',
  className = '',
  width,
  onResize,
  resizable = false,
  style,
  dataBuilderUi = true,
}) => {
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
      className={`rv-sidebarShell ${stateClass} ${className}`.trim()}
      style={inlineStyle}
      data-builder-ui={dataBuilderUi ? 'true' : undefined}
    >
      <div className="rv-sidebar">
        {children}
        {resizable && state === 'full' && <ResizeHandle onResize={onResize} />}
      </div>
    </aside>
  );
};

export interface SidebarBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const SidebarBody: React.FC<SidebarBodyProps> = ({
  children,
  className = '',
}) => {
  return <div className={`rv-sidebarBody ${className}`.trim()}>{children}</div>;
};

export interface SidebarPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  children,
  className = '',
}) => {
  return <div className={`rv-sidebarPanel ${className}`.trim()}>{children}</div>;
};
