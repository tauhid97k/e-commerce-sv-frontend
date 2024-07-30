'use client'

import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-5 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
