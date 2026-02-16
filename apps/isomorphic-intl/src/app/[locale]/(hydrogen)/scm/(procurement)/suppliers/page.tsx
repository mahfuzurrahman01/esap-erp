import { metaObject } from "@/config/site.config"
import SupplierList from "@/modules/scm/components/templates/procurement/supplier/supplier-list"

export const metadata = {
  ...metaObject("Supplier List"),
}

function page() {
  return (
    <>
      <SupplierList />
    </>
  )
}

export default page
