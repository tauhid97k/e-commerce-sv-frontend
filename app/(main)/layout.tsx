import Navbar from '@/components/main/navbar'
import Footer from '@/components/main/footer'
import { getAuth } from '@/lib/auth'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getAuth()

  return (
    <div className="flex flex-col">
      <Navbar authUser={user} />
      <main className="container min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
