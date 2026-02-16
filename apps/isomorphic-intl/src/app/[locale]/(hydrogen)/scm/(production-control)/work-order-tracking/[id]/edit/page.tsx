import { metaObject } from "@/config/site.config"
import EditWorkOrderTrackingPage from "@/modules/scm/components/templates/production-control/work-order-tracking/work-order-tracking-edit"

export const metadata = {
  ...metaObject("Work Order Tracking Edit"),
}

function page() {
  return <EditWorkOrderTrackingPage />
}

export default page
