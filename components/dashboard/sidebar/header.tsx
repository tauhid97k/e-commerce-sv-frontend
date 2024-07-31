import { Button } from '@/components/button'
import { useSidebarStore } from '@/lib/store/sidebarStore'
import { X } from 'lucide-react'

const SidebarHeader = () => {
  const { setSidebarOpen } = useSidebarStore()

  return (
    <div className="h-16 border-b p-4 flex justify-between items-center">
      <h3 className="text-xl font-medium">Brand Logo</h3>
      <Button
        onClick={() => setSidebarOpen(false)}
        variant="outline"
        size="icon"
        className="lg:hidden"
      >
        <X className="icon" />
        <span className="sr-only">Close navigation menu</span>
      </Button>
    </div>
  )
}

export default SidebarHeader
