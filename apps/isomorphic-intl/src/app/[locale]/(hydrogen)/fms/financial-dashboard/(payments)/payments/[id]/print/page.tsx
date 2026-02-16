import { metaObject } from "@/config/site.config"
import PaymentView from "@/modules/fms/components/templates/payments/payment-view"

export const metadata = {
  ...metaObject("Print Payment"),
}

export default async function PaymentPrintPage(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return <PaymentView id={params.id} />
}
