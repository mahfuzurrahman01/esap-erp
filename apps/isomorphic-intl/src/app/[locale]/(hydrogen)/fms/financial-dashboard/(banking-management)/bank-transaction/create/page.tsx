import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateBankTransactionForm from "@/modules/fms/components/containers/bank-transaction/create-edit-form"

export const metadata = {
  ...metaObject("Create Bank Transaction"),
}

const pageHeader = {
  title: "text-create-bank-transaction",
  breadcrumb: [
    {
      href: routes.fms.bankTransaction,
      name: "text-bank-transaction",
    },
    {
      name: "text-create-bank-transaction",
    },
  ],
}

export default function CreateBankTransactionPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateBankTransactionForm />
    </>
  )
}
