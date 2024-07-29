import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex items-center text-base w-full rounded-md border shadow-sm px-3 py-2 placeholder:text-muted bg-white focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
