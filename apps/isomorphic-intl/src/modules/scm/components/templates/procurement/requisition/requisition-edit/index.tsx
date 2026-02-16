"use client"

import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import EditRequisition from "@/modules/scm/components/containers/procurement/requisition/requisition-edit"

const pageHeader = {
  title: "text-requisition-edit",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-requisition-list",
      href: routes.scm.procurement.requisitions.requisitions,
    },
    {
      name: "text-requisition-edit",
    },
  ],
}

export default function EditRequisitionPage() {
  const params = useParams()
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <EditRequisition params={params} />
    </>
  )
}
