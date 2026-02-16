"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateRiskEvaluationForm from "@/modules/scm/components/containers/compliance-and-risk/risk-evaluation/create-risk-evaluation"

const pageHeader = {
  title: "text-risk-evaluation-create",
  breadcrumb: [
    {
      name: "text-compliance-and-risk",
      href: routes.scm.complianceAndRisk.riskEvaluation.riskEvaluation,
    },
    {
      name: "text-risk-evaluation-create",
    },
  ],
}

export default function RiskEvaluationCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateRiskEvaluationForm />
    </>
  )
}
