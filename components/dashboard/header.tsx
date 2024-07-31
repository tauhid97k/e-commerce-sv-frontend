import { Button } from '@/components/button'
import { useSidebarStore } from '@/lib/store/sidebarStore'
import { Menu } from 'lucide-react'

const Header = () => {
  const { isOpen, setSidebarOpen } = useSidebarStore()

  return (
    <header className="h-16 flex items-center bg-white border-b px-5 shadow-sm">
      <Button
        onClick={() => setSidebarOpen(!isOpen)}
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
