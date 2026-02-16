import { PermissionIcon } from "@/components/icons/crm/permission"
import { RoleIcon } from "@/components/icons/crm/role"
import { UserIcon } from "@/components/icons/crm/user"
import { routes } from "@/config/routes"

import { MenuItemsType } from "../beryllium-fixed-menu-items"

export const userMenuItems: MenuItemsType = {
  id: "1",
  name: "sidebar-menu-user",
  title: "sidebar-menu-um",
  icon: UserIcon,
  menuItems: [
    {
      name: "sidebar-menu-users",
      href: routes.crm.users,
      icon: UserIcon,
    },
    {
      name: "sidebar-menu-roles",
      href: routes.crm.roles,
      icon: RoleIcon,
    },
    {
      name: "sidebar-menu-permissions",
      href: routes.crm.permissions,
      icon: PermissionIcon,
    },
    {
      name: "sidebar-menu-activity-log",
      href: routes.crm.activityLog,
      icon: UserIcon,
    },
  ],
}
