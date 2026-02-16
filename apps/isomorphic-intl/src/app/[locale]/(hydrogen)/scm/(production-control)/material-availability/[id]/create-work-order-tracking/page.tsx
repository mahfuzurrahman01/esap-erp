import { metaObject } from "@/config/site.config"
import CreateWorkOrderTrackingPage from "@/modules/scm/components/templates/production-control/material-availability/create-work-order-tracking"

export const metadata = {
  ...metaObject("Create Work Order"),
}

function page() {
  return (
    <>
      <CreateWorkOrderTrackingPage />
    </>
  )
}

export default page
