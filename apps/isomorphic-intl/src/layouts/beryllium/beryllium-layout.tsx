"use client"

import { usePathname, useRouter } from "next/navigation"

import cn from "@core/utils/class-names"

import Header from "@/layouts/beryllium/beryllium-header"
import BerylliumLeftSidebarFixed from "@/layouts/beryllium/beryllium-left-sidebar-fixed"
import SidebarExpandable from "@/layouts/beryllium/beryllium-sidebar-expanded"
import { useBerylliumSidebars } from "@/layouts/beryllium/beryllium-utils"

export default function BerylliumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { expandedLeft } = useBerylliumSidebars()
  const pathname = usePathname()

  const isDashboard = pathname.includes("financial-dashboard")
  const isCRMDashboard = pathname.includes("crm/dashboard")

  return (
    <main className={cn("flex min-h-screen flex-grow")}>
      <BerylliumLeftSidebarFixed />
      <SidebarExpandable />
      <div className="flex w-full flex-col">
        <Header className="xl:ms-[88px]" />
        <div
          className={cn(
            "flex flex-grow flex-col gap-4 px-4 pb-0 pt-5 duration-200 md:px-5 lg:px-6 xl:px-0 dark:bg-gray-900 xl:pe-8",
            expandedLeft ? "xl:ps-[414px]" : "xl:ps-[110px]",
            isDashboard ? "bg-[#F8F8F8]" : "",
            isCRMDashboard ? "crm-dashboard-wrapper bg-[url('/auth/dashboard-cover.png')] bg-cover" : "",
          )}>
          <div className="grow">{children}</div>
        </div>
      </div>
    </main>
  )
}