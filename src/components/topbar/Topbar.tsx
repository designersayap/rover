'use client';

import React from 'react';

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  dataBuilderUi?: boolean;
}

export const Topbar = React.forwardRef<HTMLElement, TopbarProps>(
  ({ children, className = '', dataBuilderUi = true, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`rv-topbar ${className}`.trim()}
        data-builder-ui={dataBuilderUi ? 'true' : undefined}
        {...props}
      >
        {children}
      </header>
    );
  }
);
Topbar.displayName = 'Topbar';

export interface TopbarLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const TopbarLeft = React.forwardRef<HTMLDivElement, TopbarLeftProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`rv-topbarLeft ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
TopbarLeft.displayName = 'TopbarLeft';

export interface TopbarRightProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const TopbarRight = React.forwardRef<HTMLDivElement, TopbarRightProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`rv-topbarRight ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
TopbarRight.displayName = 'TopbarRight';

export interface TopbarLogoProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export const TopbarLogo = React.forwardRef<HTMLHeadingElement, TopbarLogoProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h1 ref={ref} className={`rv-topbarLogo ${className}`.trim()} {...props}>
        {children}
      </h1>
    );
  }
);
TopbarLogo.displayName = 'TopbarLogo';
