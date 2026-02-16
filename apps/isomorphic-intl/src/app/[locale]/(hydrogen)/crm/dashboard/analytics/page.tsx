import * as React from 'react'
import { metaObject } from "@/config/site.config"
import LeadAnalyticTemplate from '@/modules/crm/components/templates/analytics/lead-analytic'

export const metadata = {
  ...metaObject("Lead Analytics"),
}

export default function LeadAnalyticPage() {
  return <LeadAnalyticTemplate />
}
