'use client';
require('./index.css');
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
  Chip: () => Chip,
  ChipGroup: () => ChipGroup,
  ComponentWrapper: () => ComponentWrapper,
  Dialog: () => Dialog,
  Dropzone: () => Dropzone,
  EmptyState: () => EmptyState,
  MainContent: () => MainContent,
  MediaCard: () => MediaCard,
  Modal: () => Modal,
  ModalBody: () => ModalBody,
  ModalDescription: () => ModalDescription,
  ModalFooter: () => ModalFooter,
  ModalHeader: () => ModalHeader,
  ModalTitle: () => ModalTitle,
  Popover: () => Popover,
  PopoverContent: () => PopoverContent,
  PopoverHeader: () => PopoverHeader,
  PopoverTitle: () => PopoverTitle,
  ResizeHandle: () => ResizeHandle,
  Sidebar: () => Sidebar,
  SidebarBody: () => SidebarBody,
  SidebarPanel: () => SidebarPanel,
  SidebarRail: () => SidebarRail,
  SplitButton: () => SplitButton,
  SplitButtonMain: () => SplitButtonMain,
  SplitButtonToggle: () => SplitButtonToggle,
  Tooltip: () => Tooltip,
  Topbar: () => Topbar,
  TopbarLeft: () => TopbarLeft,
  TopbarLogo: () => TopbarLogo,
  TopbarRight: () => TopbarRight
});
module.exports = __toCommonJS(index_exports);

// src/components/shell/AppShell.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var AppShell = import_react.default.forwardRef(
  ({ children, className = "", brand, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var MainContent = import_react.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react2 = __toESM(require("react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var Canvas = import_react2.default.forwardRef(
  ({ children, deviceMode = "desktop", scrolledBottom = false, className = "", ...props }, ref) => {
    const modeClass = deviceMode === "desktop" ? "rv-canvasDesktop" : "rv-canvasMobile";
    const bottomClass = scrolledBottom ? "rv-canvasScrolledBottom" : "";
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var CanvasInner = import_react2.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var CanvasScroll = import_react2.default.forwardRef(
  ({ children, className = "", onScroll, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var CanvasContent = import_react2.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var ComponentWrapper = import_react2.default.forwardRef(
  ({ children, selected = false, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var EmptyState = import_react2.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        ref,
        className: `rv-emptyState ${className}`.trim(),
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "rv-emptyStateText", children })
      }
    );
  }
);
EmptyState.displayName = "EmptyState";

// src/components/sidebar/Sidebar.tsx
var import_react4 = __toESM(require("react"));

// src/components/sidebar/ResizeHandle.tsx
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var ResizeHandle = ({
  onResize,
  onResizeEnd,
  className = ""
}) => {
  const [isDragging, setIsDragging] = (0, import_react3.useState)(false);
  const handleMouseDown = (0, import_react3.useCallback)((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  (0, import_react3.useEffect)(() => {
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
var Sidebar = import_react4.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "aside",
      {
        ref,
        className: `rv-sidebarShell ${stateClass} ${className}`.trim(),
        style: inlineStyle,
        "data-builder-ui": dataBuilderUi ? "true" : void 0,
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `rv-sidebar ${innerClassName}`.trim(), children: [
          children,
          resizable && state === "full" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ResizeHandle, { onResize })
        ] })
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
var SidebarBody = import_react4.default.forwardRef(
  ({ children, className = "", open, ...props }, ref) => {
    const openClass = open ? "rv-sidebarBodyOpen" : "";
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var SidebarPanel = import_react4.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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

// src/components/topbar/Topbar.tsx
var import_react5 = __toESM(require("react"));
var import_jsx_runtime6 = require("react/jsx-runtime");
var Topbar = import_react5.default.forwardRef(
  ({ children, className = "", dataBuilderUi = true, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var TopbarLeft = import_react5.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { ref, className: `rv-topbarLeft ${className}`.trim(), ...props, children });
  }
);
TopbarLeft.displayName = "TopbarLeft";
var TopbarRight = import_react5.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { ref, className: `rv-topbarRight ${className}`.trim(), ...props, children });
  }
);
TopbarRight.displayName = "TopbarRight";
var TopbarLogo = import_react5.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { ref, className: `rv-topbarLogo ${className}`.trim(), ...props, children });
  }
);
TopbarLogo.displayName = "TopbarLogo";

// src/components/overlays/Popover.tsx
var import_react6 = __toESM(require("react"));
var import_jsx_runtime7 = require("react/jsx-runtime");
var Popover = import_react6.default.forwardRef(
  ({
    isOpen = true,
    onClose,
    position,
    centerByDefault = true,
    width = 362,
    className = "",
    overlayClassName = "",
    dataBuilderUi = true,
    children,
    style,
    ...props
  }, ref) => {
    if (!isOpen) return null;
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
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "div",
        {
          className: `rv-popoverOverlay ${overlayClassName}`.trim(),
          onClick: onClose,
          style: { pointerEvents: onClose ? "auto" : "none" },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "div",
        {
          ref,
          className: `rv-popoverContainer ${className}`.trim(),
          style: popoverStyle,
          onClick: (e) => e.stopPropagation(),
          "data-builder-ui": dataBuilderUi ? "true" : void 0,
          role: "dialog",
          "aria-modal": "true",
          ...props,
          children
        }
      )
    ] });
  }
);
Popover.displayName = "Popover";
var PopoverHeader = import_react6.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { ref, className: `rv-popoverHeader ${className}`.trim(), ...props, children });
  }
);
PopoverHeader.displayName = "PopoverHeader";
var PopoverTitle = import_react6.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { ref, className: `rv-popoverTitle ${className}`.trim(), ...props, children });
  }
);
PopoverTitle.displayName = "PopoverTitle";
var PopoverContent = import_react6.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { ref, className: `rv-popoverContent ${className}`.trim(), ...props, children });
  }
);
PopoverContent.displayName = "PopoverContent";

