"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import SlasTable from "@/modules/crm/components/containers/slas/table"
import { useSlaList } from "@/modules/crm/hooks/use-sla"

import ExportSlasReport from "@/modules/crm/components/containers/slas/export-slas"

export default function SlaListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useSlaList()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportSlasReport data={data?.data ?? []} />
        </div>
      </PageHeader>
      <div className="@container">
        <SlasTable />
      </div>
    </>
  )
}
