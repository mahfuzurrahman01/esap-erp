"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useTranslations } from "next-intl"
import { PiCheck } from "react-icons/pi"
import { Text } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import TabsNavigation from "@/components/base/tabs-navigation"
import { Badge, Button } from "@/components/ui"
import { routes } from "@/config/routes"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { responseForNotification } from "@/components/base/notifications/approval-utils"
import BillDrawerView from "@/components/base/notifications/drawer-view"
import UserAvatar from "@/components/base/notifications/user-avatar"
import ProductDrawerView from "@/components/base/notifications/product-drawer-view"
import TargetDrawerView from "@/components/base/notifications/targets-drawer-view"
import {
  useNotificationList,
  useUpdateNotification,
} from "@/modules/crm/hooks/use-notification"
import { NotificationList } from "@/modules/crm/types/notification"

dayjs.extend(relativeTime)

export default function NotificationsDrawer() {
  const { openDrawer } = useDrawer()
  const { data: output, isLoading } = useNotificationList()
  const router = useRouter()
  const updateNotification = useUpdateNotification()
  async function updateStatus(item: {
    id: string
    status: string
    type: string
    referenceId: string
  }) {
    if (item?.status == "2") {
      await responseForNotification(updateNotification, item.id)
    }
    if (item?.type.toLowerCase() == "quotations") {
      router.push(routes.crm.viewQuotation(item.referenceId))
    } else if (item?.type.toLowerCase() == "customer") {
      router.push(routes.crm.viewCustomer(item.referenceId))
    } else if (item?.type.toLowerCase() == "product") {
      openDrawer({
        view: <ProductDrawerView id={item.referenceId} />,
        placement: "right",
        containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
      })
    } else if (item?.type.toLowerCase() == "bill") {
      openDrawer({
        view: <BillDrawerView id={item.referenceId} />,
        placement: "right",
        containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
      })
    } else if (item?.type.toLowerCase() == "targetgoal") {
      openDrawer({
        view: <TargetDrawerView id={item.referenceId} view />,
        placement: "right",
        containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
      })
    }
  }
  const notificationsData: NotificationList[] = output?.data || []
  const unreadCount =
    notificationsData?.filter((item: any) => item.status === 2).length || 0
  const readCount =
    notificationsData?.filter((item: any) => item.status === 1).length || 0
  const totalCount = notificationsData?.length || 0
  const { closeDrawer } = useDrawer()
  const handleCloseDrawer = () => {
    closeDrawer()
  }
  const t = useTranslations("common")

  const renderNotifications = (filter: "all" | "unread" | "read") => {
    if (isLoading) {
      return (
        <div className="container mx-auto w-full p-4">
          <SkeletonLoader />
        </div>
      )
    }
    if (!notificationsData || notificationsData.length === 0) {
      return (
        <div className="p-5 text-center text-gray-500">
          {t("text-no-data-available")}
        </div>
      )
    }
    return (
      <div className="grid cursor-pointer grid-cols-1">
        {notificationsData &&
          notificationsData
            .filter((item: any) => {
              if (filter === "unread") return item.status === 2
              if (filter === "read") return item.status === 1
              return true // For "all"
            })
            .map((item: any) => (
              <div
                key={item.id}
                className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md border-b border-dotted border-gray-500/20 p-5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => updateStatus(item)}>
                <UserAvatar userId={item.createdBy} />
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                  <div className="w-full">
                    <Text className="mb-2 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </Text>
                    <Text className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                      {dayjs(item.createdAt).fromNow(true)}
                    </Text>
                  </div>
                  <div className="ms-auto flex-shrink-0">
                    {item.status === 2 ? (
                      <Badge
                        renderAsDot
                        size="lg"
                        color="primary"
                        className="scale-90 p-0"
                      />
                    ) : (
                      <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                        <PiCheck className="h-auto w-[9px]" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    )
  }

  const tabs = [
    {
      label: (
        <div className="flex items-center gap-2">
          {t("text-all")}
          <Badge
            size="sm"
            className="flex items-center justify-center rounded-md bg-gray-900 dark:bg-gray-300 text-white">
            {totalCount}
          </Badge>
        </div>
      ),
      content: renderNotifications("all"),
    },
    {
      label: (
        <div className="flex items-center gap-2">
          {t("text-unread")}
          <Badge
            size="sm"
            className="flex items-center justify-center rounded-md bg-blue-500 dark:bg-blue-500 text-white">
            {unreadCount}
          </Badge>
        </div>
      ),
      content: renderNotifications("unread"),
    },
    {
      label: (
        <div className="flex items-center gap-2">
          {t("text-read")}
          <Badge
            size="sm"
            className="flex items-center justify-center rounded-md bg-green-500 dark:bg-green-500 text-white">
            {readCount}
          </Badge>
        </div>
      ),
      content: renderNotifications("read"),
    },
  ]

  return (
    <>
      <DrawerHeader
        onClose={handleCloseDrawer}
        headerClassName="mb-0 py-5"
        // onSelect={() => //console.log("Mark all as Read")}
      >
        <h5 className="text-[19px]">{t("text-notifications")}</h5>
      </DrawerHeader>
      <TabsNavigation
        tabs={tabs}
        className="flex-grow"
        tabListButtonClassName="aria-selected:bg-white dark:aria-selected:bg-gray-900 text-gray-700 dark:text-gray-100 aria-selected:text-black before:h-0 my-2 py-2 rounded-md"
        tabListClassName="justify-evenly bg-[#f4f6f8] dark:bg-gray-700 border-none"
        tabPanelClassName="overflow-y-scroll max-h-[80vh] p-0 m-0"
      />
      <div className="fixed bottom-0 w-full px-6 py-3 bg-gray-100 dark:bg-gray-800">
        <Link href={routes.crm.notifications}>
          <Button className="w-full rounded-md bg-transparent py-2 text-[16px] font-bold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800 dark:text-white">
            {t("text-view-all")}
          </Button>
        </Link>
      </div>
    </>
  )
}
