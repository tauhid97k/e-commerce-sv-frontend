import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'h-[42px] flex items-center text-base w-full rounded-md border shadow-sm px-3 placeholder:text-muted focus-visible:outline-none focus-visible:border-primary-200/50 focus-visible:ring-1 focus-visible:ring-primary-200/50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
