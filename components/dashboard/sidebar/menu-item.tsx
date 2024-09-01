import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SidebarMenuItem = ({
  href,
  icon,
  text,
}: {
  href: string
  icon: React.ReactNode
  text: string
}) => {
  const pathName = usePathname()
  const activeLink = pathName === href

  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        'flex w-full items-center gap-2 px-4 py-2.5 mb-2 transition-colors border-l-2 border-transparent focus-within:outline-primary-200/50',
        {
          'border-primary-300 bg-light-100': activeLink,
          'hover:bg-light-100': !activeLink,
        }
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[18px]">{text}</span>
      </div>
    </Link>
  )
}

export default SidebarMenuItem
