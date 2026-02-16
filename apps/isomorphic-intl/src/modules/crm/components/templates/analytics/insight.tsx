"use client"

import { Box } from "rizzui"
import InsightContainer from "@/modules/crm/components/containers/analytics/insight"

export default function InsightTemplate() {
  return (
    <Box
      className="h-full bg-cover bg-fixed p-3 md:p-8 md:pl-[60px] md:pt-[40px] @container/crm crm-dashboard">
        <InsightContainer />
    </Box>
  )
}
