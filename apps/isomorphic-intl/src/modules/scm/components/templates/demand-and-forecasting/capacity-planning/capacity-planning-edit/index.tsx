"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CapacityPlanningCreateEdit from "@/modules/scm/components/containers/demand-and-forecasting/capacity-planning/create-capacity-planning"
import { useCapacityPlanningById } from "@/modules/scm/hooks/demand-and-forecasting/capacity-planning/use-capacity-planning"
import { CapacityPlanning } from "@/modules/scm/types/demand-and-forecasting/capacity-planning/capacity-planning-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-capacity-planning-edit",
  breadcrumb: [
    {
      name: "text-demand-forecasting",
    },
    {
      name: "text-capacity-planning-list",
      href: routes.scm.demandForecasting.capacityPlanning.capacityPlanning,
    },
    {
      name: "text-capacity-planning-edit",
    },
  ],
}

export default function CapacityPlanningEditPage() {
  const params = useParams()

  const { data, isLoading } = useCapacityPlanningById(Number(params?.id)) as {
    data: CapacityPlanning | undefined
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CapacityPlanningCreateEdit isEditForm={true} initialData={data} />
    </>
  )
}
