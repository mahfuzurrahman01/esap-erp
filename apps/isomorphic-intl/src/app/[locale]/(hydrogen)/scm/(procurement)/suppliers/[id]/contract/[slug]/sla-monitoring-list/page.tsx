import { metaObject } from "@/config/site.config"
import SLAMonitoringListPage from "@/modules/scm/components/templates/procurement/supplier/sla-monitoring-list"

export const metadata = {
  ...metaObject("SLA Monitoring List"),
}

export default function page() {
  return (
    <>
      <SLAMonitoringListPage />
    </>
  )
}
