import * as React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "../lib/utils";

/**
 * Варианты анимации (Motion Behavior Rules)
 */
const motionVariants: Record<string, Variants> = {
  none: {
    initial: { scale: 1 },
    hover: { scale: 1 },
    tap: { scale: 1 },
  },
  soft: {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  },
  expressive: {
    initial: { scale: 1 },
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95, y: 0 },
  },
};

const transitionRules = {
  soft: { type: "spring", stiffness: 400, damping: 25 },
  expressive: { type: "spring", stiffness: 500, damping: 15 },
  none: { duration: 0 },
};

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  motionType?: "none" | "soft" | "expressive";
  isLoading?: boolean;
  children?: React.ReactNode;
}

/**
 * Button Primitive
 * Единый компонент с поддержкой состояний, вариантов и правил движения.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      motionType = "soft",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    // Схемы вариантов (Variants Schema)
    const variantStyles = {
      primary: "bg-brand-primary text-text-contrast shadow-sm hover:shadow-md",
      secondary: "bg-surface-muted text-text-main border border-surface-muted hover:bg-neutral-200",
      ghost: "bg-transparent text-text-main hover:bg-surface-muted",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-4 text-lg font-semibold",
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        initial="initial"
        whileHover={!disabled && !isLoading ? "hover" : "initial"}
        whileTap={!disabled && !isLoading ? "tap" : "initial"}
        variants={motionVariants[motionType]}
        transition={transitionRules[motionType]}
        className={cn(
          "relative inline-flex items-center justify-center rounded-primitive transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          (disabled || isLoading) && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-primitive">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        <span className={cn("inline-flex items-center gap-2", isLoading && "invisible")}>
          {props.children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
