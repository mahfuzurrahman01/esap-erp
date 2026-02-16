import { fmsMenuItems } from "./drawer-menu-items/fms-menu-items"

type SidebarMenuItemType = {
  name: string
  href?: string
  icon?: React.ReactNode
  dropdownItems?: SidebarMenuItemType[]
}

export const berylliumSidebarMenuItems: SidebarMenuItemType[] = [
  ...fmsMenuItems,
]
