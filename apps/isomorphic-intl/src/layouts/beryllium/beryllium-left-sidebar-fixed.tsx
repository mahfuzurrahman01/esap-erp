"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import { useAtom, useSetAtom } from "jotai"
import { useTranslations } from "next-intl"
import { PiTextIndent } from "react-icons/pi"
import { ActionIcon } from "rizzui"

import {
  MenuItemsType,
  berylliumMenuItemAtom,
  berylliumMenuItems,
} from "@/layouts/beryllium/beryllium-fixed-menu-items"
import {
  getActiveMainMenuIndex,
  removeFirstLetters,
  useBerylliumSidebars,
} from "@/layouts/beryllium/beryllium-utils"

function MenuItem({ menu }: { menu: MenuItemsType }) {
  const { expandedLeft, setExpandedLeft } = useBerylliumSidebars()
  const [menuItems, setMenuItems] = useAtom(berylliumMenuItemAtom)
  // const pathname = usePathname()
  const router = useRouter() // Add router
  const t = useTranslations("layout")
  const Icon = menu.icon

  // const isActive = useMemo(() => {
  //   const normalizedPathname = pathname.replace(/^\/[^/]+/, "")

  //   const isHRMSRoute = normalizedPathname.startsWith("/hrms")
  //   const isFMSRoute = normalizedPathname.startsWith("/fms")
  //   const isCRMRoute = normalizedPathname.startsWith("/crm")
  //   const isSCMRoute = normalizedPathname.startsWith("/scm")

  //   if (isHRMSRoute && menu.id === "1") return true
  //   if (isFMSRoute && menu.id === "2") return true
  //   if (isCRMRoute && menu.id === "3") return true
  //   if (isSCMRoute && menu.id === "4") return true

  //   return menuItems === menu
  // }, [pathname, menu, menuItems])

  // function handleClick() {
  //   setMenuItems(menu)
  //   if (!expandedLeft) {
  //     setExpandedLeft(true)
  //   }
  // }

  // Simplify the active state to be based on menuItems selection
  const isActive = menuItems.id === menu.id
  function handleClick() {
    setMenuItems(menu)
    if (!expandedLeft) {
      setExpandedLeft(true)
    }
    switch (menu.id) {
      case "hr_menu": // HRMS
        router.push("/hrms/dashboard")
        break
      case "2": // FMS
        router.push("/fms/financial-dashboard")
        break
      case "3": // CRM
        router.push("/crm/dashboard")
        break
      case "4": // SCM
        router.push("/scm/scm-dashboard")
        break
      default:
        break
    }
  }

  

  return (
    <li
      onClick={handleClick}
      className={cn(
        "group flex cursor-pointer flex-col items-center gap-1.5 rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors duration-200 hover:bg-primary/[8%] hover:text-primary",
        isActive && "bg-primary/[8%] font-semibold text-primary"
      )}>
      <Icon className="h-auto w-6" />
      <span>{t(menu.name)}</span>
    </li>
  )
}

function MenuItems() {
  return (
    <menu className="flex w-full justify-center">
      <SimpleBar className="h-[calc(100vh_-_105px)] w-full pb-5">
        <ul className="flex flex-col gap-6">
          {berylliumMenuItems.map((menu) => (
            <MenuItem key={menu.id} menu={menu} />
          ))}
        </ul>
      </SimpleBar>
    </menu>
  )
}

export default function BerylliumLeftSidebarFixed() {
  const pathname = usePathname()
  const setMenuItems = useSetAtom(berylliumMenuItemAtom)
  const { expandedLeft, setExpandedLeft } = useBerylliumSidebars()

  useEffect(() => {
    const activeMenuIndex = getActiveMainMenuIndex(
      removeFirstLetters(3, pathname),
      berylliumMenuItems
    )
    setMenuItems(berylliumMenuItems[activeMenuIndex])
     
  }, [pathname])

  return (
    <aside className="bg-background fixed start-0 top-0 z-[99] hidden h-screen w-[88px] flex-col items-center gap-10 border-r border-gray-500/20 px-1 py-3.5 dark:bg-gray-900 xl:flex">
      <ActionIcon
        aria-label="open sidebar"
        variant="text"
        className="rounded-full bg-transparent text-gray-600 transition-colors hover:bg-gray-300 hover:enabled:text-gray-900"
        size="xl"
        onClick={() => setExpandedLeft(!expandedLeft)}>
        <PiTextIndent className="h-auto w-9" />
      </ActionIcon>
      <MenuItems />
    </aside>
  )
}
