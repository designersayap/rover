// Ensure core CSS tokens and styling rules are imported
import './styles/index.css';

// Shell exports
export {
  AppShell,
  MainContent,
} from './components/shell/AppShell';

export type {
  AppShellProps,
  MainContentProps,
} from './components/shell/AppShell';

// Canvas exports
export {
  Canvas,
  CanvasInner,
  CanvasScroll,
  CanvasContent,
  ComponentWrapper,
  EmptyState,
} from './components/shell/Canvas';

export type {
  CanvasProps,
  CanvasInnerProps,
  CanvasScrollProps,
  CanvasContentProps,
  ComponentWrapperProps,
  EmptyStateProps,
} from './components/shell/Canvas';

// Sidebar exports
export {
  Sidebar,
  SidebarBody,
  SidebarPanel,
} from './components/sidebar/Sidebar';

export type {
  SidebarProps,
  SidebarState,
  SidebarBodyProps,
  SidebarPanelProps,
} from './components/sidebar/Sidebar';

export {
  SidebarRail,
} from './components/sidebar/SidebarRail';

export type {
  SidebarRailProps,
  RailItem,
} from './components/sidebar/SidebarRail';

export {
  ResizeHandle,
} from './components/sidebar/ResizeHandle';

export type {
  ResizeHandleProps,
} from './components/sidebar/ResizeHandle';

// Topbar exports
export {
  Topbar,
  TopbarLeft,
  TopbarRight,
  TopbarLogo,
} from './components/topbar/Topbar';

export type {
  TopbarProps,
  TopbarLeftProps,
  TopbarRightProps,
  TopbarLogoProps,
} from './components/topbar/Topbar';

// Overlays exports
export {
  Popover,
  PopoverHeader,
  PopoverTitle,
  PopoverContent,
} from './components/overlays/Popover';

export type {
  PopoverProps,
  PopoverHeaderProps,
  PopoverTitleProps,
  PopoverContentProps,
} from './components/overlays/Popover';

export {
  Tooltip,
} from './components/overlays/Tooltip';

export type {
  TooltipProps,
  TooltipPosition,
} from './components/overlays/Tooltip';

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from './components/overlays/Modal';

export type {
  ModalProps,
  ModalSize,
  ModalHeaderProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalBodyProps,
  ModalFooterProps,
} from './components/overlays/Modal';

export {
  Dialog,
} from './components/overlays/Dialog';

export type {
  DialogProps,
  DialogActionVariant,
} from './components/overlays/Dialog';

// UI Primitives exports
export {
  Chip,
  ChipGroup,
} from './components/ui/Chip';

export type {
  ChipProps,
  ChipGroupProps,
} from './components/ui/Chip';

export {
  Dropzone,
} from './components/ui/Dropzone';

export type {
  DropzoneProps,
  DropzoneRef,
} from './components/ui/Dropzone';

export {
  MediaCard,
} from './components/ui/MediaCard';

export type {
  MediaCardProps,
} from './components/ui/MediaCard';

export {
  SplitButton,
  SplitButtonMain,
  SplitButtonToggle,
} from './components/ui/SplitButton';

export type {
  SplitButtonProps,
  SplitButtonMainProps,
  SplitButtonToggleProps,
  SplitButtonVariant,
} from './components/ui/SplitButton';



