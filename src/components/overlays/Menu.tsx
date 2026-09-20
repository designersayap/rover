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

interface MenuContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  menuId: string;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a <Menu /> component');
  }
  return context;
}

export interface MenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export function Menu({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: MenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = useCallback(
    (action: React.SetStateAction<boolean>) => {
      const nextOpen = typeof action === 'function' ? action(isOpen) : action;
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, isOpen, onOpenChange]
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        triggerRef,
        contentRef,
        menuId,
        closeMenu,
        toggleMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export interface MenuTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const MenuTrigger = React.forwardRef<HTMLElement, MenuTriggerProps>(
  ({ asChild = false, children, onClick, ...props }, forwardedRef) => {
    const { isOpen, toggleMenu, triggerRef, menuId } = useMenu();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onClick?.(e);
      if (!e.defaultPrevented) {
        toggleMenu();
      }
    };

    const handleRef = (node: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
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
        'aria-haspopup': 'menu',
        'aria-controls': isOpen ? menuId : undefined,
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
        aria-haspopup="menu"
        aria-controls={isOpen ? menuId : undefined}
        className={buttonClassName || undefined}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MenuTrigger.displayName = 'MenuTrigger';

export interface MenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end' | 'center';
  side?: 'bottom' | 'top' | 'left' | 'right';
  sideOffset?: number;
  width?: number | string;
  portal?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  (
    {
      align = 'end',
      side = 'bottom',
      sideOffset = 4,
      width = 'auto',
      portal = true,
      className = '',
      style,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const { isOpen, closeMenu, triggerRef, contentRef, menuId } = useMenu();
    const [mounted, setMounted] = useState(false);
    const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
      setMounted(true);
    }, []);

    // Calculate smart boundary position relative to trigger
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || typeof window === 'undefined') return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportPadding = 8;
      const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
      const windowHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

      let top = 0;
      let left = 0;

      if (side === 'bottom') {
        top = triggerRect.bottom + sideOffset;
        if (top + 160 > windowHeight) {
          // Flip to top if bottom overflows
          top = triggerRect.top - sideOffset;
        }
      } else if (side === 'top') {
        top = triggerRect.top - sideOffset;
      } else if (side === 'left' || side === 'right') {
        top = triggerRect.top;
      }

      if (align === 'end') {
        left = triggerRect.right;
      } else if (align === 'start') {
        left = triggerRect.left;
      } else {
        left = triggerRect.left + triggerRect.width / 2;
      }

      const isRightHalf = left > windowWidth / 2;

      let calculatedStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 10000,
        margin: 0,
        width: typeof width === 'number' ? `${width}px` : width,
        maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
        ...style,
      };

      if (side === 'bottom') {
        if (top + 160 > windowHeight) {
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
      if (isOpen) {
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
      }
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [isOpen, updatePosition]);

    // Handle outside click & escape key
    useEffect(() => {
      if (!isOpen) return;

      const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node;
        // If clicking inside the content or inside the trigger, do not close via outside listener
        if (contentRef.current?.contains(target)) {
          return;
        }
        if (triggerRef.current?.contains(target)) {
          return;
        }
        closeMenu();
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeMenu();
          triggerRef.current?.focus();
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
    }, [isOpen, closeMenu, contentRef, triggerRef]);

    if (!isOpen) return null;

    const handleRef = (node: HTMLDivElement | null) => {
      (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    const contentNode = (
      <div
        ref={handleRef}
        id={menuId}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        className={`rv-popoverContainer rv-popoverMenu ${className}`.trim()}
        style={positionStyle}
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

MenuContent.displayName = 'MenuContent';

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  preventClose?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ preventClose = false, className = '', children, onClick, disabled, ...props }, ref) => {
    const { closeMenu } = useMenu();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      if (!preventClose && !e.defaultPrevented) {
        closeMenu();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        className={`rv-listItem ${className}`.trim()}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';
