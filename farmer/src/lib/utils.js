/**
 * Utility function to merge class names
 * Accepts multiple arguments and ignores falsy values
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
