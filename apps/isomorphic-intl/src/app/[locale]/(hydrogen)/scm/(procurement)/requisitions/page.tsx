import { metaObject } from "@/config/site.config"
import RequisitionListPage from "@/modules/scm/components/templates/procurement/requisition/requisition-list"

export const metadata = {
  ...metaObject("Requisition List"),
}

function page() {
  return (
    <>
      <RequisitionListPage />
    </>
  )
}

export default page
