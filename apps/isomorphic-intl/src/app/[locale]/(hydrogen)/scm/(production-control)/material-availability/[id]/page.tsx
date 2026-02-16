import { metaObject } from "@/config/site.config"
import MaterialAvailabilityViewPage from "@/modules/scm/components/templates/production-control/material-availability/material-availability-view"

export const metadata = {
  ...metaObject("Material Availability View"),
}

function page() {
  return (
    <>
      <MaterialAvailabilityViewPage />
    </>
  )
}

export default page
