"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ForecastCreateEdit from "@/modules/scm/components/containers/demand-and-forecasting/forecast/create-forecast"

const pageHeader = {
  title: "text-forecast-create",
  breadcrumb: [
    {
      name: "text-demand-and-forecasting",
    },
    {
      name: "text-forecast-list",
      href: routes.scm.demandForecasting.forecast.demandForecasting,
    },
    {
      name: "text-forecast-create",
    },
  ],
}

export default function ForecastCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ForecastCreateEdit isEditForm={false} initialData={undefined} />
    </>
  )
}
