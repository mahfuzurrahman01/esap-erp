import { metaObject } from "@/config/site.config"
import EditInvoiceBillsPage from "@/modules/scm/components/templates/procurement/invoice-bills/invoice-bills-edit"

export const metadata = {
  ...metaObject("Edit Invoice Bills"),
}

export default function page() {
  return <EditInvoiceBillsPage />
}
