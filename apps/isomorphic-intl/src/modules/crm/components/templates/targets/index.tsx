"use client"

import dynamic from "next/dynamic"
import React from "react"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { Button } from "@/components/ui"
import TargetTable from "@/modules/crm/components/containers/targets/table"

const TargetFormDrawerView = dynamic(
  () => import("@/components/base/notifications/targets-drawer-view"),
  {
    ssr: false,
  }
)

export default function TargetListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            type="button"
            className="h-9 cursor-pointer rounded-lg border border-transparent bg-gray-900 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800 focus-visible:ring-muted dark:bg-gray-100 dark:text-gray-900 dark:backdrop-blur dark:hover:bg-gray-200"
            onClick={() =>
              openDrawer({
                view: <TargetFormDrawerView />,
                placement: "right",
                containerClassName: "lg:min-w-[500px] dropdown-gr",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t("form-create")}
          </Button>
        </div>
      </PageHeader>
      <TargetTable />
    </>
  )
}
