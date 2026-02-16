import { metaObject } from "@/config/site.config"
import EditSupplierPage from "@/modules/scm/components/templates/procurement/supplier/supplier-edit"

export const metadata = {
  ...metaObject("Edit Supplier"),
}

export default function EditSupplier() {
  return (
    <>
      <EditSupplierPage />
    </>
  )
}
