import { metaObject } from "@/config/site.config"
import WorkOrderTrackingListPage from "@/modules/scm/components/templates/production-control/work-order-tracking/work-order-tracking-list"

export const metadata = {
  ...metaObject("Work Order Tracking List"),
}

function page() {
  return (
    <>
      <WorkOrderTrackingListPage />
    </>
  )
}

export default page
