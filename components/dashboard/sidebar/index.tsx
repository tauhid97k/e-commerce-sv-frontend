import SidebarDesktop from './desktop'
import SidebarMobile from './mobile'
import { useMediaQuery } from 'usehooks-ts'
import { usePathname } from 'next/navigation'
import { SidebarContext } from '@/app/dashboard/layout'
import { use, useLayoutEffect } from 'react'

const Sidebar = () => {
  const { setSidebarOpen } = use(SidebarContext)
  const pathName = usePathname()
  const isDesktop = useMediaQuery('(min-width: 1024px)', {
    initializeWithValue: false,
  })

  /**
   * On initial load...
   * Desktop sidebar is open on desktop.
   * Mobile sidebar is closed on mobile.
   * Closes mobile sidebar on route changes.
   */
  useLayoutEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true)
    } else {
      setSidebarOpen(false)
    }
  }, [isDesktop, pathName, setSidebarOpen])

  // Show desktop sidebar
  if (isDesktop) {
    return <SidebarDesktop />
  }

  // Show mobile sidebar
  return <SidebarMobile />
}

export default Sidebar
