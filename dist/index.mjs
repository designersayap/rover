'use client';
import './index.css';

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
import React4 from "react";

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

// src/components/sidebar/Sidebar.tsx
import { jsx as jsx4, jsxs } from "react/jsx-runtime";
var Sidebar = React4.forwardRef(
  ({
    children,
    state = "full",
    className = "",
    width,
    onResize,
    resizable = false,
    style,
    dataBuilderUi = true,
    innerClassName = "",
    ...props
  }, ref) => {
    const stateClass = state === "rail-only" ? "rv-sidebarRailOnly" : state === "collapsed" ? "rv-sidebarCollapsed" : "";
    const inlineStyle = {
      ...style,
      ...width !== void 0 && state === "full" ? { width: typeof width === "number" ? `${width}px` : width } : {}
    };
    return /* @__PURE__ */ jsx4(
      "aside",
      {
        ref,
        className: `rv-sidebarShell ${stateClass} ${className}`.trim(),
        style: inlineStyle,
        "data-builder-ui": dataBuilderUi ? "true" : void 0,
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: `rv-sidebar ${innerClassName}`.trim(), children: [
          children,
          resizable && state === "full" && /* @__PURE__ */ jsx4(ResizeHandle, { onResize })
        ] })
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
var SidebarBody = React4.forwardRef(
  ({ children, className = "", open, ...props }, ref) => {
    const openClass = open ? "rv-sidebarBodyOpen" : "";
    return /* @__PURE__ */ jsx4(
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
var SidebarPanel = React4.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx4(
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
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
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
    showIndicator && /* @__PURE__ */ jsx5(
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
            /* @__PURE__ */ jsx5("span", { className: "rv-sidebarRailLabel", children: item.label })
          ]
        },
        item.id
      );
    }),
    children
  ] });
};
export {
  AppShell,
  Canvas,
  CanvasContent,
  CanvasInner,
  CanvasScroll,
  ComponentWrapper,
  EmptyState,
  MainContent,
  ResizeHandle,
  Sidebar,
  SidebarBody,
  SidebarPanel,
  SidebarRail
};
//# sourceMappingURL=index.mjs.map