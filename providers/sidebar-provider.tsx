'use client'

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

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setSidebarOpen] = useState<boolean>(true)

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
