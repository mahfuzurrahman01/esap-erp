"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import SalesOperationPlanCreateEdit from "@/modules/scm/components/containers/demand-and-forecasting/sales-operation-plan/create-sales-operation-plan"
import { useSalesOperationPlanById } from "@/modules/scm/hooks/demand-and-forecasting/sales-operation-plan/use-sales-operation-plan"
import { SalesOperationPlan } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-sales-operation-plan-edit",
  breadcrumb: [
    {
      name: "text-demand-forecasting",
    },
    {
      name: "text-sales-operation-plan-list",
      href: routes.scm.demandForecasting.salesOperationsPlan.salesOperationPlan,
    },
    {
      name: "text-sales-operation-plan-edit",
    },
  ],
}

export default function SalesOperationPlanEditPage() {
  const params = useParams()

  const { data, isLoading } = useSalesOperationPlanById(Number(params?.id)) as {
    data: SalesOperationPlan
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SalesOperationPlanCreateEdit isEditForm={true} initialData={data} />
    </>
  )
}
