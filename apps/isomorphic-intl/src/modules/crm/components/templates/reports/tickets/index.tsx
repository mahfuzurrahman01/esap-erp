"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { useTicketsReportList } from "@/modules/crm/hooks/use-tickets-report"

import TicketsReportTable from "@/modules/crm/components/containers/reports/tickets/table"
import ExportTicketsReport from "@/modules/crm/components/containers/reports/tickets/export-tickets"

export default function TicketReportListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useTicketsReportList()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportTicketsReport data={data?.data} />
        </div>
      </PageHeader>
      <div className="@container">
        <TicketsReportTable />
      </div>
    </>
  )
}
