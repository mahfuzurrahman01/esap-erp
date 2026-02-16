"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { useLeadsByCompany } from "@/modules/crm/hooks/use-leads-report"

import LeadsByCompanyTable from "@/modules/crm/components/containers/reports/leads/table"
import ExportLeadsReport from "@/modules/crm/components/containers/reports/leads/export-leads"

export default function LeadsByCompanyTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useLeadsByCompany()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportLeadsReport data={data?.data} />
        </div>
      </PageHeader>
      <div className="@container">
        <LeadsByCompanyTable />
      </div>
    </>
  )
}
