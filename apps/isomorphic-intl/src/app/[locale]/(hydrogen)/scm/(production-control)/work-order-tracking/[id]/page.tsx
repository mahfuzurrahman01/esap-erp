import { metaObject } from "@/config/site.config"
import WorkOrderTrackingViewPage from "@/modules/scm/components/templates/production-control/work-order-tracking/work-order-tracking-view"

export const metadata = {
  ...metaObject("Work Order Tracking View"),
}

function page() {
  return <WorkOrderTrackingViewPage />
}

export default page
