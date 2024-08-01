import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/sheet'
import { X } from 'lucide-react'
import { Button } from '@/components/button'
import { SidebarContext } from '@/app/dashboard/layout'
import { use } from 'react'
import SidebarMenu from './menu'

const SidebarMobile = () => {
  const { isOpen, setSidebarOpen } = use(SidebarContext)

  return (
    <Sheet open={isOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">Brand Logo</SheetTitle>
          <SheetClose asChild>
            <Button variant="outline" size="icon" className="p-4">
              <X className="icon" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        <SheetDescription className="sr-only">
          Mobile sidebar navigation
        </SheetDescription>
        <SidebarMenu />
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMobile
