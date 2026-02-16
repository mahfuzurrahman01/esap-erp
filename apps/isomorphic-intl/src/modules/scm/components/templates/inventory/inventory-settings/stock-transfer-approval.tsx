"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"

import StockTransferApprovalTable from "@/modules/scm/components/containers/invenory/inventory-settings/stock-transfer-approval/stock-transfer-approval-table"

const pageHeader = {
  title: "text-stock-transfer-approval",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.inventory.settings.stockTransferApproval,
      name: "text-stock-transfer-approval",
    },
  ],
}

const StockTransferApproval = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockTransferApprovalTable />
    </div>
  )
}

export default StockTransferApproval
