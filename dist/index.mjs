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

// src/components/topbar/Topbar.tsx
import React5 from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Topbar = React5.forwardRef(
  ({ children, className = "", dataBuilderUi = true, ...props }, ref) => {
    return /* @__PURE__ */ jsx6(
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
var TopbarLeft = React5.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx6("div", { ref, className: `rv-topbarLeft ${className}`.trim(), ...props, children });
  }
);
TopbarLeft.displayName = "TopbarLeft";
var TopbarRight = React5.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx6("div", { ref, className: `rv-topbarRight ${className}`.trim(), ...props, children });
  }
);
TopbarRight.displayName = "TopbarRight";
var TopbarLogo = React5.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx6("h1", { ref, className: `rv-topbarLogo ${className}`.trim(), ...props, children });
  }
);
TopbarLogo.displayName = "TopbarLogo";

// src/components/overlays/Popover.tsx
import React6 from "react";
import { Fragment, jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var Popover = React6.forwardRef(
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
    return /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx7(
        "div",
        {
          className: `rv-popoverOverlay ${overlayClassName}`.trim(),
          onClick: onClose,
          style: { pointerEvents: onClose ? "auto" : "none" },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx7(
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
var PopoverHeader = React6.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx7("div", { ref, className: `rv-popoverHeader ${className}`.trim(), ...props, children });
  }
);
PopoverHeader.displayName = "PopoverHeader";
var PopoverTitle = React6.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx7("span", { ref, className: `rv-popoverTitle ${className}`.trim(), ...props, children });
  }
);
PopoverTitle.displayName = "PopoverTitle";
var PopoverContent = React6.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx7("div", { ref, className: `rv-popoverContent ${className}`.trim(), ...props, children });
  }
);
PopoverContent.displayName = "PopoverContent";

// src/components/overlays/Tooltip.tsx
import { useState as useState2, useRef, useEffect as useEffect2 } from "react";
import { createPortal } from "react-dom";
import { Fragment as Fragment2, jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var Tooltip = ({
  content,
  children,
  position = "top",
  delay = 500,
  className = "",
  zIndex = 9999
}) => {
  const [isVisible, setIsVisible] = useState2(false);
  const [tooltipStyle, setTooltipStyle] = useState2({
    top: -9999,
    left: -9999,
    opacity: 0
  });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  const [mounted, setMounted] = useState2(false);
  useEffect2(() => setMounted(true), []);
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
  useEffect2(() => {
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
  if (!content) return /* @__PURE__ */ jsx8(Fragment2, { children });
  return /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx8(
      "div",
      {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: { display: "contents" },
        children
      }
    ),
    mounted && isVisible && createPortal(
      /* @__PURE__ */ jsx8(
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
import React8, { useEffect as useEffect3, useState as useState3 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var Modal = React8.forwardRef(
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
    const [mounted, setMounted] = useState3(false);
    useEffect3(() => {
      setMounted(true);
    }, []);
    useEffect3(() => {
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
    useEffect3(() => {
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
    return createPortal2(
      /* @__PURE__ */ jsx9(
        "div",
        {
          className: `rv-modalOverlay ${overlayClassName}`.trim(),
          onClick: () => {
            if (closeOnOverlayClick && onClose) {
              onClose();
            }
          },
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx9(
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
var ModalHeader = React8.forwardRef(
  ({ children, className = "", onClose, showCloseButton = false, ...props }, ref) => {
    return /* @__PURE__ */ jsxs5("div", { ref, className: `rv-modalHeader ${className}`.trim(), ...props, children: [
      /* @__PURE__ */ jsx9("div", { className: "rv-modalHeaderContent", children }),
      showCloseButton && onClose && /* @__PURE__ */ jsx9(
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
var ModalTitle = React8.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx9("h3", { ref, className: `rv-modalTitle ${className}`.trim(), ...props, children });
  }
);
ModalTitle.displayName = "ModalTitle";
var ModalDescription = React8.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx9("p", { ref, className: `rv-modalDescription ${className}`.trim(), ...props, children });
  }
);
ModalDescription.displayName = "ModalDescription";
var ModalBody = React8.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx9("div", { ref, className: `rv-modalBody ${className}`.trim(), ...props, children });
  }
);
ModalBody.displayName = "ModalBody";
var ModalFooter = React8.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx9("div", { ref, className: `rv-modalFooter ${className}`.trim(), ...props, children });
  }
);
ModalFooter.displayName = "ModalFooter";

// src/components/overlays/Dialog.tsx
import React9 from "react";
import { Fragment as Fragment3, jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var variantClassMap = {
  primary: "rv-btnPrimary",
  brand: "rv-btnBrand",
  danger: "rv-btnDanger",
  secondary: "rv-btnSecondary",
  ghost: "rv-btnGhost"
};
var Dialog = React9.forwardRef(
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
    const dialogInner = /* @__PURE__ */ jsxs6(Fragment3, { children: [
      /* @__PURE__ */ jsxs6(ModalHeader, { onClose, showCloseButton, children: [
        /* @__PURE__ */ jsx10(ModalTitle, { children: title }),
        children && description && /* @__PURE__ */ jsx10(ModalDescription, { children: description })
      ] }),
      children ? /* @__PURE__ */ jsx10(ModalBody, { children }) : description ? /* @__PURE__ */ jsx10(ModalBody, { children: /* @__PURE__ */ jsx10("p", { className: "rv-modalDescription", style: { margin: 0 }, children: description }) }) : null,
      footer !== void 0 ? footer : /* @__PURE__ */ jsxs6(ModalFooter, { children: [
        showCancel && /* @__PURE__ */ jsx10(
          "button",
          {
            type: "button",
            onClick: onCancel || onClose,
            disabled: isActionLoading,
            className: "rv-btn rv-btnGhost",
            children: cancelLabel
          }
        ),
        /* @__PURE__ */ jsx10(
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
    return /* @__PURE__ */ jsx10(
      Modal,
      {
        ref,
        isOpen,
        onClose,
        size,
        ...modalProps,
        children: onSubmit ? /* @__PURE__ */ jsx10(
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
export {
  AppShell,
  Canvas,
  CanvasContent,
  CanvasInner,
  CanvasScroll,
  ComponentWrapper,
  Dialog,
  EmptyState,
  MainContent,
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
  Tooltip,
  Topbar,
  TopbarLeft,
  TopbarLogo,
  TopbarRight
};
//# sourceMappingURL=index.mjs.map