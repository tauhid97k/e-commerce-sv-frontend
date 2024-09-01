import SidebarMenuItem from './menu-item'
import SidebarMenuCollapsible from './menu-collapsible'
import MenuCollapsibleItem from './menu-collapsible-item'
import {
  LayoutGrid,
  Package,
  Settings,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

const SidebarMenu = () => {
  return (
    <nav className="flex-1 px-4 py-5 overflow-y-auto">
      <SidebarMenuItem
        text="Dashboard"
        href="/dashboard"
        icon={<LayoutGrid className="icon" />}
      />
      <SidebarMenuCollapsible
        text="Products"
        basePath="/dashboard/products"
        icon={<Package className="icon" />}
      >
        <MenuCollapsibleItem text="All Products" href="/dashboard/products" />
        <MenuCollapsibleItem
          text="Add Product"
          href="/dashboard/products/add"
        />
        <MenuCollapsibleItem
          text="Inventory"
          href="/dashboard/products/inventory"
        />
      </SidebarMenuCollapsible>
      <SidebarMenuCollapsible
        text="Users"
        basePath="/dashboard/users"
        icon={<UsersRound className="icon" />}
      >
        <MenuCollapsibleItem text="All Users" href="/dashboard/users" />
        <MenuCollapsibleItem text="Add User" href="/dashboard/users/add" />
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
