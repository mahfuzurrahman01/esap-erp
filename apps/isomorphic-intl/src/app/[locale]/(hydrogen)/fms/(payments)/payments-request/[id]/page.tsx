import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import PaymentRequestTemplate from "@/modules/fms/components/templates/payments-request/payment-request-template"

export const metadata = {
  ...metaObject("View Payment Request"),
}

const pageHeader = {
  title: "text-payment-request",
  breadcrumb: [
    {
      href: routes.fms.paymentRequest,
      name: "text-payment-request-list",
    },
    {
      name: "text-view-payment-request",
    },
  ],
}

export default async function PaymentDetailsPage(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return (
    <>
      <PaymentRequestTemplate id={params.id} pageHeader={pageHeader} />
    </>
  )
}
