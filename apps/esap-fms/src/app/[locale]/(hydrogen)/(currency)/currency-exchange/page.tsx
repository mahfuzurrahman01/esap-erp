import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CurrencyExchanges from "@/modules/fms/components/templates/currency-exchange"

export const metadata = {
  ...metaObject("Currency Exchange List"),
}

const pageHeader = {
  title: "text-currency-exchange",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-currency-exchange",
    },
  ],
}

export default function CurrencyPage() {
  return (
    <>
      <CurrencyExchanges pageHeader={pageHeader} />
    </>
  )
}
