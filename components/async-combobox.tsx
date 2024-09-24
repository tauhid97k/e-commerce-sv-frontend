'use client'

import { cn } from '@/lib/utils'
import { Check, ChevronDownIcon, X } from 'lucide-react'
import AsyncSelect, { AsyncProps } from 'react-select/async'
import {
  components,
  OptionProps,
  DropdownIndicatorProps,
  ClearIndicatorProps,
  MultiValueRemoveProps,
} from 'react-select'

// Define a generic Option type
type OptionType = {
  label: string
  value: string | number
}

// Custom Option Component
const Option = <Option extends OptionType>(
  props: OptionProps<Option, boolean>
) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-1">
        <span className="truncate">{props.children}</span>
        {props.isSelected && (
          <Check className="shrink-0 size-5 text-primary-300" />
        )}
      </div>
    </components.Option>
  )
}

// Dropdown Indicator Custom Component
const DropdownIndicator = <Option extends OptionType>(
  props: DropdownIndicatorProps<Option, boolean>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className="size-6 stroke-[1.5] text-muted" />
    </components.DropdownIndicator>
  )
}

// Clear Indicator Custom Component (For multi select)
const ClearIndicator = <Option extends OptionType>(
  props: ClearIndicatorProps<Option, boolean>
) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="size-5 stroke-[1.5] text-muted" />
    </components.ClearIndicator>
  )
}

// Remove Indicator Custom Component (For multi select)
const MultiValueRemove = <Option extends OptionType>(
  props: MultiValueRemoveProps<Option, boolean>
) => {
  return (
    <components.MultiValueRemove {...props}>
      <X className="size-4" />
    </components.MultiValueRemove>
  )
}

// React Select Types
export const AsyncSelectCombobox = <
  Option extends OptionType,
  IsMulti extends boolean = false
>({
  isMulti = false as IsMulti,
  placeholder = 'Select...',
  ...props
}: AsyncProps<Option, IsMulti, never>) => {
  return (
    <AsyncSelect
      unstyled
      isMulti={isMulti}
      placeholder={placeholder}
      components={{
        Option,
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
      }}
      classNames={{
        control: ({ isFocused }) =>
          cn('w-full rounded-md border bg-white py-2', {
            'border-primary ring-1 ring-primary-200/50 border-primary-200/50':
              isFocused,
          }),
        placeholder: () => 'text-muted/70',
        menu: () => 'bg-white rounded-md border shadow-lg mt-2 p-2',
        option: ({ isFocused }) =>
          cn('px-3 py-2 rounded', {
            'bg-light-100': isFocused,
          }),
        valueContainer: () => 'flex gap-2 flex-wrap px-3 border-r-2',
        noOptionsMessage: () => 'leading-[56px] h-14',
        indicatorsContainer: () => 'px-3',
        multiValue: () => 'bg-light-100 rounded-md pl-2 pr-1 py-1',
        multiValueRemove: () =>
          'bg-white border ml-1.5 rounded-md size-5 items-center justify-center hover:bg-red-200 hover:border-red-300 hover:text-red-500',
      }}
      {...props}
    />
  )
}
