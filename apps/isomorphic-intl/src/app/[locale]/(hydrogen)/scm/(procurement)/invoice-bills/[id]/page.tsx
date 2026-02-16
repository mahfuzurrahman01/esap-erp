import { metaObject } from "@/config/site.config"
import InvoiceBillDetailsPage from "@/modules/scm/components/templates/procurement/invoice-bills/invoice-bills-view"

export const metadata = {
  ...metaObject("Invoice Bill Details"),
}

export default function page() {
  return (
    <>
      <InvoiceBillDetailsPage />
    </>
  )
}