// src/components/overlays/Tooltip.tsx
var import_react7 = require("react");
var import_react_dom = require("react-dom");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Tooltip = ({
  content,
  children,
  position = "top",
  delay = 500,
  className = "",
  zIndex = 9999
}) => {
  const [isVisible, setIsVisible] = (0, import_react7.useState)(false);
  const [tooltipStyle, setTooltipStyle] = (0, import_react7.useState)({
    top: -9999,
    left: -9999,
    opacity: 0
  });
  const triggerRef = (0, import_react7.useRef)(null);
  const tooltipRef = (0, import_react7.useRef)(null);
  const timeoutRef = (0, import_react7.useRef)(null);
  const [mounted, setMounted] = (0, import_react7.useState)(false);
  (0, import_react7.useEffect)(() => setMounted(true), []);
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
  (0, import_react7.useEffect)(() => {
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
  if (!content) return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children });
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "div",
      {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: { display: "contents" },
        children
      }
    ),
    mounted && isVisible && (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_react8 = __toESM(require("react"));
var import_react_dom2 = require("react-dom");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Modal = import_react8.default.forwardRef(
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
    const [mounted, setMounted] = (0, import_react8.useState)(false);
    (0, import_react8.useEffect)(() => {
      setMounted(true);
    }, []);
    (0, import_react8.useEffect)(() => {
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
    (0, import_react8.useEffect)(() => {
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
    return (0, import_react_dom2.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        "div",
        {
          className: `rv-modalOverlay ${overlayClassName}`.trim(),
          onClick: () => {
            if (closeOnOverlayClick && onClose) {
              onClose();
            }
          },
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var ModalHeader = import_react8.default.forwardRef(
  ({ children, className = "", onClose, showCloseButton = false, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { ref, className: `rv-modalHeader ${className}`.trim(), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "rv-modalHeaderContent", children }),
      showCloseButton && onClose && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var ModalTitle = import_react8.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { ref, className: `rv-modalTitle ${className}`.trim(), ...props, children });
  }
);
ModalTitle.displayName = "ModalTitle";
var ModalDescription = import_react8.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { ref, className: `rv-modalDescription ${className}`.trim(), ...props, children });
  }
);
ModalDescription.displayName = "ModalDescription";
var ModalBody = import_react8.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { ref, className: `rv-modalBody ${className}`.trim(), ...props, children });
  }
);
ModalBody.displayName = "ModalBody";
var ModalFooter = import_react8.default.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { ref, className: `rv-modalFooter ${className}`.trim(), ...props, children });
  }
);
ModalFooter.displayName = "ModalFooter";

