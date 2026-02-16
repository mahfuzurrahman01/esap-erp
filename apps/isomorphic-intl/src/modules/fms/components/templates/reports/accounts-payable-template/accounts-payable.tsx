"use client"

import PageHeader from "@/components/base/page-header"
import AccountPayableReportList from "@/modules/fms/components/containers/reports/accounts-payable"
import ExportButton from "@/components/ui/export-button"
import { useAccountPayableReport } from "@/modules/scm/hooks"

const pageHeader = {
  title: "text-accounts-payable-report",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-accounts-payable-report",
    },
  ],
}

export default function AccountsPayableReportPageList() {
  const { data } = useAccountPayableReport()

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, party, currency, payableAccount, invoiceNo, invoiceDate, dueDate, advanced amount, invoiced amount, paid amount, outstanding amount, total amount due"
            }
            fileName={"accounts-payable-report"}
          />
        </div>
      </PageHeader>
      <AccountPayableReportList />
    </>
  )
}
