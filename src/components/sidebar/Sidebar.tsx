'use client';

import React from 'react';
import { ResizeHandle } from './ResizeHandle';
import { MobileSidebarDrawer } from './MobileSidebarDrawer';

export type SidebarState = 'full' | 'rail-only' | 'collapsed';
export type SidebarVariant = 'in-flow' | 'floating';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  state?: SidebarState;
  variant?: SidebarVariant;
  floating?: boolean;
  className?: string;
  width?: number | string;
  onResize?: (deltaX: number) => void;
  resizable?: boolean;
  dataBuilderUi?: boolean;
  innerClassName?: string;
  onClose?: () => void;
  /**
   * Responsive Mobile Off-Canvas Drawer Support
   */
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  mobileContent?: React.ReactNode;
  mobileDrawerClassName?: string;
  mobileOverlayClassName?: string;
  mobileDrawerWidth?: string | number;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      state = 'full',
      variant = 'in-flow',
      floating = false,
      className = '',
      width,
      onResize,
      resizable = false,
      style,
      dataBuilderUi = true,
      innerClassName = '',
      onClose,
      mobileOpen = false,
      onCloseMobile,
      mobileContent,
      mobileDrawerClassName = '',
      mobileOverlayClassName = '',
      mobileDrawerWidth,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLElement | null>(null);
    React.useImperativeHandle(ref, () => internalRef.current as HTMLElement);

    const isFloating = floating || variant === 'floating';
    const variantClass = isFloating ? 'rv-sidebarShellFloating' : '';

    const stateClass =
      state === 'rail-only'
        ? 'rv-sidebarRailOnly'
        : state === 'collapsed'
        ? 'rv-sidebarCollapsed'
        : '';

    // Handle outside click & Escape key dismissal for floating sidebar
    React.useEffect(() => {
      if (!isFloating || state === 'collapsed' || !onClose) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      const handlePointerDown = (e: MouseEvent | TouchEvent) => {
        if (
          internalRef.current &&
          !internalRef.current.contains(e.target as Node)
        ) {
          const targetEl = e.target as HTMLElement;
          if (targetEl.closest?.('.rv-sidebarToggle')) return;
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('pointerdown', handlePointerDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('pointerdown', handlePointerDown);
      };
    }, [isFloating, state, onClose]);

    const inlineStyle: React.CSSProperties = {
      ...style,
      ...(width !== undefined && state === 'full'
        ? { width: typeof width === 'number' ? `${width}px` : width }
        : {}),
    };

    return (
      <>
        <aside
          ref={internalRef}
          className={`rv-sidebarShell ${variantClass} ${stateClass} ${className}`.trim()}
          style={inlineStyle}
          data-builder-ui={dataBuilderUi ? 'true' : undefined}
          {...props}
        >
          <div className={`rv-sidebar ${innerClassName}`.trim()}>
            {children}
            {resizable && state === 'full' && <ResizeHandle onResize={onResize} />}
          </div>
        </aside>

        {/* Standard Responsive Mobile Drawer */}
        {mobileOpen && (
          <MobileSidebarDrawer
            isOpen={mobileOpen}
            onClose={onCloseMobile || (() => {})}
            className={mobileOverlayClassName}
            drawerClassName={mobileDrawerClassName}
            width={mobileDrawerWidth}
          >
            {mobileContent !== undefined ? (
              mobileContent
            ) : (
              <div className={`rv-sidebarShell ${stateClass} ${className}`.trim()} style={{ height: '100%', width: '100%', display: 'flex' }}>
                <div className={`rv-sidebar ${innerClassName}`.trim()} style={{ height: '100%', margin: 0 }}>
                  {children}
                </div>
              </div>
            )}
          </MobileSidebarDrawer>
        )}
      </>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
}

export const SidebarBody = React.forwardRef<HTMLDivElement, SidebarBodyProps>(
  ({ children, className = '', open, ...props }, ref) => {
    const openClass = open ? 'rv-sidebarBodyOpen' : '';
    return (
      <div
        ref={ref}
        className={`rv-sidebarBody ${openClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarBody.displayName = 'SidebarBody';

export interface SidebarPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const SidebarPanel = React.forwardRef<HTMLDivElement, SidebarPanelProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rv-sidebarPanel ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarPanel.displayName = 'SidebarPanel';

export { MobileSidebarDrawer };
export type { MobileSidebarDrawerProps } from './MobileSidebarDrawer';
