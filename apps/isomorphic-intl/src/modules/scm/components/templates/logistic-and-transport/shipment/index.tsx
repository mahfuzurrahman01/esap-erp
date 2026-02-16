"use client"

import PageHeader from "@/components/base/page-header"
import ShipmentList from "@/modules/scm/components/containers/logistic-and-transport/shipment"

const pageHeader = {
  title: "text-shipment-tracking",
  breadcrumb: [
    {
      name: "text-logistic-and-transport",
    },
    {
      name: "text-shipment-tracking",
    },
  ],
}

export default function ShipmentListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ShipmentList />
    </>
  )
}
