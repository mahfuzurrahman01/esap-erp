import { metaObject } from "@/config/site.config"
import MaterialAvailabilityListPage from "@/modules/scm/components/templates/production-control/material-availability/material-availability-list"

export const metadata = {
  ...metaObject("Material Availability List"),
}

function page() {
  return (
    <>
      <MaterialAvailabilityListPage />
    </>
  )
}

export default page
