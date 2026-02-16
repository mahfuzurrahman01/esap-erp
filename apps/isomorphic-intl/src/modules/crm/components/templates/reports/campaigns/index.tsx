"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { useCampaignsReportList } from "@/modules/crm/hooks/use-campaigns-report"

import ExportCampaignsReport from "@/modules/crm/components/containers/reports/campaigns/export-campaigns"
import CampaignsReportTable from "@/modules/crm/components/containers/reports/campaigns/table"

export default function CampaignsReportListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useCampaignsReportList()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportCampaignsReport data={data?.data} />
        </div>
      </PageHeader>
      <div className="@container">
        <CampaignsReportTable />
      </div>
    </>
  )
}
