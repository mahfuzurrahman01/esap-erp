"use client"

import { Box } from "rizzui"
import LeadAnalyticContainer from "@/modules/crm/components/containers/analytics/lead-analytics"

export default function LeadAnalyticTemplate() {
  return (
    <Box
      className="h-full bg-cover bg-fixed p-3 md:p-8 md:pl-[60px] md:pt-[40px] @container/crm crm-dashboard">
        <LeadAnalyticContainer />
    </Box>
  )
}
