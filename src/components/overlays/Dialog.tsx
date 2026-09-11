'use client';

import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  type ModalProps,
  type ModalSize,
} from './Modal';

export type DialogActionVariant = 'primary' | 'brand' | 'danger' | 'secondary' | 'ghost';

export interface DialogProps extends Omit<ModalProps, 'title' | 'onSubmit'> {
  /** Title of the dialog. Displayed in the header without a close button by default. */
  title: React.ReactNode;
  /** Subtitle or description. Rendered in header if children exist, or in body if no children. */
  description?: React.ReactNode;
  /** Dialog body content. Rendered inside ModalBody. */
  children?: React.ReactNode;
  /** Text or element for the cancel button. Defaults to 'Cancel'. */
  cancelLabel?: React.ReactNode;
  /** Click handler for cancel button. Defaults to onClose. */
  onCancel?: () => void;
  /** Whether to show the cancel button. Defaults to true. */
  showCancel?: boolean;
  /** Text or element for the primary action button. Defaults to 'Confirm'. */
  actionLabel?: React.ReactNode;
  /** Visual variant of the primary action button. Defaults to 'primary'. */
  actionVariant?: DialogActionVariant;
  /** Type attribute of the primary action button. Defaults to 'submit' if onSubmit is set, else 'button'. */
  actionType?: 'button' | 'submit';
  /** Click handler for the primary action button. */
  onAction?: () => void;
  /** Whether the primary action is in a loading state. */
  isActionLoading?: boolean;
  /** Whether the primary action is disabled. */
  isActionDisabled?: boolean;
  /** Form submission handler. If provided, dialog body and footer are wrapped in a form. */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Custom footer to replace the default cancel and action buttons. */
  footer?: React.ReactNode;
  /** Whether to show the close ('X') button on the header. Defaults to false. */
  showCloseButton?: boolean;
}

const variantClassMap: Record<DialogActionVariant, string> = {
  primary: 'rv-btnPrimary',
  brand: 'rv-btnBrand',
  danger: 'rv-btnDanger',
  secondary: 'rv-btnSecondary',
  ghost: 'rv-btnGhost',
};

/**
 * Standardized Dialog layout component for Rover.
 * Follows Rover dialog format rules:
 * 1. Clean Title with no close button by default
 * 2. Flexible body hosting form inputs or description
 * 3. Standardized footer with Cancel button and primary action
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      isOpen = false,
      onClose,
      title,
      description,
      children,
      cancelLabel = 'Cancel',
      onCancel,
      showCancel = true,
      actionLabel = 'Confirm',
      actionVariant = 'primary',
      actionType,
      onAction,
      isActionLoading = false,
      isActionDisabled = false,
      onSubmit,
      footer,
      showCloseButton = false,
      size = 'sm',
      ...modalProps
    },
    ref
  ) => {
    const computedActionType = actionType || (onSubmit ? 'submit' : 'button');
    const actionClass = variantClassMap[actionVariant] || 'rv-btnPrimary';

    const dialogInner = (
      <>
        <ModalHeader onClose={onClose} showCloseButton={showCloseButton}>
          <ModalTitle>{title}</ModalTitle>
          {children && description && (
            <ModalDescription>{description}</ModalDescription>
          )}
        </ModalHeader>

        {children ? (
          <ModalBody>{children}</ModalBody>
        ) : description ? (
          <ModalBody>
            <p className="rv-modalDescription" style={{ margin: 0 }}>
              {description}
            </p>
          </ModalBody>
        ) : null}

        {footer !== undefined ? (
          footer
        ) : (
          <ModalFooter>
            {showCancel && (
              <button
                type="button"
                onClick={onCancel || onClose}
                disabled={isActionLoading}
                className="rv-btn rv-btnGhost"
              >
                {cancelLabel}
              </button>
            )}
            <button
              type={computedActionType}
              onClick={computedActionType === 'button' ? onAction : undefined}
              disabled={isActionDisabled || isActionLoading}
              className={`rv-btn ${actionClass}`}
            >
              {isActionLoading ? 'Loading...' : actionLabel}
            </button>
          </ModalFooter>
        )}
      </>
    );

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        {...modalProps}
      >
        {onSubmit ? (
          <form
            onSubmit={onSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
              margin: 0,
            }}
          >
            {dialogInner}
          </form>
        ) : (
          dialogInner
        )}
      </Modal>
    );
  }
);

Dialog.displayName = 'Dialog';
