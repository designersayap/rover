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

interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    className?: string;
    dataBuilderUi?: boolean;
}
declare const Topbar: React.ForwardRefExoticComponent<TopbarProps & React.RefAttributes<HTMLElement>>;
interface TopbarLeftProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const TopbarLeft: React.ForwardRefExoticComponent<TopbarLeftProps & React.RefAttributes<HTMLDivElement>>;
interface TopbarRightProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const TopbarRight: React.ForwardRefExoticComponent<TopbarRightProps & React.RefAttributes<HTMLDivElement>>;
interface TopbarLogoProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const TopbarLogo: React.ForwardRefExoticComponent<TopbarLogoProps & React.RefAttributes<HTMLHeadingElement>>;

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onClose?: () => void;
    position?: {
        top: number;
        left: number;
    } | null;
    centerByDefault?: boolean;
    width?: number;
    className?: string;
    overlayClassName?: string;
    dataBuilderUi?: boolean;
    children?: React.ReactNode;
}
declare const Popover: React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<HTMLDivElement>>;
interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const PopoverHeader: React.ForwardRefExoticComponent<PopoverHeaderProps & React.RefAttributes<HTMLDivElement>>;
interface PopoverTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const PopoverTitle: React.ForwardRefExoticComponent<PopoverTitleProps & React.RefAttributes<HTMLSpanElement>>;
interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: TooltipPosition;
    delay?: number;
    className?: string;
    zIndex?: number;
}
declare const Tooltip: React.FC<TooltipProps>;

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onClose?: () => void;
    size?: ModalSize;
    width?: number | string;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    children?: React.ReactNode;
    overlayClassName?: string;
    portalTo?: HTMLElement | null;
    dataBuilderUi?: boolean;
}
declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>>;
interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    onClose?: () => void;
    showCloseButton?: boolean;
}
declare const ModalHeader: React.ForwardRefExoticComponent<ModalHeaderProps & React.RefAttributes<HTMLDivElement>>;
interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const ModalTitle: React.ForwardRefExoticComponent<ModalTitleProps & React.RefAttributes<HTMLHeadingElement>>;
interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const ModalDescription: React.ForwardRefExoticComponent<ModalDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const ModalBody: React.ForwardRefExoticComponent<ModalBodyProps & React.RefAttributes<HTMLDivElement>>;
interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}
declare const ModalFooter: React.ForwardRefExoticComponent<ModalFooterProps & React.RefAttributes<HTMLDivElement>>;

export { AppShell, type AppShellProps, Canvas, CanvasContent, type CanvasContentProps, CanvasInner, type CanvasInnerProps, type CanvasProps, CanvasScroll, type CanvasScrollProps, ComponentWrapper, type ComponentWrapperProps, EmptyState, type EmptyStateProps, MainContent, type MainContentProps, Modal, ModalBody, type ModalBodyProps, ModalDescription, type ModalDescriptionProps, ModalFooter, type ModalFooterProps, ModalHeader, type ModalHeaderProps, type ModalProps, type ModalSize, ModalTitle, type ModalTitleProps, Popover, PopoverContent, type PopoverContentProps, PopoverHeader, type PopoverHeaderProps, type PopoverProps, PopoverTitle, type PopoverTitleProps, type RailItem, ResizeHandle, type ResizeHandleProps, Sidebar, SidebarBody, type SidebarBodyProps, SidebarPanel, type SidebarPanelProps, type SidebarProps, SidebarRail, type SidebarRailProps, type SidebarState, Tooltip, type TooltipPosition, type TooltipProps, Topbar, TopbarLeft, type TopbarLeftProps, TopbarLogo, type TopbarLogoProps, type TopbarProps, TopbarRight, type TopbarRightProps };
