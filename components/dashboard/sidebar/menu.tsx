import SidebarMenuItem from "./menu-item";
import SidebarMenuCollapsible from "./menu-collapsible";
import MenuCollapsibleItem from "./menu-collapsible-item";
import {
  Album,
  Blend,
  LayoutGrid,
  MessageSquareText,
  Package,
  Settings,
  ShieldCheck,
  Tag,
  UsersRound,
} from "lucide-react";

const SidebarMenu = () => {
  const menuItems = [
    {
      text: "Dashboard",
      href: "/dashboard",
      icon: <LayoutGrid className="icon" />,
    },
    {
      text: "Products",
      basePath: "/dashboard/products",
      icon: <Package className="icon" />,
      children: [
        { text: "All Products", href: "/dashboard/products" },
        { text: "Add Product", href: "/dashboard/products/add" },
      ],
    },
    {
      text: "Categories",
      href: "/dashboard/categories",
      icon: <Tag className="icon" />,
    },
    {
      text: "Attributes",
      href: "/dashboard/attributes",
      icon: <Blend className="icon" />,
    },
    {
      text: "Brands",
      href: "/dashboard/brands",
      icon: <Album className="icon" />,
    },
    {
      text: "Reviews",
      href: "/dashboard/reviews",
      icon: <MessageSquareText className="icon" />,
    },
    {
      text: "Users",
      basePath: "/dashboard/users",
      icon: <UsersRound className="icon" />,
      children: [
        { text: "All Users", href: "/dashboard/users" },
        { text: "Add User", href: "/dashboard/users/add" },
      ],
    },
    {
      text: "Role Permissions",
      href: "/dashboard/role-permissions",
      icon: <ShieldCheck className="icon" />,
    },
    {
      text: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="icon" />,
    },
  ];

  return (
    <nav className="flex-1 px-4 py-5 overflow-y-auto">
      {menuItems.map((item, index) => {
        if (item.children && item.children.length > 0) {
          // Render collapsible menu if children exist
          return (
            <SidebarMenuCollapsible
              key={index}
              text={item.text}
              basePath={item.basePath}
              icon={item.icon}
            >
              {item.children.map((child, childIndex) => (
                <MenuCollapsibleItem
                  key={childIndex}
                  text={child.text}
                  href={child.href}
                />
              ))}
            </SidebarMenuCollapsible>
          );
        } else if (item.href) {
          // Render a single menu item
          return (
            <SidebarMenuItem
              key={index}
              text={item.text}
              href={item.href}
              icon={item.icon}
            />
          );
        }
      })}
    </nav>
  );
};

export default SidebarMenu;
