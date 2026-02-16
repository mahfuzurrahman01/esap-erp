"use client"

import cn from "@core/utils/class-names"
import { PiSliders } from "react-icons/pi"
import { Button } from "rizzui"

import {
  type DrawerPlacements,
  useDrawer,
} from "@/components/base/drawer-views/use-drawer"

interface FiltersButtonProps {
  className?: string
  modalView: React.ReactNode
  placement: DrawerPlacements
}

export default function FiltersButton({
  className,
  placement,
  modalView,
}: FiltersButtonProps) {
  const { openDrawer } = useDrawer()
  return (
    <Button
      className={cn(
        "mt-4 w-full cursor-pointer @lg:mt-0 @lg:w-auto",
        className
      )}
      onClick={() =>
        openDrawer({
          view: modalView,
          placement,
        })
      }>
      <PiSliders className="me-1 h-4 w-4 rotate-90" />
      Filters
    </Button>
  )
}
