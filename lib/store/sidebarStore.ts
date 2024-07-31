import { create } from 'zustand'

interface SidebarInterface {
  isOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarInterface>()((set) => ({
  isOpen: true,
  setSidebarOpen: (open: boolean) => set(() => ({ isOpen: open })),
}))
