"use client"

import dynamic from "next/dynamic"

import cn from "@core/utils/class-names"
import { ActionIcon } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import CogIcon from "@/components/icons/cog"
import { usePresets } from "@/config/color-presets"
import DrawerHeader from "@/layouts/drawer-header"

import {
  useApplyColorPreset,
  useColorPresets,
} from "./settings/use-theme-color"

const SettingsDrawer = dynamic(() => import("@/layouts/settings-drawer"), {
  ssr: false,
})

export default function SettingsButton({
  className,
  children,
  t,
}: {
  className?: string
  children?: React.ReactNode
  t?: (key: string) => string | undefined
}) {
  const COLOR_PRESETS = usePresets()
  const { openDrawer, closeDrawer } = useDrawer()
  const { colorPresets } = useColorPresets()

  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors)

  return (
    <ActionIcon
      aria-label="Settings"
      variant="text"
      className={cn("relative h-[34px] w-[34px] md:h-9 md:w-9", className)}
      onClick={() =>
        openDrawer({
          view: (
            <>
              <DrawerHeader onClose={closeDrawer} />
              <SettingsDrawer />
            </>
          ),
          placement: "right",
          containerClassName: "max-w-[420px] dropdown-gr",
        })
      }>
      {children ? (
        children
      ) : (
        <CogIcon
          strokeWidth={1.8}
          className="h-[25.5px] w-auto animate-spin-slow text-title"
        />
      )}
    </ActionIcon>
  )
}
