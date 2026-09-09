'use client';

import React from 'react';

export interface RailItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SidebarRailProps {
  items?: RailItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  itemHeight?: number;
  children?: React.ReactNode;
}

export const SidebarRail: React.FC<SidebarRailProps> = ({
  items = [],
  activeTab,
  onTabChange,
  className = '',
  itemHeight = 72,
  children,
}) => {
  const activeIndex = items.findIndex((item) => item.id === activeTab);
  const showIndicator = activeIndex >= 0;

  return (
    <div className={`rv-sidebarRail ${className}`.trim()}>
      {showIndicator && (
        <div
          className="rv-sidebarRailIndicator"
          style={{
            transform: `translateY(${activeIndex * itemHeight}px)`,
          }}
          aria-hidden="true"
        />
      )}
      {items.map((item) => {
        const isActive = item.id === activeTab;
        return (
          <button
            key={item.id}
            type="button"
            className={`rv-sidebarRailItem ${isActive ? 'rv-sidebarRailItemActive' : ''}`.trim()}
            onClick={() => onTabChange?.(item.id)}
            aria-selected={isActive}
          >
            {item.icon}
            <span className="rv-sidebarRailLabel">{item.label}</span>
          </button>
        );
      })}
      {children}
    </div>
  );
};
