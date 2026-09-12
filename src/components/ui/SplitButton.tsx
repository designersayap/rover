'use client';

import React, { forwardRef, HTMLAttributes, ButtonHTMLAttributes } from 'react';

export type SplitButtonVariant = 'primary' | 'secondary' | 'brand' | 'danger' | 'ghost';

const VARIANT_CLASS_MAP: Record<SplitButtonVariant, string> = {
  primary: 'rv-btnPrimary',
  secondary: 'rv-btnSecondary',
  brand: 'rv-btnBrand',
  danger: 'rv-btnDanger',
  ghost: 'rv-btnGhost',
};

const DefaultChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block' }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export interface SplitButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  variant?: SplitButtonVariant;
  disabled?: boolean;
  onAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  actionAriaLabel?: string;
  toggleAriaLabel?: string;
  isToggleActive?: boolean;
  actionIcon?: React.ReactNode;
  toggleIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export interface SplitButtonMainProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SplitButtonVariant;
}

export const SplitButtonMain = forwardRef<HTMLButtonElement, SplitButtonMainProps>(
  function SplitButtonMain({ variant = 'primary', className = '', children, ...props }, ref) {
    const variantClass = VARIANT_CLASS_MAP[variant] || 'rv-btnPrimary';
    return (
      <button
        ref={ref}
        type="button"
        className={`rv-btn ${variantClass} rv-splitBtnMain ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export interface SplitButtonToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SplitButtonVariant;
  isActive?: boolean;
}

export const SplitButtonToggle = forwardRef<HTMLButtonElement, SplitButtonToggleProps>(
  function SplitButtonToggle(
    { variant = 'primary', isActive = false, className = '', children, ...props },
    ref
  ) {
    const variantClass = VARIANT_CLASS_MAP[variant] || 'rv-btnPrimary';
    return (
      <button
        ref={ref}
        type="button"
        className={`rv-btn rv-btnIcon ${variantClass} rv-splitBtnToggle ${isActive ? 'rv-btnActive' : ''} ${className}`.trim()}
        {...props}
      >
        {children || <DefaultChevronDown />}
      </button>
    );
  }
);

export const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
  function SplitButton(
    {
      variant = 'primary',
      disabled = false,
      onAction,
      onToggle,
      actionAriaLabel,
      toggleAriaLabel = 'More options',
      isToggleActive = false,
      actionIcon,
      toggleIcon,
      className = '',
      children,
      ...props
    },
    ref
  ) {
    // If children are multiple compound elements, render as container
    const isCustomChildren = React.Children.count(children) > 1;

    return (
      <div
        ref={ref}
        className={`rv-splitBtn ${className}`.trim()}
        {...props}
      >
        {isCustomChildren ? (
          children
        ) : (
          <>
            <SplitButtonMain
              variant={variant}
              disabled={disabled}
              onClick={onAction}
              aria-label={actionAriaLabel}
            >
              {actionIcon}
              {children && <span>{children}</span>}
            </SplitButtonMain>
            <SplitButtonToggle
              variant={variant}
              disabled={disabled}
              isActive={isToggleActive}
              onClick={onToggle}
              aria-label={toggleAriaLabel}
            >
              {toggleIcon}
            </SplitButtonToggle>
          </>
        )}
      </div>
    );
  }
);
