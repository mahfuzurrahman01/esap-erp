"use client"

import { atom, useAtom } from "jotai"

import { MenuItemsType } from "@/layouts/beryllium/beryllium-fixed-menu-items"

const LOCAL_STORAGE_KEY = "iso-beryllium-sidebar-left-expanded"

const isomorphicBerylliumSidebarLeftExpandedAtom = atom(
  typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : true
)

const isomorphicBerylliumSidebarLeftExpandedAtomWithPersistence = atom(
  (get) => get(isomorphicBerylliumSidebarLeftExpandedAtom),
  (get, set, newStorage: any) => {
    set(isomorphicBerylliumSidebarLeftExpandedAtom, newStorage)
    localStorage.setItem(LOCAL_STORAGE_KEY, newStorage)
  }
)

export function useBerylliumSidebars() {
  const [expandedLeft, setExpandedLeft] = useAtom(
    isomorphicBerylliumSidebarLeftExpandedAtomWithPersistence
  )

  return {
    expandedLeft: !!(expandedLeft === null
      ? true
      : JSON.parse(expandedLeft as string)),
    setExpandedLeft,
  }
}

export function getActiveMainMenuIndex(
  pathname: string,
  menuItems: MenuItemsType[]
) {
  let activeIndex = 0

  // Check for route prefixes first
  if (pathname.startsWith("/fms")) {
    return menuItems.findIndex((item) => item.id === "2") // fmsMenuItems index
  }
  if (pathname.startsWith("/scm")) {
    return menuItems.findIndex((item) => item.id === "4") // scmMenuItems index
  }

  // Fallback to existing logic for other routes
  for (let i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i]
    for (let j = 0; j < menuItem.menuItems.length; j++) {
      const items = menuItem.menuItems[j]
      if (items.href === pathname) {
        activeIndex = i
        break
      } else {
        if (items.subMenuItems) {
          for (let k = 0; k < items.subMenuItems.length; k++) {
            const subMenuItem = items.subMenuItems[k]
            if (subMenuItem.href === pathname) {
              activeIndex = i
              break
            }
          }
        }
      }
    }
  }
  return activeIndex
}

export function removeFirstLetters(length: number, str: string) {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string")
  }
  return str.slice(length)
}