// src/components/overlays/Dialog.tsx
var import_react9 = __toESM(require("react"));
var import_jsx_runtime10 = require("react/jsx-runtime");
var variantClassMap = {
  primary: "rv-btnPrimary",
  brand: "rv-btnBrand",
  danger: "rv-btnDanger",
  secondary: "rv-btnSecondary",
  ghost: "rv-btnGhost"
};
var Dialog = import_react9.default.forwardRef(
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
    actionVariant = "primary",
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
    const actionClass = variantClassMap[actionVariant] || "rv-btnPrimary";
    const dialogInner = /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(ModalHeader, { onClose, showCloseButton, children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ModalTitle, { children: title }),
        children && description && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ModalDescription, { children: description })
      ] }),
      children ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ModalBody, { children }) : description ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "rv-modalDescription", style: { margin: 0 }, children: description }) }) : null,
      footer !== void 0 ? footer : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(ModalFooter, { children: [
        showCancel && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "button",
          {
            type: "button",
            onClick: onCancel || onClose,
            disabled: isActionLoading,
            className: "rv-btn rv-btnGhost",
            children: cancelLabel
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Modal,
      {
        ref,
        isOpen,
        onClose,
        size,
        ...modalProps,
        children: onSubmit ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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

// src/components/ui/Chip.tsx
var import_react10 = require("react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Chip = (0, import_react10.forwardRef)(function Chip2({
  active = false,
  icon,
  children,
  className = "",
  type = "button",
  ...props
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    "button",
    {
      ref,
      type,
      className: `rv-chip ${active ? "rv-chipActive" : ""} ${className}`.trim(),
      ...props,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "rv-chipIcon", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children })
      ]
    }
  );
});
var ChipGroup = (0, import_react10.forwardRef)(function ChipGroup2({ children, className = "", ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { ref, className: `rv-chipGroup ${className}`.trim(), ...props, children });
});

// src/components/ui/Dropzone.tsx
var import_react11 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var Dropzone = (0, import_react11.forwardRef)(function Dropzone2({
  onDropFiles,
  title = "Drag and drop media here",
  hint = "or click to browse files",
  icon,
  accept,
  multiple = true,
  disabled = false,
  className = "",
  children,
  ...props
}, ref) {
  const [isDragging, setIsDragging] = (0, import_react11.useState)(false);
  const inputRef = (0, import_react11.useRef)(null);
  (0, import_react11.useImperativeHandle)(ref, () => ({
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
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
        children ? children : /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "rv-dropzoneIcon", children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "rv-dropzoneTitle", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "rv-dropzoneHint", children: hint })
        ] })
      ]
    }
  );
});

// src/components/ui/MediaCard.tsx
var import_react12 = require("react");
var import_jsx_runtime13 = require("react/jsx-runtime");
var MediaCard = (0, import_react12.forwardRef)(function MediaCard2({
  src,
  alt = "Media thumbnail",
  selected = false,
  badge,
  overlay,
  className = "",
  children,
  ...props
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    "div",
    {
      ref,
      className: `rv-mediaCard ${selected ? "rv-mediaCardSelected" : ""} ${className}`.trim(),
      role: "button",
      tabIndex: 0,
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("img", { src, alt, className: "rv-mediaCardThumb" }),
        badge && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "rv-mediaCardBadge", children: badge }),
        overlay && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "rv-mediaCardOverlay", children: overlay }),
        children
      ]
    }
  );
});

// src/components/ui/SplitButton.tsx
var import_react13 = __toESM(require("react"));
var import_jsx_runtime14 = require("react/jsx-runtime");
var VARIANT_CLASS_MAP = {
  primary: "rv-btnPrimary",
  secondary: "rv-btnSecondary",
  brand: "rv-btnBrand",
  danger: "rv-btnDanger",
  ghost: "rv-btnGhost"
};
var DefaultChevronDown = () => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "m6 9 6 6 6-6" })
  }
);
var SplitButtonMain = (0, import_react13.forwardRef)(
  function SplitButtonMain2({ variant = "primary", className = "", children, ...props }, ref) {
    const variantClass = VARIANT_CLASS_MAP[variant] || "rv-btnPrimary";
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
var SplitButtonToggle = (0, import_react13.forwardRef)(
  function SplitButtonToggle2({ variant = "primary", isActive = false, className = "", children, ...props }, ref) {
    const variantClass = VARIANT_CLASS_MAP[variant] || "rv-btnPrimary";
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "button",
      {
        ref,
        type: "button",
        className: `rv-btn rv-btnIcon ${variantClass} rv-splitBtnToggle ${isActive ? "rv-btnActive" : ""} ${className}`.trim(),
        ...props,
        children: children || /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DefaultChevronDown, {})
      }
    );
  }
);
var SplitButton = (0, import_react13.forwardRef)(
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
    const isCustomChildren = import_react13.default.Children.count(children) > 1;
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "div",
      {
        ref,
        className: `rv-splitBtn ${className}`.trim(),
        ...props,
        children: isCustomChildren ? children : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            SplitButtonMain,
            {
              variant,
              disabled,
              onClick: onAction,
              "aria-label": actionAriaLabel,
              children: [
                actionIcon,
                children && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  MediaCard,
  Modal,
  ModalBody,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  ResizeHandle,
  Sidebar,
  SidebarBody,
  SidebarPanel,
  SidebarRail,
  SplitButton,
  SplitButtonMain,
  SplitButtonToggle,
  Tooltip,
  Topbar,
  TopbarLeft,
  TopbarLogo,
  TopbarRight
});
//# sourceMappingURL=index.js.map