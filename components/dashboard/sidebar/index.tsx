'use client'

import SidebarDesktop from './desktop'
import SidebarMobile from './mobile'
import { useMediaQuery } from 'usehooks-ts'
import { usePathname } from 'next/navigation'
import { SidebarContext } from '@/providers/sidebar-provider'
import { use, useLayoutEffect } from 'react'

const Sidebar = () => {
  const { setSidebarOpen } = use(SidebarContext)
  const pathName = usePathname()
  const isMobile = useMediaQuery('(max-width: 1024px)', {
    initializeWithValue: false,
  })

  /**
   * Sidebar visibility behavior:
   * - Desktop: Sidebar is initially expanded.
   * - Mobile: Sidebar is initially collapsed and automatically collapses on route change.
   */
  useLayoutEffect(() => {
    isMobile ? setSidebarOpen(false) : setSidebarOpen(true)
  }, [isMobile, pathName, setSidebarOpen])

  return isMobile ? <SidebarMobile /> : <SidebarDesktop />
}

export default Sidebar
