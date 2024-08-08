import Navbar from '@/components/main/navbar'
import Footer from '@/components/main/footer'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="container min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
