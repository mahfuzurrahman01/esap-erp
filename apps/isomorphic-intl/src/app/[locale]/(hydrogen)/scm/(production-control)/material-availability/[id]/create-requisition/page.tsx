import { metaObject } from "@/config/site.config"
import AddRequisitionPage from "@/modules/scm/components/templates/production-control/material-availability/create-requsition-for-materials"

export const metadata = {
  ...metaObject("Create Material Availability"),
}

function page() {
  return (
    <>
      <AddRequisitionPage />
    </>
  )
}

export default page
