import { crmMenuItems } from "./drawer-menu-items/crm-menu-items"
import { fmsMenuItems } from "./drawer-menu-items/fms-menu-items"
import { hrMenuItems } from "./drawer-menu-items/hr-menu-items"
import { scmMenuItems } from "./drawer-menu-items/scm-menu-items"

type SidebarMenuItemType = {
  name: string
  href?: string
  icon?: React.ReactNode
  dropdownItems?: SidebarMenuItemType[]
}

export const berylliumSidebarMenuItems: SidebarMenuItemType[] = [
  ...hrMenuItems,
  ...fmsMenuItems,
  ...crmMenuItems,
  ...scmMenuItems,
]
