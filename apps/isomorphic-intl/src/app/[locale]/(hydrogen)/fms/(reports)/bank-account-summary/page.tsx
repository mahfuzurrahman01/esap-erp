import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import BankAccountSummaryForm from "@/modules/fms/components/containers/reports/bank-account-summary/bank-account-summary-form"

export const metadata = {
  ...metaObject("Bank Account Summary"),
}

const pageHeader = {
  title: "text-bank-account-summary",
  breadcrumb: [
    {
      name: "text-bank-account-summary",
    },
  ],
}
export default function BankAccountSummaryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <BankAccountSummaryForm />
    </>
  )
}
