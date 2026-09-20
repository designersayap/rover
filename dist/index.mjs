'use client';

// src/components/shell/AppShell.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var AppShell = React.forwardRef(
  ({ children, className = "", brand, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: `rv-container ${className}`.trim(),
        "data-rv-brand": brand,
        ...props,
        children
      }
    );
  }
);
AppShell.displayName = "AppShell";
var MainContent = React.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: `rv-mainContent ${className}`.trim(),
        ...props,
        children
      }
    );
  }
);
MainContent.displayName = "MainContent";

// src/components/shell/Canvas.tsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Canvas = React2.forwardRef(
  ({ children, deviceMode = "desktop", scrolledBottom = false, className = "", ...props }, ref) => {
    const modeClass = deviceMode === "desktop" ? "rv-canvasDesktop" : "rv-canvasMobile";
    const bottomClass = scrolledBottom ? "rv-canvasScrolledBottom" : "";
    return /* @__PURE__ */ jsx2(
      "main",
      {
        ref,
        className: `rv-canvas ${modeClass} ${bottomClass} ${className}`.trim(),
        ...props,
        children
      }
    );
  }
);
Canvas.displayName = "Canvas";
var CanvasInner = React2.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className: `rv-canvasInner ${className}`.trim(),
        ...props,
        children
      }
    );
  }
);
CanvasInner.displayName = "CanvasInner";
var CanvasScroll = React2.forwardRef(
  ({ children, className = "", onScroll, ...props }, ref) => {
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className: `rv-canvasScroll ${className}`.trim(),
        onScroll,
        ...props,
        children
      }
    );
  }
);
CanvasScroll.displayName = "CanvasScroll";
var CanvasContent = React2.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className: `rv-canvasContent ${className}`.trim(),
        ...props,
        children
      }
    );
  }
);
CanvasContent.displayName = "CanvasContent";
var ComponentWrapper = React2.forwardRef(
  ({ children, selected = false, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className: `rv-componentWrapper ${selected ? "rv-componentSelected" : ""} ${className}`.trim(),
        ...props,
        children
      }
    );
  }
);
ComponentWrapper.displayName = "ComponentWrapper";
var EmptyState = React2.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className: `rv-emptyState ${className}`.trim(),
        ...props,
        children: /* @__PURE__ */ jsx2("div", { className: "rv-emptyStateText", children })
      }
    );
  }
);
EmptyState.displayName = "EmptyState";

// src/components/sidebar/Sidebar.tsx
import React5 from "react";

// src/components/sidebar/ResizeHandle.tsx
import { useCallback, useEffect, useState } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var ResizeHandle = ({
  onResize,
  onResizeEnd,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e) => {
      onResize?.(e.movementX);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      onResizeEnd?.();
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onResize, onResizeEnd]);
  return /* @__PURE__ */ jsx3(
    "div",
    {
      className: `rv-resizeHandle ${isDragging ? "rv-resizeHandleActive" : ""} ${className}`.trim(),
      onMouseDown: handleMouseDown,
      role: "separator",
      "aria-orientation": "vertical",
      children: /* @__PURE__ */ jsx3("div", { className: "rv-resizeHandleBar" })
    }
  );
};

// src/components/sidebar/MobileSidebarDrawer.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { createPortal } from "react-dom";
import { jsx as jsx4 } from "react/jsx-runtime";
var MobileSidebarDrawer = ({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
  drawerClassName = "",
  width,
  container,
  style,
  "aria-label": ariaLabel = "Navigation drawer"
}) => {
  const [mounted, setMounted] = useState2(false);
  useEffect2(() => {
    setMounted(true);
  }, []);
  useEffect2(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  if (!mounted || !isOpen) return null;
  const target = container || (typeof document !== "undefined" ? document.body : null);
  if (!target) return null;
  const drawerStyle = {
    ...width !== void 0 ? { width: typeof width === "number" ? `${width}px` : width } : {},
    ...style
  };
  return createPortal(
    /* @__PURE__ */ jsx4(
      "div",
      {
        className: `rv-mobileSidebarOverlay rv-mobileSidebarOpen ${overlayClassName} ${className}`.trim(),
        onClick: onClose,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": ariaLabel,
        children: /* @__PURE__ */ jsx4(
          "div",
          {
            className: `rv-mobileSidebarDrawer rv-mobileSidebarDrawerOpen ${drawerClassName}`.trim(),
            onClick: (e) => e.stopPropagation(),
            style: drawerStyle,
            children
          }
        )
      }
    ),
    target
  );
};

// src/components/sidebar/Sidebar.tsx
import { Fragment, jsx as jsx5, jsxs } from "react/jsx-runtime";
var Sidebar = React5.forwardRef(
  ({
    children,
    state = "full",
    variant = "in-flow",
    floating = false,
    className = "",
    width,
    onResize,
    resizable = false,
    style,
    dataBuilderUi = true,
    innerClassName = "",
    onClose,
    mobileOpen = false,
    onCloseMobile,
    mobileContent,
    mobileDrawerClassName = "",
    mobileOverlayClassName = "",
    mobileDrawerWidth,
    ...props
  }, ref) => {
    const internalRef = React5.useRef(null);
    React5.useImperativeHandle(ref, () => internalRef.current);
    const isFloating = floating || variant === "floating";
    const variantClass = isFloating ? "rv-sidebarShellFloating" : "";
    const stateClass = state === "rail-only" ? "rv-sidebarRailOnly" : state === "collapsed" ? "rv-sidebarCollapsed" : "";
    React5.useEffect(() => {
      if (!isFloating || state === "collapsed" || !onClose) return;
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      const handlePointerDown = (e) => {
        if (internalRef.current && !internalRef.current.contains(e.target)) {
          const targetEl = e.target;
          if (targetEl.closest?.(".rv-sidebarToggle")) return;
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("pointerdown", handlePointerDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [isFloating, state, onClose]);
    const inlineStyle = {
      ...style,
      ...width !== void 0 && state === "full" ? { width: typeof width === "number" ? `${width}px` : width } : {}
    };
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx5(
        "aside",
        {
          ref: internalRef,
          className: `rv-sidebarShell ${variantClass} ${stateClass} ${className}`.trim(),
          style: inlineStyle,
          "data-builder-ui": dataBuilderUi ? "true" : void 0,
          ...props,
          children: /* @__PURE__ */ jsxs("div", { className: `rv-sidebar ${innerClassName}`.trim(), children: [
            children,
            resizable && state === "full" && /* @__PURE__ */ jsx5(ResizeHandle, { onResize })
          ] })
        }
      ),
      mobileOpen && /* @__PURE__ */ jsx5(
        MobileSidebarDrawer,
        {
          isOpen: mobileOpen,
          onClose: onCloseMobile || (() => {
          }),
          className: mobileOverlayClassName,
          drawerClassName: mobileDrawerClassName,
          width: mobileDrawerWidth,
          children: mobileContent !== void 0 ? mobileContent : /* @__PURE__ */ jsx5("div", { className: `rv-sidebarShell ${stateClass} ${className}`.trim(), style: { height: "100%", width: "100%", display: "flex" }, children: /* @__PURE__ */ jsx5("div", { className: `rv-sidebar ${innerClassName}`.trim(), style: { height: "100%", margin: 0 }, children }) })
        }
      )
    ] });
  }
);
Sidebar.displayName = "Sidebar";
var SidebarBody = React5.forwardRef(
  ({ children, className = "", open, ...props }, ref) => {
    const openClass = open ? "rv-sidebarBodyOpen" : "";
    return /* @__PURE__ */ jsx5(
      "div",
      {
        ref,
        className: `rv-sidebarBody ${openClass} ${className}`.trim(),
        ...props,
        children
      }
    );
  }
);
SidebarBody.displayName = "SidebarBody";
var SidebarPanel = React5.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx5(
      "div",
      {
        ref,
        className: `rv-sidebarPanel ${className}`.trim(),
        ...props,
        children
      }
    );
  }
);
SidebarPanel.displayName = "SidebarPanel";

