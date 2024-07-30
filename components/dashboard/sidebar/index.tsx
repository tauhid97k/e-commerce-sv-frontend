import SidebarHeader from './header'
import SidebarMenu from './menu'

const Sidebar = () => {
  return (
    <aside className="w-[300px] flex flex-col bg-white border-r shadow-sm">
      <SidebarHeader />
      <SidebarMenu />
    </aside>
  )
}

export default Sidebar
