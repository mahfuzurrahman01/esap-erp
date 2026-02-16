import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import Currencies from "@/modules/fms/components/templates/currency"

export const metadata = {
  ...metaObject("Currency List"),
}

const pageHeader = {
  title: "text-currency",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-currency",
    },
  ],
}

export default function CurrencyPage() {
  return (
    <>
      <Currencies pageHeader={pageHeader} />
    </>
  )
}
