"use client"

import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditRequisition from "@/modules/scm/components/containers/procurement/requisition/create-requisition"

const pageHeader = {
  title: "text-create-requisition",
  breadcrumb: [
    {

      name: "text-procurement",
    },
    {
      name: "text-requisition-list",
      href: routes.scm.procurement.requisitions.requisitions,
    },
    {
      name: "text-create-requisition",
    },

  ],
}

export default function AddRequisitionPage() {
  const { id } = useParams()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditRequisition
        id={Number(id)}
        mode="create"
        requestFor="materialAvailability"
      />
    </>

  )
}
