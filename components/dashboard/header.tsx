import { Button } from '@/components/button'
import { SidebarContext } from '@/app/dashboard/layout'
import { Menu } from 'lucide-react'
import { use } from 'react'

const Header = () => {
  const { isOpen, setSidebarOpen } = use(SidebarContext)

  return (
    <header className="h-16 flex items-center bg-white px-5 border-b">
      <Button
        onClick={() => setSidebarOpen(() => !isOpen)}
        variant="outline"
        size="icon"
      >
        <Menu className="icon" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </header>
  )
}

export default Header