// src/components/sidebar/SidebarRail.tsx
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
var SidebarRail = ({
  items = [],
  activeTab,
  onTabChange,
  className = "",
  itemHeight = 72,
  children
}) => {
  const activeIndex = items.findIndex((item) => item.id === activeTab);
  const showIndicator = activeIndex >= 0;
  return /* @__PURE__ */ jsxs2("div", { className: `rv-sidebarRail ${className}`.trim(), children: [
    showIndicator && /* @__PURE__ */ jsx6(
      "div",
      {
        className: "rv-sidebarRailIndicator",
        style: {
          transform: `translateY(${activeIndex * itemHeight}px)`
        },
        "aria-hidden": "true"
      }
    ),
    items.map((item) => {
      const isActive = item.id === activeTab;
      return /* @__PURE__ */ jsxs2(
        "button",
        {
          type: "button",
          className: `rv-sidebarRailItem ${isActive ? "rv-sidebarRailItemActive" : ""}`.trim(),
          onClick: () => onTabChange?.(item.id),
          "aria-selected": isActive,
          children: [
            item.icon,
            /* @__PURE__ */ jsx6("span", { className: "rv-sidebarRailLabel", children: item.label })
          ]
        },
        item.id
      );
    }),
    children
  ] });
};

// src/components/topbar/Topbar.tsx
import React6 from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var Topbar = React6.forwardRef(
  ({ children, className = "", dataBuilderUi = true, ...props }, ref) => {
    return /* @__PURE__ */ jsx7(
      "header",
      {
        ref,
        className: `rv-topbar ${className}`.trim(),
        "data-builder-ui": dataBuilderUi ? "true" : void 0,
        ...props,
        children
      }
    );
  }
);
Topbar.displayName = "Topbar";
var TopbarLeft = React6.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx7("div", { ref, className: `rv-topbarLeft ${className}`.trim(), ...props, children });
  }
);
TopbarLeft.displayName = "TopbarLeft";
var TopbarRight = React6.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx7("div", { ref, className: `rv-topbarRight ${className}`.trim(), ...props, children });
  }
);
TopbarRight.displayName = "TopbarRight";
var TopbarLogo = React6.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx7("h1", { ref, className: `rv-topbarLogo ${className}`.trim(), ...props, children });
  }
);
TopbarLogo.displayName = "TopbarLogo";

