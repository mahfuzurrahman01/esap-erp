"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ReturnProcessApprovalTable from "@/modules/scm/components/containers/logistic-and-transport/logistic-and-transport-settings/return-process-approval/return-process-approval-table"

const pageHeader = {
  title: "text-return-process-approval",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.logisticsAndTransport.settings.returnProcessApproval,
      name: "text-return-process-approval",
    },
  ],
}

const ReturnProcessApproval = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ReturnProcessApprovalTable />
    </div>
  )
}

export default ReturnProcessApproval
