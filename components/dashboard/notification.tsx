import { Bell } from 'lucide-react'
import { Button, buttonVariants } from '@/components/button'
import {
  Dropdown,
  DropdownTrigger,
  DropdownItems,
  DropdownSection,
  DropdownHeading,
  DropdownSeparator,
} from '@/components/dropdown'
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
        className={cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          "relative after:absolute after:content-[''] after:-top-[3px] after:-right-[3px] after:bg-green-500 after:size-2 after:rounded-full"
        )}
      >
        <Bell className="icon" />
        <span className="sr-only">Toggle notification</span>
      </DropdownTrigger>
      <DropdownItems className="w-80">
        <DropdownSection>
          <DropdownHeading>
            <h4>Notifications</h4>
            <button className="text-primary-300 text-sm hover:underline">
              Mark all as read
            </button>
          </DropdownHeading>
          <DropdownSeparator />
          <div className="bg-white max-h-72 overflow-y-auto divide-y divide-light">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="flex flex-col gap-0.5 p-3 hover:bg-light-100"
                >
                  <h5
                    className={cn('text-sm', {
                      'font-medium text-dark-200': !item.read,
                    })}
                  >
                    {item.title}
                  </h5>
                  <span
                    className={cn('text-[13px]', {
                      'text-muted': item.read,
                    })}
                  >
                    {item.timestamp}
                  </span>
                </Link>
              ))
            ) : (
              <p className="h-44 flex justify-center items-center p-3 text-muted">
                Nothing to show
              </p>
            )}
          </div>
          <DropdownSeparator />
          <Link
            href="#"
            className="text-sm hover:text-primary-300 tracking-wide flex justify-center p-3"
          >
            See All Notifications
          </Link>
        </DropdownSection>
      </DropdownItems>
    </Dropdown>
  )
}

export default Notification
