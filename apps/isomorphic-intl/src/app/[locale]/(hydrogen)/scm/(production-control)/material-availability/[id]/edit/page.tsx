import { metaObject } from "@/config/site.config"
import EditMaterialAvailabilityPage from "@/modules/scm/components/templates/production-control/material-availability/material-availability-edit"

export const metadata = {
  ...metaObject("Edit Material Availability"),
}

function page() {
  return (
    <>
      <EditMaterialAvailabilityPage />
    </>
  )
}

export default page
