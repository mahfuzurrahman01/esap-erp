"use client"

import dynamic from "next/dynamic"

import { ActionIcon } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { BellIcon } from "@/components/icons/crm/bell"
import { Badge } from "@/components/ui"

const NotificationsDrawer = dynamic(
  () => import("@/layouts/notification-drawer"),
  {
    ssr: false,
  }
)

export default function NotificationButton() {
  const { openDrawer } = useDrawer()

  return (
    <ActionIcon
      aria-label="Notifications"
      variant="text"
      className="relative h-[34px] w-[34px] backdrop-blur-md dark:bg-gray-800 dark:text-gray-0 md:h-9 md:w-9"
      onClick={() =>
        openDrawer({
          view: <NotificationsDrawer />,
          placement: "right",
          containerClassName: "overflow-hidden max-w-[420px] dropdown-gr",
        })
      }>
      <BellIcon className="h-[25.5px] w-auto" />
      <Badge
        renderAsDot
        color="warning"
        enableOutlineRing
        className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2 px-0"
      />
    </ActionIcon>
  )
}
