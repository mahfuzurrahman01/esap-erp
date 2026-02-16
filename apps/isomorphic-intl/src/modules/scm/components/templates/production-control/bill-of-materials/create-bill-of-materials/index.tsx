"use client"

import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditBillOfMaterials from "@/modules/scm/components/containers/production-control/bill-of-materials/create-bill-of-materials"

const pageHeader = {
  title: "text-create-bill-of-materials",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-bill-of-materials-list",
      href: routes.scm.productionControl.billOfMaterials.billOfMaterials,
    },
    {
      name: "text-create-bill-of-materials",
    },
  ],
}

export default function CreateBillOfMaterialsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditBillOfMaterials />
    </>
  )
}
