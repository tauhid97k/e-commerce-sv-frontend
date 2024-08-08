'use client'

import Link from 'next/link'
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger,
} from '@/components/dropdown'
import Notification from '@/components/dashboard/notification'
import { CircleUser, LogOut, Menu, UserRoundCog } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar'
import { SidebarContext } from '@/providers/sidebar-provider'
import { Button } from '@/components/button'
import { use } from 'react'

const Header = () => {
  const { isOpen, setSidebarOpen } = use(SidebarContext)

  // Logout
  const handleLogout = () => {}

  return (
    <header className="h-16 flex justify-between items-center bg-white px-5 border-b">
      <Button
        onClick={() => setSidebarOpen(() => !isOpen)}
        variant="outline"
        size="icon"
      >
        <Menu className="icon" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <div className="flex items-center gap-4">
        <Notification />
        <Dropdown>
          <DropdownTrigger
            as="button"
            className="flex items-center justify-between gap-x-2 rounded-full"
          >
            <span className="sr-only">Toggle user menu</span>
            <span className="truncate max-w-[7.5rem]">Mason Alex</span>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="profile image"
              />
              <AvatarFallback>
                <CircleUser className="icon" />
              </AvatarFallback>
            </Avatar>
          </DropdownTrigger>
          <DropdownItems className="p-2">
            <DropdownItem as={Link} href="/dashboard/profile">
              <UserRoundCog className="icon" />
              <span>Profile</span>
            </DropdownItem>
            <DropdownItem as="button" onClick={handleLogout} destructive>
              <LogOut className="icon" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownItems>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