// src/components/topbar/SidebarToggle.tsx
import React7 from "react";
import { jsx as jsx8, jsxs as jsxs3 } from "react/jsx-runtime";
var SidebarToggle = React7.forwardRef(
  ({
    className = "",
    isOpen,
    icon,
    hideOnMobile = false,
    type = "button",
    "aria-label": ariaLabel = "Toggle navigation",
    children,
    ...props
  }, ref) => {
    const hideMobileClass = hideOnMobile ? "rv-sidebarToggleHideMobile" : "";
    return /* @__PURE__ */ jsx8(
      "button",
      {
        ref,
        type,
        className: `rv-btn rv-btnGhost rv-btnIcon rv-sidebarToggle ${hideMobileClass} ${isOpen ? "rv-btnGhostActive" : ""} ${className}`.trim(),
        "aria-label": ariaLabel,
        "aria-expanded": isOpen,
        ...props,
        children: children ? children : icon ? icon : /* @__PURE__ */ jsxs3(
          "svg",
          {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "rv-sidebarToggleIcon",
            children: [
              /* @__PURE__ */ jsx8("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
              /* @__PURE__ */ jsx8("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
              /* @__PURE__ */ jsx8("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
            ]
          }
        )
      }
    );
  }
);
SidebarToggle.displayName = "SidebarToggle";

// src/components/overlays/Popover.tsx
import React8, {
  createContext,
  useContext,
  useState as useState3,
  useRef,
  useEffect as useEffect3,
  useCallback as useCallback2,
  useId
} from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
var PopoverContext = createContext(null);
function usePopover() {
  const context = useContext(PopoverContext);
  return context;
}
var Popover = React8.forwardRef(
  ({
    // Compound props
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    // Legacy props
    isOpen: legacyIsOpen,
    onClose,
    position,
    centerByDefault = true,
    width = 362,
    variant = "default",
    className = "",
    overlayClassName = "",
    dataBuilderUi = true,
    children,
    style,
    ...props
  }, ref) => {
    const isExplicitLegacy = legacyIsOpen !== void 0 || position !== void 0 || onClose !== void 0;
    const [uncontrolledOpen, setUncontrolledOpen] = useState3(defaultOpen);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const popoverId = useId();
    const isControlled = controlledOpen !== void 0;
    const isOpen = isControlled ? controlledOpen : isExplicitLegacy ? Boolean(legacyIsOpen) : uncontrolledOpen;
    const setIsOpen = useCallback2(
      (action) => {
        const nextOpen = typeof action === "function" ? action(isOpen) : action;
        if (!isControlled && !isExplicitLegacy) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
        if (!nextOpen && onClose) {
          onClose();
        }
      },
      [isControlled, isExplicitLegacy, isOpen, onOpenChange, onClose]
    );
    const closePopover = useCallback2(() => {
      setIsOpen(false);
    }, [setIsOpen]);
    const togglePopover = useCallback2(() => {
      setIsOpen((prev) => !prev);
    }, [setIsOpen]);
    const contextValue = {
      isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
      popoverId,
      closePopover,
      togglePopover,
      isCompound: !isExplicitLegacy
    };
    if (!isExplicitLegacy) {
      return /* @__PURE__ */ jsx9(PopoverContext.Provider, { value: contextValue, children });
    }
    if (!isOpen) return null;
    const isMenuVariant = variant === "menu";
    let popoverStyle = centerByDefault ? {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      margin: 0,
      pointerEvents: "auto",
      ...style
    } : { ...style };
    if (position && typeof window !== "undefined") {
      const padding = 8;
      const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
      const isRightHalf = position.left > windowWidth / 2;
      if (isRightHalf) {
        let idealRight = windowWidth - (position.left + width / 2);
        idealRight = Math.max(padding, idealRight);
        popoverStyle = {
          position: "fixed",
          top: `${position.top}px`,
          right: `${idealRight}px`,
          left: "auto",
          margin: 0,
          pointerEvents: "auto",
          width,
          maxWidth: `calc(100vw - ${padding * 2}px)`,
          ...style
        };
      } else {
        let idealLeft = position.left - width / 2;
        idealLeft = Math.max(padding, idealLeft);
        popoverStyle = {
          position: "fixed",
          top: `${position.top}px`,
          left: `${idealLeft}px`,
          right: "auto",
          margin: 0,
          pointerEvents: "auto",
          width,
          maxWidth: `calc(100vw - ${padding * 2}px)`,
          ...style
        };
      }
    }
    return /* @__PURE__ */ jsxs4(PopoverContext.Provider, { value: contextValue, children: [
      /* @__PURE__ */ jsx9(
        "div",
        {
          className: `rv-popoverOverlay ${overlayClassName}`.trim(),
          onClick: onClose,
          style: { pointerEvents: onClose ? "auto" : "none" },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx9(
        "div",
        {
          ref,
          className: `rv-popoverContainer ${isMenuVariant ? "rv-popoverMenu" : ""} ${className}`.trim(),
          style: popoverStyle,
          onClick: (e) => e.stopPropagation(),
          "data-builder-ui": dataBuilderUi ? "true" : void 0,
          role: isMenuVariant ? "menu" : "dialog",
          "aria-modal": "true",
          ...props,
          children
        }
      )
    ] });
  }
);
Popover.displayName = "Popover";
var PopoverTrigger = React8.forwardRef(
  ({ asChild = false, children, onClick, ...props }, forwardedRef) => {
    const context = usePopover();
    const isOpen = context?.isOpen ?? false;
    const togglePopover = context?.togglePopover ?? (() => {
    });
    const triggerRef = context?.triggerRef;
    const popoverId = context?.popoverId ?? "";
    const handleClick = (e) => {
      e.stopPropagation();
      onClick?.(e);
      if (!e.defaultPrevented) {
        togglePopover();
      }
    };
    const handleRef = (node) => {
      if (triggerRef) {
        triggerRef.current = node;
      }
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };
    if (asChild && React8.isValidElement(children)) {
      const child = children;
      const existingClassName = child.props.className || "";
      const activeClass = isOpen ? "rv-btnActive rv-isActive" : "";
      const combinedClassName = `${existingClassName} ${activeClass}`.trim();
      return React8.cloneElement(child, {
        ref: handleRef,
        onClick: (e) => {
          child.props.onClick?.(e);
          handleClick(e);
        },
        "aria-expanded": isOpen,
        "aria-haspopup": "dialog",
        "aria-controls": isOpen ? popoverId : void 0,
        className: combinedClassName || void 0
      });
    }
    const defaultActiveClass = isOpen ? "rv-btnActive rv-isActive" : "";
    const buttonClassName = `${props.className || ""} ${defaultActiveClass}`.trim();
    return /* @__PURE__ */ jsx9(
      "button",
      {
        ref: handleRef,
        type: "button",
        onClick: handleClick,
        "aria-expanded": isOpen,
        "aria-haspopup": "dialog",
        "aria-controls": isOpen ? popoverId : void 0,
        className: buttonClassName || void 0,
        ...props,
        children
      }
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";
var PopoverContent = React8.forwardRef(
  ({
    align = "end",
    side = "bottom",
    sideOffset = 6,
    width = "auto",
    portal = true,
    className = "",
    style,
    children,
    ...props
  }, forwardedRef) => {
    const context = usePopover();
    const isOpen = context?.isOpen ?? true;
    const closePopover = context?.closePopover ?? (() => {
    });
    const triggerRef = context?.triggerRef;
    const contentRef = context?.contentRef;
    const popoverId = context?.popoverId ?? "";
    const [mounted, setMounted] = useState3(false);
    const [positionStyle, setPositionStyle] = useState3({});
    useEffect3(() => {
      setMounted(true);
    }, []);
    const updatePosition = useCallback2(() => {
      if (!triggerRef?.current || typeof window === "undefined") return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportPadding = 8;
      const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
      const windowHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
      let top = 0;
      let left = 0;
      if (side === "bottom") {
        top = triggerRect.bottom + sideOffset;
      } else if (side === "top") {
        top = triggerRect.top - sideOffset;
      } else {
        top = triggerRect.top;
      }
      if (align === "end") {
        left = triggerRect.right;
      } else if (align === "start") {
        left = triggerRect.left;
      } else {
        left = triggerRect.left + triggerRect.width / 2;
      }
      let calculatedStyle = {
        position: "fixed",
        zIndex: 1e4,
        margin: 0,
        width: typeof width === "number" ? `${width}px` : width,
        maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
        ...style
      };
      if (side === "bottom") {
        if (top + 240 > windowHeight) {
          calculatedStyle.bottom = `${windowHeight - triggerRect.top + sideOffset}px`;
          calculatedStyle.top = "auto";
        } else {
          calculatedStyle.top = `${top}px`;
          calculatedStyle.bottom = "auto";
        }
      } else if (side === "top") {
        calculatedStyle.bottom = `${windowHeight - triggerRect.top + sideOffset}px`;
        calculatedStyle.top = "auto";
      } else {
        calculatedStyle.top = `${top}px`;
      }
      if (align === "end") {
        const rightOffset = windowWidth - triggerRect.right;
        calculatedStyle.right = `${Math.max(viewportPadding, rightOffset)}px`;
        calculatedStyle.left = "auto";
      } else if (align === "start") {
        calculatedStyle.left = `${Math.max(viewportPadding, left)}px`;
        calculatedStyle.right = "auto";
      } else {
        calculatedStyle.left = `${Math.max(viewportPadding, left)}px`;
        calculatedStyle.transform = "translateX(-50%)";
        calculatedStyle.right = "auto";
      }
      setPositionStyle(calculatedStyle);
    }, [triggerRef, align, side, sideOffset, width, style]);
    useEffect3(() => {
      if (isOpen && triggerRef?.current) {
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
      }
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [isOpen, triggerRef, updatePosition]);
    useEffect3(() => {
      if (!isOpen) return;
      const handlePointerDown = (event) => {
        const target = event.target;
        if (contentRef?.current?.contains(target)) {
          return;
        }
        if (triggerRef?.current?.contains(target)) {
          return;
        }
        closePopover();
      };
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          closePopover();
          triggerRef?.current?.focus();
        }
      };
      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("touchstart", handlePointerDown);
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
        document.removeEventListener("touchstart", handlePointerDown);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, closePopover, contentRef, triggerRef]);
    if (!isOpen) return null;
    const handleRef = (node) => {
      if (contentRef) {
        contentRef.current = node;
      }
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };
    const contentNode = /* @__PURE__ */ jsx9(
      "div",
      {
        ref: handleRef,
        id: popoverId,
        role: "dialog",
        "aria-modal": "true",
        tabIndex: -1,
        className: `rv-popoverContainer ${className}`.trim(),
        style: triggerRef?.current ? positionStyle : style,
        onClick: (e) => e.stopPropagation(),
        ...props,
        children
      }
    );
    if (portal && mounted && typeof document !== "undefined") {
      return createPortal2(contentNode, document.body);
    }
    return contentNode;
  }
);
PopoverContent.displayName = "PopoverContent";
var PopoverHeader = React8.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx9("div", { ref, className: `rv-popoverHeader ${className}`.trim(), ...props, children });
  }
);
PopoverHeader.displayName = "PopoverHeader";
var PopoverTitle = React8.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx9("span", { ref, className: `rv-popoverTitle ${className}`.trim(), ...props, children });
  }
);
PopoverTitle.displayName = "PopoverTitle";
var PopoverMenu = React8.forwardRef(
  ({ variant = "menu", ...props }, ref) => /* @__PURE__ */ jsx9(Popover, { ref, variant, ...props })
);
PopoverMenu.displayName = "PopoverMenu";

// src/components/overlays/Tooltip.tsx
import { useState as useState4, useRef as useRef2, useEffect as useEffect4 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { Fragment as Fragment2, jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
var Tooltip = ({
  content,
  children,
  position = "top",
  delay = 500,
  className = "",
  zIndex = 9999
}) => {
  const [isVisible, setIsVisible] = useState4(false);
  const [tooltipStyle, setTooltipStyle] = useState4({
    top: -9999,
    left: -9999,
    opacity: 0
  });
  const triggerRef = useRef2(null);
  const tooltipRef = useRef2(null);
  const timeoutRef = useRef2(null);
  const [mounted, setMounted] = useState4(false);
  useEffect4(() => setMounted(true), []);
  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current || !isVisible) return;
    let triggerEl = triggerRef.current;
    if (triggerEl.style.display === "contents" && triggerEl.firstElementChild) {
      triggerEl = triggerEl.firstElementChild;
    }
    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    if (tooltipRect.width === 0) return;
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    const gap = 6;
    let top = 0;
    let left = 0;
    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerCenterX - tooltipRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerCenterX - tooltipRect.width / 2;
        break;
      case "left":
        top = triggerCenterY - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case "right":
        top = triggerCenterY - tooltipRect.height / 2;
        left = triggerRect.right + gap;
        break;
    }
    const padding = 8;
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
    setTooltipStyle({
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      opacity: 1,
      zIndex,
      pointerEvents: "none",
      transition: "opacity 0.15s ease"
    });
  };
  useEffect4(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible]);
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
    setTooltipStyle({ top: -9999, left: -9999, opacity: 0 });
  };
  if (!content) return /* @__PURE__ */ jsx10(Fragment2, { children });
  return /* @__PURE__ */ jsxs5(Fragment2, { children: [
    /* @__PURE__ */ jsx10(
      "div",
      {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: { display: "contents" },
        children
      }
    ),
    mounted && isVisible && createPortal3(
      /* @__PURE__ */ jsx10(
        "div",
        {
          ref: tooltipRef,
          className: `rv-tooltip ${className}`.trim(),
          style: tooltipStyle,
          role: "tooltip",
          children: content
        }
      ),
      document.body
    )
  ] });
};

// src/components/overlays/Modal.tsx
import React10, { useEffect as useEffect5, useState as useState5 } from "react";
import { createPortal as createPortal4 } from "react-dom";
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
var Modal = React10.forwardRef(
  ({
    isOpen = false,
    onClose,
    size = "md",
    width,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    children,
    className = "",
    overlayClassName = "",
    portalTo,
    dataBuilderUi = true,
    style,
    ...props
  }, ref) => {
    const [mounted, setMounted] = useState5(false);
    useEffect5(() => {
      setMounted(true);
    }, []);
    useEffect5(() => {
      if (!isOpen || !closeOnEsc || !onClose) return;
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeOnEsc, onClose]);
    useEffect5(() => {
      if (!isOpen || typeof document === "undefined") return;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [isOpen]);
    if (!isOpen || !mounted) return null;
    const targetContainer = portalTo || (typeof document !== "undefined" ? document.body : null);
    if (!targetContainer) return null;
    const sizeClassMap = {
      sm: "rv-modalSm",
      md: "rv-modalMd",
      lg: "rv-modalLg",
      xl: "rv-modalXl",
      full: "rv-modalFull"
    };
    const sizeClass = sizeClassMap[size] || "rv-modalMd";
    const containerStyle = {
      ...style,
      ...width !== void 0 ? { width: typeof width === "number" ? `${width}px` : width } : {}
    };
    return createPortal4(
      /* @__PURE__ */ jsx11(
        "div",
        {
          className: `rv-modalOverlay ${overlayClassName}`.trim(),
          onClick: () => {
            if (closeOnOverlayClick && onClose) {
              onClose();
            }
          },
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx11(
            "div",
            {
              ref,
              className: `rv-modalContainer ${sizeClass} ${className}`.trim(),
              style: containerStyle,
              onClick: (e) => e.stopPropagation(),
              "data-builder-ui": dataBuilderUi ? "true" : void 0,
              role: "dialog",
              "aria-modal": "true",
              ...props,
              children
            }
          )
        }
      ),
      targetContainer
    );
  }
);
Modal.displayName = "Modal";
var ModalHeader = React10.forwardRef(
  ({ children, className = "", onClose, showCloseButton = false, ...props }, ref) => {
    return /* @__PURE__ */ jsxs6("div", { ref, className: `rv-modalHeader ${className}`.trim(), ...props, children: [
      /* @__PURE__ */ jsx11("div", { className: "rv-modalHeaderContent", children }),
      showCloseButton && onClose && /* @__PURE__ */ jsx11(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "rv-btn rv-btnGhost rv-btnIcon",
          style: { width: 28, height: 28, borderRadius: "var(--rv-radius-round)" },
          "aria-label": "Close dialog",
          children: "\u2715"
        }
      )
    ] });
  }
);
ModalHeader.displayName = "ModalHeader";
var ModalTitle = React10.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx11("h3", { ref, className: `rv-modalTitle ${className}`.trim(), ...props, children });
  }
);
ModalTitle.displayName = "ModalTitle";
var ModalDescription = React10.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx11("p", { ref, className: `rv-modalDescription ${className}`.trim(), ...props, children });
  }
);
ModalDescription.displayName = "ModalDescription";
var ModalBody = React10.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx11("div", { ref, className: `rv-modalBody ${className}`.trim(), ...props, children });
  }
);
ModalBody.displayName = "ModalBody";
var ModalFooter = React10.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx11("div", { ref, className: `rv-modalFooter ${className}`.trim(), ...props, children });
  }
);
ModalFooter.displayName = "ModalFooter";

