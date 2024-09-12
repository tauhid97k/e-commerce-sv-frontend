import { Checkbox } from '@/components/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'

export const CheckSelector = ({
  filter,
  options,
}: {
  filter: string
  options: Array<{ label: string; value: string }>
}) => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()

  // Init
  const [selectedValues, setSelectedValues] = useState(() =>
    params.get(filter)
      ? new Set<string>(params.get(filter)?.split(','))
      : new Set<string>()
  )

  // Handle Checkbox Change
  const handleCheckedFilters = (value: string) => {
    const newSelectedValues = new Set(selectedValues)
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value)
    } else {
      newSelectedValues.add(value)
    }

    // Update selected checkbox
    setSelectedValues(newSelectedValues)

    // Construct new url params
    if (newSelectedValues.size > 0) {
      params.set('page', '1')
      params.set(filter, Array.from(newSelectedValues).join(','))
    } else {
      params.delete('page')
      params.delete(filter)
    }

    // Update url params
    router.push(`?${params}`)
  }

  // Clear Filters
  const handleClearFilters = () => {
    // Clear the selected values
    setSelectedValues(new Set<string>())

    // Update url params
    params.delete(filter)
    params.delete('page')
    router.push(`?${params}`)
  }

  return (
    <Popover>
      <PopoverTrigger className="h-[42px] flex items-center justify-center px-3 whitespace-nowrap border border-dashed rounded-md shadow-sm group hover:bg-gray-100 focus:outline-none focus-visible:border-primary-200/50 focus-visible:ring-1 focus-visible:ring-primary-200/50 transition-colors">
        <div className="flex items-center gap-x-3 divide-x">
          <div className="flex items-center gap-x-1.5 text-dark-200">
            <CirclePlus className="size-5 stroke-[1.5]" />
            <span>Status</span>
          </div>
          {selectedValues.size > 0 && (
            <div className="flex gap-x-2 pl-3">
              {selectedValues.size <= 2 ? (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <span
                      key={option.value}
                      className="text-sm bg-light-100 group-hover:bg-dark-100 text-dark-200 rounded py-1 px-2 transition-colors"
                    >
                      {option.label}
                    </span>
                  ))
              ) : (
                <span className="text-sm bg-light-100 group-hover:bg-dark-100 text-dark-200 rounded py-1 px-2 transition-colors">
                  {`${selectedValues.size} selected`}
                </span>
              )}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-60">
        <div className="p-2">
          {options.map(({ label, value }) => (
            <label
              key={value}
              className="flex items-center gap-x-2 p-2 rounded-md hover:bg-light-100"
            >
              <Checkbox
                className="shadow-none"
                checked={selectedValues.has(value)}
                onCheckedChange={() => handleCheckedFilters(value)}
              />
              <span className="truncate">{label}</span>
            </label>
          ))}
        </div>
        {selectedValues.size > 0 && (
          <button
            onClick={handleClearFilters}
            className="border-t w-full p-2 text-primary-300"
          >
            Clear filters
          </button>
        )}
      </PopoverContent>
    </Popover>
  )
}
