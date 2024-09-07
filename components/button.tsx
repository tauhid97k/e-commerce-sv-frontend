import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

// Variants
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 disabled:opacity-70 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary-200 hover:bg-primary-300 text-white focus:ring-primary-200/50',
        secondary: 'bg-light-200 hover:bg-light-100',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border hover:bg-light-100',
      },
      size: {
        default: 'h-[42px] px-4 text-base',
        sm: 'py-2 px-3 text-xs',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Prop Types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

// Loading Icon
const LoadingIcon = ({
  buttonSize,
}: {
  buttonSize: string | null | undefined
}) => {
  return (
    <LoaderCircle
      className={cn('animate-spin text-white', {
        'size-5': !buttonSize,
        'size-4': buttonSize === 'sm',
      })}
    />
  )
}

// Button
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    const content = (
      <div className="flex items-center gap-1.5">
        {isLoading && <LoadingIcon buttonSize={size} />}
        {children}
      </div>
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { buttonVariants, Button }
