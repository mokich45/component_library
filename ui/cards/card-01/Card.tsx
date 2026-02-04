import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  elevation?: "flat" | "raised" | "floating";
  interactive?: "none" | "hover" | "clickable";
  layout?: "vertical" | "horizontal";
  media?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Card Primitive
 * Универсальный контейнер для контента с гибкой раскладкой и уровнями элевации.
 */
export const Card = ({
  children,
  className,
  elevation = "flat",
  interactive = "none",
  layout = "vertical",
  media,
  title,
  description,
  actions,
  onClick,
}: CardProps) => {
  const isClickable = interactive === "clickable" || !!onClick;

  const elevationStyles = {
    flat: "border border-surface-muted bg-surface-base",
    raised: "border border-surface-muted bg-surface-base shadow-md",
    floating: "border border-transparent bg-surface-base shadow-xl",
  };

  const interactiveStyles = {
    none: "",
    hover: "hover:shadow-lg transition-shadow duration-300",
    clickable: "cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]",
  };

  const layoutStyles = {
    vertical: "flex-col",
    horizontal: "flex-col md:flex-row",
  };

  const Component = isClickable ? motion.div : "div";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "flex overflow-hidden rounded-primitive",
        elevationStyles[elevation],
        interactiveStyles[interactive],
        layoutStyles[layout],
        className
      )}
      {...(isClickable ? { whileTap: { scale: 0.98 } } : {})}
    >
      {/* Media Slot */}
      {media && (
        <div
          className={cn(
            "overflow-hidden bg-surface-muted",
            layout === "horizontal" ? "w-full md:w-1/3 shrink-0" : "w-full aspect-video"
          )}
        >
          {media}
        </div>
      )}

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6">
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <div className="text-xl font-semibold text-text-main mb-2">
                {title}
              </div>
            )}
            {description && (
              <div className="text-text-muted text-sm leading-relaxed">
                {description}
              </div>
            )}
          </div>
        )}

        {/* Custom Body Slot */}
        {children && <div className="flex-1">{children}</div>}

        {/* Actions Slot */}
        {actions && <div className="mt-6 flex items-center gap-3">{actions}</div>}
      </div>
    </Component>
  );
};

Card.displayName = "Card";
