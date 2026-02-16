import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import BankStatementForm from "@/modules/fms/components/containers/reports/bank-statement-report/bank-statement-form"

export const metadata = {
  ...metaObject("Bank Statement Report"),
}

const pageHeader = {
  title: "text-bank-statement-report",
  breadcrumb: [
    {
      href: routes.fms.bankTransaction,
      name: "text-bank-statement-report",
    },
  ],
}
export default function BankStatementReport() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <BankStatementForm />
    </>
  )
}