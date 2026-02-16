"use client"

import PageHeader from "@/components/base/page-header"
import ReconciliationTable from "@/components/container/hrms/attendance-and-leave/reconciliation/reconciliation-table"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-reconciliation-requests",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.attendances,
      name: "text-reconciliation-requests",
    },
    {
      name: "text-list",
    },
  ],
}

const ReconciliationRequests = () => {
  return (
    <div className="max-xl:pt-10">
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <Box className="mt-4">
        {/* <TabRouteNavigationInner
          menuItems={menuItems}
          translationObjectName="hrms"
        /> */}
        <ReconciliationTable />
      </Box>
    </div>
  )
}

export default ReconciliationRequests
