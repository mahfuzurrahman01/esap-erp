import { metaObject } from "@/config/site.config"
import CreateMaterialAvailabilityPage from "@/modules/scm/components/templates/production-control/material-availability/create-material-availability"

export const metadata = {
  ...metaObject("Create Material Availability"),
}

function page() {
  return (
    <>
      <CreateMaterialAvailabilityPage />
    </>
  )
}

export default page
