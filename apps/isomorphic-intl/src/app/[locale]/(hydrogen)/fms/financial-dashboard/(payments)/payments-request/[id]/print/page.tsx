import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import PaymentRequestView from "@/modules/fms/components/templates/payments-request/payment-request-view"

export const metadata = {
  ...metaObject("Print Payment Request"),
}


export default async function PaymentPrintPage(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return <PaymentRequestView id={params.id} />
}
