'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface MobileSidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  drawerClassName?: string;
  width?: string | number;
  container?: HTMLElement | null;
  style?: React.CSSProperties;
  'aria-label'?: string;
  showGrabHandle?: boolean;
}

export const MobileSidebarDrawer: React.FC<MobileSidebarDrawerProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  overlayClassName = '',
  drawerClassName = '',
  width,
  container,
  style,
  'aria-label': ariaLabel = 'Mobile navigation menu',
  showGrabHandle = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const target = container || (typeof document !== 'undefined' ? document.body : null);
  if (!target) return null;

  const drawerStyle: React.CSSProperties = {
    ...(width !== undefined
      ? { width: typeof width === 'number' ? `${width}px` : width }
      : {}),
    ...style,
  };

  return createPortal(
    <div
      className={`rv-mobileSidebarOverlay rv-mobileSidebarOpen ${overlayClassName} ${className}`.trim()}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div
        className={`rv-mobileSidebarBottomSheet rv-mobileSidebarBottomSheetOpen ${drawerClassName}`.trim()}
        onClick={(e) => e.stopPropagation()}
        style={drawerStyle}
      >
        {showGrabHandle && (
          <div className="rv-sidepanelGrabHandleWrap" style={{ display: 'flex' }}>
            <div className="rv-sidepanelGrabHandle" />
          </div>
        )}
        {children}
      </div>
    </div>,
    target
  );
};
