import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';

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
    variant?: 'default' | 'menu';
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
interface PopoverMenuProps extends PopoverProps {
}
declare const PopoverMenu: React.ForwardRefExoticComponent<PopoverMenuProps & React.RefAttributes<HTMLDivElement>>;

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

type DialogActionVariant = 'primary' | 'brand' | 'danger' | 'secondary' | 'ghost';
interface DialogProps extends Omit<ModalProps, 'title' | 'onSubmit'> {
    /** Title of the dialog. Displayed in the header without a close button by default. */
    title: React.ReactNode;
    /** Subtitle or description. Rendered in header if children exist, or in body if no children. */
    description?: React.ReactNode;
    /** Dialog body content. Rendered inside ModalBody. */
    children?: React.ReactNode;
    /** Text or element for the cancel button. Defaults to 'Cancel'. */
    cancelLabel?: React.ReactNode;
    /** Click handler for cancel button. Defaults to onClose. */
    onCancel?: () => void;
    /** Whether to show the cancel button. Defaults to true. */
    showCancel?: boolean;
    /** Text or element for the primary action button. Defaults to 'Confirm'. */
    actionLabel?: React.ReactNode;
    /** Visual variant of the primary action button. Defaults to 'primary'. */
    actionVariant?: DialogActionVariant;
    /** Type attribute of the primary action button. Defaults to 'submit' if onSubmit is set, else 'button'. */
    actionType?: 'button' | 'submit';
    /** Click handler for the primary action button. */
    onAction?: () => void;
    /** Whether the primary action is in a loading state. */
    isActionLoading?: boolean;
    /** Whether the primary action is disabled. */
    isActionDisabled?: boolean;
    /** Form submission handler. If provided, dialog body and footer are wrapped in a form. */
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    /** Custom footer to replace the default cancel and action buttons. */
    footer?: React.ReactNode;
    /** Whether to show the close ('X') button on the header. Defaults to false. */
    showCloseButton?: boolean;
}
/**
 * Standardized Dialog layout component for Rover.
 * Follows Rover dialog format rules:
 * 1. Clean Title with no close button by default
 * 2. Flexible body hosting form inputs or description
 * 3. Standardized footer with Cancel button and primary action
 */
declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}
declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLButtonElement>>;
interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
declare const ChipGroup: React.ForwardRefExoticComponent<ChipGroupProps & React.RefAttributes<HTMLDivElement>>;

interface DropzoneRef {
    open: () => void;
}
interface DropzoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'> {
    onDropFiles?: (files: FileList) => void;
    title?: string;
    hint?: string;
    icon?: React.ReactNode;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
}
declare const Dropzone: React.ForwardRefExoticComponent<DropzoneProps & React.RefAttributes<DropzoneRef>>;

interface MediaCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    src: string;
    alt?: string;
    variant?: 'tile' | 'list';
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    selected?: boolean;
    badge?: React.ReactNode;
    overlay?: React.ReactNode;
}
declare const MediaCard: React.ForwardRefExoticComponent<MediaCardProps & React.RefAttributes<HTMLDivElement>>;

type SplitButtonVariant = 'primary' | 'secondary' | 'brand' | 'danger' | 'ghost';
interface SplitButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle'> {
    variant?: SplitButtonVariant;
    disabled?: boolean;
    onAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    actionAriaLabel?: string;
    toggleAriaLabel?: string;
    isToggleActive?: boolean;
    actionIcon?: React.ReactNode;
    toggleIcon?: React.ReactNode;
    children?: React.ReactNode;
}
interface SplitButtonMainProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: SplitButtonVariant;
}
declare const SplitButtonMain: React.ForwardRefExoticComponent<SplitButtonMainProps & React.RefAttributes<HTMLButtonElement>>;
interface SplitButtonToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: SplitButtonVariant;
    isActive?: boolean;
}
declare const SplitButtonToggle: React.ForwardRefExoticComponent<SplitButtonToggleProps & React.RefAttributes<HTMLButtonElement>>;
declare const SplitButton: React.ForwardRefExoticComponent<SplitButtonProps & React.RefAttributes<HTMLDivElement>>;

export { AppShell, type AppShellProps, Canvas, CanvasContent, type CanvasContentProps, CanvasInner, type CanvasInnerProps, type CanvasProps, CanvasScroll, type CanvasScrollProps, Chip, ChipGroup, type ChipGroupProps, type ChipProps, ComponentWrapper, type ComponentWrapperProps, Dialog, type DialogActionVariant, type DialogProps, Dropzone, type DropzoneProps, type DropzoneRef, EmptyState, type EmptyStateProps, MainContent, type MainContentProps, MediaCard, type MediaCardProps, Modal, ModalBody, type ModalBodyProps, ModalDescription, type ModalDescriptionProps, ModalFooter, type ModalFooterProps, ModalHeader, type ModalHeaderProps, type ModalProps, type ModalSize, ModalTitle, type ModalTitleProps, Popover, PopoverContent, type PopoverContentProps, PopoverHeader, type PopoverHeaderProps, PopoverMenu, type PopoverMenuProps, type PopoverProps, PopoverTitle, type PopoverTitleProps, type RailItem, ResizeHandle, type ResizeHandleProps, Sidebar, SidebarBody, type SidebarBodyProps, SidebarPanel, type SidebarPanelProps, type SidebarProps, SidebarRail, type SidebarRailProps, type SidebarState, SplitButton, SplitButtonMain, type SplitButtonMainProps, type SplitButtonProps, SplitButtonToggle, type SplitButtonToggleProps, type SplitButtonVariant, Tooltip, type TooltipPosition, type TooltipProps, Topbar, TopbarLeft, type TopbarLeftProps, TopbarLogo, type TopbarLogoProps, type TopbarProps, TopbarRight, type TopbarRightProps };