// src/components/overlays/Dialog.tsx
import React11 from "react";
import { Fragment as Fragment3, jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
var variantClassMap = {
  brand: "rv-btnBrand",
  primary: "rv-btnPrimary",
  danger: "rv-btnDanger",
  secondary: "rv-btnSecondary",
  ghost: "rv-btnGhost"
};
var Dialog = React11.forwardRef(
  ({
    isOpen = false,
    onClose,
    title,
    description,
    children,
    cancelLabel = "Cancel",
    onCancel,
    showCancel = true,
    actionLabel = "Confirm",
    actionVariant = "brand",
    actionType,
    onAction,
    isActionLoading = false,
    isActionDisabled = false,
    onSubmit,
    footer,
    showCloseButton = false,
    size = "sm",
    ...modalProps
  }, ref) => {
    const computedActionType = actionType || (onSubmit ? "submit" : "button");
    const actionClass = variantClassMap[actionVariant] || "rv-btnBrand";
    const dialogInner = /* @__PURE__ */ jsxs7(Fragment3, { children: [
      /* @__PURE__ */ jsxs7(ModalHeader, { onClose, showCloseButton, children: [
        /* @__PURE__ */ jsx12(ModalTitle, { children: title }),
        children && description && /* @__PURE__ */ jsx12(ModalDescription, { children: description })
      ] }),
      children ? /* @__PURE__ */ jsx12(ModalBody, { children }) : description ? /* @__PURE__ */ jsx12(ModalBody, { children: /* @__PURE__ */ jsx12("p", { className: "rv-modalDescription", style: { margin: 0 }, children: description }) }) : null,
      footer !== void 0 ? footer : /* @__PURE__ */ jsxs7(ModalFooter, { children: [
        showCancel && /* @__PURE__ */ jsx12(
          "button",
          {
            type: "button",
            onClick: onCancel || onClose,
            disabled: isActionLoading,
            className: "rv-btn rv-btnGhost",
            children: cancelLabel
          }
        ),
        /* @__PURE__ */ jsx12(
          "button",
          {
            type: computedActionType,
            onClick: computedActionType === "button" ? onAction : void 0,
            disabled: isActionDisabled || isActionLoading,
            className: `rv-btn ${actionClass}`,
            children: isActionLoading ? "Loading..." : actionLabel
          }
        )
      ] })
    ] });
    return /* @__PURE__ */ jsx12(
      Modal,
      {
        ref,
        isOpen,
        onClose,
        size,
        ...modalProps,
        children: onSubmit ? /* @__PURE__ */ jsx12(
          "form",
          {
            onSubmit,
            style: {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              margin: 0
            },
            children: dialogInner
          }
        ) : dialogInner
      }
    );
  }
);
Dialog.displayName = "Dialog";

// src/components/overlays/Menu.tsx
import React12, {
  createContext as createContext2,
  useContext as useContext2,
  useState as useState6,
  useRef as useRef3,
  useEffect as useEffect6,
  useCallback as useCallback3,
  useId as useId2
} from "react";
import { createPortal as createPortal5 } from "react-dom";
import { jsx as jsx13 } from "react/jsx-runtime";
var MenuContext = createContext2(null);
function useMenu() {
  const context = useContext2(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a <Menu /> component");
  }
  return context;
}
function Menu({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState6(defaultOpen);
  const triggerRef = useRef3(null);
  const contentRef = useRef3(null);
  const menuId = useId2();
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const setIsOpen = useCallback3(
    (action) => {
      const nextOpen = typeof action === "function" ? action(isOpen) : action;
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, isOpen, onOpenChange]
  );
  const closeMenu = useCallback3(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const toggleMenu = useCallback3(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);
  return /* @__PURE__ */ jsx13(
    MenuContext.Provider,
    {
      value: {
        isOpen,
        setIsOpen,
        triggerRef,
        contentRef,
        menuId,
        closeMenu,
        toggleMenu
      },
      children
    }
  );
}
var MenuTrigger = React12.forwardRef(
  ({ asChild = false, children, onClick, ...props }, forwardedRef) => {
    const { isOpen, toggleMenu, triggerRef, menuId } = useMenu();
    const handleClick = (e) => {
      e.stopPropagation();
      onClick?.(e);
      if (!e.defaultPrevented) {
        toggleMenu();
      }
    };
    const handleRef = (node) => {
      triggerRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };
    if (asChild && React12.isValidElement(children)) {
      const child = children;
      const existingClassName = child.props.className || "";
      const activeClass = isOpen ? "rv-btnActive rv-isActive" : "";
      const combinedClassName = `${existingClassName} ${activeClass}`.trim();
      return React12.cloneElement(child, {
        ref: handleRef,
        onClick: (e) => {
          child.props.onClick?.(e);
          handleClick(e);
        },
        "aria-expanded": isOpen,
        "aria-haspopup": "menu",
        "aria-controls": isOpen ? menuId : void 0,
        className: combinedClassName || void 0
      });
    }
    const defaultActiveClass = isOpen ? "rv-btnActive rv-isActive" : "";
    const buttonClassName = `${props.className || ""} ${defaultActiveClass}`.trim();
    return /* @__PURE__ */ jsx13(
      "button",
      {
        ref: handleRef,
        type: "button",
        onClick: handleClick,
        "aria-expanded": isOpen,
        "aria-haspopup": "menu",
        "aria-controls": isOpen ? menuId : void 0,
        className: buttonClassName || void 0,
        ...props,
        children
      }
    );
  }
);
MenuTrigger.displayName = "MenuTrigger";
var MenuContent = React12.forwardRef(
  ({
    align = "end",
    side = "bottom",
    sideOffset = 4,
    width = "auto",
    portal = true,
    className = "",
    style,
    children,
    ...props
  }, forwardedRef) => {
    const { isOpen, closeMenu, triggerRef, contentRef, menuId } = useMenu();
    const [mounted, setMounted] = useState6(false);
    const [positionStyle, setPositionStyle] = useState6({});
    useEffect6(() => {
      setMounted(true);
    }, []);
    const updatePosition = useCallback3(() => {
      if (!triggerRef.current || typeof window === "undefined") return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportPadding = 8;
      const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
      const windowHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
      let top = 0;
      let left = 0;
      if (side === "bottom") {
        top = triggerRect.bottom + sideOffset;
        if (top + 160 > windowHeight) {
          top = triggerRect.top - sideOffset;
        }
      } else if (side === "top") {
        top = triggerRect.top - sideOffset;
      } else if (side === "left" || side === "right") {
        top = triggerRect.top;
      }
      if (align === "end") {
        left = triggerRect.right;
      } else if (align === "start") {
        left = triggerRect.left;
      } else {
        left = triggerRect.left + triggerRect.width / 2;
      }
      const isRightHalf = left > windowWidth / 2;
      let calculatedStyle = {
        position: "fixed",
        zIndex: 1e4,
        margin: 0,
        width: typeof width === "number" ? `${width}px` : width,
        maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
        ...style
      };
      if (side === "bottom") {
        if (top + 160 > windowHeight) {
          calculatedStyle.bottom = `${windowHeight - triggerRect.top + sideOffset}px`;
          calculatedStyle.top = "auto";
        } else {
          calculatedStyle.top = `${top}px`;
          calculatedStyle.bottom = "auto";
        }
      } else if (side === "top") {
        calculatedStyle.bottom = `${windowHeight - triggerRect.top + sideOffset}px`;
        calculatedStyle.top = "auto";
      } else {
        calculatedStyle.top = `${top}px`;
      }
      if (align === "end") {
        const rightOffset = windowWidth - triggerRect.right;
        calculatedStyle.right = `${Math.max(viewportPadding, rightOffset)}px`;
        calculatedStyle.left = "auto";
      } else if (align === "start") {
        calculatedStyle.left = `${Math.max(viewportPadding, left)}px`;
        calculatedStyle.right = "auto";
      } else {
        calculatedStyle.left = `${Math.max(viewportPadding, left)}px`;
        calculatedStyle.transform = "translateX(-50%)";
        calculatedStyle.right = "auto";
      }
      setPositionStyle(calculatedStyle);
    }, [triggerRef, align, side, sideOffset, width, style]);
    useEffect6(() => {
      if (isOpen) {
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
      }
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [isOpen, updatePosition]);
    useEffect6(() => {
      if (!isOpen) return;
      const handlePointerDown = (event) => {
        const target = event.target;
        if (contentRef.current?.contains(target)) {
          return;
        }
        if (triggerRef.current?.contains(target)) {
          return;
        }
        closeMenu();
      };
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          closeMenu();
          triggerRef.current?.focus();
        }
      };
      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("touchstart", handlePointerDown);
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
        document.removeEventListener("touchstart", handlePointerDown);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, closeMenu, contentRef, triggerRef]);
    if (!isOpen) return null;
    const handleRef = (node) => {
      contentRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };
    const contentNode = /* @__PURE__ */ jsx13(
      "div",
      {
        ref: handleRef,
        id: menuId,
        role: "menu",
        "aria-orientation": "vertical",
        tabIndex: -1,
        className: `rv-popoverContainer rv-popoverMenu ${className}`.trim(),
        style: positionStyle,
        onClick: (e) => e.stopPropagation(),
        ...props,
        children
      }
    );
    if (portal && mounted && typeof document !== "undefined") {
      return createPortal5(contentNode, document.body);
    }
    return contentNode;
  }
);
MenuContent.displayName = "MenuContent";
var MenuItem = React12.forwardRef(
  ({ preventClose = false, className = "", children, onClick, disabled, ...props }, ref) => {
    const { closeMenu } = useMenu();
    const handleClick = (e) => {
      if (disabled) return;
      onClick?.(e);
      if (!preventClose && !e.defaultPrevented) {
        closeMenu();
      }
    };
    return /* @__PURE__ */ jsx13(
      "button",
      {
        ref,
        type: "button",
        role: "menuitem",
        disabled,
        className: `rv-listItem ${className}`.trim(),
        onClick: handleClick,
        ...props,
        children
      }
    );
  }
);
MenuItem.displayName = "MenuItem";

// src/components/ui/Chip.tsx
import { forwardRef } from "react";
import { jsx as jsx14, jsxs as jsxs8 } from "react/jsx-runtime";
var Chip = forwardRef(function Chip2({
  active = false,
  icon,
  children,
  className = "",
  type = "button",
  ...props
}, ref) {
  return /* @__PURE__ */ jsxs8(
    "button",
    {
      ref,
      type,
      className: `rv-chip ${active ? "rv-chipActive" : ""} ${className}`.trim(),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx14("span", { className: "rv-chipIcon", children: icon }),
        /* @__PURE__ */ jsx14("span", { children })
      ]
    }
  );
});
var ChipGroup = forwardRef(function ChipGroup2({ children, className = "", ...props }, ref) {
  return /* @__PURE__ */ jsx14("div", { ref, className: `rv-chipGroup ${className}`.trim(), ...props, children });
});

// src/components/ui/Dropzone.tsx
import {
  forwardRef as forwardRef2,
  useState as useState7,
  useRef as useRef4,
  useImperativeHandle
} from "react";
import { Fragment as Fragment4, jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
var Dropzone = forwardRef2(function Dropzone2({
  onDropFiles,
  title = "Drag and drop media here",
  hint = "or click to browse files",
  icon,
  accept,
  multiple = true,
  disabled = false,
  previewUrl,
  previewTitle = "File uploaded",
  previewHint = "Click replace or drop new file to change",
  onReplace,
  onRemove,
  replaceLabel = "Replace",
  removeLabel,
  removeIcon,
  className = "",
  children,
  ...props
}, ref) {
  const [isDragging, setIsDragging] = useState7(false);
  const inputRef = useRef4(null);
  useImperativeHandle(ref, () => ({
    open: () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    }
  }));
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isDragging) {
      setIsDragging(true);
    }
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDropFiles?.(e.dataTransfer.files);
    }
  };
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onDropFiles?.(e.target.files);
    }
  };
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      onClick: () => {
        if (!disabled) {
          inputRef.current?.click();
        }
      },
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      className: `rv-dropzone ${isDragging ? "rv-dropzoneActive" : ""} ${className}`.trim(),
      role: "button",
      tabIndex: 0,
      ...props,
      children: [
        /* @__PURE__ */ jsx15(
          "input",
          {
            ref: inputRef,
            type: "file",
            accept,
            multiple,
            disabled,
            onChange: handleFileInputChange,
            style: { display: "none" }
          }
        ),
        previewUrl ? /* @__PURE__ */ jsxs9(
          "div",
          {
            className: "rv-dropzoneCard",
            onClick: (e) => {
              e.stopPropagation();
            },
            children: [
              /* @__PURE__ */ jsx15("img", { src: previewUrl, alt: previewTitle, className: "rv-dropzoneCardThumb" }),
              /* @__PURE__ */ jsxs9("div", { className: "rv-dropzoneCardMeta", children: [
                /* @__PURE__ */ jsx15("span", { className: "rv-dropzoneCardTitle", children: previewTitle }),
                /* @__PURE__ */ jsx15("span", { className: "rv-dropzoneCardHint", children: previewHint })
              ] }),
              /* @__PURE__ */ jsx15("div", { className: "rv-dropzoneCardActions", children: onRemove && /* @__PURE__ */ jsx15(
                "button",
                {
                  type: "button",
                  className: "rv-btn rv-btnGhost rv-btnIconSm",
                  style: { color: "var(--rv-danger, #ef4444)" },
                  onClick: (e) => {
                    e.stopPropagation();
                    onRemove();
                  },
                  title: removeLabel || "Remove file",
                  children: removeIcon || /* @__PURE__ */ jsxs9("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx15("path", { d: "M3 6h18" }),
                    /* @__PURE__ */ jsx15("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
                    /* @__PURE__ */ jsx15("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
                    /* @__PURE__ */ jsx15("line", { x1: "10", x2: "10", y1: "11", y2: "17" }),
                    /* @__PURE__ */ jsx15("line", { x1: "14", x2: "14", y1: "11", y2: "17" })
                  ] })
                }
              ) })
            ]
          }
        ) : children ? children : /* @__PURE__ */ jsxs9(Fragment4, { children: [
          icon && /* @__PURE__ */ jsx15("div", { className: "rv-dropzoneIcon", children: icon }),
          /* @__PURE__ */ jsx15("div", { className: "rv-dropzoneTitle", children: title }),
          /* @__PURE__ */ jsx15("div", { className: "rv-dropzoneHint", children: hint })
        ] })
      ]
    }
  );
});

