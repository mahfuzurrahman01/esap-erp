"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import LogsTable from "@/modules/crm/components/containers/logs/table"
import { useLogList } from "@/modules/crm/hooks/use-logs"
import ExportLogsReport from "@/modules/crm/components/containers/logs/export-logs"

export default function LogListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useLogList()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportLogsReport data={data?.data ?? []} />
        </div>
      </PageHeader>
      <div className="@container">
        <LogsTable />
      </div>
    </>
  )
}
