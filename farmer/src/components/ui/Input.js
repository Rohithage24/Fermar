import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400",
      className
    )}
    {...props}
  />
));

export const Label = ({ className, ...props }) => (
  <label className={cn("block text-sm font-medium text-gray-700", className)} {...props} />
);
