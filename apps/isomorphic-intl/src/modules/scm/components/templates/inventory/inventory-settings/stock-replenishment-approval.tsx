"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockReplenishmentApprovalTable from "@/modules/scm/components/containers/invenory/inventory-settings/stock-replenishment-approval/stock-replenishment-approval-table"

export const pageHeader = {
  title: "text-stock-replenishment-approval",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.inventory.settings.stockReplenishmentApproval,
      name: "text-stock-replenishment-approval",
    },
  ],
}

const StockReplenishmentApproval = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockReplenishmentApprovalTable />
    </div>
  )
}

export default StockReplenishmentApproval
