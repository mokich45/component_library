import * as React from "react";
import { cn } from "../lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "none" | "compact" | "normal" | "relaxed";
  containerSize?: "sm" | "md" | "lg" | "full";
}

/**
 * Section Primitive
 * Определяет пространственные правила для всех блоков сайта.
 */
export const Section = ({
  spacing = "normal",
  containerSize = "lg",
  className,
  children,
  ...props
}: SectionProps) => {
  const spacingStyles = {
    none: "py-0",
    compact: "py-12 md:py-16",
    normal: "py-16 md:py-32",
    relaxed: "py-24 md:py-48",
  };

  const containerStyles = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-container",
    full: "max-w-full",
  };

  return (
    <section
      className={cn(
        spacingStyles[spacing],
        "px-container-x-mobile md:px-container-x",
        className
      )}
      {...props}
    >
      <div className={cn("mx-auto w-full", containerStyles[containerSize])}>
        {children}
      </div>
    </section>
  );
};

/**
 * Stack Primitive
 * Управляет внутренними отступами между элементами.
 */
export const Stack = ({
  gap = "md",
  direction = "vertical",
  className,
  children,
}: {
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  direction?: "vertical" | "horizontal";
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
        {
          "gap-xs": gap === "xs",
          "gap-sm": gap === "sm",
          "gap-md": gap === "md",
          "gap-lg": gap === "lg",
          "gap-xl": gap === "xl",
          "gap-2xl": gap === "2xl",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
