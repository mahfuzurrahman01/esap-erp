"use client"

import React from "react"

import { PiPlusBold } from "react-icons/pi"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { routes } from "@/config/routes"
import LeadsTable from "@/modules/crm/components/containers/lead/table"
import { useLeadList } from "@/modules/crm/hooks/use-leads"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

import ExportLeads from "@/modules/crm/components/containers/lead/export-leads"
import ImportLeads from "@/modules/crm/components/containers/lead/import-leads"

export default function LeadListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const { data } = useLeadList({pageSize:500})
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportLeads data={data?.data ?? []} />
          <ImportLeads title={"text-import-file"} />
          <TranslatableButton
            href={routes.crm.leadCreate}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <div className="@container">
        <LeadsTable />
      </div>
    </>
  )
}
