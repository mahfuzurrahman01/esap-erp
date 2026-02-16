"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"

import OpportunityReportTable from "@/modules/crm/components/containers/reports/opportunity/table"
import { useOpportunityReport } from "@/modules/crm/hooks/use-opportunity-report"
import ExportOpportunity from "@/modules/crm/components/containers/reports/opportunity/export-opportunity"

export default function OpportunityReportListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useOpportunityReport()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportOpportunity data={data?.data ?? []} />
        </div>
      </PageHeader>
      <div className="@container">
        <OpportunityReportTable />
      </div>
    </>
  )
}
