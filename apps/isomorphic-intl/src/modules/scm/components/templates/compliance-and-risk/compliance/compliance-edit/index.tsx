"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ComplianceForm from "@/modules/scm/components/containers/compliance-and-risk/compliance/create-compliance"
import { useComplianceById } from "@/modules/scm/hooks/compliance-and-risk/compliance/use-compliance"
import { Compliance } from "@/modules/scm/types/compliance-and-risk/compliance-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-compliance-edit",
  breadcrumb: [
    {
      name: "text-compliance-and-risk",
    },
    {
      name: "text-compliance-list",
      href: routes.scm.complianceAndRisk.compliance.compliance,
    },
    {
      name: "text-compliance-edit",
    },
  ],
}

export default function ComplianceEditPage() {
  const { id } = useParams()
  const { data: compliance, isLoading } = useComplianceById(Number(id))
  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ComplianceForm
        initialData={compliance as Compliance}
        isEditForm={true}
      />
    </>
  )
}
