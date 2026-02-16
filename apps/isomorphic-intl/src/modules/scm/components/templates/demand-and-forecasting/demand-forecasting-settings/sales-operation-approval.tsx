"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import SalesOperationApprovalTable from "@/modules/scm/components/containers/demand-and-forecasting/demand-forecasting-settings/sales-operatin-approval/sales-operatin-approval-table"

export const pageHeader = {
  title: "text-sales-operation-approval",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.demandForecasting.settings.salesOperationApproval,
      name: "text-sales-operation-approval",
    },
  ],
}

const SalesOperationApproval = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SalesOperationApprovalTable />
    </div>
  )
}

export default SalesOperationApproval
