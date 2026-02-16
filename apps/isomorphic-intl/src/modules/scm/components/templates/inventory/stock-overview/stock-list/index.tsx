"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import StockOverviewTable from "@/modules/scm/components/containers/invenory/stock-overview/stock-list"

const pageHeader = {
  title: "text-stock-overview-list",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-overview-list",
    },
  ],
}

export default function StockOverViewPage() {
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.scm.inventory.stock.stockEntry}
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <StockOverviewTable />
    </>
  )
}
