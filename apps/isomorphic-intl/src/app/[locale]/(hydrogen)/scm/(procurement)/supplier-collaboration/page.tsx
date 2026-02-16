import { metaObject } from "@/config/site.config"
import SupplierCollaborationPage from "@/modules/scm/components/templates/procurement/supplier-collaboration"

export const metadata = {
  ...metaObject("Supplier Collaboration"),
}

function page() {
  return (
    <>
      <SupplierCollaborationPage />
    </>
  )
}

export default page
