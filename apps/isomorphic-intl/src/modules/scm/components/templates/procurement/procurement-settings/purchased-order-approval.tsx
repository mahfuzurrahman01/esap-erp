"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import PurchasedOrderApprovalTable from "@/modules/scm/components/containers/procurement/procurement-settings/purchased-order-approval/purchased-order-approval-table"

const pageHeader = {
  title: "text-purchased-order-approval",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.procurement.setting.purchaseOrderApproval,
      name: "text-purchase-order-approval",
    },
  ],
}

const PurchasedOrderApproval = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <PurchasedOrderApprovalTable />
    </div>
  )
}

export default PurchasedOrderApproval
