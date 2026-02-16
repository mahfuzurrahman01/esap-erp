"use client"

import { Box } from "rizzui"
import CRMStats from "@/modules/crm/components/containers/dashboard/crm-stats"
import RightSidebar from "@/modules/crm/components/containers/dashboard/right-sidebar"
import TopProducts from "@/modules/crm/components/containers/dashboard/top-products"

export default function CrmDashboard() {
  return (
    <Box
      className="h-full bg-cover bg-fixed p-3 md:p-8 md:pl-[60px] md:pt-[50px] @container/crm crm-dashboard">
      <Box className="grid grid-cols-1 gap-6 @3xl/crm:grid-cols-12 @7xl/crm:gap-7">
        <Box
          className="space-y-4 rounded-lg border-2 border-gray-100/20 p-3 md:p-5 @3xl/crm:col-span-8 @7xl:col-span-8 dark:border-gray-700 crm-bg-dark-linear"
          style={{
            background: "linear-gradient(45deg, #74ddd92e, rgb(255, 248, 243))",
          }}>
          <CRMStats />
          <TopProducts />
        </Box>
        <Box className="space-y-4 rounded-lg border border-none border-gray-500/20 md:px-5 pb-5 @3xl/crm:col-span-4 @7xl:col-span-4">
          <RightSidebar className="@3xl/crm:col-span-full" />
        </Box>
      </Box>
    </Box>
  )
}
