import { metaObject } from "@/config/site.config"
import InvoiceBillsListPage from "@/modules/scm/components/templates/procurement/invoice-bills/invoice-bills-list"

export const metadata = {
  ...metaObject("Invoice Bills List"),
}

function page() {
  return (
    <>
      <InvoiceBillsListPage />
    </>
  )
}

export default page
