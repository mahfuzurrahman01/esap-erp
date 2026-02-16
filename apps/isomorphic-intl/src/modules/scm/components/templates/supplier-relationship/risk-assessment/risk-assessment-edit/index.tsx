"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import RiskAssessmentCreateEdit from "@/modules/scm/components/containers/supplier-relationship/risk-assessment/create-risk-assessment"
import { useRiskAssessmentById } from "@/modules/scm/hooks/supplier-relationship/risk-assessment/use-risk-assessment"
import { RiskAssessment } from "@/modules/scm/types/supplier-relationship/risk-assessment/risk-assessment-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-risk-assessment-edit",
  breadcrumb: [
    {
      name: "text-supplier-relationship",
    },
    {
      name: "text-risk-assessment",
      href: routes.scm.supplierRelationship.riskAssessment.riskAssessment,
    },
    {
      name: "text-risk-assessment-edit",
    },
  ],
}

export default function RiskAssessmentEditPage() {
  const params = useParams()

  const { data, isLoading } = useRiskAssessmentById(Number(params?.id)) as {
    data: RiskAssessment | undefined
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <RiskAssessmentCreateEdit initialData={data} isEditForm={true} />
    </>
  )
}
