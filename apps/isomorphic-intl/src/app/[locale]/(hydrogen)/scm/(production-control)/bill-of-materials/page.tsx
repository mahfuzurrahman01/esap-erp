import { metaObject } from "@/config/site.config"
import BillOfMaterialsListPage from "@/modules/scm/components/templates/production-control/bill-of-materials/bill-of-materials-list"

export const metadata = {
  ...metaObject("Bill of Materials List"),
}

function page() {
  return (
    <>
      <BillOfMaterialsListPage />
    </>
  )
}

export default page
