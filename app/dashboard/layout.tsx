import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'
import SidebarProvider from '@/providers/sidebar-provider'
import { getAuth } from '@/lib/auth'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getAuth()

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header authUser={user} />
          <main className="flex-1 p-5 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
