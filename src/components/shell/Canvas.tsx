'use client';

import React from 'react';

export interface CanvasProps {
  children?: React.ReactNode;
  deviceMode?: 'desktop' | 'mobile';
  scrolledBottom?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Canvas: React.FC<CanvasProps> = ({
  children,
  deviceMode = 'desktop',
  scrolledBottom = false,
  className = '',
  style,
}) => {
  const modeClass = deviceMode === 'desktop' ? 'rv-canvasDesktop' : 'rv-canvasMobile';
  const bottomClass = scrolledBottom ? 'rv-canvasScrolledBottom' : '';

  return (
    <main
      className={`rv-canvas ${modeClass} ${bottomClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </main>
  );
};

export interface CanvasInnerProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CanvasInner: React.FC<CanvasInnerProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`rv-canvasInner ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};

export interface CanvasScrollProps {
  children?: React.ReactNode;
  className?: string;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  ref?: React.Ref<HTMLDivElement>;
}

export const CanvasScroll = React.forwardRef<HTMLDivElement, CanvasScrollProps>(
  ({ children, className = '', onScroll }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-canvasScroll ${className}`.trim()}
        onScroll={onScroll}
      >
        {children}
      </div>
    );
  }
);
CanvasScroll.displayName = 'CanvasScroll';

export interface CanvasContentProps {
  children?: React.ReactNode;
  className?: string;
}

export const CanvasContent: React.FC<CanvasContentProps> = ({
  children,
  className = '',
}) => {
  return <div className={`rv-canvasContent ${className}`.trim()}>{children}</div>;
};

export interface ComponentWrapperProps {
  children?: React.ReactNode;
  selected?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  id?: string;
}

export const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  children,
  selected = false,
  className = '',
  onClick,
  onKeyDown,
  id,
}) => {
  return (
    <div
      id={id}
      className={`rv-componentWrapper ${selected ? 'rv-componentSelected' : ''} ${className}`.trim()}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
};

export interface EmptyStateProps {
  children?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`rv-emptyState ${className}`.trim()}>
      <div className="rv-emptyStateText">{children}</div>
    </div>
  );
};
