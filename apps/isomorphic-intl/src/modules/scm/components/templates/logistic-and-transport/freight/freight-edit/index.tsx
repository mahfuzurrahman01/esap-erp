"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import FreightCreateEdit from "@/modules/scm/components/containers/logistic-and-transport/freight/create-freight"
import { useFreightById } from "@/modules/scm/hooks/logistic-and-transport/freight/use-freight"
import { Freight } from "@/modules/scm/types/logistics-and-transport/freight/freight-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-freight-edit",
  breadcrumb: [
    {
      name: "text-logistic-and-transport",
    },
    {
      name: "text-freight-list",
      href: routes.scm.logisticsAndTransport.freight.freight,
    },
    {
      name: "text-freight-edit",
    },
  ],
}

export default function FreightEditPage() {
  const params = useParams()

  const { data, isLoading } = useFreightById(Number(params?.id)) as {
    data: Freight | undefined
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <FreightCreateEdit isEditForm={true} initialData={data} />
    </>
  )
}
