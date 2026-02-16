import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import PaymentSummaryTemplate from "@/modules/fms/components/templates/reports/payment-summary"

export const metadata = {
  ...metaObject("Payment Summary by Company"),
}

const pageHeader = {
  title: "text-payment-summary",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-payment-summary",
    },
  ],
}

export default function PaymentSummary() {
  return (
    <>
      <PaymentSummaryTemplate pageHeader={pageHeader} />
    </>
  )
}
