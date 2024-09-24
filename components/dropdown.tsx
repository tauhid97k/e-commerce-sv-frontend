import React from 'react'
import { cn } from '@/lib/utils'
import {
  Menu,
  MenuProps,
  MenuButton,
  MenuButtonProps,
  MenuHeading,
  MenuHeadingProps,
  MenuSection,
  MenuSectionProps,
  MenuItems,
  MenuItemsProps,
  MenuItem,
  MenuItemProps,
  MenuSeparator,
  MenuSeparatorProps,
} from '@headlessui/react'

// Root Component
const Dropdown: React.FC<MenuProps> = ({ children, ...props }) => {
  return <Menu {...props}>{children}</Menu>
}

// Trigger Component
const DropdownTrigger: React.FC<MenuButtonProps> = ({ children, ...props }) => {
  return <MenuButton {...props}>{children}</MenuButton>
}

// Dropdown Section
const DropdownSection: React.FC<MenuSectionProps> = ({
  children,
  ...props
}) => {
  return <MenuSection {...props}>{children}</MenuSection>
}

// Dropdown Heading
const DropdownHeading: React.FC<MenuHeadingProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <MenuHeading
      className={cn('flex justify-between items-center gap-4 p-3', className)}
      {...props}
    >
      {children}
    </MenuHeading>
  )
}

// Dropdown Items
const DropdownItems: React.FC<MenuItemsProps> = ({ children, className }) => {
  return (
    <MenuItems
      anchor="bottom end"
      transition
      className={cn(
        'w-44 z-50 origin-top-right transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-300 [--anchor-padding:16px] bg-white shadow-lg border rounded-md mt-2 focus:outline-none',
        className
      )}
    >
      {children}
    </MenuItems>
  )
}

// Dropdown Item
type DropdownItemProps<T extends React.ElementType = 'button'> = Omit<
  MenuItemProps,
  'as'
> & {
  as?: T
  destructive?: boolean
} & React.ComponentPropsWithRef<T>

// Dropdown Item Component
const DropdownItem = <T extends React.ElementType = 'button'>({
  children,
  as: Component = 'button',
  destructive,
  className,
  ...props
}: DropdownItemProps<T>) => {
  return (
    <MenuItem
      as={Component}
      className={cn(
        'w-full flex items-center gap-x-1.5 py-2 px-3 rounded-md data-[focus]:bg-light-100 focus:outline-none cursor-pointer',
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

// Dropdown Separator
const DropdownSeparator: React.FC<MenuSeparatorProps> = ({ ...props }) => {
  return <MenuSeparator className="border-b" {...props} />
}

export {
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownHeading,
  DropdownItems,
  DropdownItem,
  DropdownSeparator,
}
