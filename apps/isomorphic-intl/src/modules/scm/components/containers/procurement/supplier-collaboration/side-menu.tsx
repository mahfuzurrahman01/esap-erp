"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import SimpleBar from "@core/ui/simplebar"
import { LineGroup, Skeleton } from "@core/ui/skeleton"
import cn from "@core/utils/class-names"
import { useAtom } from "jotai"
import { atomWithReset } from "jotai/utils"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import PencilIcon from "@/components/icons/pencil"
import MarkAsReadIcon from "@/components/icons/scm/mark-as-read"
import StarredIcon from "@/components/icons/scm/starred-icon"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { SideMenuData } from "@/modules/scm/data/supplier-collaboration-data"
import {
  SupplierCollaboration,
  SupplierCollaborationQueryOptions,
} from "@/modules/scm/types/procurement/supplier/supplier-collaboration-types"
import AllIcon from "@/components/icons/scm/all-icon"
import MailReadIcon from "@/components/icons/scm/mail-icon"
import MailUnreadIcon from "@/components/icons/scm/unread-icon"

interface MessageItemProps {
  message: SideMenuData
  className?: string
  data?: SupplierCollaboration[]
  params?: SupplierCollaborationQueryOptions
  updateParams?: (newParams: Partial<SupplierCollaborationQueryOptions>) => void
  onClear?: () => void
  activeFilter: string // Add this prop
}

export const dataAtom = atomWithReset<SupplierCollaboration[]>([])

export function SideMenu({
  className,
  message,
  activeFilter,
}: MessageItemProps) {
  const hoverRef = useRef(null)
  // const [activeFilter] = useState("all")

  const isActive = message.filterType === activeFilter

  return (
    <div
      ref={hoverRef}
      onClick={message?.onClick}
      className={cn(
        className,
        "my-4 grid cursor-pointer grid-cols-[24px_1fr] items-center justify-start gap-5 border-t border-none p-2 px-3",

        isActive &&
          "rounded-xl border-t-2 border-t-primary bg-gray-500/20 text-title dark:bg-gray-500/20"
      )}>
      {message?.icon}
      <div>
        <div className="flex items-center justify-between lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
          <Text className="flex items-center font-semibold">
            {message?.title}
          </Text>
          <span className="">{message?.count}</span>
        </div>
      </div>
    </div>
  )
}

interface InboxListProps {
  className?: string
  data?: any
}

export default function SideMenuList({
  className,
  data: supplierCollaborationData,
}: InboxListProps) {
  const [data, setData] = useAtom(dataAtom)
  const t = useTranslations("form")
  const [activeFilter, setActiveFilter] = useState("all")

  // Ensure supplierCollaborationData is always treated as an array of SupplierCollaboration
  const safeSupplierCollaborationData = Array.isArray(supplierCollaborationData)
    ? (supplierCollaborationData as SupplierCollaboration[])
    : []

  useEffect(() => {
    const updatedItems = safeSupplierCollaborationData.filter(
      (item: any) => item.starred === true
    )
    setData(updatedItems ?? [])
  }, [])

  useEffect(() => {
    const updatedItems = safeSupplierCollaborationData?.filter(
      (item: any) => item.markedAsRead === true
    )
    setData(updatedItems ?? [])
  }, [])

  useEffect(() => {
    const updatedItems = safeSupplierCollaborationData?.filter(
      (item: any) => item.important === true
    )
    setData(updatedItems ?? [])
  }, [])

  useEffect(() => {
    const updatedItems = safeSupplierCollaborationData?.filter(
      (item: any) => item.markedAsRead === false
    )
    setData(updatedItems ?? [])
  }, [])

  // Update data when filter changes
  const applyFilter = (
    filterType: string,
    condition: (item: any) => boolean
  ) => {
    const filteredItems = safeSupplierCollaborationData?.filter(condition) ?? []
    setData(filteredItems)
    setActiveFilter(filterType)
  }

  const handleStarred = () => {
    applyFilter("starred", (item) => item.starred === true)
  }

  const handleRead = () => {
    applyFilter("read", (item) => item.markedAsRead === true)
  }

  const handleUnread = () => {
    applyFilter("unread", (item) => item.markedAsRead === false)
  }

  const handleImportant = () => {
    applyFilter("important", (item) => item.important === true)
  }

  const handleAll = () => {
    setData(safeSupplierCollaborationData ?? [])
    setActiveFilter("all")
  }

  const sideMenuItems: SideMenuData[] = [
    {
      id: 1,
      title: t("form-all"),
      icon: <AllIcon />,
      filterType: "all",
      count: safeSupplierCollaborationData?.length || 0,
      onClick: handleAll,
    },
    {
      id: 2,

      title: t("form-read"),
      icon: <MailReadIcon />,
      filterType: "read",
      count:
        safeSupplierCollaborationData?.filter(
          (item: any) => item.markedAsRead === true
        ).length || 0,
      onClick: handleRead,
    },
    {
      id: 3,
      title: t("form-unread"),
      icon: <MailUnreadIcon />,
      filterType: "unread",
      count:
        safeSupplierCollaborationData?.filter(
          (item: any) => item.markedAsRead === false
        ).length || 0,
      onClick: handleUnread,
    },

    {
      id: 4,
      title: t("form-starred"),
      icon: <StarredIcon className="h-6 w-6" />,
      filterType: "starred",
      count:
        safeSupplierCollaborationData?.filter(
          (item: any) => item.starred === true
        ).length || 0,
      onClick: handleStarred,
    },
    {
      id: 5,
      title: t("form-important"),
      icon: <MarkAsReadIcon className="h-6 w-6" />,
      filterType: "important",
      count:
        safeSupplierCollaborationData?.filter(
          (item: any) => item.important === true
        ).length || 0,
      onClick: handleImportant,
    },
  ]

  return (
    <>
      <div className={cn(className, "sticky")}>
        <div className="mb-7 w-full">
          <div className="flex w-full items-center gap-4">
            <Link
              href={
                routes.scm.procurement.supplierCollaboration.createEmailMessage
              }
              className="w-full">
              <Button
                as="span"
                className="w-full cursor-pointer text-lg"
                size="lg">
                <PencilIcon className="me-1.5 h-[24px] w-[24px]" />
                {t("form-compose")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border !border-none">
          <SimpleBar className="max-h-[calc(100vh-356px)] md:max-h-[calc(100vh-311px)] lg:max-h-[calc(100vh-240px)] xl:max-h-[calc(100vh-230px)] 2xl:max-h-[calc(100vh-240px)] 3xl:max-h-[calc(100vh-270px)]">
            {sideMenuItems.map((message) => (
              <SideMenu
                key={message.id}
                message={message}
                data={data}
                activeFilter={activeFilter}
              />
            ))}
          </SimpleBar>
        </div>
      </div>
    </>
  )
}

export function MessageLoader() {
  return (
    <div className="grid gap-3 border-t border-muted p-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-3 w-32 rounded" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="ml-auto h-3 w-16 rounded" />
      </div>
      <LineGroup
        columns={6}
        className="grid-cols-6 gap-1.5"
        skeletonClassName="h-2"
      />
      <LineGroup
        columns={5}
        className="grid-cols-5 gap-1.5"
        skeletonClassName="h-2"
      />
      <LineGroup
        columns={4}
        className="grid-cols-4 gap-1.5"
        skeletonClassName="h-2"
      />
    </div>
  )
}
