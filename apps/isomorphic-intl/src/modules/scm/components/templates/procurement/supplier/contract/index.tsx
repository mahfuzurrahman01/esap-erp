"use client"

import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ContractForm from "@/modules/scm/components/containers/procurement/supplier/contract/contract-form"

const pageHeader = {
  title: "text-contract",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-supplier-list",
      href: routes.scm.procurement.suppliers.suppliers,
    },
    {
      name: "text-contract",
    },
  ],
}

export default function ContractFormPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <ContractForm isEditForm={false} />
    </>
  )
}
