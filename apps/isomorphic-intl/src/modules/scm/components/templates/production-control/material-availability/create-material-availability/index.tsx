"use client"

import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditMaterialAvailability from "@/modules/scm/components/containers/production-control/materials-availibility/create-materials-availibility"

const pageHeader = {
  title: "text-create-material-availability",
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
      name: "text-create-material-availability",
    },
  ],
}

export default function CreateMaterialAvailabilityPage() {
  const { id } = useParams()
  
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditMaterialAvailability id={Number(id)} mode="create" />
    </>
  )
}
