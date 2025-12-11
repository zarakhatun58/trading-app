import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  HTMLAttributes,
  ReactElement,
  cloneElement,
} from "react";
import { cn } from "../../libs/utils";

type Side = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: ReactNode;
  delay?: number;
}

interface TooltipTriggerProps {
  children: ReactElement;
  asChild?: boolean;
}

interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  side?: Side;
  arrow?: boolean;
}

// CONTEXT
const TooltipContext = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
  delay: number;
} | null>(null);

// ROOT WRAPPER
export function Tooltip({ children, delay = 100 }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipContext.Provider value={{ open, setOpen, delay }}>
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  );
}

// TRIGGER
export function TooltipTrigger({ children, asChild }: TooltipTriggerProps) {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("TooltipTrigger must be inside <Tooltip>");

  const { setOpen, delay } = ctx;
  const timer = useRef<any>(null);

  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 50);
  };

  const triggerEvents = {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  };

  if (asChild) {
    return React.cloneElement(children, triggerEvents);
  }

  return (
    <div {...triggerEvents} className="inline-flex">
      {children}
    </div>
  );
}

// CONTENT
export function TooltipContent({
  children,
  side = "top",
  arrow = true,
  className,
  ...props
}: TooltipContentProps) {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("TooltipContent must be inside <Tooltip>");

  const { open } = ctx;

  const positions: Record<Side, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      role="tooltip"
      className={cn(
        "absolute z-50 px-2 py-1 rounded bg-gray-900 text-white text-xs shadow-md pointer-events-none",
        "transition-all duration-150",
        open ? "opacity-100 scale-100" : "opacity-0 scale-95",
        positions[side],
        className
      )}
      {...props}
    >
      {children}

      {arrow && (
        <div
          className={cn(
            "absolute w-2 h-2 bg-gray-900 rotate-45",
            side === "top" && "left-1/2 -translate-x-1/2 bottom-[-4px]",
            side === "bottom" && "left-1/2 -translate-x-1/2 top-[-4px]",
            side === "left" && "top-1/2 -translate-y-1/2 right-[-4px]",
            side === "right" && "top-1/2 -translate-y-1/2 left-[-4px]"
          )}
        />
      )}
    </div>
  );
}
