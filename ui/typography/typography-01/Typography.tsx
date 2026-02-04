import * as React from "react";
import { cn } from "../lib/utils";

type TypographyVariant = "h1" | "h2" | "h3" | "body" | "small" | "caption";
type TypographyWeight = "normal" | "medium" | "semibold" | "bold";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  as?: React.ElementType;
  dimmed?: boolean;
}

/**
 * Typography Primitive
 * Система управления текстом, полностью завязанная на токены.
 */
export const Typography = ({
  variant = "body",
  weight = "normal",
  as,
  dimmed = false,
  className,
  ...props
}: TypographyProps) => {
  // Маппинг вариантов на HTML-теги по умолчанию
  const defaultTag: Record<TypographyVariant, React.ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    body: "p",
    small: "p",
    caption: "span",
  };

  const Component = as || defaultTag[variant];

  const variantStyles: Record<TypographyVariant, string> = {
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    body: "text-body",
    small: "text-small",
    caption: "text-xs uppercase tracking-wider",
  };

  const weightStyles: Record<TypographyWeight, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <Component
      className={cn(
        "font-sans antialiased",
        variantStyles[variant],
        weightStyles[weight],
        dimmed ? "text-text-muted" : "text-text-main",
        className
      )}
      {...props}
    />
  );
};

Typography.displayName = "Typography";
