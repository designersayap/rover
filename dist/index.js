'use client';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AppShell: () => AppShell,
  Canvas: () => Canvas,
  CanvasContent: () => CanvasContent,
  CanvasInner: () => CanvasInner,
  CanvasScroll: () => CanvasScroll,
  ComponentWrapper: () => ComponentWrapper,
  EmptyState: () => EmptyState,
  MainContent: () => MainContent,
  ResizeHandle: () => ResizeHandle,
  Sidebar: () => Sidebar,
  SidebarBody: () => SidebarBody,
  SidebarPanel: () => SidebarPanel,
  SidebarRail: () => SidebarRail
});
module.exports = __toCommonJS(index_exports);

// src/components/shell/AppShell.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var AppShell = ({
  children,
  className = "",
  brand,
  style
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `rv-mainContent ${className}`.trim(), style, children });
};

// src/components/shell/Canvas.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var Canvas = ({
  children,
  deviceMode = "desktop",
  scrolledBottom = false,
  className = "",
  style
}) => {
  const modeClass = deviceMode === "desktop" ? "rv-canvasDesktop" : "rv-canvasMobile";
  const bottomClass = scrolledBottom ? "rv-canvasScrolledBottom" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `rv-canvasInner ${className}`.trim(), style, children });
};
var CanvasScroll = import_react.default.forwardRef(
  ({ children, className = "", onScroll }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `rv-canvasContent ${className}`.trim(), children });
};
var ComponentWrapper = ({
  children,
  selected = false,
  className = "",
  onClick,
  onKeyDown,
  id
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `rv-emptyState ${className}`.trim(), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "rv-emptyStateText", children }) });
};

// src/components/sidebar/ResizeHandle.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var ResizeHandle = ({
  onResize,
  onResizeEnd,
  className = ""
}) => {
  const [isDragging, setIsDragging] = (0, import_react2.useState)(false);
  const handleMouseDown = (0, import_react2.useCallback)((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      className: `rv-resizeHandle ${isDragging ? "rv-resizeHandleActive" : ""} ${className}`.trim(),
      onMouseDown: handleMouseDown,
      role: "separator",
      "aria-orientation": "vertical",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "rv-resizeHandleBar" })
    }
  );
};

// src/components/sidebar/Sidebar.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "aside",
    {
      className: `rv-sidebarShell ${stateClass} ${className}`.trim(),
      style: inlineStyle,
      "data-builder-ui": dataBuilderUi ? "true" : void 0,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "rv-sidebar", children: [
        children,
        resizable && state === "full" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ResizeHandle, { onResize })
      ] })
    }
  );
};
var SidebarBody = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `rv-sidebarBody ${className}`.trim(), children });
};
var SidebarPanel = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `rv-sidebarPanel ${className}`.trim(), children });
};

// src/components/sidebar/SidebarRail.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `rv-sidebarRail ${className}`.trim(), children: [
    showIndicator && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "button",
        {
          type: "button",
          className: `rv-sidebarRailItem ${isActive ? "rv-sidebarRailItemActive" : ""}`.trim(),
          onClick: () => onTabChange?.(item.id),
          "aria-selected": isActive,
          children: [
            item.icon,
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "rv-sidebarRailLabel", children: item.label })
          ]
        },
        item.id
      );
    }),
    children
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.js.map