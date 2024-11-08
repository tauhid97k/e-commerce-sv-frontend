import { User } from '@/lib/dataTypes'

const Navbar = ({ user }: { user: User }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white">
      <div className="h-16 container flex items-center">Navbar</div>
    </nav>
  )
}

export default Navbar
