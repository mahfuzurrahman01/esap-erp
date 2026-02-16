"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ForecastCreateEdit from "@/modules/scm/components/containers/demand-and-forecasting/forecast/create-forecast"
import { useForecastById } from "@/modules/scm/hooks/demand-and-forecasting/forecast/use-forecast"
import { Forecast } from "@/modules/scm/types/demand-and-forecasting/forecast/forecast-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-forecast-edit",
  breadcrumb: [
    {
      name: "text-demand-forecasting",
    },
    {
      name: "text-forecast-list",
      href: routes.scm.demandForecasting.forecast.demandForecasting,
    },
    {
      name: "text-forecast-edit",
    },
  ],
}

export default function ForecastEditPage() {
  const params = useParams()

  const { data, isLoading } = useForecastById(Number(params?.id)) as {
    data: Forecast | undefined
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ForecastCreateEdit isEditForm={true} initialData={data} />
    </>
  )
}
