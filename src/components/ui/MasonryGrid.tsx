'use client';

import React, { useEffect, useMemo, useRef, useState, HTMLAttributes } from 'react';

export type MasonryColumns = number | 'responsive' | {
  sm?: number; // < 520px
  md?: number; // < 820px
  lg?: number; // < 1180px
  xl?: number; // < 1520px
  xxl?: number; // < 1860px
  xxxl?: number; // >= 1860px
};

export interface MasonryGridProps<T = any> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  columns?: MasonryColumns;
  gap?: string | number;
  className?: string;
  emptyState?: React.ReactNode;
}

export function MasonryGrid<T = any>({
  items,
  renderItem,
  keyExtractor = (_item, idx) => idx,
  columns = 'responsive',
  gap,
  className = '',
  style,
  emptyState,
  ...props
}: MasonryGridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState<number>(() => {
    if (typeof columns === 'number') return columns;
    return 4;
  });

  useEffect(() => {
    if (typeof columns === 'number') {
      setColumnCount(columns);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const updateColumns = () => {
      const w = el.getBoundingClientRect().width || el.clientWidth;
      if (w <= 0) return;

      if (typeof columns === 'object') {
        if (w < 520 && columns.sm) setColumnCount(columns.sm);
        else if (w < 820 && columns.md) setColumnCount(columns.md);
        else if (w < 1180 && columns.lg) setColumnCount(columns.lg);
        else if (w < 1520 && columns.xl) setColumnCount(columns.xl);
        else if (w < 1860 && columns.xxl) setColumnCount(columns.xxl);
        else if (columns.xxxl) setColumnCount(columns.xxxl);
        return;
      }

      // Default responsive breakpoints
      if (w < 520) setColumnCount(1);
      else if (w < 820) setColumnCount(2);
      else if (w < 1180) setColumnCount(3);
      else if (w < 1520) setColumnCount(4);
      else if (w < 1860) setColumnCount(5);
      else setColumnCount(6);
    };

    updateColumns();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateColumns);
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      window.addEventListener('resize', updateColumns);
      return () => window.removeEventListener('resize', updateColumns);
    }
  }, [columns]);

  const columnBins = useMemo(() => {
    const validCols = Math.max(1, columnCount);
    const bins: { item: T; originalIndex: number }[][] = Array.from({ length: validCols }, () => []);
    items.forEach((item, idx) => {
      bins[idx % validCols].push({ item, originalIndex: idx });
    });
    return bins;
  }, [items, columnCount]);

  if (items.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div
      ref={containerRef}
      className={`rv-masonry ${className}`.trim()}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gap: gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined,
        ...style,
      }}
      {...props}
    >
      {columnBins.map((col, colIdx) => (
        <div
          key={colIdx}
          className="rv-masonryCol"
          style={{
            gap: gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined,
          }}
        >
          {col.map(({ item, originalIndex }) => (
            <div key={keyExtractor(item, originalIndex)} className="rv-masonryItem">
              {renderItem(item, originalIndex)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
