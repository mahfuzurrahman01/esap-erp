import { atom } from "jotai"
import { IconType } from "react-icons/lib"

import { fmsMenuItems } from "./fixed-menu-items/fms-menu-items"

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

export const berylliumMenuItems: MenuItemsType[] = [fmsMenuItems]

export const berylliumMenuItemAtom = atom(berylliumMenuItems[0])
