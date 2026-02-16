import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import PaymentTemplate from "@/modules/fms/components/templates/payments/payment-template"

export const metadata = {
  ...metaObject("View Payment"),
}

const pageHeader = {
  title: "text-payment",
  breadcrumb: [
    {
      href: routes.fms.payments,
      name: "text-payment-list",
    },
    {
      name: "text-view-payment",
    },
  ],
}

export default async function PaymentDetailsPage(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return <PaymentTemplate id={params.id} pageHeader={pageHeader} />
}
