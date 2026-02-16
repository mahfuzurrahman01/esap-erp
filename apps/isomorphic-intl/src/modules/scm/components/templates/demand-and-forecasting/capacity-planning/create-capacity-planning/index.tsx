"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CapacityPlanningCreateEdit from "@/modules/scm/components/containers/demand-and-forecasting/capacity-planning/create-capacity-planning"

const pageHeader = {
  title: "text-capacity-planning-create",
  breadcrumb: [
    {
      name: "text-demand-and-forecasting",
    },
    {
      name: "text-capacity-planning-list",
      href: routes.scm.demandForecasting.capacityPlanning.capacityPlanning,
    },
    {
      name: "text-capacity-planning-create",
    },
  ],
}

export default function CreateCapacityPlanningPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CapacityPlanningCreateEdit isEditForm={false} initialData={undefined} />
    </>
  )
}
