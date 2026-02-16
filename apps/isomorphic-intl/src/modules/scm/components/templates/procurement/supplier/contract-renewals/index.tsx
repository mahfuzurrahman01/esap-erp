"use client"

import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ContractRenewals from "@/modules/scm/components/containers/procurement/supplier/contract-renewals"
import { useContractById } from "@/modules/scm/hooks/procurement/supplier/use-contract"
import { Contract } from "@/modules/scm/types/procurement/supplier/contract-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-contract-renewals",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-supplier-list",
      href: routes.scm.procurement.suppliers.suppliers,
    },
    {
      name: "text-contract-renewals",
    },
  ],
}

export default function ContractRenewalsPage() {
  const params = useParams()
  const { id, slug } = params
  const { data: contractData, isLoading } = useContractById(Number(slug)) as {
    data: Contract
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ContractRenewals
        supplierId={Number(id)}
        initialData={contractData}
        isEditForm={false}
      />
    </>
  )
}
