"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { useLeadsByStatus } from "@/modules/crm/hooks/use-leads-report"

import ExportLeadsReport from "@/modules/crm/components/containers/reports/leads/export-leads"
import LeadsByStatusTable from "@/modules/crm/components/containers/reports/leads-by-status/table"

export default function LeadsByStatusTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useLeadsByStatus()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportLeadsReport data={data?.data} />
        </div>
      </PageHeader>
      <div className="@container">
        <LeadsByStatusTable />
      </div>
    </>
  )
}
