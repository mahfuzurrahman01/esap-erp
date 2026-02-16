"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateRiskEvaluationForm from "@/modules/scm/components/containers/compliance-and-risk/risk-evaluation/create-risk-evaluation"
import { useRiskEvaluationById } from "@/modules/scm/hooks/compliance-and-risk/risk-evaluation/use-risk-evaluation"
import { RiskEvaluation } from "@/modules/scm/types/compliance-and-risk/risk-evaluation"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-risk-evaluation-edit",
  breadcrumb: [
    {
      name: "text-compliance-and-risk",
    },
    {
      name: "text-risk-evaluation-list",
      href: routes.scm.complianceAndRisk.riskEvaluation.riskEvaluation,
    },
    {
      name: "text-risk-evaluation-edit",
    },
  ],
}

export default function RiskEvaluationEditPage() {
  const { id } = useParams()
  const { data: riskEvaluation, isLoading } = useRiskEvaluationById(Number(id))
  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateRiskEvaluationForm
        initialData={riskEvaluation as RiskEvaluation}
        isEditForm={true}
      />
    </>
  )
}