// src/components/ui/MediaCard.tsx
import { forwardRef as forwardRef3 } from "react";
import { jsx as jsx16, jsxs as jsxs10 } from "react/jsx-runtime";
var MediaCard = forwardRef3(function MediaCard2({
  src,
  alt = "Media thumbnail",
  variant = "tile",
  aspectRatio,
  title,
  subtitle,
  selected = false,
  badge,
  overlay,
  actions,
  mediaContent,
  className = "",
  style,
  children,
  ...props
}, ref) {
  const isList = variant === "list";
  const computedAspectRatio = typeof aspectRatio === "string" && aspectRatio.includes(":") ? aspectRatio.replace(":", " / ") : aspectRatio;
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      ref,
      className: `rv-mediaCard ${isList ? "rv-mediaCardList" : "rv-mediaCardTile"} ${aspectRatio ? "rv-mediaCardAspect" : ""} ${selected ? "rv-mediaCardSelected" : ""} ${className}`.trim(),
      role: "button",
      tabIndex: 0,
      style: {
        ...!isList && computedAspectRatio ? { aspectRatio: computedAspectRatio } : {},
        ...style
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxs10(
          "div",
          {
            className: "rv-mediaCardThumbWrapper",
            style: !isList && computedAspectRatio ? { aspectRatio: computedAspectRatio } : void 0,
            children: [
              mediaContent ? mediaContent : src ? /* @__PURE__ */ jsx16("img", { src, alt, className: "rv-mediaCardThumb", loading: "lazy" }) : null,
              badge && /* @__PURE__ */ jsx16("div", { className: "rv-mediaCardBadge", children: badge }),
              !isList && (overlay || actions) && /* @__PURE__ */ jsxs10("div", { className: "rv-mediaCardOverlay", children: [
                overlay,
                actions && /* @__PURE__ */ jsx16("div", { className: "rv-mediaCardActions", children: actions })
              ] })
            ]
          }
        ),
        (title || subtitle || children) && /* @__PURE__ */ jsxs10("div", { className: "rv-mediaCardContent", children: [
          title && /* @__PURE__ */ jsx16("div", { className: "rv-mediaCardTitle", children: title }),
          subtitle && /* @__PURE__ */ jsx16("div", { className: "rv-mediaCardSubtitle", children: subtitle }),
          children
        ] })
      ]
    }
  );
});

