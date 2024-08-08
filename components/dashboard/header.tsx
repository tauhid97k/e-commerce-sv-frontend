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
import { AuthUser } from '@/lib/dataTypes'
import { FormEvent, use } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAxios } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { handleSuccess } from '@/lib/handleResponse'
import { toast } from 'sonner'

const Header = ({ authUser }: { authUser: AuthUser }) => {
  const { isOpen, setSidebarOpen } = use(SidebarContext)
  const router = useRouter()
  const axios = useAxios()

  const { mutate: logout } = useMutation({
    mutationFn: () => axios.post('/logout'),
  })

  // Logout
  const handleLogout = (event: FormEvent) => {
    event.preventDefault()

    logout(undefined, {
      onSuccess: (data) => {
        const { message } = handleSuccess(data)
        toast.success(message)
        router.replace('/login')
      },
    })
  }

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
            <span className="truncate max-w-[7.5rem]">{authUser.name}</span>
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
            <form onSubmit={handleLogout}>
              <DropdownItem as="button" type="submit" destructive>
                <LogOut className="icon" />
                <span>Logout</span>
              </DropdownItem>
            </form>
          </DropdownItems>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
