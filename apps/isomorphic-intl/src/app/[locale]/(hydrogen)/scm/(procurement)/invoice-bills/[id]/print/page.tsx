import { metaObject } from "@/config/site.config"
import InvoicePrintView from "@/modules/scm/components/templates/procurement/invoice-bills/invoice-print"

export const metadata = {
  ...metaObject("Print Payment"),
}

export default async function PaymentPrintPage(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return <InvoicePrintView id={params.id} />
}
