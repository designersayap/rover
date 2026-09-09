'use client';
import './index.css';

// src/components/shell/AppShell.tsx
import { jsx } from "react/jsx-runtime";
var AppShell = ({
  children,
  className = "",
  brand,
  style
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `rv-container ${className}`.trim(),
      "data-rv-brand": brand,
      style,
      children
    }
  );
};
var MainContent = ({
  children,
  className = "",
  style
}) => {
  return /* @__PURE__ */ jsx("div", { className: `rv-mainContent ${className}`.trim(), style, children });
};

// src/components/shell/Canvas.tsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Canvas = ({
  children,
  deviceMode = "desktop",
  scrolledBottom = false,
  className = "",
  style
}) => {
  const modeClass = deviceMode === "desktop" ? "rv-canvasDesktop" : "rv-canvasMobile";
  const bottomClass = scrolledBottom ? "rv-canvasScrolledBottom" : "";
  return /* @__PURE__ */ jsx2(
    "main",
    {
      className: `rv-canvas ${modeClass} ${bottomClass} ${className}`.trim(),
      style,
      children
    }
  );
};
var CanvasInner = ({
  children,
  className = "",
  style
}) => {
  return /* @__PURE__ */ jsx2("div", { className: `rv-canvasInner ${className}`.trim(), style, children });
};
var CanvasScroll = React.forwardRef(
  ({ children, className = "", onScroll }, ref) => {
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className: `rv-canvasScroll ${className}`.trim(),
        onScroll,
        children
      }
    );
  }
);
CanvasScroll.displayName = "CanvasScroll";
var CanvasContent = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsx2("div", { className: `rv-canvasContent ${className}`.trim(), children });
};
var ComponentWrapper = ({
  children,
  selected = false,
  className = "",
  onClick,
  onKeyDown,
  id
}) => {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      id,
      className: `rv-componentWrapper ${selected ? "rv-componentSelected" : ""} ${className}`.trim(),
      onClick,
      onKeyDown,
      children
    }
  );
};
var EmptyState = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsx2("div", { className: `rv-emptyState ${className}`.trim(), children: /* @__PURE__ */ jsx2("div", { className: "rv-emptyStateText", children }) });
};

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
var Sidebar = ({
  children,
  state = "full",
  className = "",
  width,
  onResize,
  resizable = false,
  style,
  dataBuilderUi = true
}) => {
  const stateClass = state === "rail-only" ? "rv-sidebarRailOnly" : state === "collapsed" ? "rv-sidebarCollapsed" : "";
  const inlineStyle = {
    ...style,
    ...width !== void 0 && state === "full" ? { width: typeof width === "number" ? `${width}px` : width } : {}
  };
  return /* @__PURE__ */ jsx4(
    "aside",
    {
      className: `rv-sidebarShell ${stateClass} ${className}`.trim(),
      style: inlineStyle,
      "data-builder-ui": dataBuilderUi ? "true" : void 0,
      children: /* @__PURE__ */ jsxs("div", { className: "rv-sidebar", children: [
        children,
        resizable && state === "full" && /* @__PURE__ */ jsx4(ResizeHandle, { onResize })
      ] })
    }
  );
};
var SidebarBody = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsx4("div", { className: `rv-sidebarBody ${className}`.trim(), children });
};
var SidebarPanel = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsx4("div", { className: `rv-sidebarPanel ${className}`.trim(), children });
};

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