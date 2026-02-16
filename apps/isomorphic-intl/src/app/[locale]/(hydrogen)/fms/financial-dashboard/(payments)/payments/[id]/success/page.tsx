import { metaObject } from "@/config/site.config"
import PaymentSuccess from "@/modules/fms/components/templates/payments/payment-success"

export const metadata = {
  ...metaObject("Payment Success"),
}

export default async function PaymentSuccessPage(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return <PaymentSuccess id={params.id} />
}
