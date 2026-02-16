"use client"

// import { useParams } from "next/navigation"
import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditBillOfMaterials from "@/modules/scm/components/containers/production-control/bill-of-materials/create-bill-of-materials"
import { useBillOfMaterialsById } from "@/modules/scm/hooks/production-control/bill-of-materials/use-bill-of-materials"
import { BillOfMaterials } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type"

const pageHeader = {
  title: "text-bill-of-materials-edit",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-bill-of-materials-list",
      href: routes.scm.productionControl.billOfMaterials.billOfMaterials,
    },
    {
      name: "text-bill-of-materials-edit",
    },
  ],
}

export default function EditBillOfMaterialsPage() {
  const { id } = useParams()
  const { data: billOfMaterials } = useBillOfMaterialsById(Number(id))

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditBillOfMaterials
        initialData={billOfMaterials as BillOfMaterials}
        isEditForm={true}
      />
    </>
  )
}
