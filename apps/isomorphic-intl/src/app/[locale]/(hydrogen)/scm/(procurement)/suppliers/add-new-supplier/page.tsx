import { metaObject } from "@/config/site.config"
import CreateEditSupplierPage from "@/modules/scm/components/templates/procurement/supplier/add-new-supplier"

export const metadata = {
  ...metaObject("Create Supplier"),
}

function page() {
  return (
    <>
      <CreateEditSupplierPage />
    </>
  )
}

export default page
