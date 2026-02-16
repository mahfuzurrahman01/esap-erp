"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

import cn from "@core/utils/class-names"
import { Drawer } from "rizzui"

import { useDrawer } from "./use-drawer"

export default function GlobalDrawer() {
  const { isOpen, view, placement, containerClassName, closeDrawer } =
    useDrawer()
  const pathname = usePathname()
  useEffect(() => {
    closeDrawer()
     
  }, [pathname])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-xl"
      containerClassName={cn(
        "bg-paper dark:bg-paper min-w-[320px] max-w-[500px] overflow-auto",
        containerClassName
      )}
      className="z-[9999]">
      {view}
    </Drawer>
  )
}
