import * as React from 'react'
import { metaObject } from "@/config/site.config"
import InsightTemplate from '@/modules/crm/components/templates/analytics/insight'

export const metadata = {
  ...metaObject("Opportunity Insight"),
}

export default function InsightPage() {
  return <InsightTemplate />
}
