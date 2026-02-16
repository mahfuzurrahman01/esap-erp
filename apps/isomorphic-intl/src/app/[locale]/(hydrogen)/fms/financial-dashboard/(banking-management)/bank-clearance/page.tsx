import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import BankClearanceForm from "@/modules/fms/components/containers/bank-clearance/bank-clearance-form"

export const metadata = {
  ...metaObject("Bank Clearance"),
}

const pageHeader = {
  title: "text-bank-clearance",
  breadcrumb: [
    {
      href: routes.fms.bankTransaction,
      name: "text-bank-transaction",
    },
    {
      name: "text-bank-clearance",
    },
  ],
}
export default function BankClearancePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <BankClearanceForm />
    </>
  )
}
