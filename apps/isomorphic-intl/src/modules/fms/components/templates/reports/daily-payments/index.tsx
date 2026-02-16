"use client"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import DailyPaymentsTable from "@/modules/fms/components/containers/reports/daily-payments"

export default function DailyPaymentsTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <DailyPaymentsTable />
    </>
  )
}
