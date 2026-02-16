"use client"

import { Box } from "rizzui"
import OrganizationContainer from "@/modules/crm/components/containers/analytics/organization"

export default function OrganizationTemplate() {
  return (
    <Box
      className="h-full bg-cover bg-fixed p-3 md:p-8 md:pl-[60px] md:pt-[40px] @container/crm crm-dashboard">
        <OrganizationContainer />
    </Box>
  )
}
