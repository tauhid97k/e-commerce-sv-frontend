import { cn } from '@/lib/utils'
import React, { Fragment, ComponentProps, ElementType } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'

// Root
export const Dropdown = ({
  children,
  ...props
}: {
  children: React.ReactNode
}) => {
  return <Menu {...props}>{children}</Menu>
}

// Trigger
export const DropdownTrigger = ({
  children,
  as = 'button',
  className,
  ...props
}: {
  children: React.ReactNode
  as?: ElementType
  className?: string
}) => {
  return (
    <MenuButton
      as={as}
      className={cn('focus-within:outline-primary/50', className)}
      {...props}
    >
      {children}
    </MenuButton>
  )
}

// Dropdown Items
export const DropdownItems = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Transition
      enter="transition ease-out duration-75"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <MenuItems
        anchor="bottom end"
        className={cn(
          'min-w-44 z-50 bg-white shadow-lg rounded-md p-2 mt-1 ring-1 ring-gray-200 focus:outline-none',
          className
        )}
      >
        {children}
      </MenuItems>
    </Transition>
  )
}

// Dropdown Item
type DropdownItemProps<T extends ElementType> = {
  children: React.ReactNode
  as?: T
  className?: string
} & ComponentProps<T>

export const DropdownItem = <T extends ElementType = typeof Fragment>({
  children,
  as = Fragment,
  className,
  ...props
}: DropdownItemProps<T>) => {
  return (
    <MenuItem
      as={as}
      className={cn(
        'w-full flex items-center gap-x-1.5 py-2 px-3 rounded-md data-[focus]:bg-light focus:outline-none font-medium cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </MenuItem>
  )
}
