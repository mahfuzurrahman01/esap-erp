import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateBankAccount from "@/modules/fms/components/containers/bank-account/create-edit-bank-form"

export const metadata = {
  ...metaObject("Create Bank Account"),
}

const pageHeader = {
  title: "text-create-bank-account",
  breadcrumb: [
    {
      href: routes.fms.bankAccount,
      name: "text-bank-account",
    },
    {
      name: "text-create-bank-account",
    },
  ],
}

export default function FMSPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateBankAccount />
    </>
  )
}
