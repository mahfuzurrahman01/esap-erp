"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import RequisitionApprovalTable from "@/modules/scm/components/containers/procurement/procurement-settings/requisition-approval/requisition-approval-table"

const pageHeader = {
  title: "text-requisition-approval",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.procurement.setting.requisitionApproval,
      name: "text-requisition-approval",
    },
  ],
}

const RequisitionApproval = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <RequisitionApprovalTable />
    </div>
  )
}

export default RequisitionApproval
