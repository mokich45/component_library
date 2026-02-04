/**
 * Simple utility for conditional class names
 */
export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Limits array to a maximum number of items
 */
export function clampArray<T>(arr: T[] | undefined | null, max: number): T[] {
  if (!arr) return [];
  return arr.slice(0, max);
}
