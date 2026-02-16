"use client"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import BankStatementForm from "@/modules/fms/components/containers/reports/bank-statement-report/bank-statement-form"

export default function BankStatementReportList({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <BankStatementForm />
    </>
  )
}
