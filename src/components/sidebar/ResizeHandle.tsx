'use client';

import React, { useCallback, useEffect, useState } from 'react';

export interface ResizeHandleProps {
  onResize?: (deltaX: number) => void;
  onResizeEnd?: () => void;
  className?: string;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  onResize,
  onResizeEnd,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      onResize?.(e.movementX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onResizeEnd?.();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onResize, onResizeEnd]);

  return (
    <div
      className={`rv-resizeHandle ${isDragging ? 'rv-resizeHandleActive' : ''} ${className}`.trim()}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation="vertical"
    >
      <div className="rv-resizeHandleBar" />
    </div>
  );
};
