import React from "react"

import { metaObject } from "@/config/site.config"
import EditSLAMonitoringPage from "@/modules/scm/components/templates/procurement/supplier/sla-monitoring-edit"

export const metadata = {
  ...metaObject("SLA Monitoring Edit"),
}

export default function page() {
  return (
    <div>
      <EditSLAMonitoringPage />
    </div>
  )
}
