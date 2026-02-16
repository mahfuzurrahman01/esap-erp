"use client"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import MonthlyBankTransactionsTable from "@/modules/fms/components/containers/reports/monthly-bank-transactions"

export default function MonthlyBankTransactionsList({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <MonthlyBankTransactionsTable />
    </>
  )
}
