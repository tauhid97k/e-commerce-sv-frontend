import { AuthUser } from '@/lib/dataTypes'

const Navbar = ({ authUser }: { authUser: AuthUser }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white">
      <div className="h-16 container flex items-center">Navbar</div>
    </nav>
  )
}

export default Navbar
