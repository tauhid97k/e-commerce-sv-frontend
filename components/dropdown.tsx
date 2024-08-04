import { cn } from '@/lib/utils'
import React, { Fragment, ComponentProps, ElementType } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

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
type DropdownTriggerProps<T extends ElementType> = {
  children: React.ReactNode
  as?: T
  className?: string
} & ComponentProps<T>

export const DropdownTrigger = <T extends ElementType = typeof Fragment>({
  children,
  as = Fragment,
  className,
  ...props
}: DropdownTriggerProps<T>) => {
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
    <MenuItems
      modal={false}
      transition
      anchor="bottom end"
      className={cn(
        'w-44 origin-top-right transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-300 [--anchor-padding:16px] bg-white shadow-lg rounded-md mt-2 ring-1 ring-gray-200 focus:outline-none',
        className
      )}
    >
      {children}
    </MenuItems>
  )
}

// Dropdown Item
type DropdownItemProps<T extends ElementType> = {
  children: React.ReactNode
  as?: T
  destructive?: boolean
  className?: string
} & ComponentProps<T>

export const DropdownItem = <T extends ElementType = typeof Fragment>({
  children,
  as = Fragment,
  destructive,
  className,
  ...props
}: DropdownItemProps<T>) => {
  return (
    <MenuItem
      as={as}
      className={cn(
        'w-full flex items-center gap-x-1.5 py-2 px-3 rounded-md data-[focus]:bg-light focus:outline-none cursor-pointer',
        {
          'text-red-500 data-[focus]:bg-red-50': destructive,
        },
        className
      )}
      {...props}
    >
      {children}
    </MenuItem>
  )
}
