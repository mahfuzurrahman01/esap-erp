"use client"

import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateWorkOrderTrackingForm from "@/modules/scm/components/containers/production-control/work-order-tracking/create-work-order-tracking"

const pageHeader = {
  title: "text-create-work-order-tracking",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-material-availability-list",
      href: routes.scm.productionControl.materialAvailability
        .materialAvailability,
    },
    {
      name: "text-create-work-order-tracking",
    },
  ],
}

export default function CreateWorkOrderTrackingPage() {
  const { id } = useParams()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateWorkOrderTrackingForm id={Number(id)} mode="create" />
    </>
  )
}
