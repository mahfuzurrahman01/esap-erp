import * as React from 'react'
import { metaObject } from "@/config/site.config"
import OrganizationTemplate from '@/modules/crm/components/templates/analytics/organization'

export const metadata = {
  ...metaObject("ORG Overview"),
}

export default function OrganizationPage() {
  return <OrganizationTemplate />
}
