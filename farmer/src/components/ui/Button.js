import React from "react";
import { cn } from "../../lib/utils";

export const Button = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
};
