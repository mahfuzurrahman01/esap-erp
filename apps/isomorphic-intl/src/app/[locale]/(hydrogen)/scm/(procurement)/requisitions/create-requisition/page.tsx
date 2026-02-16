import { metaObject } from "@/config/site.config"
import AddRequisitionPage from "@/modules/scm/components/templates/procurement/requisition/create-requisition"

export const metadata = {
  ...metaObject("Create Requisition"),
}

export default function page() {
  return (
    <>
      <AddRequisitionPage />
    </>
  )
}
