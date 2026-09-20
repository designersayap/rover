'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from 'react';
import { createPortal } from 'react-dom';

interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  popoverId: string;
  closePopover: () => void;
  togglePopover: () => void;
  isCompound: boolean;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopover() {
  const context = useContext(PopoverContext);
  return context;
}

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  // Compound props
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;

  // Legacy props (Backwards compatibility)
  isOpen?: boolean;
  onClose?: () => void;
  position?: { top: number; left: number } | null;
  centerByDefault?: boolean;
  width?: number;
  variant?: 'default' | 'menu';
  className?: string;
  overlayClassName?: string;
  dataBuilderUi?: boolean;
  children?: React.ReactNode;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      // Compound props
      open: controlledOpen,
      onOpenChange,
      defaultOpen = false,

      // Legacy props
      isOpen: legacyIsOpen,
      onClose,
      position,
      centerByDefault = true,
      width = 362,
      variant = 'default',
      className = '',
      overlayClassName = '',
      dataBuilderUi = true,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Check if this is used in compound mode
    const isExplicitLegacy = legacyIsOpen !== undefined || position !== undefined || onClose !== undefined;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const triggerRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const popoverId = useId();

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled
      ? controlledOpen
      : isExplicitLegacy
      ? Boolean(legacyIsOpen)
      : uncontrolledOpen;

    const setIsOpen = useCallback(
      (action: React.SetStateAction<boolean>) => {
        const nextOpen = typeof action === 'function' ? action(isOpen) : action;
        if (!isControlled && !isExplicitLegacy) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
        if (!nextOpen && onClose) {
          onClose();
        }
      },
      [isControlled, isExplicitLegacy, isOpen, onOpenChange, onClose]
    );

    const closePopover = useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen]);

    const togglePopover = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, [setIsOpen]);

    // Context for child compound components
    const contextValue: PopoverContextValue = {
      isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
      popoverId,
      closePopover,
      togglePopover,
      isCompound: !isExplicitLegacy,
    };

    // If used in pure Compound mode (without legacy position/onClose props), act as Context Provider
    if (!isExplicitLegacy) {
      return (
        <PopoverContext.Provider value={contextValue}>
          {children}
        </PopoverContext.Provider>
      );
    }

    // --- LEGACY RENDER FALLBACK ---
    if (!isOpen) return null;

    const isMenuVariant = variant === 'menu';

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
      <PopoverContext.Provider value={contextValue}>
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
      </PopoverContext.Provider>
    );
  }
);

Popover.displayName = 'Popover';

