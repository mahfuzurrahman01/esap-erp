"use client"

import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateWorkOrderTrackingForm from "@/modules/scm/components/containers/production-control/work-order-tracking/create-work-order-tracking"


const pageHeader = {
  title: "text-edit-work-order-tracking",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-work-order-tracking-list",
      href: routes.scm.productionControl.workOrderTracking.workOrderTracking,
    },
    {
      name: "text-edit-work-order-tracking",
    },
  ],
}

export default function EditWorkOrderTrackingPage() {
  const { id } = useParams()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateWorkOrderTrackingForm
        id={Number(id)}
        mode="edit"
      />
    </>
  )
}
