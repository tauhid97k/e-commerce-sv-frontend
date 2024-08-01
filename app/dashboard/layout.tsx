'use client'

import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'
import { createContext, useState } from 'react'

// Context Types
interface SidebarContextType {
  isOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Sidebar Context
export const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  setSidebarOpen: () => {},
})

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setSidebarOpen] = useState<boolean>(true)

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setSidebarOpen,
      }}
    >
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-5 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

export default DashboardLayout
