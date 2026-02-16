"use client"

import PageHeader from "@/components/base/page-header"
import AccountReceivableReportList from "@/modules/fms/components/containers/reports/accounts-receivable"

const pageHeader = {
  title: "text-accounts-receivable-report",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-accounts-receivable-report",
    },
  ],
}

export default function AccountsReceivableReportPageList() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <AccountReceivableReportList />
    </>
  )
}
