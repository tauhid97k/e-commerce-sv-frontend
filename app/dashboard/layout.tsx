import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'
import SidebarProvider from '@/providers/sidebar-provider'
import { getAuth } from '@/actions/auth'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getAuth()

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-light-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Header user={user} />
          <main className="flex-1 p-5">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
