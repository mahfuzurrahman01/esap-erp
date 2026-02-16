import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import DailyPaymentsTemplate from "@/modules/fms/components/templates/reports/daily-payments"

export const metadata = {
  ...metaObject("Payments History"),
}

const pageHeader = {
  title: "text-payments-history",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-payments-history",
    },
  ],
}

export default function DailyPayments() {
  return (
    <>
      <DailyPaymentsTemplate pageHeader={pageHeader} />
    </>
  )
}
