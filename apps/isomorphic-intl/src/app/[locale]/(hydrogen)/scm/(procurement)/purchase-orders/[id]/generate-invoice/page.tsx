import { metaObject } from "@/config/site.config"
import CreateInvoiceBillsPage from "@/modules/scm/components/templates/procurement/invoice-bills/create-invoice-bills"

export const metadata = {
  ...metaObject("Create Invoice Bills"),
}

export default function page() {
  return (
    <>
      <CreateInvoiceBillsPage />
    </>
  )
}
