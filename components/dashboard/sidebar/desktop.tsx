import SidebarMenu from './menu'
import { SidebarContext } from '@/app/dashboard/layout'
import { use } from 'react'
import { cn } from '@/lib/utils'

const SidebarDesktop = () => {
  const { isOpen } = use(SidebarContext)

  return (
    <aside
      className={cn(
        'w-72 hidden lg:flex flex-col bg-white border-r transition-[margin] duration-300',
        {
          'ml-0': isOpen,
          '-ml-72': !isOpen,
        }
      )}
    >
      <div className="h-16 flex justify-center items-center border-b px-4">
        <h2 className="text-xl font-medium">Brand Logo</h2>
      </div>
      <SidebarMenu />
    </aside>
  )
}

export default SidebarDesktop
