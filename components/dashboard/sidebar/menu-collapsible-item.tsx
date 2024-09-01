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
      prefetch={false}
      className={cn(
        "relative flex gap-2 items-center tracking-wide focus-visible:outline-none first:pt-4 py-1.5 before:content-[''] before:h-px before:w-[1.6rem] before:bg-gray-200 before:transition-colors transition-colors",
        {
          'text-primary-300': activeLink,
          'text-muted hover:text-dark-300 focus-visible:text-muted':
            !activeLink,
        }
      )}
    >
      {text}
    </Link>
  )
}

export default MenuCollapsibleItem
