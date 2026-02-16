import { metaObject } from "@/config/site.config"
import EditRequisitionPage from "@/modules/scm/components/templates/procurement/requisition/requisition-edit"

export const metadata = {
  ...metaObject("Edit Requisition"),
}

export default function page() {
  return (
    <>
      <EditRequisitionPage />
    </>
  )
}
