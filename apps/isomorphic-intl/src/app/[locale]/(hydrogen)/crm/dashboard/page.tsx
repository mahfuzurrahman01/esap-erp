import * as React from 'react'
import { metaObject } from "@/config/site.config"
import CRMDashboard from "@/modules/crm/components/templates/crm-dashboard"

export const metadata = {
  ...metaObject("CRM Dashboard"),
}

export default function CRMDashboardPage() {
  return <CRMDashboard />
}
