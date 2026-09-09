import React from 'react';

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    brand?: string;
}
declare const AppShell: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;
interface MainContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const MainContent: React.ForwardRefExoticComponent<MainContentProps & React.RefAttributes<HTMLDivElement>>;

interface CanvasProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    deviceMode?: 'desktop' | 'mobile';
    scrolledBottom?: boolean;
    className?: string;
}
declare const Canvas: React.ForwardRefExoticComponent<CanvasProps & React.RefAttributes<HTMLElement>>;
interface CanvasInnerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const CanvasInner: React.ForwardRefExoticComponent<CanvasInnerProps & React.RefAttributes<HTMLDivElement>>;
interface CanvasScrollProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
}
declare const CanvasScroll: React.ForwardRefExoticComponent<CanvasScrollProps & React.RefAttributes<HTMLDivElement>>;
interface CanvasContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const CanvasContent: React.ForwardRefExoticComponent<CanvasContentProps & React.RefAttributes<HTMLDivElement>>;
interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    selected?: boolean;
    className?: string;
}
declare const ComponentWrapper: React.ForwardRefExoticComponent<ComponentWrapperProps & React.RefAttributes<HTMLDivElement>>;
interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;

type SidebarState = 'full' | 'rail-only' | 'collapsed';
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    state?: SidebarState;
    className?: string;
    width?: number | string;
    onResize?: (deltaX: number) => void;
    resizable?: boolean;
    dataBuilderUi?: boolean;
    innerClassName?: string;
}
declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLElement>>;
interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    open?: boolean;
}
declare const SidebarBody: React.ForwardRefExoticComponent<SidebarBodyProps & React.RefAttributes<HTMLDivElement>>;
interface SidebarPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const SidebarPanel: React.ForwardRefExoticComponent<SidebarPanelProps & React.RefAttributes<HTMLDivElement>>;

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
