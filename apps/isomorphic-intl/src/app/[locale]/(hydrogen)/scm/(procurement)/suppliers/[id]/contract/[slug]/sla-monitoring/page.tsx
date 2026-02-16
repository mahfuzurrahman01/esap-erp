import { metaObject } from "@/config/site.config"
import SLAMonitoringPage from "@/modules/scm/components/templates/procurement/supplier/sla-monitoring"

export const metadata = {
  ...metaObject("SLA Monitoring"),
}

export default function page() {
  return (
    <>
      <SLAMonitoringPage />
    </>
  )
}