export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ asChild = false, children, onClick, ...props }, forwardedRef) => {
    const context = usePopover();
    const isOpen = context?.isOpen ?? false;
    const togglePopover = context?.togglePopover ?? (() => {});
    const triggerRef = context?.triggerRef;
    const popoverId = context?.popoverId ?? '';

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onClick?.(e);
      if (!e.defaultPrevented) {
        togglePopover();
      }
    };

    const handleRef = (node: HTMLElement | null) => {
      if (triggerRef) {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      const existingClassName = child.props.className || '';
      const activeClass = isOpen ? 'rv-btnActive rv-isActive' : '';
      const combinedClassName = `${existingClassName} ${activeClass}`.trim();

      return React.cloneElement(child, {
        ref: handleRef,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          child.props.onClick?.(e);
          handleClick(e);
        },
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
        'aria-controls': isOpen ? popoverId : undefined,
        className: combinedClassName || undefined,
      } as any);
    }

    const defaultActiveClass = isOpen ? 'rv-btnActive rv-isActive' : '';
    const buttonClassName = `${props.className || ''} ${defaultActiveClass}`.trim();

    return (
      <button
        ref={handleRef as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={isOpen ? popoverId : undefined}
        className={buttonClassName || undefined}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end' | 'center';
  side?: 'bottom' | 'top' | 'left' | 'right';
  sideOffset?: number;
  width?: number | string;
  portal?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      align = 'end',
      side = 'bottom',
      sideOffset = 6,
      width = 'auto',
      portal = true,
      className = '',
      style,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const context = usePopover();
    const isOpen = context?.isOpen ?? true;
    const closePopover = context?.closePopover ?? (() => {});
    const triggerRef = context?.triggerRef;
    const contentRef = context?.contentRef;
    const popoverId = context?.popoverId ?? '';

    const [mounted, setMounted] = useState(false);
    const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
      setMounted(true);
    }, []);

    // Calculate smart boundary position relative to trigger
    const updatePosition = useCallback(() => {
      if (!triggerRef?.current || typeof window === 'undefined') return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportPadding = 8;
      const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
      const windowHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

      let top = 0;
      let left = 0;

      if (side === 'bottom') {
        top = triggerRect.bottom + sideOffset;
      } else if (side === 'top') {
        top = triggerRect.top - sideOffset;
      } else {
        top = triggerRect.top;
      }

      if (align === 'end') {
        left = triggerRect.right;
      } else if (align === 'start') {
        left = triggerRect.left;
      } else {
        left = triggerRect.left + triggerRect.width / 2;
      }

      let calculatedStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 10000,
        margin: 0,
        width: typeof width === 'number' ? `${width}px` : width,
        maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
        ...style,
      };

      if (side === 'bottom') {
        if (top + 240 > windowHeight) {
          calculatedStyle.bottom = `${windowHeight - triggerRect.top + sideOffset}px`;
          calculatedStyle.top = 'auto';
        } else {
          calculatedStyle.top = `${top}px`;
          calculatedStyle.bottom = 'auto';
        }
      } else if (side === 'top') {
        calculatedStyle.bottom = `${windowHeight - triggerRect.top + sideOffset}px`;
        calculatedStyle.top = 'auto';
      } else {
        calculatedStyle.top = `${top}px`;
      }

      if (align === 'end') {
        const rightOffset = windowWidth - triggerRect.right;
        calculatedStyle.right = `${Math.max(viewportPadding, rightOffset)}px`;
        calculatedStyle.left = 'auto';
      } else if (align === 'start') {
        calculatedStyle.left = `${Math.max(viewportPadding, left)}px`;
        calculatedStyle.right = 'auto';
      } else {
        calculatedStyle.left = `${Math.max(viewportPadding, left)}px`;
        calculatedStyle.transform = 'translateX(-50%)';
        calculatedStyle.right = 'auto';
      }

      setPositionStyle(calculatedStyle);
    }, [triggerRef, align, side, sideOffset, width, style]);

    useEffect(() => {
      if (isOpen && triggerRef?.current) {
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
      }
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [isOpen, triggerRef, updatePosition]);

    // Handle outside click & escape key
    useEffect(() => {
      if (!isOpen) return;

      const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node;
        // If clicking inside the content or inside the trigger, do not close
        if (contentRef?.current?.contains(target)) {
          return;
        }
        if (triggerRef?.current?.contains(target)) {
          return;
        }
        closePopover();
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closePopover();
          triggerRef?.current?.focus();
        }
      };

      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('touchstart', handlePointerDown);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, closePopover, contentRef, triggerRef]);

    if (!isOpen) return null;

    const handleRef = (node: HTMLDivElement | null) => {
      if (contentRef) {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    const contentNode = (
      <div
        ref={handleRef}
        id={popoverId}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`rv-popoverContainer ${className}`.trim()}
        style={triggerRef?.current ? positionStyle : style}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );

    if (portal && mounted && typeof document !== 'undefined') {
      return createPortal(contentNode, document.body);
    }

    return contentNode;
  }
);

PopoverContent.displayName = 'PopoverContent';

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

export interface PopoverMenuProps extends PopoverProps {}

export const PopoverMenu = React.forwardRef<HTMLDivElement, PopoverMenuProps>(
  ({ variant = 'menu', ...props }, ref) => (
    <Popover ref={ref} variant={variant} {...props} />
  )
);

PopoverMenu.displayName = 'PopoverMenu';
