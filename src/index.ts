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