// src/components/ui/MasonryGrid.tsx
import { useEffect as useEffect7, useMemo, useRef as useRef5, useState as useState8 } from "react";
import { Fragment as Fragment5, jsx as jsx17 } from "react/jsx-runtime";
function MasonryGrid({
  items,
  renderItem,
  keyExtractor = (_item, idx) => idx,
  columns = "responsive",
  gap,
  className = "",
  style,
  emptyState,
  ...props
}) {
  const containerRef = useRef5(null);
  const [columnCount, setColumnCount] = useState8(() => {
    if (typeof columns === "number") return columns;
    return 4;
  });
  useEffect7(() => {
    if (typeof columns === "number") {
      setColumnCount(columns);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const updateColumns = () => {
      const w = el.getBoundingClientRect().width || el.clientWidth;
      if (w <= 0) return;
      if (typeof columns === "object") {
        if (w < 520 && columns.sm) setColumnCount(columns.sm);
        else if (w < 820 && columns.md) setColumnCount(columns.md);
        else if (w < 1180 && columns.lg) setColumnCount(columns.lg);
        else if (w < 1520 && columns.xl) setColumnCount(columns.xl);
        else if (w < 1860 && columns.xxl) setColumnCount(columns.xxl);
        else if (columns.xxxl) setColumnCount(columns.xxxl);
        return;
      }
      if (w < 520) setColumnCount(1);
      else if (w < 820) setColumnCount(2);
      else if (w < 1180) setColumnCount(3);
      else if (w < 1520) setColumnCount(4);
      else if (w < 1860) setColumnCount(5);
      else setColumnCount(6);
    };
    updateColumns();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(updateColumns);
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      window.addEventListener("resize", updateColumns);
      return () => window.removeEventListener("resize", updateColumns);
    }
  }, [columns]);
  const columnBins = useMemo(() => {
    const validCols = Math.max(1, columnCount);
    const bins = Array.from({ length: validCols }, () => []);
    items.forEach((item, idx) => {
      bins[idx % validCols].push({ item, originalIndex: idx });
    });
    return bins;
  }, [items, columnCount]);
  if (items.length === 0 && emptyState) {
    return /* @__PURE__ */ jsx17(Fragment5, { children: emptyState });
  }
  return /* @__PURE__ */ jsx17(
    "div",
    {
      ref: containerRef,
      className: `rv-masonry ${className}`.trim(),
      style: {
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gap: gap !== void 0 ? typeof gap === "number" ? `${gap}px` : gap : void 0,
        ...style
      },
      ...props,
      children: columnBins.map((col, colIdx) => /* @__PURE__ */ jsx17(
        "div",
        {
          className: "rv-masonryCol",
          style: {
            gap: gap !== void 0 ? typeof gap === "number" ? `${gap}px` : gap : void 0
          },
          children: col.map(({ item, originalIndex }) => /* @__PURE__ */ jsx17("div", { className: "rv-masonryItem", children: renderItem(item, originalIndex) }, keyExtractor(item, originalIndex)))
        },
        colIdx
      ))
    }
  );
}

