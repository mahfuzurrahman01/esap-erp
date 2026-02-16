"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import FreightCreateEdit from "@/modules/scm/components/containers/logistic-and-transport/freight/create-freight"
import { useShipmentById } from "@/modules/scm/hooks/logistic-and-transport/shipment/use-shipment"

const pageHeader = {
  title: "text-freight-create",
  breadcrumb: [
    {
      name: "text-logistic-and-transport",
    },
    {
      name: "text-freight-management",
      href: routes.scm.logisticsAndTransport.freight.freight,
    },
    {
      name: "text-freight-create",
    },
  ],
}

export default function CreateFreightPage() {
  const { id } = useParams()
  const { data: shipmentData } = useShipmentById(Number(id))
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <FreightCreateEdit initialData={shipmentData} />
    </>
  )
}
