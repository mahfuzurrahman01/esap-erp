"use client"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import PaymentSummaryTable from "@/modules/fms/components/containers/reports/payment-summary"

export default function PaymentSummaryTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <PaymentSummaryTable />
    </>
  )
}
