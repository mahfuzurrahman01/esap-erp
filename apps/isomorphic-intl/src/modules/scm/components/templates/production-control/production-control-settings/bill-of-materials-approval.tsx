"use client"

import BillOfMaterialsApprovalTable from "@/modules/scm/components/containers/production-control/production-control-settings/bill-of-materials-approval/bill-of-materials-approval-table"
import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"

export const pageHeader = {
  title: "text-bill-of-material-approval",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.productionControl.settings.billOfMaterialsApproval,
      name: "text-bill-of-material-approval",
    },
  ],
}

const BillOfMaterialsApproval = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <BillOfMaterialsApprovalTable />
    </div>
  )
}

export default BillOfMaterialsApproval
