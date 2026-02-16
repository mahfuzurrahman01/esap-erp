import { atom } from "jotai"
import { IconType } from "react-icons/lib"

import { crmMenuItems } from "./fixed-menu-items/crm-menu-items"
import { fmsMenuItems } from "./fixed-menu-items/fms-menu-items"
import { hrMenuItems } from "./fixed-menu-items/hr-menu-items"
import { scmMenuItems } from "./fixed-menu-items/scm-menu-items"

export interface SubMenuItemType {
  name: string
  description?: string
  href: string
  badge?: string
  role?: string[]
}

export interface ItemType {
  name: string
  icon: IconType
  href?: string
  description?: string
  badge?: string
  subMenuItems?: SubMenuItemType[]
  role?: string[]
}

export interface MenuItemsType {
  id: string
  name: string
  title: string
  icon: IconType
  menuItems: ItemType[]
  roles?: string[]
}

export const berylliumMenuItems: MenuItemsType[] = [
  hrMenuItems,
  fmsMenuItems,
  crmMenuItems,
  scmMenuItems,
]

export const berylliumMenuItemAtom = atom(berylliumMenuItems[0])
