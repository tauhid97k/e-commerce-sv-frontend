import { Bell } from 'lucide-react'
import { Button } from '@/components/button'
import { Dropdown, DropdownItems, DropdownTrigger } from '@/components/dropdown'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Notification = () => {
  const notifications = [
    {
      id: 7,
      title: 'A product was purchased',
      timestamp: 'Just now',
      read: false,
    },
    {
      id: 6,
      title: 'A product was purchased',
      timestamp: '2 min ago',
      read: false,
    },
    {
      id: 5,
      title: 'A product was purchased',
      timestamp: '5 min ago',
      read: true,
    },
    {
      id: 4,
      title: 'A product was purchased',
      timestamp: '7 min ago',
      read: true,
    },
    {
      id: 3,
      title: 'A product was purchased',
      timestamp: '10 min ago',
      read: true,
    },
    {
      id: 2,
      title: 'A product was purchased',
      timestamp: '14 min ago',
      read: true,
    },
    {
      id: 1,
      title: 'A product was purchased',
      timestamp: '20 min ago',
      read: true,
    },
  ]

  return (
    <Dropdown>
      <DropdownTrigger
        as={Button}
        variant="outline"
        size="icon"
        className="relative after:absolute after:content-[''] after:-top-[3px] after:-right-[3px] after:bg-green-500 after:size-2 after:rounded-full"
      >
        <Bell className="icon" />
        <span className="sr-only">Toggle notification</span>
      </DropdownTrigger>
      <DropdownItems className="w-72">
        <div className="flex justify-between items-center border-b gap-4 p-3">
          <h4>Notifications</h4>
          <button className="text-primary text-sm hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="bg-white max-h-64 overflow-y-auto divide-y divide-lighter">
          {notifications.map((item) => (
            <Link
              key={item.id}
              href="#"
              className="flex flex-col gap-1.5 p-3 hover:bg-lighter"
            >
              <h5
                className={cn('text-sm', {
                  'text-dark/80': item.read,
                  'font-medium': !item.read,
                })}
              >
                {item.title}
              </h5>
              <span
                className={cn('text-[13px]', {
                  'text-muted': item.read,
                  'text-dark/80': !item.read,
                })}
              >
                {item.timestamp}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="#"
          className="text-sm tracking-wide flex justify-center border-t p-3 hover:bg-lighter"
        >
          See All Notifications
        </Link>
      </DropdownItems>
    </Dropdown>
  )
}

export default Notification
