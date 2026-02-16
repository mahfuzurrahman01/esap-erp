import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import BankAccountTypesList from "@/modules/fms/components/templates/bank-account-type-list"

export const metadata = {
  ...metaObject("Bank Account Type List"),
}

const pageHeader = {
  title: "text-bank-account-type",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-bank-account-type",
    },
  ],
}

export default function BankPage() {
  return (
    <>
      <BankAccountTypesList pageHeader={pageHeader} />
    </>
  )
}
