import { usePathname } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/collapsible'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const SidebarMenuCollapsible = ({
  children,
  icon,
  text,
  basePath,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  text: string
  basePath: string
}) => {
  const [open, setOpen] = useState(false)
  const pathName = usePathname()
  const activePath = pathName.startsWith(basePath)

  // Keep collapse menu open if active
  useLayoutEffect(() => {
    if (activePath) {
      setOpen(true)
    }
  }, [activePath])

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn('border-l-[3px] border-transparent mb-2', {
        'border-primary': activePath,
      })}
    >
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            'flex w-full justify-between items-center gap-2 px-4 py-2.5 transition-colors',
            {
              'bg-light': activePath || open,
              'hover:bg-light': !activePath,
            }
          )}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-[18px]">{text}</span>
          </div>
          <ChevronDown
            className={`icon transition ${open ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-[1.6rem] mt-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SidebarMenuCollapsible
