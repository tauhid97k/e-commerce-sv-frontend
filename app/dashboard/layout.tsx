import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'
import SidebarProvider from '@/providers/sidebar-provider'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-5 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
