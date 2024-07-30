import Navbar from '@/components/main/navbar'
import Footer from '@/components/main/footer'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
