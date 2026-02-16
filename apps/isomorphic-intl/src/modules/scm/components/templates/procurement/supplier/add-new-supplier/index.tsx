"use client"

import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditSupplier from "@/modules/scm/components/containers/procurement/supplier/add-new-supplier"

const pageHeader = {
  title: "text-supplier-add",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-supplier-list",
      href: routes.scm.procurement.suppliers.suppliers,
    },
    {
      name: "text-add-supplier",
    },
  ],
}

export default function CreateEditSupplierPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateEditSupplier />
    </>
  )
}
