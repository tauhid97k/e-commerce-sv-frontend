import * as React from 'react'
import {
  Menu,
  MenuProps,
  MenuButton,
  MenuButtonProps,
  MenuSection,
  MenuSectionProps,
  MenuSeparator,
  MenuSeparatorProps,
  MenuHeading,
  MenuHeadingProps,
  MenuItem,
  MenuItemProps,
  MenuItems,
  MenuItemsProps,
} from '@headlessui/react'
import { cn } from '@/lib/utils'

// Dropdown Root
type DropdownProps = MenuProps & { children: React.ReactNode }

const Dropdown = ({ children, ...props }: DropdownProps) => {
  return <Menu {...props}>{children}</Menu>
}

// Dropdown Trigger
type DropdownTriggerProps<T extends React.ElementType = typeof React.Fragment> =
  Omit<MenuButtonProps, 'as'> & {
    as?: T
    children: React.ReactNode
    className?: string
  } & React.ComponentPropsWithRef<T>

const DropdownTrigger = <T extends React.ElementType = typeof React.Fragment>({
  as = React.Fragment,
  children,
  className,
  ...props
}: DropdownTriggerProps<T>) => {
  return (
    <MenuButton
      as={as}
      className={cn('focus-within:outline-primary-200/50', className)}
      {...props}
    >
      {children}
    </MenuButton>
  )
}

// Dropdown Section
type DropdownSectionProps = MenuSectionProps & { children: React.ReactNode }

const DropdownSection = ({ children, ...props }: DropdownSectionProps) => {
  return <MenuSection {...props}>{children}</MenuSection>
}

// Dropdown Heading
type DropdownHeadingProps = MenuHeadingProps & { children: React.ReactNode }

const DropdownHeading = ({
  children,
  className,
  ...props
}: DropdownHeadingProps) => {
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
type DropdownItemsProps = MenuItemsProps & { children: React.ReactNode }

const DropdownItems = ({ children, className }: DropdownItemsProps) => {
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

// Dropdown Separator
const DropdownSeparator = ({ ...props }: MenuSeparatorProps) => (
  <MenuSeparator className="border-b" {...props} />
)

// Dropdown Item
type DropdownItemProps<T extends React.ElementType = typeof React.Fragment> =
  Omit<MenuItemProps, 'as'> & {
    as?: T
    destructive?: boolean
    children: React.ReactNode
    className?: string
  } & React.ComponentPropsWithRef<T>

const DropdownItem = <T extends React.ElementType = typeof React.Fragment>({
  children,
  as = React.Fragment,
  destructive,
  className,
  ...props
}: DropdownItemProps<T>) => {
  return (
    <MenuItem
      as={as}
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

export {
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownHeading,
  DropdownItems,
  DropdownSeparator,
  DropdownItem,
}
