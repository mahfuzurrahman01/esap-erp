"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import SalesOperationPlanCreateEdit from "@/modules/scm/components/containers/demand-and-forecasting/sales-operation-plan/create-sales-operation-plan"
import { useForecastById } from "@/modules/scm/hooks/demand-and-forecasting/forecast/use-forecast"

const pageHeader = {
  title: "text-sales-operation-plan-create",
  breadcrumb: [
    {
      name: "text-demand-and-forecasting",
    },
    {
      name: "text-sales-operation-plan-list",
      href: routes.scm.demandForecasting.salesOperationsPlan
        .createSalesOperationPlan,
    },
    {
      name: "text-sales-operation-plan-create",
    },
  ],
}

export default function SalesOperationPlanCreatePage() {
  const { id } = useParams()
  const { data: forecastData } = useForecastById(Number(id))
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SalesOperationPlanCreateEdit
        isEditForm={false}
        initialData={forecastData}
      />
    </>
  )
}
