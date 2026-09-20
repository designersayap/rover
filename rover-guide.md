# Rover AI Developer & Component Guide (`rover-guide.md`)

> **Target Audience**: AI Agents (e.g. Antigravity, Claude, ChatGPT) and Software Engineers building interfaces with Rover.
> **Role of Rover**: Multi-brand tokenized core UI design system and React component library tailored for page builder interfaces (notably the [Lunar](file:///Users/hapradan/Documents/Office/lunar%20workspace/lunar) page builder).

---

## 1. Quick Start & Mental Model

Rover has a **dual nature**:
1. **React Component Library (`from 'rover'`)**: High-level structural building blocks for the editor environment (`AppShell`, `Canvas`, `Sidebar`, `Topbar`, `Popover`, `Tooltip`). All components are client-safe (`'use client'`), support `ref` forwarding, and accept standard HTML attributes.
2. **CSS Design System (`rover/styles`)**: An atomic, multi-brand token system prefixed with `.rv-*` for styling both the builder frame and builder controls (buttons, inputs, toggles, badges, tree rows).

### Installation & Basic Setup

```bash
npm install rover
# or directly from GitHub
npm install github:designersayap/rover
```

### Next.js App Router Setup

In the root layout (e.g. `app/layout.js`):
```javascript
import 'rover/styles'; // Injects full token + CSS bundle
```

In any builder page or component (e.g. `app/page.js`):
```tsx
'use client';

import {
  AppShell,
  MainContent,
  Sidebar,
  SidebarRail,
  Topbar,
  Canvas,
  CanvasScroll,
  CanvasContent,
} from 'rover';
```

---

## 2. Multi-Brand Token Architecture

Rover's theme styling is driven by CSS variables under `data-rv-brand` scopes. If no brand attribute is defined, it defaults to `lunar`.

```html
<!-- Default Lunar Brand -->
<body data-rv-brand="lunar">

<!-- Switch to Apollo Brand -->
<body data-rv-brand="apollo">

<!-- Scoped Sub-Tree (e.g., brand preview inside an editor canvas) -->
<div data-rv-brand="apollo">...</div>
```

### Brand Profiles

| Brand | Font Family | Style Aesthetic | Primary Accent | Base Tone |
| :--- | :--- | :--- | :--- | :--- |
| **`lunar`** (default) | `'Plus Jakarta Sans'` | Soft, rounded, deep dark | `#1976d2` (Blue) | `#121212` |
| **`apollo`** | `'Inter'` | Sharp, tech-forward, slate | `#9333ea` (Purple) | `#121212` |

### Core Design Tokens Reference (`--rv-*`)

When generating custom CSS or inline styles, **always** prefer these tokens over hardcoded hex values or pixel numbers:

#### A. Accent & Status Colors
- `--rv-brand-primary`: Brand accent color
- `--rv-brand-primary-hover`: Hover state accent
- `--rv-brand-primary-active`: Pressed state accent
- `--rv-brand-primary-light`: Muted highlight tone
- `--rv-brand-primary-subtle`: Very subtle background tint
- `--rv-danger`: `#ef4444` (Error/Destructive)
- `--rv-success`: `#22c55e` (Confirmation/Live status)
- `--rv-warning`: `#f59e0b` (Alerts/Draft status)

#### B. Neutrals (Dark Theme Scale)
- `--rv-white`: `#ffffff`
- `--rv-black`: `#000000`
- `--rv-neutral-50`: `#ffffff` (Bright foreground)
- `--rv-neutral-75`: `#d1d1d1` (Muted labels)
- `--rv-neutral-100`: `#a0a0a0` (Secondary text, icons)
- `--rv-neutral-200`: `#404040` (Subtle borders)
- `--rv-neutral-300`: `#2b2b2b` (Elevated surfaces, card backgrounds)
- `--rv-neutral-400`: `#1e1e1e` (Default background, button base, borders)
- `--rv-neutral-500`: `#121212` (Deepest canvas & backdrop background)

#### C. Spacing Scale
- `--rv-space-xs`: `4px`
- `--rv-space-sm`: `8px`
- `--rv-space-md`: `12px`
- `--rv-space-lg`: `16px`
- `--rv-space-xl`: `24px`

#### D. Typography Scale
- `--rv-font-family-default`: Primary sans font (e.g. Plus Jakarta Sans / Inter)
- `--rv-font-family-mono`: Monospace font stack for code/JSON
- `--rv-font-size-xs`: `9px`
- `--rv-font-size-sm`: `12px`
- `--rv-font-size-md`: `13px` (Apollo: `14px`)
- `--rv-font-size-lg`: `16px`
- `--rv-font-size-xl`: `20px`
- `--rv-font-weight-regular`: `400`
- `--rv-font-weight-medium`: `500`
- `--rv-font-weight-bold`: `700`

#### E. Radii & Geometry
- `--rv-radius-xs`: `4px`
- `--rv-radius-sm`: `8px`
- `--rv-radius-md`: `12px` (Apollo: `24px`)
- `--rv-radius-lg`: `20px` (Apollo: `32px`)
- `--rv-radius-button`: `12px` (Apollo: `6px`)
- `--rv-brand-radius-button`: Evaluates to `--rv-radius-button`
- `--rv-radius-round`: `9999px`

#### F. Layout Dimensions
- `--rv-h-topbar`: `64px` (Builder topbar height)
- `--rv-h-btn`: `36px` (Standard control button height)
- `--rv-w-sidebar`: `360px` (Full expanded sidebar width)
- `--rv-w-sidebar-rail`: `92px` (Sidebar navigation rail width)
- `--rv-w-pop`: `362px` (Standard popover width)

---

## 3. React Components API Reference

All components are imported directly from `'rover'`.

### 3.1 App Shell (`AppShell`, `MainContent`)

Encapsulates the full viewport and layout boundaries.

```tsx
import { AppShell, MainContent } from 'rover';

<AppShell brand="lunar">
  {/* Sidebars, Topbars, Modals go here */}
  <MainContent>
    {/* Canvas or workspace goes here */}
  </MainContent>
</AppShell>
```

#### Props: `AppShell`
- `brand?: string`: Sets `data-rv-brand={brand}` (defaults to `'lunar'`).
- `className?: string`: Additional classes appended to `.rv-container`.
- Extends: `React.HTMLAttributes<HTMLDivElement>`.

#### Props: `MainContent`
- `className?: string`: Additional classes appended to `.rv-mainContent`.
- Extends: `React.HTMLAttributes<HTMLDivElement>`.

---

### 3.2 Canvas & Viewport (`Canvas`, `CanvasInner`, `CanvasScroll`, `CanvasContent`, `ComponentWrapper`, `EmptyState`)

Provides the isolated page preview viewport with device switching and selection bounds.

```tsx
import {
  Canvas,
  CanvasInner,
  CanvasScroll,
  CanvasContent,
  ComponentWrapper,
  EmptyState,
} from 'rover';

<Canvas deviceMode={isMobile ? 'mobile' : 'desktop'} scrolledBottom={hasReachedBottom}>
  <CanvasInner>
    <CanvasScroll onScroll={handleScroll}>
      <CanvasContent>
        {blocks.length === 0 ? (
          <EmptyState>No components added yet. Drag or add from sidebar.</EmptyState>
        ) : (
          blocks.map((block) => (
            <ComponentWrapper key={block.id} selected={selectedId === block.id}>
              <MyComponent data={block} />
            </ComponentWrapper>
          ))
        )}
      </CanvasContent>
    </CanvasScroll>
  </CanvasInner>
</Canvas>
```

#### Props:
- `Canvas`:
  - `deviceMode?: 'desktop' | 'mobile'` (applies `.rv-canvasDesktop` or `.rv-canvasMobile` frame sizing)
  - `scrolledBottom?: boolean` (applies bottom fade shadow)
  - Extends: `React.HTMLAttributes<HTMLElement>`
- `CanvasScroll`:
  - `onScroll?: React.UIEventHandler<HTMLDivElement>`
  - Extends: `React.HTMLAttributes<HTMLDivElement>`
- `ComponentWrapper`:
  - `selected?: boolean` (adds `.rv-componentSelected` border & highlight)
  - Extends: `React.HTMLAttributes<HTMLDivElement>`
- `EmptyState`:
  - `children?: React.ReactNode` (message or call-to-action rendered inside `.rv-emptyStateText`)

---

### 3.3 Sidebar (`Sidebar`, `SidebarRail`, `SidebarBody`, `SidebarPanel`, `MobileSidebarDrawer`, `ResizeHandle`)

Supports multi-state sidebars: full panel, icon-only rail, completely collapsed, and responsive mobile off-canvas side drawers.

```tsx
import {
  Sidebar,
  SidebarRail,
  SidebarBody,
  SidebarPanel,
  MobileSidebarDrawer,
} from 'rover';

<Sidebar
  state={sidebarState} // 'full' | 'rail-only' | 'collapsed'
  width={sidebarWidth}  // number in px or string
  resizable={true}
  onResize={(deltaX) => setSidebarWidth(prev => prev + deltaX)}
  // Responsive Mobile Off-Canvas Drawer Support
  mobileOpen={isMobileOpen}
  onCloseMobile={() => setIsMobileOpen(false)}
  mobileContent={/* Optional custom mobile navigation content */}
>
  {/* Leftmost Icon Rail */}
  <SidebarRail
    items={[
      { id: 'layers', label: 'Layers', icon: <LayersIcon /> },
      { id: 'blocks', label: 'Add', icon: <PlusIcon /> },
      { id: 'settings', label: 'Theme', icon: <PaletteIcon /> },
    ]}
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />

  {/* Drawer / Property Panels */}
  <SidebarBody open={sidebarState === 'full'}>
    <SidebarPanel>
      <h3>{activeTab}</h3>
      {/* Panel contents */}
    </SidebarPanel>
  </SidebarBody>
</Sidebar>
```

#### Props:
- `Sidebar`:
  - `state?: 'full' | 'rail-only' | 'collapsed'`
  - `width?: number | string` (applied inline when `state === 'full'`)
  - `resizable?: boolean` (renders an interactive `ResizeHandle` on the edge)
  - `onResize?: (deltaX: number) => void`
  - `dataBuilderUi?: boolean` (default `true`)
  - `mobileOpen?: boolean` (controls mobile floating side drawer visibility)
  - `onCloseMobile?: () => void` (triggered on backdrop click, Topbar toggle, or `Escape` key)
  - `mobileContent?: React.ReactNode` (custom mobile menu content; rendered inside the floating side drawer)
  - `mobileDrawerWidth?: string | number`
  - `mobileDrawerClassName?: string`
  - Extends: `React.HTMLAttributes<HTMLElement>`
- `MobileSidebarDrawer`:
  - `isOpen: boolean`
  - `onClose: () => void`
  - `children?: React.ReactNode`
  - `width?: string | number`
- `SidebarRail`:
  - `items: RailItem[]` (`{ id: string; label: string; icon?: React.ReactNode }`)
  - `activeTab?: string`
  - `onTabChange?: (tabId: string) => void`
  - `itemHeight?: number` (default `72` px for active indicator slide calculation)
- `SidebarBody`:
  - `open?: boolean` (adds `.rv-sidebarBodyOpen`)
- `ResizeHandle`:
  - `onResize?: (deltaX: number) => void`
  - `onResizeEnd?: () => void`

---

### 3.4 Topbar (`Topbar`, `TopbarLeft`, `TopbarRight`, `TopbarLogo`, `SidebarToggle`)

```tsx
import {
  Topbar,
  TopbarLeft,
  TopbarRight,
  TopbarLogo,
  SidebarToggle,
} from 'rover';

<Topbar>
  <TopbarLeft>
    <SidebarToggle
      hideOnMobile={true} // Set to true to hide toggle on mobile/tablet (e.g. for Lunar bottom nav)
      isOpen={isSidebarOpen}
      onClick={toggleSidebar}
    />
    <TopbarLogo>Lunar Studio</TopbarLogo>
    {/* Page selector or breadcrumbs */}
  </TopbarLeft>
  <TopbarRight>
    <button type="button" className="rv-btn rv-btnSecondary">Preview</button>
    <button type="button" className="rv-btn rv-btnBrand">Publish</button>
  </TopbarRight>
</Topbar>
```

#### Props:
- `Topbar`: Extends `React.HTMLAttributes<HTMLElement>` (`dataBuilderUi?: boolean`).
- `TopbarLeft`, `TopbarRight`: Extends `React.HTMLAttributes<HTMLDivElement>`.
- `TopbarLogo`: Extends `React.HTMLAttributes<HTMLHeadingElement>` (renders `<h1>`).

---

### 3.5 Overlays (`Menu`, `Popover`, `Tooltip`, `Modal`, `Dialog`)

#### Overlay Selection Rule: `Menu` vs `Popover`
- **Use `Menu` (`Menu`, `MenuTrigger`, `MenuContent`, `MenuItem`)**: Strictly for lists of actions and commands (*Rename, Duplicate, Delete*). Automatically executes the action and closes on item click.
- **Use `Popover` (`Popover`, `PopoverHeader`, `PopoverContent`)**: For floating forms, rich dialogs, and interactive widgets (*New Staging Page, Color Pickers*). Stays open while typing and interacting inside.
- **Interaction Standards**: Both must toggle cleanly on trigger click (no `mousedown` race conditions), dismiss on click-outside (while ignoring trigger button clicks), dismiss on `Escape`, and clamp to viewport boundaries.

#### Menu (Compound Action Menu)
Standardized action menu with built-in trigger management, edge-collision detection, and outside-click handling.

```tsx
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from 'rover';

<Menu>
  <MenuTrigger asChild>
    <button type="button" className="rv-btn rv-btnGhost rv-btnIcon">
      <MoreHorizontal className="rv-iconSm" />
    </button>
  </MenuTrigger>
  <MenuContent align="end" side="bottom" width={140}>
    <MenuItem onClick={handleRename}>
      <Pencil className="rv-iconXs" />
      <span>Rename</span>
    </MenuItem>
    <MenuItem onClick={handleDelete} className="rv-textDanger">
      <Trash2 className="rv-iconXs" />
      <span>Delete</span>
    </MenuItem>
  </MenuContent>
</Menu>
```

#### Popover (Rich Form & Dialog Overlays)
Standardized compound floating container for interactive forms, inputs, and rich widgets with automatic anchor positioning, smart screen edge clamping, and outside-click dismissal.

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from 'rover';

<Popover>
  {/* 1. Trigger (Rover manages toggle and aria-expanded) */}
  <PopoverTrigger asChild>
    <button className="rv-btn rv-btnSecondary">
      <span>Export</span>
      <ChevronDown className="rv-iconXs" />
    </button>
  </PopoverTrigger>

  {/* 2. Content (Fully customizable forms, inputs, and actions) */}
  <PopoverContent align="end" side="bottom" width={320}>
    <PopoverHeader>
      <PopoverTitle>New Staging Page</PopoverTitle>
    </PopoverHeader>
    <div className="rv-pSm">
      <input type="text" placeholder="folder-name" className="rv-formInput" />
      <button type="button" className="rv-btn rv-btnBrand rv-wFull rv-mtSm">
        Create Staging
      </button>
    </div>
  </PopoverContent>
</Popover>
```

#### Tooltip
Delayed portaled tooltip attaching to any child element without wrapper div disruption (`display: contents`).

```tsx
import { Tooltip } from 'rover';

<Tooltip content="Toggle Desktop View" position="bottom" delay={300}>
  <button type="button" className="rv-btn rv-btnGhost rv-btnIcon">
    <DesktopIcon />
  </button>
</Tooltip>
```

#### Props: `Tooltip`
- `content: React.ReactNode`: Tooltip label or markup.
- `children: React.ReactNode`: Trigger element.
- `position?: 'top' | 'bottom' | 'left' | 'right'` (default `'top'`).
- `delay?: number` (ms before showing, default `500`).
- `zIndex?: number` (default `9999`).

#### Modal
Portaled, accessible modal dialog with backdrop blur, keyboard Escape closing, body scroll locking, and predefined sizes.

```tsx
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter
} from 'rover';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  size="md" // 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick={true}
  closeOnEsc={true}
>
  <ModalHeader onClose={() => setIsModalOpen(false)} showCloseButton={true}>
    <ModalTitle>Delete Chat?</ModalTitle>
    <ModalDescription>This action cannot be undone.</ModalDescription>
  </ModalHeader>
  <ModalBody>
    <p>Are you sure you want to permanently delete this chat session?</p>
  </ModalBody>
  <ModalFooter>
    <button type="button" className="rv-btn rv-btnGhost" onClick={() => setIsModalOpen(false)}>
      Cancel
    </button>
    <button type="button" className="rv-btn rv-btnPrimary" onClick={handleConfirm}>
      Confirm
    </button>
  </ModalFooter>
</Modal>
```

#### Props: `Modal`
- `isOpen?: boolean` (default `false`): Controls modal visibility.
- `onClose?: () => void`: Callback triggered on backdrop click, Escape key, or close button.
- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` (default `'md'`).
- `width?: number | string`: Custom container width override.
- `closeOnOverlayClick?: boolean` (default `true`).
- `closeOnEsc?: boolean` (default `true`).
- `portalTo?: HTMLElement`: Target portal container (defaults to `document.body`).

---

### 3.6 Reusable UI Primitives (`Chip`, `Dropzone`, `MediaCard`, `SplitButton`)

These primitives provide standardized UI components across Lunar (Page Builder) and Apollo (Media Studio).

#### Chip & ChipGroup
Interactive pills for categories, tags, and filters.

```tsx
import { Chip, ChipGroup } from 'rover';

<ChipGroup>
  {categories.map((cat) => (
    <Chip
      key={cat.id}
      active={selectedCategory === cat.id}
      onClick={() => setSelectedCategory(cat.id)}
    >
      {cat.label}
    </Chip>
  ))}
</ChipGroup>
```

#### Dropzone
Drag-and-drop file uploader with built-in input triggering, drag-over highlights, and built-in uploaded preview card (`.rv-dropzoneCard`) with zero layout shift.

```tsx
import { Dropzone } from 'rover';

// 1. Standard Upload Mode
<Dropzone
  accept="image/*"
  onDropFiles={(files) => handleUpload(files)}
  title="Upload Brand Logo"
  hint="Drag & drop image here or click to browse (PNG, JPG, SVG, WEBP)"
/>

// 2. Uploaded Preview Mode (retains dashed dropzone with inner .rv-dropzoneCard surface)
<Dropzone
  accept="image/*"
  previewUrl={logoUrl}
  previewTitle="Logo uploaded"
  previewHint="Drag new file or click trash to remove"
  onRemove={() => setLogoUrl('')}
  onDropFiles={(files) => handleUpload(files)}
/>
```

#### MediaCard
Aspect-ratio media thumbnail card supporting dynamic aspect ratios, `'tile'` (grid card), and `'list'` (compact row) variants with hover action overlays, title, subtitle, and status badges.

```tsx
import { MediaCard } from 'rover';

// Dynamic Aspect Ratio / Masonry Card:
<MediaCard
  aspectRatio="16:9" // or "9:16", "1:1", "4:5"
  src="/mock/image.jpg"
  alt="Sample Preview"
  title="Hero Banner"
  selected={isSelected}
  badge={<span className="rv-badge">16:9</span>}
  actions={
    <button className="rv-btn rv-btnSecondary rv-btnIcon">
      <Zap />
    </button>
  }
/>

// Tile Variant (Default / Grid):
<MediaCard
  variant="tile"
  src="/mock/image.jpg"
  alt="Sample Preview"
  title="Hero Banner"
  selected={isSelected}
  onClick={() => setSelectedId(id)}
  badge={<span>New</span>}
/>

// List Variant (Compact Row with Small Image):
<MediaCard
  variant="list"
  src="/mock/image.jpg"
  alt="Sample Preview"
  title="Background - Full Body"
  subtitle="Header component"
  selected={isSelected}
  onClick={() => setSelectedId(id)}
/>
```

#### MasonryGrid
A responsive, zero-layout-shift column-binning grid component for dynamic aspect ratio card galleries and sidepanel drawers.

```tsx
import { MasonryGrid, MediaCard } from 'rover';

// Responsive 1 to 6 column gallery:
<MasonryGrid
  items={templates}
  keyExtractor={(item) => item.id}
  gap="var(--rv-space-sm)" // default
  columns="responsive"     // default: 1-6 cols based on container width
  renderItem={(item) => (
    <MediaCard
      aspectRatio={item.ratio}
      src={item.src}
      alt={item.title}
    />
  )}
/>

// Fixed column count (e.g. 2-column sidepanel):
<MasonryGrid
  items={sessionImages}
  keyExtractor={(item, index) => item.id || index}
  columns={2}
  gap={20}
  renderItem={(item) => (
    <MediaCard aspectRatio={item.ratio} src={item.src} />
  )}
/>
```

#### SplitButton
Compound and shorthand multi-action buttons (Primary Action + Dropdown Toggle) supporting all Rover button variants (`primary`, `secondary`, `brand`, `danger`, `ghost`).

```tsx
import { SplitButton, SplitButtonMain, SplitButtonToggle } from 'rover';

// Shorthand:
<SplitButton
  variant="brand"
  onAction={handlePublish}
  onToggle={toggleOptionsPopover}
  isToggleActive={isPopoverOpen}
>
  Publish
</SplitButton>

// Compound:
<SplitButton variant="secondary">
  <SplitButtonMain onClick={handleSave}>Save</SplitButtonMain>
  <SplitButtonToggle onClick={toggleDropdown} />
</SplitButton>
```

---

## 4. CSS Class Dictionary (`.rv-*`)

When crafting controls, toolbars, and popover bodies, use Rover's built-in utility classes.

### 4.1 Buttons & Controls
- `.rv-btn`: Base button style (flex centered, rounded button radius, default transition).
- `.rv-btnPrimary`: Surface button (`background: --rv-neutral-300`).
- `.rv-btnSecondary`: Outlined button (`background: --rv-neutral-400`, `border: 1px solid --rv-bdr`).
- `.rv-btnBrand`: Accent action button (`background: --rv-brand-primary`).
- `.rv-btnGhost`: Muted icon/text button (`background: transparent`, hover fill).
- `.rv-btnIcon`: Square button sized to `--rv-h-btn` (36px).
- `.rv-btnGroup`: Container grouping adjacent buttons.
- Active states: Append `Active` (e.g. `.rv-btnSecondaryActive`, `.rv-btnGhostActive`) for forced active styling.

### 4.2 Form Inputs & Controls
- `.rv-input`: Standard dark text input with subtle border and focus ring.
- `.rv-textarea`: Dark multiline textarea with resizable behavior.
- `.rv-select`: Custom styled dropdown select.
- `.rv-toggle`: Switch toggle container (wraps `<input type="checkbox">`).
- `.rv-toggleSlider`: Toggle sliding knob and background track.
- `.rv-toggleText`: Text label adjacent to a `.rv-toggle`.
- `.rv-fieldGroup`: Vertical field container with standard spacing between label & control.
- `.rv-fieldLabel`: Upper or subtitle label for inputs.
- `.rv-colorSwatch`: Color circle or square swatch preview.

### 4.3 Lists & Navigation Rows
- `.rv-listItem`: Clickable list row with hover highlight.
- `.rv-listItemActive`: Selected/active list row.
- `.rv-listItemOpen`: Highlighted list row when its action menu/popover is open or its child button is pressed.
- `.rv-treeItem`: Layer hierarchy row (with indent, expand chevron, visibility toggle).
- `.rv-treeItemActive`: Highlighted active layer row.

### 4.4 Overlays & Popovers
- `.rv-popoverOverlay`: Dimmed backdrop layer.
- `.rv-popoverContainer`: Main popover card shell.
- `.rv-popoverHeader`: Topbar of popover containing title and close icon.
- `.rv-popoverTitle`: Popover heading text.
- `.rv-popoverContent`: Scrollable popover body.
- `.rv-tooltip`: Floating black-pill tooltip.

### 4.5 Atoms & Feedback
- `.rv-badge`: Status badge (pill-shaped indicator).
- `.rv-spinner`: Standard CSS loader spinner.

### 4.6 Dividers & Separation
- `.rv-horizontalDivider`: Standard full-width horizontal divider with subtle border color (`var(--rv-bdr)`) and vertical margins (`var(--rv-space-sm) 0`).
- `.rv-verticalDivider`: Vertical separator line sized to `var(--rv-space-lg)`.

### 4.7 Card Rows & Entity Cards
- `.rv-cardRow`: Plain, transparent base row container with flex layout, hover effects, and automatic slide-in action button support.
- `.rv-cardRowLeft`: Container for thumbnail, avatar, or icon.
- `.rv-cardRowContent`: Flex column containing title (`.rv-cardRowTitle`, bold/semi-bold) and subtitle (`.rv-cardRowSubtitle`, muted).
- `.rv-cardRowRight`: Right-aligned status, meta info, or action buttons.
- `.rv-cardRowAction`: Action buttons container that smoothly slides/fades in on card hover (`opacity: 1`, `transform: translateX(0)`).

### 4.8 Table & Data Grid System
- `.rv-tableContainer`: Responsive, horizontally scrollable container with surface background, subtle border, and rounded corners.
- `.rv-table`: Core table element with clean border-spacing, collapsed borders, and standardized line height.
- `.rv-tableHead`: Sticky header row with surface background.
- `.rv-tableTh`: Table header cell with `font-size: var(--rv-font-size-sm)`, uppercase tracking, muted text color, and bottom border.
- `.rv-tableSortBtn`: Button inside `.rv-tableTh` for column sorting.
- `.rv-tableRow`: Table body row with hover highlight and selection state (`.rv-isSelected`).
- `.rv-tableTd`: Table data cell. First and last cells in hover/active rows automatically receive rounded corners (`var(--rv-radius-md)`).
- `.rv-brandCell`: Identifier cell grouping `.rv-brandLogo`, `.rv-brandTitle` (`var(--rv-font-size-md)`), and `.rv-brandSubtitle` (`var(--rv-font-size-sm)`).
- `.rv-tokenQuotaCell`: Token quota usage cell with text (`.rv-tokenQuotaText`, `var(--rv-font-size-sm)`), used number (`.rv-tokenQuotaUsed`), total (`.rv-tokenQuotaTotal`), and percentage pill (`.rv-tokenQuotaBadge`).
- `.rv-tokenProgressBar`: Track for token consumption.
- `.rv-tokenProgressFill`: Animated fill bar. Supports `.rv-isWarning` for non-destructive alerts ($\ge 80\%$) using `var(--rv-warning)` and `.rv-isDanger` for exhausted quotas using `var(--rv-danger)`.

### 4.9 Thumbnails, Avatars & Overlapping Groups
- `.rv-avatar`: 50% circular user/member avatar (`28px × 28px` by default).
- `.rv-thumb` / `.rv-thumbSquare`: 6px rounded square asset/product thumbnail (`28px × 28px` by default).
- `.rv-colorSwatch`: 6px rounded square color swatch thumbnail.
- `.rv-avatarGroup`: Overlapping cluster group for circular avatars.
- `.rv-thumbGroup`: Overlapping cluster group for square asset thumbnails.
- `.rv-avatarMore` / `.rv-thumbMore`: +N overflow badge for cluster groups.
- `.rv-btnAvatar`: Avatar button container in topbars and menus with `overflow: visible` to support status badges.

---

## 5. Complete Implementation Example

Here is how an AI should assemble a standard Page Builder page using Rover:

```tsx
'use client';

import React, { useState } from 'react';
import {
  AppShell,
  MainContent,
  Topbar,
  TopbarLeft,
  TopbarRight,
  TopbarLogo,
  Sidebar,
  SidebarRail,
  SidebarBody,
  SidebarPanel,
  Canvas,
  CanvasInner,
  CanvasScroll,
  CanvasContent,
  ComponentWrapper,
  EmptyState,
  Popover,
  PopoverHeader,
  PopoverTitle,
  PopoverContent,
  Tooltip,
} from 'rover';

export default function PageBuilder() {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('layers');
  const [sidebarState, setSidebarState] = useState<'full' | 'rail-only'>('full');
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <AppShell brand="lunar">
      {/* 1. Header Bar */}
      <Topbar>
        <TopbarLeft>
          <TopbarLogo>Lunar Builder</TopbarLogo>
        </TopbarLeft>

        <TopbarRight>
          <Tooltip content="Desktop Preview" position="bottom">
            <button
              type="button"
              className={`rv-btn rv-btnGhost rv-btnIcon ${device === 'desktop' ? 'rv-btnGhostActive' : ''}`}
              onClick={() => setDevice('desktop')}
            >
              🖥️
            </button>
          </Tooltip>

          <Tooltip content="Mobile Preview" position="bottom">
            <button
              type="button"
              className={`rv-btn rv-btnGhost rv-btnIcon ${device === 'mobile' ? 'rv-btnGhostActive' : ''}`}
              onClick={() => setDevice('mobile')}
            >
              📱
            </button>
          </Tooltip>

          <button
            type="button"
            className="rv-btn rv-btnBrand"
            onClick={() => setIsExportOpen(true)}
          >
            Export
          </button>
        </TopbarRight>
      </Topbar>

      {/* 2. Main Workspace Layout */}
      <MainContent>
        {/* Sidebar */}
        <Sidebar state={sidebarState} resizable={true}>
          <SidebarRail
            items={[
              { id: 'layers', label: 'Layers' },
              { id: 'blocks', label: 'Blocks' },
              { id: 'theme', label: 'Theme' },
            ]}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSidebarState('full');
            }}
          />
          <SidebarBody open={sidebarState === 'full'}>
            <SidebarPanel>
              <div className="rv-fieldGroup">
                <label className="rv-fieldLabel">Active Mode: {activeTab}</label>
                <input className="rv-input" placeholder="Search..." />
              </div>
            </SidebarPanel>
          </SidebarBody>
        </Sidebar>

        {/* Interactive Canvas */}
        <Canvas deviceMode={device}>
          <CanvasInner>
            <CanvasScroll>
              <CanvasContent>
                <EmptyState>
                  Start adding blocks from the sidebar to begin building.
                </EmptyState>
              </CanvasContent>
            </CanvasScroll>
          </CanvasInner>
        </Canvas>
      </MainContent>

      {/* 3. Portals & Overlays */}
      <Popover
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        width={400}
      >
        <PopoverHeader>
          <PopoverTitle>Export Project</PopoverTitle>
          <button
            type="button"
            className="rv-btn rv-btnGhost rv-btnIcon"
            onClick={() => setIsExportOpen(false)}
          >
            ✕
          </button>
        </PopoverHeader>
        <PopoverContent>
          <p style={{ color: 'var(--rv-neutral-100)', marginBottom: 'var(--rv-space-md)' }}>
            Choose an export target.
          </p>
          <button type="button" className="rv-btn rv-btnPrimary" style={{ width: '100%' }}>
            Download HTML / CSS Zip
          </button>
        </PopoverContent>
      </Popover>
    </AppShell>
  );
}
```

---

## 6. AI Rules of Thumb & Best Practices

1. **Always Use `from 'rover'`**: Never recreate layout components like `SidebarRail` or `Canvas` from scratch if Rover exports them.
2. **Never Invent Arbitrary Button / Input Classes**: If you need a button, use `.rv-btn` with a variant (`.rv-btnBrand`, `.rv-btnSecondary`, `.rv-btnGhost`).
3. **Respect Dark Theme Variables**: Always write custom styles referencing `var(--rv-neutral-*)` and `var(--rv-brand-primary)` instead of hardcoded hex values (`#fff`, `#111`).
4. **Tooltips on Custom Buttons**: Tooltip uses `createPortal` to `document.body` and handles viewport boundaries automatically. Ensure trigger children have a valid bounding box.
5. **No Invalid Nesting**: Do not nest `<button>` inside `<button>` or place `<div>` directly inside `<p>` or `<h4>` tags (use `tagName="div"` or CSS utility classes).
6. **Device Mode State**: Canvas expects `deviceMode="desktop" | "mobile"`. Do not pass arbitrary strings.
