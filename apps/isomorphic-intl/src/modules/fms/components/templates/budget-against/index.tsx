"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { Button } from "@/components/ui"
import BudgetAgainstTable from "@/modules/fms/components/containers/budget-against"
import BudgetAgainstFormDrawerView from "@/modules/fms/components/containers/budget-against/budget-against-form-drawer-view"

export default function BudgetAgainstList({
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
            onClick={() =>
              openDrawer({
                view: <BudgetAgainstFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t("form-create")}
          </Button>
        </div>
      </PageHeader>

      <BudgetAgainstTable />
    </>
  )
}
