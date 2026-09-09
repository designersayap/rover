'use client';

import React from 'react';

export interface CanvasProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  deviceMode?: 'desktop' | 'mobile';
  scrolledBottom?: boolean;
  className?: string;
}

export const Canvas = React.forwardRef<HTMLElement, CanvasProps>(
  ({ children, deviceMode = 'desktop', scrolledBottom = false, className = '', ...props }, ref) => {
    const modeClass = deviceMode === 'desktop' ? 'rv-canvasDesktop' : 'rv-canvasMobile';
    const bottomClass = scrolledBottom ? 'rv-canvasScrolledBottom' : '';

    return (
      <main
        ref={ref}
        className={`rv-canvas ${modeClass} ${bottomClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </main>
    );
  }
);
Canvas.displayName = 'Canvas';

export interface CanvasInnerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const CanvasInner = React.forwardRef<HTMLDivElement, CanvasInnerProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-canvasInner ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CanvasInner.displayName = 'CanvasInner';

export interface CanvasScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}

export const CanvasScroll = React.forwardRef<HTMLDivElement, CanvasScrollProps>(
  ({ children, className = '', onScroll, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-canvasScroll ${className}`.trim()}
        onScroll={onScroll}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CanvasScroll.displayName = 'CanvasScroll';

export interface CanvasContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const CanvasContent = React.forwardRef<HTMLDivElement, CanvasContentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-canvasContent ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CanvasContent.displayName = 'CanvasContent';

export interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  selected?: boolean;
  className?: string;
}

export const ComponentWrapper = React.forwardRef<HTMLDivElement, ComponentWrapperProps>(
  ({ children, selected = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-componentWrapper ${selected ? 'rv-componentSelected' : ''} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ComponentWrapper.displayName = 'ComponentWrapper';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-emptyState ${className}`.trim()}
        {...props}
      >
        <div className="rv-emptyStateText">{children}</div>
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';
