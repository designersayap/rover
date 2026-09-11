'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
  size?: ModalSize;
  width?: number | string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  children?: React.ReactNode;
  overlayClassName?: string;
  portalTo?: HTMLElement | null;
  dataBuilderUi?: boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen = false,
      onClose,
      size = 'md',
      width,
      closeOnOverlayClick = true,
      closeOnEsc = true,
      children,
      className = '',
      overlayClassName = '',
      portalTo,
      dataBuilderUi = true,
      style,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Handle Escape key
    useEffect(() => {
      if (!isOpen || !closeOnEsc || !onClose) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEsc, onClose]);

    // Body scroll lock
    useEffect(() => {
      if (!isOpen || typeof document === 'undefined') return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const targetContainer =
      portalTo || (typeof document !== 'undefined' ? document.body : null);
    if (!targetContainer) return null;

    const sizeClassMap: Record<ModalSize, string> = {
      sm: 'rv-modalSm',
      md: 'rv-modalMd',
      lg: 'rv-modalLg',
      xl: 'rv-modalXl',
      full: 'rv-modalFull',
    };

    const sizeClass = sizeClassMap[size] || 'rv-modalMd';

    const containerStyle: React.CSSProperties = {
      ...style,
      ...(width !== undefined
        ? { width: typeof width === 'number' ? `${width}px` : width }
        : {}),
    };

    return createPortal(
      <div
        className={`rv-modalOverlay ${overlayClassName}`.trim()}
        onClick={() => {
          if (closeOnOverlayClick && onClose) {
            onClose();
          }
        }}
        aria-hidden="true"
      >
        <div
          ref={ref}
          className={`rv-modalContainer ${sizeClass} ${className}`.trim()}
          style={containerStyle}
          onClick={(e) => e.stopPropagation()}
          data-builder-ui={dataBuilderUi ? 'true' : undefined}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {children}
        </div>
      </div>,
      targetContainer
    );
  }
);
Modal.displayName = 'Modal';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className = '', onClose, showCloseButton = false, ...props }, ref) => {
    return (
      <div ref={ref} className={`rv-modalHeader ${className}`.trim()} {...props}>
        <div className="rv-modalHeaderContent">{children}</div>
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rv-btn rv-btnGhost rv-btnIcon"
            style={{ width: 28, height: 28, borderRadius: 'var(--rv-radius-round)' }}
            aria-label="Close dialog"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);
ModalHeader.displayName = 'ModalHeader';

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h3 ref={ref} className={`rv-modalTitle ${className}`.trim()} {...props}>
        {children}
      </h3>
    );
  }
);
ModalTitle.displayName = 'ModalTitle';

export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <p ref={ref} className={`rv-modalDescription ${className}`.trim()} {...props}>
        {children}
      </p>
    );
  }
);
ModalDescription.displayName = 'ModalDescription';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`rv-modalBody ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`rv-modalFooter ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
ModalFooter.displayName = 'ModalFooter';
