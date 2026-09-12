'use client';

import React from 'react';

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
  position?: { top: number; left: number } | null;
  centerByDefault?: boolean;
  width?: number;
  variant?: 'default' | 'menu';
  isMenu?: boolean;
  className?: string;
  overlayClassName?: string;
  dataBuilderUi?: boolean;
  children?: React.ReactNode;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      isOpen = true,
      onClose,
      position,
      centerByDefault = true,
      width = 362,
      variant = 'default',
      isMenu = false,
      className = '',
      overlayClassName = '',
      dataBuilderUi = true,
      children,
      style,
      ...props
    },
    ref
  ) => {
    if (!isOpen) return null;

    const isMenuVariant = variant === 'menu' || isMenu;

    let popoverStyle: React.CSSProperties = centerByDefault
      ? {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          margin: 0,
          pointerEvents: 'auto',
          ...style,
        }
      : { ...style };

    if (position && typeof window !== 'undefined') {
      const padding = 8;
      const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
      const isRightHalf = position.left > windowWidth / 2;

      if (isRightHalf) {
        let idealRight = windowWidth - (position.left + width / 2);
        idealRight = Math.max(padding, idealRight);

        popoverStyle = {
          position: 'fixed',
          top: `${position.top}px`,
          right: `${idealRight}px`,
          left: 'auto',
          margin: 0,
          pointerEvents: 'auto',
          width: width,
          maxWidth: `calc(100vw - ${padding * 2}px)`,
          ...style,
        };
      } else {
        let idealLeft = position.left - width / 2;
        idealLeft = Math.max(padding, idealLeft);

        popoverStyle = {
          position: 'fixed',
          top: `${position.top}px`,
          left: `${idealLeft}px`,
          right: 'auto',
          margin: 0,
          pointerEvents: 'auto',
          width: width,
          maxWidth: `calc(100vw - ${padding * 2}px)`,
          ...style,
        };
      }
    }

    return (
      <>
        <div
          className={`rv-popoverOverlay ${overlayClassName}`.trim()}
          onClick={onClose}
          style={{ pointerEvents: onClose ? 'auto' : 'none' }}
          aria-hidden="true"
        />
        <div
          ref={ref}
          className={`rv-popoverContainer ${isMenuVariant ? 'rv-popoverMenu' : ''} ${className}`.trim()}
          style={popoverStyle}
          onClick={(e) => e.stopPropagation()}
          data-builder-ui={dataBuilderUi ? 'true' : undefined}
          role={isMenuVariant ? 'menu' : 'dialog'}
          aria-modal="true"
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
Popover.displayName = 'Popover';

export interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`rv-popoverHeader ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
PopoverHeader.displayName = 'PopoverHeader';

export interface PopoverTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
}

export const PopoverTitle = React.forwardRef<HTMLSpanElement, PopoverTitleProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <span ref={ref} className={`rv-popoverTitle ${className}`.trim()} {...props}>
        {children}
      </span>
    );
  }
);
PopoverTitle.displayName = 'PopoverTitle';

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`rv-popoverContent ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
PopoverContent.displayName = 'PopoverContent';

export interface PopoverMenuProps extends PopoverProps {}

export const PopoverMenu = React.forwardRef<HTMLDivElement, PopoverMenuProps>(
  ({ variant = 'menu', ...props }, ref) => (
    <Popover ref={ref} variant={variant} {...props} />
  )
);
PopoverMenu.displayName = 'PopoverMenu';

