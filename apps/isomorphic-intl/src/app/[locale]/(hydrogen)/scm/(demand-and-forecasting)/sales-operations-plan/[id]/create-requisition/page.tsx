import { metaObject } from "@/config/site.config"
import AddRequisitionPage from "@/modules/scm/components/templates/procurement/requisition/create-requisition"

export const metadata = {
  ...metaObject("Create Sales Operation Plan"),
}


export default function page() {
  return (
    <>
      <AddRequisitionPage />
    </>
  )
}
