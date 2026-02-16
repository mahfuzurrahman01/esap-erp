import { metaObject } from "@/config/site.config"
import RequisitionDetailsPage from "@/modules/scm/components/templates/procurement/requisition/requisition-view"

export const metadata = {
  ...metaObject("Requisition Details"),
}

export default function page() {
  return (
    <>
      <RequisitionDetailsPage />
    </>
  )
}
