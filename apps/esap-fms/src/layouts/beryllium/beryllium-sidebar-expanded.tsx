"use client"

import { usePathname } from "next/navigation"
import { Fragment } from "react"

import StatusBadge from "@core/components/get-status-badge"
import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import { useAtomValue } from "jotai"
import { useLocale, useTranslations } from "next-intl"
import { PiCaretDownBold } from "react-icons/pi"
import { Collapse, Tooltip } from "rizzui"

import { useCurrentRole } from "@/hooks/use-current-role"
import { Link } from "@/i18n/routing"
import {
  ItemType,
  berylliumMenuItemAtom,
} from "@/layouts/beryllium/beryllium-fixed-menu-items"
import { useBerylliumSidebars } from "@/layouts/beryllium/beryllium-utils"
import { useColorPresetName } from "@/layouts/settings/use-theme-color"

function LinkMenuItem({ item, role }: { item: ItemType; role: string[] }) {
  const t = useTranslations("layout")
  const locale = useLocale()
  const { colorPresetName } = useColorPresetName()
  const pathname = usePathname()
  const url = item?.href === "/" ? `/${locale}` : `/${locale}${item?.href}`
  const isActive = pathname === url
  const Icon = item.icon

  const isAuthorized =
    !item.role ||
    item.role.length === 0 ||
    item.role.some((requiredRole) => role?.includes(requiredRole))

  const menuItem = (
    <Link
      href={isAuthorized ? (item.href ?? "/") : "#"}
      onClick={(e) => !isAuthorized && e.preventDefault()}
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-4 py-3 font-medium duration-200",
        isActive
          ? colorPresetName === "black"
            ? "bg-primary/[8%] font-semibold text-primary"
            : "bg-primary/[8%] font-semibold text-primary"
          : "hover:bg-primary/15 hover:text-primary",
        !isAuthorized && "cursor-not-allowed opacity-50 hover:bg-transparent"
      )}>
      <div className="flex items-center gap-2 truncate">
        <span>
          <Icon className="h-6 w-6" />
        </span>
        <span className="truncate">{t(item.name)}</span>
      </div>
      {item?.badge?.length ? <StatusBadge status={item?.badge} /> : null}
    </Link>
  )

  return isAuthorized ? (
    menuItem
  ) : (
    <Tooltip content="Need access from admin" placement="right">
      {menuItem}
    </Tooltip>
  )
}

function CollapsibleMenuItem({
  item,
  role,
}: {
  item: ItemType
  role: string[]
}) {
  const t = useTranslations("layout")
  const pathname = usePathname()
  const { colorPresetName } = useColorPresetName()
  const locale = useLocale()
  const normalizedPathname = pathname.replace(`/${locale}`, "")

  // Check authorization for each menu item instead of filtering
  const _getIsAuthorized = (subMenuItem: any) => {
    if (!subMenuItem.role || subMenuItem.role.length === 0) return true
    return subMenuItem.role.some((requiredRole: string) =>
      role?.includes(requiredRole)
    )
  }

  const pathnameExistInDropdowns = item?.subMenuItems?.filter(
    (dropdownItem) => {
      const baseHref = dropdownItem?.href?.split("/:")[0]
      return normalizedPathname.startsWith(baseHref)
    }
  )

  const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length)
  const isActive = item.subMenuItems?.some((subMenuItem) => {
    const baseHref = subMenuItem?.href?.split("/:")[0]
    return normalizedPathname.startsWith(baseHref)
  })

  // Don't render the menu if there are no authorized submenu items
  if (!item?.subMenuItems?.length) return null

  const Icon = item.icon

  return (
    <Collapse
      defaultOpen={isDropdownOpen}
      className="[&_>_div]:my-2 [&_>_div]:py-3 [&_>_div]:ps-4 [&_>_div]:lg:my-0 [&_>_div]:2xl:my-0"
      panelClassName="[&_>_a]:pe-0 [&_>_a]:me-0 [&_>_a]:ps-4 2xl:[&_>_a]:ps-4 [&_>_a]:my-0 space-y-1 relative before:absolute before:-top-0.5 before:start-6 before:h-[calc(100%_-_33px)] before:border-l-2 before:border-[#EDEFF2] dark:before:border-[#282F37]"
      header={({ open, toggle }) => (
        <div
          onClick={toggle}
          className={cn(
            "group relative flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 font-medium duration-200",
            isActive || isDropdownOpen
              ? colorPresetName === "black"
                ? "bg-primary/[8%] text-primary"
                : "bg-primary/[8%] text-primary"
              : "hover:bg-primary/[8%] hover:text-primary"
          )}>
          <span className={"flex items-center gap-2"}>
            <Icon className="h-6 w-6" />
            {t(item.name)}
          </span>

          <PiCaretDownBold
            strokeWidth={3}
            className={cn(
              "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
              open && "rotate-0 rtl:rotate-0",
              (isActive || isDropdownOpen) &&
              "text-primary dark:text-primary-lighter"
            )}
          />
        </div>
      )}>
      {item?.subMenuItems?.map((subMenuItem, index) => {
        const isAuthorized = true; //getIsAuthorized(subMenuItem)
        const isChildActive = subMenuItem?.href?.includes("/:")
          ? normalizedPathname.startsWith(subMenuItem?.href?.split("/:")[0])
          : normalizedPathname === subMenuItem?.href

        const menuItem = (
          <Link
            href={isAuthorized ? subMenuItem?.href : "#"}
            key={subMenuItem?.name + index}
            onClick={(e) => !isAuthorized && e.preventDefault()}
            className={cn(
              "sidebar-tree-item relative mx-5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-semibold capitalize duration-200 last-of-type:mb-1 lg:last-of-type:mb-2",
              isChildActive
                ? "bg-gray-500/10 text-title"
                : "text-body hover:bg-gray-500/20 hover:text-title",
              !isAuthorized &&
              "cursor-not-allowed opacity-50 hover:bg-transparent"
            )}>
            <div className="flex items-center truncate">
              <span className="truncate">{t(subMenuItem?.name)}</span>
            </div>
            {subMenuItem?.badge?.length ? (
              <StatusBadge status={subMenuItem?.badge} />
            ) : null}
          </Link>
        )

        return isAuthorized ? (
          menuItem
        ) : (
          <Tooltip
            key={subMenuItem?.name + index}
            content="Need access from admin"
            placement="right">
            {menuItem}
          </Tooltip>
        )
      })}
    </Collapse>
  )
}

export default function BerylliumLeftSidebarExpandable() {
  const t = useTranslations("layout")
  const { expandedLeft } = useBerylliumSidebars()
  const selectedMenu = useAtomValue(berylliumMenuItemAtom)
  const { roles } = useCurrentRole()

  return (
    <div
      className={cn(
        "fixed start-[86px] top-[76px] z-50 hidden h-full w-0 overflow-x-hidden border-e border-gray-500/20 bg-background pt-4 duration-200 xl:flex",
        !!expandedLeft && "w-[304px] ps-[18px]"
      )}>
      <SimpleBar className="h-[calc(100vh_-_100px)] min-w-[276px] pe-2.5 pt-4">
        <p className="mb-3 font-barlow text-xs font-bold uppercase tracking-wider text-gray-500">
          {t(selectedMenu.title)}
        </p>
        <div className="flex flex-col gap-2">
          {selectedMenu.menuItems.map((menu) => (
            <Fragment key={menu.name}>
              {menu.href ? (
                <LinkMenuItem item={menu} role={roles} />
              ) : (
                <CollapsibleMenuItem item={menu} role={roles} />
              )}
            </Fragment>
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}