// src/components/ui/SplitButton.tsx
import React17, { forwardRef as forwardRef4 } from "react";
import { Fragment as Fragment6, jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
var VARIANT_CLASS_MAP = {
  primary: "rv-btnPrimary",
  secondary: "rv-btnSecondary",
  brand: "rv-btnBrand",
  danger: "rv-btnDanger",
  ghost: "rv-btnGhost"
};
var DefaultChevronDown = () => /* @__PURE__ */ jsx18(
  "svg",
  {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { display: "block" },
    children: /* @__PURE__ */ jsx18("path", { d: "m6 9 6 6 6-6" })
  }
);
var SplitButtonMain = forwardRef4(
  function SplitButtonMain2({ variant = "primary", className = "", children, ...props }, ref) {
    const variantClass = VARIANT_CLASS_MAP[variant] || "rv-btnPrimary";
    return /* @__PURE__ */ jsx18(
      "button",
      {
        ref,
        type: "button",
        className: `rv-btn ${variantClass} rv-splitBtnMain ${className}`.trim(),
        ...props,
        children
      }
    );
  }
);
var SplitButtonToggle = forwardRef4(
  function SplitButtonToggle2({ variant = "primary", isActive = false, className = "", children, ...props }, ref) {
    const variantClass = VARIANT_CLASS_MAP[variant] || "rv-btnPrimary";
    return /* @__PURE__ */ jsx18(
      "button",
      {
        ref,
        type: "button",
        className: `rv-btn rv-btnIcon ${variantClass} rv-splitBtnToggle ${isActive ? "rv-btnActive" : ""} ${className}`.trim(),
        ...props,
        children: children || /* @__PURE__ */ jsx18(DefaultChevronDown, {})
      }
    );
  }
);
var SplitButton = forwardRef4(
  function SplitButton2({
    variant = "primary",
    disabled = false,
    onAction,
    onToggle,
    actionAriaLabel,
    toggleAriaLabel = "More options",
    isToggleActive = false,
    actionIcon,
    toggleIcon,
    className = "",
    children,
    ...props
  }, ref) {
    const isCustomChildren = React17.Children.count(children) > 1;
    return /* @__PURE__ */ jsx18(
      "div",
      {
        ref,
        className: `rv-splitBtn ${className}`.trim(),
        ...props,
        children: isCustomChildren ? children : /* @__PURE__ */ jsxs11(Fragment6, { children: [
          /* @__PURE__ */ jsxs11(
            SplitButtonMain,
            {
              variant,
              disabled,
              onClick: onAction,
              "aria-label": actionAriaLabel,
              children: [
                actionIcon,
                children && /* @__PURE__ */ jsx18("span", { children })
              ]
            }
          ),
          /* @__PURE__ */ jsx18(
            SplitButtonToggle,
            {
              variant,
              disabled,
              isActive: isToggleActive,
              onClick: onToggle,
              "aria-label": toggleAriaLabel,
              children: toggleIcon
            }
          )
        ] })
      }
    );
  }
);

// src/components/overlays/Sidepanel.tsx
import { useEffect as useEffect8 } from "react";
import { Fragment as Fragment7, jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
function Sidepanel({
  open = true,
  onClose,
  title,
  subtitle,
  headerLeft,
  headerRight,
  width,
  className = "",
  children,
  ariaLabel = "Details Sidepanel",
  customHeader
}) {
  useEffect8(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);
  if (!open) return null;
  const style = width ? { "--rv-sidepanel-width": typeof width === "number" ? `${width}px` : width } : void 0;
  return /* @__PURE__ */ jsxs12(Fragment7, { children: [
    /* @__PURE__ */ jsx19(
      "div",
      {
        className: "rv-sidepanelBackdrop",
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs12(
      "aside",
      {
        className: `rv-sidepanel ${className}`.trim(),
        style,
        "aria-label": ariaLabel,
        children: [
          /* @__PURE__ */ jsx19("div", { className: "rv-sidepanelGrabHandleWrap", children: /* @__PURE__ */ jsx19("div", { className: "rv-sidepanelGrabHandle" }) }),
          customHeader ? customHeader : /* @__PURE__ */ jsxs12("div", { className: "rv-sidepanelHeader", children: [
            /* @__PURE__ */ jsxs12("div", { className: "rv-sidepanelHeaderLeft", children: [
              headerLeft,
              (title || subtitle) && /* @__PURE__ */ jsxs12("div", { className: "rv-sidepanelTitleWrap", children: [
                title && (typeof title === "string" ? /* @__PURE__ */ jsx19("h2", { className: "rv-sidepanelTitle", title, children: title }) : title),
                subtitle && (typeof subtitle === "string" ? /* @__PURE__ */ jsx19("span", { className: "rv-sidepanelSubtitle", children: subtitle }) : subtitle)
              ] })
            ] }),
            headerRight,
            onClose && /* @__PURE__ */ jsx19(
              "button",
              {
                type: "button",
                className: "rv-btn rv-btnGhost rv-btnIcon rv-sidepanelCloseBtn",
                onClick: onClose,
                "aria-label": "Close sidepanel",
                title: "Close sidepanel",
                children: /* @__PURE__ */ jsx19("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx19("path", { d: "M18 6L6 18M6 6l12 12" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsx19("div", { className: "rv-sidepanelBody", children })
        ]
      }
    )
  ] });
}
function SidepanelHeader({
  className = "",
  children
}) {
  return /* @__PURE__ */ jsx19("div", { className: `rv-sidepanelHeader ${className}`.trim(), children });
}
function SidepanelBody({
  className = "",
  children
}) {
  return /* @__PURE__ */ jsx19("div", { className: `rv-sidepanelBody ${className}`.trim(), children });
}
export {
  AppShell,
  Canvas,
  CanvasContent,
  CanvasInner,
  CanvasScroll,
  Chip,
  ChipGroup,
  ComponentWrapper,
  Dialog,
  Dropzone,
  EmptyState,
  MainContent,
  MasonryGrid,
  MediaCard,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  MobileSidebarDrawer,
  Modal,
  ModalBody,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverMenu,
  PopoverTitle,
  PopoverTrigger,
  ResizeHandle,
  Sidebar,
  SidebarBody,
  SidebarPanel,
  SidebarRail,
  SidebarToggle,
  Sidepanel,
  SidepanelBody,
  SidepanelHeader,
  SplitButton,
  SplitButtonMain,
  SplitButtonToggle,
  Tooltip,
  Topbar,
  TopbarLeft,
  TopbarLogo,
  TopbarRight,
  useMenu,
  usePopover
};
//# sourceMappingURL=index.mjs.map