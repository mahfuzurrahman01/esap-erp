"use client"

import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import SlaMonitoring from "@/modules/scm/components/containers/procurement/supplier/sla-monitoring"

const pageHeader = {
  title: "text-contract-sla-monitoring",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-supplier-list",
      href: routes.scm.procurement.suppliers.suppliers,
    },
    {
      name: "text-contract-sla-monitoring",
    },
  ],
}

export default function SLAMonitoringPage() {
  const params = useParams()
  const { slug } = params

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <SlaMonitoring
        contractId={Number(slug)}
        initialData={undefined}
        isEditForm={false}
      />
    </>
  )
}
