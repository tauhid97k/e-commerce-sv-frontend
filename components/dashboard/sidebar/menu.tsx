import SidebarMenuItem from './menu-item'
import SidebarMenuCollapsible from './menu-collapsible'
import MenuCollapsibleItem from './menu-collapsible-item'
import { LayoutGrid, Settings, ShieldCheck, UsersRound } from 'lucide-react'

const SidebarMenu = () => {
  return (
    <nav className="flex-1 px-4 py-5 overflow-y-auto">
      <SidebarMenuItem
        text="Dashboard"
        href="/dashboard"
        icon={<LayoutGrid className="icon" />}
      />
      <SidebarMenuCollapsible
        text="Users"
        basePath="/dashboard/users"
        icon={<UsersRound className="icon" />}
      >
        <MenuCollapsibleItem text="All Users" href="/dashboard/users" />
        <MenuCollapsibleItem
          text="Create User"
          href="/dashboard/users/create"
        />
      </SidebarMenuCollapsible>
      <SidebarMenuItem
        text="Role Permissions"
        href="/dashboard/role-permissions"
        icon={<ShieldCheck className="icon" />}
      />
      <SidebarMenuItem
        text="Settings"
        href="/dashboard/settings"
        icon={<Settings className="icon" />}
      />
    </nav>
  )
}

export default SidebarMenu
