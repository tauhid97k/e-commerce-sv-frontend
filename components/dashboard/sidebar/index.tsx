import SidebarHeader from './header'
import SidebarMenu from './menu'
import { useSidebarStore } from '@/lib/store/sidebarStore'
import { useMediaQuery } from 'react-responsive'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/sheet'
import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathName = usePathname()
  const { isOpen, setSidebarOpen } = useSidebarStore()
  const isMobile = useMediaQuery({
    query: '(max-width: 1024px)',
  })

  // Close sidebar when route changes on mobile
  useLayoutEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile, pathName, setSidebarOpen])

  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setSidebarOpen}>
          <SheetContent
            side="left"
            className="w-72 flex flex-col"
            aria-describedby="sidebar"
          >
            <SheetTitle className="sr-only">Dashboard Sidebar</SheetTitle>
            <SheetDescription className="sr-only">
              Dashboard sidebar navigation menu
            </SheetDescription>
            <SidebarHeader />
            <SidebarMenu />
          </SheetContent>
        </Sheet>
      ) : (
        <aside
          className={cn(
            'w-72 hidden lg:flex flex-col bg-white border-r shadow-sm transition-[margin] duration-300',
            {
              'ml-0': isOpen,
              '-ml-72': !isOpen,
            }
          )}
        >
          <SidebarHeader />
          <SidebarMenu />
        </aside>
      )}
    </>
  )
}

export default Sidebar
