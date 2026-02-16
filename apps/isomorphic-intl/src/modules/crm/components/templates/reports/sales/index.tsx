"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"

import SalesReportTable from "@/modules/crm/components/containers/reports/sales/table"
import { useSalesReportList } from "@/modules/crm/hooks/use-sales-report"
import ExportSales from "@/modules/crm/components/containers/reports/sales/export-sales"

export default function SalesReportListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useSalesReportList()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportSales data={data?.data ?? []} />
        </div>
      </PageHeader>
      <div className="@container">
        <SalesReportTable />
      </div>
    </>
  )
}
