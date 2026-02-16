"use client"

import { useParams } from "next/navigation"

import { Loader } from "rizzui"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import EditSupplier from "@/modules/scm/components/containers/procurement/supplier/edit-suppier"
import { useSupplierById } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-supplier-edit",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-supplier-list",
      href: routes.scm.procurement.suppliers.suppliers,
    },
    {
      name: "text-supplier-edit",
    },
  ],
}

export default function EditSupplierPage() {
  const params = useParams()
  const {
    data: supplier,
    isLoading,
    isError,
  } = useSupplierById(Number(params?.id))

 if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    return <div>Error loading supplier data.</div>
  }

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>

      <EditSupplier id={Number(params?.id)} initialData={supplier as Supplier} />
    </>
  )
}
