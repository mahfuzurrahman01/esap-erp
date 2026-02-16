import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import BanksList from "@/modules/fms/components/templates/bank-list"

export const metadata = {
  ...metaObject("Bank List"),
}

const pageHeader = {
  title: "text-bank",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-bank",
    },
  ],
}

export default function BankPage() {
  return (
    <>
      <BanksList pageHeader={pageHeader} />
    </>
  )
}
