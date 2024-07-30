import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const MenuCollapsibleItem = ({
  href,
  text,
}: {
  href: string
  text: string
}) => {
  const pathName = usePathname()
  const activeLink = pathName === href

  return (
    <Link
      href={href}
      className={cn(
        "relative flex gap-2 items-center tracking-wide py-1.5 before:content-[''] before:size-2 before:bg-muted before:rounded-full transition-colors",
        {
          'text-primary before:bg-primary': activeLink,
          'text-muted hover:text-dark before:hover:bg-dark': !activeLink,
        }
      )}
    >
      {text}
    </Link>
  )
}

export default MenuCollapsibleItem
