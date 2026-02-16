"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import MaterialRequirementPlanningApprovalTable from "@/modules/scm/components/containers/production-control/production-control-settings/material-requirement-planning-approval/material-requirement-planning-approval-table"

const pageHeader = {
  title: "text-mrp-approval",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.productionControl.settings.materialRequirementsPlanningApproval,
      name: "text-mrp-approval",
    },
  ],
}

const MaterialRequirementPlanningApproval = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <MaterialRequirementPlanningApprovalTable />
    </div>
  )
}

export default MaterialRequirementPlanningApproval
