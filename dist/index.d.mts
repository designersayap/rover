import React from 'react';

interface AppShellProps {
    children?: React.ReactNode;
    className?: string;
    brand?: string;
    style?: React.CSSProperties;
}
declare const AppShell: React.FC<AppShellProps>;
interface MainContentProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
declare const MainContent: React.FC<MainContentProps>;

interface CanvasProps {
    children?: React.ReactNode;
    deviceMode?: 'desktop' | 'mobile';
    scrolledBottom?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const Canvas: React.FC<CanvasProps>;
interface CanvasInnerProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
declare const CanvasInner: React.FC<CanvasInnerProps>;
interface CanvasScrollProps {
    children?: React.ReactNode;
    className?: string;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    ref?: React.Ref<HTMLDivElement>;
}
declare const CanvasScroll: React.ForwardRefExoticComponent<Omit<CanvasScrollProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface CanvasContentProps {
    children?: React.ReactNode;
    className?: string;
}
declare const CanvasContent: React.FC<CanvasContentProps>;
interface ComponentWrapperProps {
    children?: React.ReactNode;
    selected?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    id?: string;
}
declare const ComponentWrapper: React.FC<ComponentWrapperProps>;
interface EmptyStateProps {
    children?: React.ReactNode;
    className?: string;
}
declare const EmptyState: React.FC<EmptyStateProps>;

type SidebarState = 'full' | 'rail-only' | 'collapsed';
interface SidebarProps {
    children?: React.ReactNode;
    state?: SidebarState;
    className?: string;
    width?: number | string;
    onResize?: (deltaX: number) => void;
    resizable?: boolean;
    style?: React.CSSProperties;
    dataBuilderUi?: boolean;
}
declare const Sidebar: React.FC<SidebarProps>;
interface SidebarBodyProps {
    children?: React.ReactNode;
    className?: string;
}
declare const SidebarBody: React.FC<SidebarBodyProps>;
interface SidebarPanelProps {
    children?: React.ReactNode;
    className?: string;
}
declare const SidebarPanel: React.FC<SidebarPanelProps>;

interface RailItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}
interface SidebarRailProps {
    items?: RailItem[];
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
    itemHeight?: number;
    children?: React.ReactNode;
}
declare const SidebarRail: React.FC<SidebarRailProps>;

interface ResizeHandleProps {
    onResize?: (deltaX: number) => void;
    onResizeEnd?: () => void;
    className?: string;
}
declare const ResizeHandle: React.FC<ResizeHandleProps>;

export { AppShell, type AppShellProps, Canvas, CanvasContent, type CanvasContentProps, CanvasInner, type CanvasInnerProps, type CanvasProps, CanvasScroll, type CanvasScrollProps, ComponentWrapper, type ComponentWrapperProps, EmptyState, type EmptyStateProps, MainContent, type MainContentProps, type RailItem, ResizeHandle, type ResizeHandleProps, Sidebar, SidebarBody, type SidebarBodyProps, SidebarPanel, type SidebarPanelProps, type SidebarProps, SidebarRail, type SidebarRailProps, type SidebarState };
